'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { fetchAdminDashboard } from '@/app/services/api';

export default function ReportPage() {
  const [stats, setStats] = useState<any>(null);

  useEffect(() => {
    const loadStats = async () => {
      try {
        const data = await fetchAdminDashboard();
        setStats(data);
      } catch (error) {
        console.error('Không thể tải dữ liệu thống kê');
      }
    };

    loadStats();
  }, []);

  return (
    <div className="p-8">
      {stats ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          <StatCard label="🛒 Tổng đơn hàng" value={stats.totalOrders} />
          <StatCard label="📦 Sản phẩm đang bán" value={stats.activeProducts} />
          <StatCard label="👥 Người dùng" value={stats.totalUsers} />
          <StatCard label="💸 Doanh thu hôm nay" value={Number(stats.revenueToday).toLocaleString('vi-VN') + 'đ'} />
        </div>
      ) : (
        <p className="text-gray-500">Đang tải dữ liệu thống kê...</p>
      )}
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
