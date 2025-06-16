'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { FiShoppingBag, FiArrowLeft } from 'react-icons/fi';
import { fetchCart, updateCartItem, deleteCartItem } from '../services/api';
import CartItem from '@/components/card/CartItem';
import Header from '@/components/layout/Header'; // <-- Import Header của bạn

export default function CartPage() {
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [total, setTotal] = useState(0);
  // Chatbot state
  const [chatLog, setChatLog] = useState<{ from: 'user'|'bot'; text: string }[]>([]);
  const [input, setInput] = useState('');

  const sendMessage = async () => {
    if (!input.trim()) return;
    setChatLog([...chatLog, { from: 'user', text: input }]);
    setInput('');
    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: input }),
    });
    const { reply } = await res.json();
    setChatLog((log) => [...log, { from: 'bot', text: reply }]);
  };


  // Load giỏ hàng
  const loadCart = async () => {
    try {
      setLoading(true);
      const res = await fetchCart();
      if (Array.isArray(res.data)) {
        setCartItems(res.data);
        setError(null);
      } else {
        throw new Error();
      }
    } catch {
      setCartItems([]);
      setError("Lỗi khi tải giỏ hàng. Vui lòng thử lại sau.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCart();
  }, []);

  // Tính tổng tiền
  useEffect(() => {
    const totalPrice = cartItems.reduce((sum, item) => {
      const price = item.product?.price ?? 0;
      const qty = item.quantity ?? 0;
      return sum + price * qty;
    }, 0);
    setTotal(totalPrice);
  }, [cartItems]);

  // Cập nhật số lượng
  const handleUpdateQuantity = async (productId: number, quantity: number) => {
    if (quantity < 1) return;
    try {
      await updateCartItem(productId, quantity);
      setCartItems(prev =>
        prev.map(item =>
          item.productId === productId ? { ...item, quantity } : item
        )
      );
    } catch {
      alert("Lỗi khi cập nhật số lượng");
    }
  };

  // Xóa sản phẩm
  const handleDeleteItem = async (productId: number) => {
    if (!confirm("Bạn có chắc muốn xoá sản phẩm này không?")) return;
    try {
      await deleteCartItem(productId);
      setCartItems(prev => prev.filter(item => item.productId !== productId));
    } catch {
      alert("Lỗi khi xoá sản phẩm");
    }
  };

  // === RENDER === //

  // 1. Loading
  if (loading) {
    return (
      <>
        <Header />
        <div className="p-8 text-center">Đang tải giỏ hàng...</div>
      </>
    );
  }

  // 2. Empty cart
  if (!loading && cartItems.length === 0) {
    return (
      <>
        <Header />
        <div className="flex flex-col items-center justify-center h-screen text-center px-4">
          <div className="p-8 bg-white rounded-2xl shadow-lg max-w-md w-full">
            <FiShoppingBag className="mx-auto text-6xl text-gray-300 mb-4" />
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">
              Oops, giỏ hàng của bạn đang trống!
            </h2>
            <p className="text-gray-500 mb-6">
              Chưa có sản phẩm nào được thêm vào giỏ. Khám phá ngay để tìm món ưng ý!
            </p>
            <Link
              href="/product"
              className="inline-flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 px-6 rounded-full transition-shadow shadow-md"
            >
              <FiArrowLeft size={20} /> Tiếp tục mua sắm
            </Link>
          </div>
        </div>
      </>
    );
  }

  // 3. Error
  if (error) {
    return (
      <>
        <Header />
        <div className="p-8 text-center text-red-500">{error}</div>
      </>
    );
  }

  // 4. Cart with items
  return (
    <>
      <Header />

      <div className="max-w-4xl mx-auto p-4 md:p-6">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold flex items-center gap-2 text-gray-800">
            <FiShoppingBag className="text-orange-500" /> Giỏ hàng ({cartItems.length})
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
            {cartItems.map(item => (
              <CartItem
                key={item.productId}
                item={item}
                onUpdateQuantity={handleUpdateQuantity}
                onDeleteItem={handleDeleteItem}
              />
            ))}
          </div>

          <div className="border-t p-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <p className="text-sm text-gray-600">
                Miễn phí vận chuyển cho đơn hàng trên 500.000₫
              </p>
              <div className="text-right">
                <p className="text-gray-700">Tổng tiền:</p>
                <p className="text-2xl font-bold text-orange-600">
                  {total.toLocaleString()}₫
                </p>
                <p className="text-sm text-gray-500">(Đã bao gồm VAT nếu có)</p>
                <Link
                  href="/checkout"
                  className="inline-block mt-4 bg-orange-500 hover:bg-orange-600 text-white py-3 px-8 rounded-lg font-semibold shadow-md transition"
                >
                  Thanh toán ngay
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      
    </>
  );
}
