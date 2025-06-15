'use client';
import React from 'react';
import { FiTrash2, FiPlus, FiMinus } from 'react-icons/fi';

type CartItemProps = {
  item: any;
  onUpdateQuantity: (productId: number, quantity: number) => Promise<void>;
  onDeleteItem: (productId: number) => Promise<void>;
};

export default function CartItem({ item, onUpdateQuantity, onDeleteItem }: CartItemProps) {
  return (
    <div className="bg-white p-4 rounded-lg shadow flex justify-between items-center">
      <div className="flex items-center gap-4">
        <div className="relative">
          <img
            src={item.product.imageUrl || '/placeholder.png'}
            alt={item.product.name}
            className="w-20 h-20 object-cover border rounded"
            onError={(e) => (e.currentTarget.src = '/placeholder.png')}
          />
          <button
            onClick={() => onDeleteItem(item.productId)}
            className="absolute -top-2 -right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600"
            aria-label="Xoá"
          >
            <FiTrash2 size={16} />
          </button>
        </div>
        <div>
          <h2 className="font-semibold text-gray-800 line-clamp-1">{item.product.name}</h2>
          <p className="text-gray-500 text-sm line-clamp-1">{item.product.description || 'Không có mô tả'}</p>
        </div>
      </div>

      <div className="text-center">
        <p className="text-gray-700 font-medium mb-2">{item.product.price.toLocaleString()}₫</p>
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

      <p className="text-orange-600 font-bold text-lg">
        {(item.product.price * item.quantity).toLocaleString()}₫
      </p>
    </div>
  );
}
