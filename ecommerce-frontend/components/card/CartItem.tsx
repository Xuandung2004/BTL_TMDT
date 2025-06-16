'use client';
import React from 'react';
import { FiTrash2, FiPlus, FiMinus } from 'react-icons/fi';
import ImageWithFallback from './ImageWithFallback';

type CartItemProps = {
  item: any;
  onUpdateQuantity: (productId: number, quantity: number) => Promise<void>;
  onDeleteItem: (productId: number) => Promise<void>;
};

export default function CartItem({ item, onUpdateQuantity, onDeleteItem }: CartItemProps) {
  // Nếu dữ liệu sản phẩm không tồn tại, hiển thị thông báo và nút xóa
  if (!item.product) {
    return (
      <div className="grid grid-cols-12 items-center px-6 py-4 bg-gray-100">
        <div className="col-span-10">
          <p className="text-gray-500 italic">
            Sản phẩm không còn tồn tại. Vui lòng xóa khỏi giỏ hàng.
          </p>
        </div>
        <div className="col-span-2 text-right">
          <button
            onClick={() => onDeleteItem(item.productId)}
            className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600 text-sm"
          >
            Xóa
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-12 items-center px-6 py-4">
      {/* Sản phẩm - col-span-6 */}
      <div className="col-span-6 flex items-center gap-4">
        <div className="relative">
          <ImageWithFallback
            src={item.product.imageUrl || '/placeholder.png'}
            alt={item.product.name}
            fallbackSrc="/placeholder.png"
            className="w-20 h-20 object-cover border rounded"
          />
          <button
            onClick={() => onDeleteItem(item.productId)}
            className="absolute -top-2 -right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600"
            aria-label="Xóa"
          >
            <FiTrash2 size={16} />
          </button>
        </div>
        <div>
          <h2 className="font-semibold text-gray-800 line-clamp-1">
            {item.product.name}
          </h2>
          <p className="text-gray-500 text-sm line-clamp-1">
            {item.product.description || 'Không có mô tả'}
          </p>
        </div>
      </div>

      {/* Đơn giá - col-span-2 */}
      <div className="col-span-2 text-center text-gray-700 font-medium">
        {item.product.price.toLocaleString()}₫
      </div>

      {/* Số lượng - col-span-2 */}
      <div className="col-span-2 flex justify-center">
        <div className="flex items-center border rounded">
          <button
            onClick={() => onUpdateQuantity(item.productId, item.quantity - 1)}
            disabled={item.quantity <= 1}
            className="p-1 px-2 text-gray-500 hover:bg-gray-100 disabled:opacity-30"
          >
            <FiMinus />
          </button>
          <span className="px-3">{item.quantity}</span>
          <button
            onClick={() => onUpdateQuantity(item.productId, item.quantity + 1)}
            className="p-1 px-2 text-gray-500 hover:bg-gray-100"
          >
            <FiPlus />
          </button>
        </div>
      </div>

      {/* Thành tiền - col-span-2 */}
      <div className="col-span-2 text-right text-orange-600 font-bold text-lg">
        {(item.product.price * item.quantity).toLocaleString()}₫
      </div>
    </div>
  );
}
