'use client';

import { useEffect, useState } from 'react';
<<<<<<< Updated upstream
import { fetchCart, updateCartItem, deleteCartItem} from '../services/api';
=======
import Link from 'next/link';
import { FiShoppingBag, FiArrowLeft } from 'react-icons/fi';
import { fetchCart, updateCartItem, deleteCartItem } from '../services/api';
import CartItem from '@/components/card/CartItem';
import Header from '@/components/layout/Header';
>>>>>>> Stashed changes

export default function CartPage() {
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [total, setTotal] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Trạng thái đăng nhập

  useEffect(() => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    if (token) {
      setIsLoggedIn(true);
      loadCart(); // Gọi hàm tải giỏ hàng nếu đã đăng nhập
    } else {
      setLoading(false); // Nếu chưa đăng nhập, không cần tải giỏ hàng
    }
  }, []);

  // Load giỏ hàng
  const loadCart = async () => {
    try {
      setLoading(true);
      const res = await fetchCart();
<<<<<<< Updated upstream
      setCartItems(res.data);

      const totalPrice = res.data.reduce(
        (sum: number, item: any) => sum + item.product.price * item.quantity,
        0
      );
      setTotal(totalPrice);
    } catch {
      setError('Lỗi khi tải giỏ hàng. Vui lòng thử lại sau.');
=======
      if (Array.isArray(res.data)) {
        setCartItems(res.data);
        setError(null);
      } else {
        throw new Error();
      }
    } catch {
      setCartItems([]);
      setError("Lỗi khi tải giỏ hàng. Vui lòng thử lại sau.");
>>>>>>> Stashed changes
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateQuantity = async (itemId: number, productId: number, quantity: number) => {
    if (quantity < 1) {
      alert('Số lượng phải lớn hơn hoặc bằng 1');
      return;
    }

<<<<<<< Updated upstream
=======
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
>>>>>>> Stashed changes
    try {
      await updateCartItem(productId, quantity);
      const updatedItems = cartItems.map((item) =>
        item.productId === productId ? { ...item, quantity } : item
      );
      setCartItems(updatedItems);

      const newTotal = updatedItems.reduce(
        (sum: number, item: any) => sum + item.product.price * item.quantity,
        0
      );
      setTotal(newTotal);
    } catch {
      alert('Lỗi khi cập nhật số lượng sản phẩm.');
    }
  };

  // Xóa sản phẩm
  const handleDeleteItem = async (productId: number) => {
    if (!confirm('Bạn có chắc chắn muốn xoá sản phẩm này khỏi giỏ hàng không?')) return;

    try {
      await deleteCartItem(productId);
      const updatedItems = cartItems.filter((item) => item.productId !== productId);
      setCartItems(updatedItems);

      const newTotal = updatedItems.reduce(
        (sum: number, item: any) => sum + item.product.price * item.quantity,
        0
      );
      setTotal(newTotal);
    } catch {
      alert('Lỗi khi xoá sản phẩm khỏi giỏ hàng.');
    }
  };

<<<<<<< Updated upstream
  if (loading)
    return (
      <div className="flex h-screen justify-center items-center">
        <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-300 h-16 w-16"></div>
        <style>{`
          .loader {
            border-top-color: #fb923c; /* orange-400 */
            animation: spin 1s linear infinite;
          }
          @keyframes spin {
            0%{transform:rotate(0deg);}
            100%{transform:rotate(360deg);}
          }
        `}</style>
      </div>
    );

  if (error)
    return (
      <div className="p-10 text-center text-red-600 font-semibold">
        {error}
      </div>
    );

  if (!isLoggedIn) // Nếu chưa đăng nhập
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-orange-50">
        <img
          src="https://cdn-icons-png.flaticon.com/512/747/747376.png"
          alt="Đăng nhập"
          className="w-32 h-32 mb-6"
        />
        <h2 className="text-2xl font-bold text-orange-600 mb-2">Bạn chưa đăng nhập</h2>
        <p className="text-gray-700 mb-6">Vui lòng đăng nhập để sử dụng tính năng giỏ hàng.</p>
        <a
          href="/login"
          className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-lg font-semibold shadow transition"
        >
          Đăng nhập ngay
        </a>
      </div>
    );
=======
  // === RENDER === //
>>>>>>> Stashed changes

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
<<<<<<< Updated upstream
    <div className="max-w-7xl mx-auto p-6 bg-orange-50 min-h-screen">
      <h1 className="text-4xl font-extrabold text-orange-600 mb-8 select-none">Giỏ hàng của bạn</h1>

      {cartItems.length === 0 ? (
        <div className="flex flex-col items-center justify-center text-center pt-20 space-y-6 text-gray-600">
          <img
            src="https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/63707f7e-fcc0-456f-a829-6a626b2eb7ec.png"
            alt="Giỏ hàng trống với biểu tượng vui vẻ màu cam và trắng, phong cách hiện đại"
            className="w-48 h-48 object-contain"
          />
          <p className="text-lg font-semibold">Giỏ hàng của bạn đang trống.</p>
          <a
            href="/products"
            className="inline-block bg-orange-500 hover:bg-orange-600 text-white rounded-lg px-6 py-3 font-semibold transition"
          >
            Tiếp tục mua sắm
          </a>
=======
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
>>>>>>> Stashed changes
        </div>
      ) : (
        <>
          <div className="bg-white rounded-lg shadow-lg overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-orange-100 sticky top-0 z-10">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-sm font-semibold text-orange-700">
                    Sản phẩm
                  </th>
                  <th scope="col" className="px-6 py-3 w-36 text-center text-sm font-semibold text-orange-700">
                    Số lượng
                  </th>
                  <th scope="col" className="px-6 py-3 w-32 text-right text-sm font-semibold text-orange-700">
                    Giá
                  </th>
                  <th scope="col" className="px-6 py-3 w-32 text-right text-sm font-semibold text-orange-700">
                    Thành tiền
                  </th>
                  <th scope="col" className="px-6 py-3 w-24 text-center text-sm font-semibold text-orange-700">
                    Xoá
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {cartItems.map((item) => (
                  <tr key={item.productId} className="hover:bg-orange-50 transition-colors duration-150">
                    <td className="flex items-center gap-4 px-6 py-4 min-w-[300px]">
                      <img
                        src={item.product?.imageUrl || 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/863f32a3-062a-4763-8cf9-68d87dace8c3.png'}
                        alt={item.product?.name}
                        className="w-20 h-20 rounded-md object-cover border border-orange-300"
                        onError={(e) => { (e.currentTarget as HTMLImageElement).src = 'https://placehold.co/80x80?text=No+Image'; }}
                      />
                      <div className="flex flex-col">
                        <span className="font-semibold text-orange-900">{item.product?.name}</span>
                        {item.product?.description && (
                          <span className="text-xs text-gray-500 line-clamp-2 max-w-xs">{item.product.description}</span>
                        )}
                      </div>
                    </td>

<<<<<<< Updated upstream
                    <td className="px-6 py-4 text-center">
                      <input
                        type="number"
                        min={1}
                        className="w-20 border border-orange-300 rounded-md text-center text-orange-900 font-semibold focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-1 transition"
                        value={item.quantity}
                        onChange={(e) =>
                          handleUpdateQuantity(item.id, item.productId, parseInt(e.target.value) || 1)
                        }
                      />
                    </td>

                    <td className="px-6 py-4 text-right font-semibold text-orange-700">
                      {item.product.price.toLocaleString()} đ
                    </td>

                    <td className="px-6 py-4 text-right font-bold text-orange-900">
                      {(item.product.price * item.quantity).toLocaleString()} đ
                    </td>

                    <td className="px-6 py-4 text-center">
                      <button
                        onClick={() => handleDeleteItem(item.productId)}
                        className="w-10 h-10 rounded-md flex items-center justify-center bg-orange-300 hover:bg-orange-400 text-orange-900 transition"
                        aria-label={`Xoá ${item.product.name} khỏi giỏ hàng`}
                        title="Xoá"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} className="w-6 h-6">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-8 flex flex-col md:flex-row justify-between items-center bg-orange-100 rounded-lg p-6 shadow-md">
            <div className="text-xl font-semibold text-orange-800 select-none mb-4 md:mb-0">
              Tổng tiền: <span className="text-3xl">{total.toLocaleString()} đ</span>
            </div>
            <div className="flex gap-4">
              <a
                href="/checkout"
                className="px-6 py-3 bg-orange-600 hover:bg-orange-700 text-white rounded-lg font-semibold shadow transition text-center"
                aria-label="Tiến hành thanh toán"
              >
                Thanh toán ngay
              </a>
            </div>
          </div>
        </>
      )}
    </div>
=======
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
>>>>>>> Stashed changes
  );
}
