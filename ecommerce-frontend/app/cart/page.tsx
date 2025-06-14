'use client';
import { useEffect, useState } from "react";   
import Link from "next/link";
import { fetchCart, updateCartItem, deleteCartItem } from "../services/api";

export default function CartPage() {
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [total, setTotal] = useState(0);

  useEffect(() => {
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
    loadCart();
  }, []);

  const handleUpdateQuantity = async (itemId: number, productId: number, quantity: number) => {
    try {
      if (quantity < 1) {
        alert("Số lượng phải lớn hơn 0");
        return;
      }
      await updateCartItem(productId, quantity);
      setCartItems((prevItems) =>
        prevItems.map((item) =>
          item.productId === productId ? { ...item, quantity } : item
        )
      );
      const newTotal = cartItems.reduce((sum: number, item: any) => {
        return sum + item.product.price * item.quantity;
      }, 0);
      setTotal(newTotal);
    } catch (err) {
      alert("Lỗi khi cập nhật số lượng sản phẩm. Vui lòng thử lại sau.");
    }
  };

  const handleDeleteItem = async (productId: number) => {
    const confirmDelete = window.confirm("Bạn có chắc muốn xoá sản phẩm này khỏi giỏ hàng không? 🗑️");
    if (!confirmDelete) return;

    try {
      await deleteCartItem(productId);
      const updatedItems = cartItems.filter(item => item.productId !== productId);
      setCartItems(updatedItems);
      const newTotal = updatedItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
      setTotal(newTotal);
    } catch (err) {
      alert("Lỗi khi xoá sản phẩm khỏi giỏ hàng. Vui lòng thử lại sau.");
    }
  };

  if (loading) {
    return <div className="text-center py-10">Đang tải giỏ hàng...</div>;
  }
  if (error) {
    return <div className="text-center py-10 text-red-500">Lỗi khi tải giỏ hàng: {error}</div>;
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-10 text-gray-800">
      <div className="mb-6">
        <Link
          href="/"
          className="inline-block bg-gray-100 text-gray-800 px-4 py-2 rounded hover:bg-gray-200 transition"
        >
          ← Trở về trang chủ
        </Link>
      </div>

      <h1 className="text-2xl font-bold mb-6">🛒 Giỏ hàng của bạn</h1>

      {cartItems.length === 0 ? (
        <p className="text-center text-gray-500">Giỏ hàng của bạn hiện đang trống.</p>
      ) : (
        <table className="w-full bg-white shadow-md rounded-lg">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2 text-left">Sản phẩm</th>
              <th className="px-4 py-2 text-left">Số lượng</th>
              <th className="px-4 py-2 text-right">Giá</th>
              <th className="px-4 py-2 text-center">Xoá</th>
            </tr>
          </thead>
          <tbody>
            {cartItems.map((item) => (
              <tr key={item.id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-2">{item.product.name}</td>
                <td className="px-4 py-2">
                  <input
                    type="number"
                    value={item.quantity}
                    min="1"
                    className="w-16 border rounded px-2 py-1 text-center"
                    onChange={(e) =>
                      handleUpdateQuantity(item.id, item.productId, parseInt(e.target.value))
                    }
                  />
                </td>
                <td className="px-4 py-2 text-right">
                  {(item.product.price * item.quantity).toLocaleString()} đ
                </td>
                <td className="px-4 py-2 text-center">
                  <button
                    className="text-red-500 hover:text-red-700"
                    onClick={() => handleDeleteItem(item.productId)}
                  >
                    Xoá
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <div className="mt-6 text-right">
        <span className="font-bold">Tổng tiền: </span>
        <span className="text-xl text-blue-600">{total.toLocaleString()} đ</span>
      </div>
      <div className="mt-4 flex justify-end">
        <button
            className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-3 rounded-lg shadow transition-all"
            onClick={() => alert("🚀 Chức năng thanh toán đang phát triển!")}
        >
            🧾 Thanh toán
        </button>
    </div>
    </div>
    
  );
}
