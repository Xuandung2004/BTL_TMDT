using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;

namespace Controllers
{
    [ApiController]
    [Route("api/orderdetails")]
    public class OrderDetailController : ControllerBase
    {
        private readonly AppDbContext _context;

        public OrderDetailController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/orderdetails/{orderId}
        [HttpGet("{orderId}")]
        [Authorize]
        public async Task<IActionResult> GetOrderDetails(int orderId)
        {
            var userIdClaim = User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier);
            if (userIdClaim == null)
                return Unauthorized("Không tìm thấy thông tin người dùng.");

            var userId = int.Parse(userIdClaim.Value);
            var isAdmin = User.IsInRole("Admin");

            var order = await _context.Orders
                .Include(o => o.OrderDetails!)
                    .ThenInclude(od => od.Product)
                .FirstOrDefaultAsync(o => o.OrderId == orderId);
            if (order == null)
                return NotFound("Không tìm thấy đơn hàng.");

            if (!isAdmin && order.UserId != userId)
                return Forbid();

            return Ok(order.OrderDetails);
        }
    }
}
