using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Models;

[Route("api/[controller]")]
[ApiController]
public class OrderController : ControllerBase
{
    private readonly AppDbContext _context;

    public OrderController(AppDbContext context)
    {
        _context = context;
    }

    // xem tất cả đơn hàng
    [HttpGet("getAll")]
    public async Task<IActionResult> GetAllOrders()
    {
        var orders = await _context.Orders
            .Include(o => o.User)
            .Include(o => o.OrderDetails)
                .ThenInclude(od => od.Product)
            .ToListAsync();
        return Ok(orders);
    }

    // User: xem đơn hàng của chính mình
    [HttpGet("user")]
    [Authorize]
    public async Task<IActionResult> GetUserOrders()
    {
        var userId = int.Parse(User.FindFirst("UserId").Value);
        var orders = await _context.Orders
            .Where(o => o.UserId == userId)
            .Include(o => o.OrderDetails)
                .ThenInclude(od => od.Product)
            .ToListAsync();
        return Ok(orders);
    }

    // Lấy đơn hàng theo id
    [HttpGet("{id}")]
    [Authorize]
    public async Task<IActionResult> GetOrderById(int id)
    {
        var order = await _context.Orders
            .Include(o => o.OrderDetails)
                .ThenInclude(od => od.Product)
            .FirstOrDefaultAsync(o => o.OrderId == id);

        if (order == null) return NotFound();

        var userId = int.Parse(User.FindFirst("UserId").Value);
        var isAdmin = User.IsInRole("Admin");

        if (!isAdmin && order.UserId != userId)
        {
            return Forbid();
        }

        return Ok(order);
    }

    // Tạo đơn hàng từ giỏ hàng
    [HttpPost]
    [Authorize]
    public async Task<IActionResult> CreateOrder()
    {
        var userId = int.Parse(User.FindFirst("UserId").Value);
        var cartItems = await _context.Carts
            .Include(c => c.Product)
            .Where(c => c.UserId == userId)
            .ToListAsync();

        if (!cartItems.Any()) return BadRequest("Giỏ hàng trống.");

        var total = cartItems.Sum(item => item.Product.Price * item.Quantity);

        var newOrder = new Order
        {
            UserId = userId,
            TotalAmount = total,
            OrderDate = DateTime.Now
        };

        _context.Orders.Add(newOrder);
        await _context.SaveChangesAsync();

        foreach (var item in cartItems)
        {
            var detail = new OrderDetail
            {
                OrderId = newOrder.OrderId,
                ProductId = item.ProductId,
                Quantity = item.Quantity,
                UnitPrice = item.Product.Price
            };
            _context.OrderDetails.Add(detail);
        }

        _context.Carts.RemoveRange(cartItems);
        await _context.SaveChangesAsync();

        return Ok(newOrder);
    }

    // Admin: xóa đơn hàng
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteOrder(int id)
    {
        var order = await _context.Orders.FindAsync(id);
        if (order == null) return NotFound();

        var orderDetails = _context.OrderDetails.Where(d => d.OrderId == id);
        _context.OrderDetails.RemoveRange(orderDetails);
        _context.Orders.Remove(order);
        await _context.SaveChangesAsync();

        return NoContent();
    }
}