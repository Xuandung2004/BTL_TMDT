'use client';

import { useEffect, useState } from 'react';
import { fetchCart, updateCartItem, deleteCartItem } from '../services/api';
import Link from 'next/link';
import { FiShoppingBag, FiTrash2, FiPlus, FiMinus, FiArrowLeft } from 'react-icons/fi';

export default function CartPage() {
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [total, setTotal] = useState(0);

  const loadCart = async () => {
    try {
      setLoading(true);
      const res = await fetchCart();
      setCartItems(res.data);
      const totalPrice = res.data.reduce((sum: number, item: any) => {
        return sum + item.product.price * item.quantity;
      }, 0);
      setTotal(totalPrice);
    } catch (err) {
      setError("Lỗi khi tải giỏ hàng. Vui lòng thử lại sau.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCart();
  }, []);

  const handleUpdateQuantity = async (productId: number, quantity: number) => {
    try {
      if (quantity < 1) return;
      await updateCartItem(productId, quantity);
      loadCart();
    } catch (err) {
      alert("Lỗi khi cập nhật số lượng");
    }
  };

  const handleDeleteItem = async (productId: number) => {
    if (!confirm("Bạn có chắc muốn xoá sản phẩm này không?")) return;
    try {
      await deleteCartItem(productId);
      loadCart();
    } catch (err) {
      alert("Lỗi khi xoá sản phẩm");
    }
  };

  // Hiển thị khi đang tải
  if (loading) {
    return (
      <div className="max-w-4xl mx-auto p-4 md:p-6">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800 flex items-center gap-2">
            <FiShoppingBag className="text-orange-500" />
            Giỏ hàng
          </h1>
          <div className="bg-gray-200 animate-pulse rounded-lg w-32 h-10"></div>
        </div>
        
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-white p-4 rounded-xl shadow-sm flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16 animate-pulse" />
                <div className="space-y-2">
                  <div className="bg-gray-200 h-4 w-32 rounded animate-pulse"></div>
                  <div className="bg-gray-200 h-3 w-24 rounded animate-pulse"></div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="bg-gray-200 h-8 w-24 rounded animate-pulse"></div>
                <div className="bg-gray-200 h-8 w-8 rounded animate-pulse"></div>
              </div>
            </div>
          ))}
          
          <div className="pt-6 border-t mt-4">
            <div className="flex justify-between items-center">
              <div className="bg-gray-200 h-6 w-32 rounded animate-pulse"></div>
              <div className="bg-gray-200 h-6 w-24 rounded animate-pulse"></div>
            </div>
            <div className="bg-orange-500 h-12 w-full mt-4 rounded-lg animate-pulse"></div>
          </div>
        </div>
      </div>
    );
  }

  // Hiển thị khi có lỗi
  if (error) {
    return (
      <div className="max-w-4xl mx-auto p-4 md:p-6">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800 flex items-center gap-2">
            <FiShoppingBag className="text-orange-500" />
            Giỏ hàng
          </h1>
          <Link
            href="/product"
            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg shadow font-medium flex items-center gap-2"
          >
            <FiArrowLeft /> Tiếp tục mua
          </Link>
        </div>
        
        <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
          <div className="text-red-500 text-5xl mb-4 flex justify-center">
            <FiShoppingBag />
          </div>
          <h3 className="text-xl font-semibold text-red-700 mb-2">Đã xảy ra lỗi</h3>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={loadCart}
            className="bg-red-500 hover:bg-red-600 text-white py-2 px-6 rounded-lg font-medium"
          >
            Thử lại
          </button>
        </div>
      </div>
    );
  }

  // Hiển thị khi giỏ hàng trống
  if (cartItems.length === 0) {
    return (
      <div className="max-w-4xl mx-auto p-4 md:p-6">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800 flex items-center gap-2">
            <FiShoppingBag className="text-orange-500" />
            Giỏ hàng
          </h1>
          <Link
            href="/product"
            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg shadow font-medium flex items-center gap-2"
          >
            <FiArrowLeft /> Tiếp tục mua
          </Link>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm p-8 text-center">
          <div className="text-gray-300 text-6xl mb-4 flex justify-center">
            <FiShoppingBag />
          </div>
          <h3 className="text-xl font-semibold text-gray-700 mb-2">Giỏ hàng của bạn đang trống</h3>
          <p className="text-gray-500 mb-6">Hãy thêm sản phẩm vào giỏ hàng để bắt đầu mua sắm</p>
          <Link
            href="/product"
            className="inline-block bg-orange-500 hover:bg-orange-600 text-white py-3 px-8 rounded-lg font-medium shadow-md transition"
          >
            Khám phá sản phẩm
          </Link>
        </div>
      </div>
    );
  }

  // Hiển thị giỏ hàng có sản phẩm
  return (
    <div className="max-w-4xl mx-auto p-4 md:p-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 flex items-center gap-2">
          <FiShoppingBag className="text-orange-500" />
          Giỏ hàng ({cartItems.length})
        </h1>
        <Link
          href="/product"
          className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg shadow font-medium flex items-center gap-2"
        >
          <FiArrowLeft /> Tiếp tục mua
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="hidden md:grid grid-cols-12 bg-gray-50 px-6 py-3 text-sm font-medium text-gray-500 border-b">
          <div className="col-span-6">Sản phẩm</div>
          <div className="col-span-2 text-center">Đơn giá</div>
          <div className="col-span-2 text-center">Số lượng</div>
          <div className="col-span-2 text-right">Thành tiền</div>
        </div>
        
        <div className="divide-y">
          {cartItems.map((item) => (
            <div key={item.id} className="grid grid-cols-1 md:grid-cols-12 gap-4 p-4 md:p-6">
              <div className="md:col-span-6 flex items-center gap-4">
                <div className="relative">
                  <img
                    src={item.product.imageUrl || '/placeholder.png'}
                    alt={item.product.name}
                    className="w-20 h-20 md:w-24 md:h-24 object-cover rounded-lg border"
                    onError={(e) => (e.currentTarget.src = '/placeholder.png')}
                  />
                  <button
                    onClick={() => handleDeleteItem(item.productId)}
                    className="absolute -top-2 -right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600 transition"
                    aria-label="Xóa sản phẩm"
                  >
                    <FiTrash2 size={16} />
                  </button>
                </div>
                <div>
                  <h2 className="font-semibold text-gray-800 line-clamp-2">{item.product.name}</h2>
                  <p className="text-gray-500 text-sm mt-1 line-clamp-2">
                    {item.product.description || 'Không có mô tả'}
                  </p>
                </div>
              </div>
              
              <div className="md:col-span-2 flex md:justify-center items-center">
                <span className="text-gray-700 font-medium">
                  {item.product.price.toLocaleString()}₫
                </span>
              </div>
              
              <div className="md:col-span-2 flex justify-center items-center">
                <div className="flex items-center border rounded-lg">
                  <button
                    onClick={() => handleUpdateQuantity(item.productId, item.quantity - 1)}
                    className="p-2 text-gray-600 hover:bg-gray-100 disabled:opacity-30"
                    disabled={item.quantity <= 1}
                  >
                    <FiMinus size={16} />
                  </button>
                  <span className="px-3 py-1 text-center w-12">{item.quantity}</span>
                  <button
                    onClick={() => handleUpdateQuantity(item.productId, item.quantity + 1)}
                    className="p-2 text-gray-600 hover:bg-gray-100"
                  >
                    <FiPlus size={16} />
                  </button>
                </div>
              </div>
              
              <div className="md:col-span-2 flex md:justify-end items-center">
                <span className="text-orange-600 font-bold text-lg">
                  {(item.product.price * item.quantity).toLocaleString()}₫
                </span>
              </div>
            </div>
          ))}
        </div>
        
        <div className="border-t p-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="text-gray-600">
              <p className="text-sm">Miễn phí vận chuyển cho đơn hàng trên 500.000₫</p>
            </div>
            
            <div className="flex flex-col items-end">
              <div className="flex items-center gap-4 mb-2">
                <span className="text-gray-700">Tổng tiền:</span>
                <span className="text-2xl font-bold text-orange-600">
                  {total.toLocaleString()}₫
                </span>
              </div>
              <p className="text-sm text-gray-500 mb-4">(Đã bao gồm VAT nếu có)</p>
              
              <Link
                href="/checkout"
                className="w-full md:w-auto bg-orange-500 hover:bg-orange-600 text-white py-3 px-8 rounded-lg font-semibold shadow-md transition text-center"
                aria-label="Tiến hành thanh toán"
              >
                Thanh toán ngay
              </Link>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-8 bg-blue-50 rounded-xl p-6 border border-blue-100">
        <h3 className="font-semibold text-blue-800 mb-3 flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
          </svg>
          Chính sách mua hàng
        </h3>
        <ul className="text-sm text-gray-600 space-y-1">
          <li>• Miễn phí vận chuyển cho đơn hàng từ 500.000₫</li>
          <li>• Đổi trả trong vòng 30 ngày</li>
          <li>• Hỗ trợ 24/7: 1900 1234</li>
        </ul>
      </div>
    </div>
  );
}
