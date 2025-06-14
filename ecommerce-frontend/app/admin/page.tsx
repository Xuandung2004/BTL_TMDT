'use client';

import React from 'react';
import Link from 'next/link';

export default function Dashboard() {
  // Giả sử đây là dữ liệu thống kê, sau này có thể fetch từ API
  const stats = [
    { label: '🛒 Tổng đơn hàng', value: 120 },
    { label: '📦 Sản phẩm đang bán', value: 85 },
    { label: '👥 Người dùng', value: 220 },
    { label: '💸 Doanh thu hôm nay', value: '12.500.000đ' },
  ];

  const adminLinks = [
    { href: '/admin/products', label: 'Quản lý sản phẩm' },
    { href: '/admin/orders', label: 'Quản lý đơn hàng' },
    { href: '/admin/users', label: 'Quản lý người dùng' },
    { href: '/admin/categories', label: 'Danh mục sản phẩm' },
  ];

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">📊 Bảng điều khiển Admin</h1>

      {/* Thống kê */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {stats.map((item, index) => (
          <div
            key={index}
            className="bg-white shadow-lg rounded-xl p-4 border-l-4 border-blue-500"
          >
            <div className="text-sm text-gray-500">{item.label}</div>
            <div className="text-2xl font-bold text-gray-800">{item.value}</div>
          </div>
        ))}
      </div>

      {/* Liên kết quản lý */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {adminLinks.map((link, index) => (
          <Link
            key={index}
            href={link.href}
            className="block bg-blue-500 text-white text-center py-4 rounded-xl shadow hover:bg-blue-600 transition"
          >
            {link.label}
          </Link>
        ))}
      </div>
    </div>
  );
}
