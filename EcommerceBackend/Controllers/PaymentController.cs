using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Models;
using System.Security.Claims;

[Route("api/[controller]")]
[ApiController]
public class PaymentController : ControllerBase
{
    private readonly AppDbContext _context;

    public PaymentController(AppDbContext context)
    {
        _context = context;
    }

    // tạo thanh toán mới
    [HttpPost("create")]
    [Authorize]
    public async Task<IActionResult> Create([FromBody] Payment payment)
    {
        var userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier) ?? "0");

        // Kiểm tra đơn hàng có tồn tại và thuộc về user
        var order = await _context.Orders
            .FirstOrDefaultAsync(o => o.OrderId == payment.OrderId && o.UserId == userId);
        if (order == null)
            return BadRequest("Đơn hàng không tồn tại hoặc không thuộc về bạn");

        // Tạo thanh toán mới
        var newPayment = new Payment
        {
            OrderId = payment.OrderId,
            PaymentMethod = payment.PaymentMethod,
            Amount = payment.Amount,
            TransactionId = payment.TransactionId,
            PaymentGateway = payment.PaymentGateway,
            Status = PaymentStatus.Pending,
            CreatedAt = DateTime.UtcNow
        };

        _context.Payments.Add(newPayment);
        await _context.SaveChangesAsync();

        return Ok(newPayment);
    }

    // Lấy tất cả thanh toán (admin: tất cả, user: của mình)
    [HttpGet]
    [Authorize]
    public async Task<IActionResult> GetAll()
    {
        var role = User.FindFirstValue(ClaimTypes.Role);
        var userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier) ?? "0");

        if (role == "admin")
        {
            var all = await _context.Payments
                .Include(p => p.Order)
                .ToListAsync();
            return Ok(all);
        }
        else
        {
            var mine = await _context.Payments
                .Where(p => p.Order.UserId == userId)
                .Include(p => p.Order)
                .ToListAsync();
            return Ok(mine);
        }
    }

    // Lấy chi tiết thanh toán theo ID (admin hoặc đúng user mới xem được)
    [HttpGet("{id}")]
    [Authorize]
    public async Task<IActionResult> GetById(int id)
    {
        var role = User.FindFirstValue(ClaimTypes.Role);
        var userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier) ?? "0");

        var payment = await _context.Payments
            .Include(p => p.Order)
            .FirstOrDefaultAsync(p => p.PaymentId == id);

        if (payment == null) return NotFound();

        if (role != "admin" && payment.Order.UserId != userId)
            return Forbid();

        return Ok(payment);
    }

    // Cập nhật trạng thái thanh toán (chỉ admin được gọi)
    [HttpPut("update-status/{id}")]
    [Authorize(Roles = "admin")] // Chỉ admin mới được cập nhật trạng thái thanh toán
    public async Task<IActionResult> UpdateStatus(int id, [FromBody] PaymentStatus newStatus)
    {
        var payment = await _context.Payments
            .Include(p => p.Order)
            .FirstOrDefaultAsync(p => p.PaymentId == id);

        if (payment == null)
            return NotFound("Không tìm thấy thanh toán");

        payment.Status = newStatus;
        await _context.SaveChangesAsync();

        return Ok(new { message = "Cập nhật trạng thái thành công!", payment });
    }

}
