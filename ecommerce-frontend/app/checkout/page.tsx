'use client';

<<<<<<< Updated upstream
import { useEffect, useState } from 'react';
import { fetchCart } from '../services/api';
=======
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import { fetchCart, submitOrder } from '../services/api';
>>>>>>> Stashed changes

type FormData = {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  note: string;
};

export default function CheckoutPage() {
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [loadingCart, setLoadingCart] = useState(true);
  const [errorCart, setErrorCart] = useState<string | null>(null);
  const [total, setTotal] = useState(0);

  const [form, setForm] = useState<FormData>({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    note: '',
<<<<<<< Updated upstream
=======
    paymentMethod: 'cod',
>>>>>>> Stashed changes
  });

  const [formErrors, setFormErrors] = useState<Partial<FormData>>({});
  const [submitting, setSubmitting] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);

  // Load giỏ hàng và tính tổng
  useEffect(() => {
<<<<<<< Updated upstream
    const loadCart = async () => {
=======
    (async () => {
>>>>>>> Stashed changes
      try {
        setLoadingCart(true);
        const res = await fetchCart();
        setCartItems(res.data);
        const sum = res.data.reduce(
          (s: number, item: any) =>
            s + (item.product?.price ?? 0) * (item.quantity ?? 0),
          0
        );
        setTotal(sum);
        setErrorCart(null);
      } catch {
        setErrorCart('Lỗi khi tải giỏ hàng. Vui lòng thử lại sau.');
      } finally {
        setLoadingCart(false);
      }
    })();
  }, []);

  // Validate form
  const validate = () => {
    const errs: Partial<FormData> = {};
    if (!form.fullName.trim()) errs.fullName = 'Vui lòng nhập họ tên';
    if (!form.email.trim()) errs.email = 'Vui lòng nhập email';
    else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(form.email))
      errs.email = 'Email không hợp lệ';
    if (!form.phone.trim()) errs.phone = 'Vui lòng nhập số điện thoại';
    else if (!/^\d{9,15}$/.test(form.phone.replace(/\s+/g, '')))
      errs.phone = 'Số điện thoại không hợp lệ';
    if (!form.address.trim()) errs.address = 'Vui lòng nhập địa chỉ';
    setFormErrors(errs);
    return Object.keys(errs).length === 0;
  };

