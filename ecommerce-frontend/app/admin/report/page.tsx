'use client';

import React, { useEffect, useState } from 'react';
import { fetchAdminDashboard, fetchRevenueByDayInMonth, fetchTopSellingProducts } from '@/app/services/api';
import Chart from 'react-apexcharts';
import { format } from 'date-fns';

export default function ReportPage() {
  const [stats, setStats] = useState<any>(null);
  const [revenueData, setRevenueData] = useState<any[]>([]);
  const [topProducts, setTopProducts] = useState<any[]>([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const today = new Date();
        const year = today.getFullYear();
        const month = today.getMonth() + 1;

        const [dashboardRes, revenueRes, topRes] = await Promise.all([
          fetchAdminDashboard(),
          fetchRevenueByDayInMonth(year, month),
          fetchTopSellingProducts(5)
        ]);

        setStats(dashboardRes);
        setRevenueData(revenueRes.data);
        setTopProducts(topRes.data);
      } catch (error) {
        console.error('Không thể tải dữ liệu thống kê');
      }
    };

    loadData();
  }, []);

  return (
    <div className="p-8 space-y-10">
      {/* Các ô thống kê tổng */}
      {stats ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard label="🛒 Tổng đơn hàng" value={stats.totalOrders} />
          <StatCard label="📦 Sản phẩm đang bán" value={stats.activeProducts} />
          <StatCard label="👥 Người dùng" value={stats.totalUsers} />
          <StatCard label="💸 Doanh thu hôm nay" value={Number(stats.revenueToday).toLocaleString('vi-VN') + 'đ'} />
        </div>
      ) : (
        <p className="text-gray-500">Đang tải dữ liệu thống kê...</p>
      )}

      {/* Biểu đồ doanh thu theo ngày */}
      <div className="bg-white rounded-xl shadow p-6">
        <h2 className="text-xl font-semibold mb-4">📈 Doanh thu theo ngày trong tháng</h2>
        {revenueData.length > 0 ? (
          <Chart
            type="line"
            height={300}
            options={{
              chart: { id: 'revenue-chart' },
              xaxis: {
                categories: revenueData.map((d) => format(new Date(d.date), 'dd/MM')),
              },
              stroke: { curve: 'smooth' },
            }}
            series={[
              {
                name: 'Doanh thu',
                data: revenueData.map((d) => d.total),
              },
            ]}
          />
        ) : (
          <p className="text-gray-500">Không có dữ liệu doanh thu.</p>
        )}
      </div>

      {/* Bảng top sản phẩm bán chạy */}
      <div className="bg-white rounded-xl shadow p-6">
        <h2 className="text-xl font-semibold mb-4">🏆 Top 5 sản phẩm bán chạy</h2>
        {topProducts.length > 0 ? (
          <table className="min-w-full text-sm">
            <thead className="bg-gray-100 text-left">
              <tr>
                <th className="px-4 py-2">Sản phẩm</th>
                <th className="px-4 py-2">Đã bán</th>
              </tr>
            </thead>
            <tbody>
              {topProducts.map((item: any, idx: number) => (
                <tr key={idx} className="border-t">
                  <td className="px-4 py-2">{item.name}</td>
                  <td className="px-4 py-2">{item.totalSold}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-gray-500">Không có dữ liệu sản phẩm bán chạy.</p>
        )}
      </div>
    </div>
  );
}

function StatCard({ label, value }: { label: string; value: any }) {
  return (
    <div className="bg-white shadow-lg rounded-xl p-4 border-l-4 border-blue-500">
      <div className="text-sm text-gray-500">{label}</div>
      <div className="text-2xl font-bold text-gray-800">{value}</div>
    </div>
  );
}