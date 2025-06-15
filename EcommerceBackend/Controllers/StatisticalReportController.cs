using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Models;

namespace Controllers
{
    [ApiController]
    [Route("api/admin/dashboard")]
    public class DashboardController : ControllerBase
    {
        private readonly AppDbContext _context;

        public DashboardController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetDashboard()
        {
            // Đếm tổng đơn hàng
            var totalOrders = await _context.Orders.CountAsync();

            // Đếm sản phẩm còn hàng (Instock > 0)
            var activeProducts = await _context.Products
                .CountAsync(p => p.Instock > 0);

            // Đếm tổng người dùng
            var totalUsers = await _context.Users.CountAsync();

            // Doanh thu hôm nay
            var today = DateTime.Today;
            var revenueToday = await _context.Orders
                .Where(o => o.OrderDate.Date == today)
                .SumAsync(o => (decimal?)o.TotalAmount) ?? 0;

            return Ok(new
            {
                totalOrders,
                activeProducts,
                totalUsers,
                revenueToday
            });
        }
    }
}