<<<<<<< Updated upstream
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
=======
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
>>>>>>> Stashed changes
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Gửi đơn hàng
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    if (cartItems.length === 0) {
      alert('Giỏ hàng đang trống, không thể thanh toán.');
      return;
    }
    setSubmitting(true);

    // Giả lập thời gian xử lý đơn hàng
    setTimeout(() => {
      setSubmitting(false);
      setOrderSuccess(true);
<<<<<<< Updated upstream
    }, 2000);
  };

  if (loadingCart)
    return <div className="text-center py-10">Đang tải giỏ hàng...</div>;

  if (errorCart)
    return <div className="text-center py-10 text-red-500">{errorCart}</div>;

  if (orderSuccess)
    return (
      <div className="max-w-3xl mx-auto p-8 text-center">
        <h1 className="text-4xl font-extrabold text-green-600 mb-6">🎉 Đặt hàng thành công!</h1>
        <p className="text-lg mb-6">
          Cảm ơn bạn đã đặt hàng. Nhân viên của chúng tôi sẽ liên hệ với bạn sớm.
        </p>
        <a
          href="/products"
          className="inline-block bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded transition"
        >
          Tiếp tục mua sắm
        </a>
      </div>
=======
    } catch {
      alert('Lỗi khi gửi đơn hàng.');
    } finally {
      setSubmitting(false);
    }
  };

  // Placeholder map
  const placeholderMap: Record<keyof FormData, string> = {
    fullName: 'Họ và tên',
    email: 'Email',
    phone: 'Số điện thoại',
    address: 'Địa chỉ giao hàng',
    note: 'Ghi chú (tuỳ chọn)',
    paymentMethod: '',
  };

  // === RENDER === //
  if (orderSuccess) {
    return (
      <>
        <Header />
        <div className="max-w-3xl mx-auto p-8 text-center">
          <h1 className="text-4xl font-extrabold text-green-600 mb-6">
            🎉 Đặt hàng thành công!
          </h1>
          <p className="text-lg mb-6">Cảm ơn bạn đã đặt hàng. Chúng tôi sẽ liên hệ sớm.</p>
          <Link
            href="/product"
            className="inline-block bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded transition"
          >
            Tiếp tục mua sắm
          </Link>
        </div>
      </>
>>>>>>> Stashed changes
    );
  }

  if (loadingCart || errorCart) {
    return (
      <>
        <Header />
        <div className="text-center py-12">
          {loadingCart ? (
            <p className="text-gray-600">Đang tải giỏ hàng...</p>
          ) : (
            <p className="text-red-500">{errorCart}</p>
          )}
        </div>
      </>
    );
  }

  return (
<<<<<<< Updated upstream
    <div className="max-w-7xl mx-auto p-8 bg-orange-50 min-h-screen">
      <h1 className="text-4xl font-extrabold text-orange-600 mb-10 select-none">Thanh toán đơn hàng</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left: Form thông tin */}
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-lg shadow-lg p-6 space-y-6 md:col-span-2 border border-orange-300"
          noValidate
          aria-label="Form thông tin thanh toán"
        >
          <h2 className="text-2xl font-semibold text-orange-700 mb-4">Thông tin giao hàng</h2>

          <div>
            <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
              Họ và tên <span className="text-red-500">*</span>
            </label>
            <input
              id="fullName"
              name="fullName"
              type="text"
              value={form.fullName}
              onChange={handleChange}
              className={`mt-1 block w-full rounded-md border ${
                formErrors.fullName ? 'border-red-500' : 'border-gray-300'
              } shadow-sm focus:border-orange-500 focus:ring focus:ring-orange-300 focus:ring-opacity-50`}
              aria-invalid={!!formErrors.fullName}
              aria-describedby="fullNameError"
              required
            />
            {formErrors.fullName && (
              <p id="fullNameError" className="mt-1 text-sm text-red-600">
                {formErrors.fullName}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              className={`mt-1 block w-full rounded-md border ${
                formErrors.email ? 'border-red-500' : 'border-gray-300'
              } shadow-sm focus:border-orange-500 focus:ring focus:ring-orange-300 focus:ring-opacity-50`}
              aria-invalid={!!formErrors.email}
              aria-describedby="emailError"
              required
            />
            {formErrors.email && (
              <p id="emailError" className="mt-1 text-sm text-red-600">
                {formErrors.email}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
              Số điện thoại <span className="text-red-500">*</span>
            </label>
            <input
              id="phone"
              name="phone"
              type="tel"
              value={form.phone}
              onChange={handleChange}
              className={`mt-1 block w-full rounded-md border ${
                formErrors.phone ? 'border-red-500' : 'border-gray-300'
              } shadow-sm focus:border-orange-500 focus:ring focus:ring-orange-300 focus:ring-opacity-50`}
              aria-invalid={!!formErrors.phone}
              aria-describedby="phoneError"
              required
            />
            {formErrors.phone && (
              <p id="phoneError" className="mt-1 text-sm text-red-600">
                {formErrors.phone}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="address" className="block text-sm font-medium text-gray-700">
              Địa chỉ giao hàng <span className="text-red-500">*</span>
            </label>
            <input
              id="address"
              name="address"
              type="text"
              value={form.address}
              onChange={handleChange}
              className={`mt-1 block w-full rounded-md border ${
                formErrors.address ? 'border-red-500' : 'border-gray-300'
              } shadow-sm focus:border-orange-500 focus:ring focus:ring-orange-300 focus:ring-opacity-50`}
              aria-invalid={!!formErrors.address}
              aria-describedby="addressError"
              required
            />
            {formErrors.address && (
              <p id="addressError" className="mt-1 text-sm text-red-600">
                {formErrors.address}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="note" className="block text-sm font-medium text-gray-700">
              Ghi chú (tuỳ chọn)
            </label>
            <textarea
              id="note"
              name="note"
              rows={3}
              value={form.note}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-orange-500 focus:ring focus:ring-orange-300 focus:ring-opacity-50"
            />
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-orange-600 hover:bg-orange-700 text-white py-3 rounded-lg font-semibold transition disabled:opacity-50"
            aria-busy={submitting}
=======
    <>
      <Header />

      <div className="max-w-7xl mx-auto p-8 bg-orange-50 min-h-screen">
        <h1 className="text-4xl font-extrabold text-orange-600 mb-10 select-none">
          Thanh toán đơn hàng
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Form thông tin */}
          <form
            onSubmit={handleSubmit}
            className="md:col-span-2 bg-white rounded-lg shadow-lg p-6 space-y-6 border border-orange-300"
>>>>>>> Stashed changes
          >
            <h2 className="text-2xl font-semibold text-orange-700">
              Thông tin giao hàng
            </h2>

<<<<<<< Updated upstream
        {/* Right: Tổng đơn hàng */}
        <aside className="bg-white rounded-lg shadow-lg p-6 border border-orange-300">
          <h2 className="text-2xl font-semibold text-orange-700 mb-6">Đơn hàng của bạn</h2>
          {cartItems.length === 0 ? (
            <p className="text-gray-500">Giỏ hàng trống</p>
          ) : (
            <ul className="divide-y divide-gray-200 max-h-[400px] overflow-y-auto">
              {cartItems.map((item) => (
                <li key={item.productId} className="flex justify-between py-3">
                  <div>
                    <p className="font-semibold text-orange-900">{item.product.name}</p>
                    <p className="text-sm text-gray-500">x{item.quantity}</p>
                  </div>
                  <div className="font-bold text-orange-800">
                    {(item.product.price * item.quantity).toLocaleString()} đ
=======
            {(['fullName', 'email', 'phone', 'address'] as Array<
              keyof FormData
            >).map((field) => (
              <div key={field}>
                <input
                  name={field}
                  value={form[field]}
                  onChange={handleChange}
                  placeholder={placeholderMap[field]}
                  className="w-full border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-300"
                />
                {formErrors[field] && (
                  <p className="text-red-500 text-sm mt-1">{formErrors[field]}</p>
                )}
              </div>
            ))}

            {/* Ghi chú */}
            <textarea
              name="note"
              value={form.note}
              onChange={handleChange}
              placeholder={placeholderMap.note}
              className="w-full border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-300"
            />

            {/* Phương thức thanh toán */}
            <div>
              <label className="block font-medium mb-1">
                Phương thức thanh toán
              </label>
              <select
                name="paymentMethod"
                value={form.paymentMethod}
                onChange={handleChange}
                className="w-full border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-300"
              >
                <option value="cod">
                  COD (Thanh toán khi nhận hàng)
                </option>
                <option value="bank">Chuyển khoản ngân hàng</option>
                <option value="momo">Ví điện tử MoMo</option>
                <option value="zalopay">Ví điện tử ZaloPay</option>
              </select>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full bg-orange-600 hover:bg-orange-700 text-white font-semibold py-3 rounded transition"
            >
              {submitting ? 'Đang xử lý...' : 'Xác nhận đặt hàng'}
            </button>
          </form>

          {/* Tóm tắt đơn hàng */}
          <aside className="bg-white rounded-lg shadow-lg p-6 border border-orange-300">
            <h2 className="text-2xl font-semibold text-orange-700 mb-4">
              Đơn hàng của bạn
            </h2>
            <ul className="divide-y divide-gray-200 max-h-80 overflow-y-auto mb-6">
              {cartItems.map((item) => (
                <li
                  key={item.productId}
                  className="flex justify-between py-3"
                >
                  <div>
                    <p className="font-semibold text-gray-800">
                      {item.product.name}
                    </p>
                    <p className="text-sm text-gray-500">
                      x{item.quantity}
                    </p>
                  </div>
                  <div className="font-bold text-gray-900">
                    {(item.product.price * item.quantity).toLocaleString()}₫
>>>>>>> Stashed changes
                  </div>
                </li>
              ))}
            </ul>
<<<<<<< Updated upstream
          )}
          <div className="border-t border-gray-300 mt-6 pt-4 text-right font-extrabold text-xl text-orange-800">
            Tổng tiền: {total.toLocaleString()} đ
          </div>
        </aside>
=======
            <div className="border-t border-gray-300 pt-4 text-right font-extrabold text-xl text-gray-900">
              Tổng: {total.toLocaleString()}₫
            </div>
          </aside>
        </div>
>>>>>>> Stashed changes
      </div>
    </>
  );
}

