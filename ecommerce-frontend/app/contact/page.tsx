'use client';

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { FiMail, FiPhone, FiMapPin } from "react-icons/fi";

export default function ContactPage() {
    return (
        <>
            <Header />
            <main className="bg-gradient-to-b from-yellow-50 to-white min-h-[80vh] py-10">
                <div className="max-w-2xl mx-auto px-4">
                    <h1 className="text-4xl font-extrabold text-center text-yellow-600 mb-4">Liên hệ với LazyShop</h1>
                    <p className="text-lg text-gray-700 text-center mb-8">
                        Bạn có thắc mắc, góp ý hoặc cần hỗ trợ? Đừng ngần ngại liên hệ với chúng tôi qua các kênh dưới đây!
                    </p>
                    <div className="grid md:grid-cols-3 gap-6 mb-10">
                        <div className="flex flex-col items-center bg-white rounded-xl shadow p-6">
                            <FiMail className="text-yellow-500 mb-2" size={32} />
                            <h2 className="font-bold text-yellow-700 mb-1">Email</h2>
                            <a href="mailto:support@lazyshop.vn" className="text-blue-600 hover:underline">
                                support@lazyshop.vn
                            </a>
                        </div>
                        <div className="flex flex-col items-center bg-white rounded-xl shadow p-6">
                            <FiPhone className="text-yellow-500 mb-2" size={32} />
                            <h2 className="font-bold text-yellow-700 mb-1">Hotline</h2>
                            <a href="tel:0123456789" className="text-blue-600 hover:underline">
                                0978234765
                            </a>
                        </div>
                        <div className="flex flex-col items-center bg-white rounded-xl shadow p-6">
                            <FiMapPin className="text-yellow-500 mb-2" size={32} />
                            <h2 className="font-bold text-yellow-700 mb-1">Địa chỉ</h2>
                            <p className="text-gray-600 text-center">
                                123 Đường Fake, Quận 1, TP. Hồ Chí Minh
                            </p>
                        </div>
                    </div>
                    <div className="bg-yellow-100 rounded-xl p-6 shadow text-center">
                        <h3 className="text-lg font-semibold text-yellow-800 mb-2">Hoặc gửi tin nhắn cho chúng tôi</h3>
                        <form className="space-y-4 max-w-md mx-auto">
                            <input
                                type="text"
                                placeholder="Tên của bạn"
                                className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-yellow-400"
                                disabled
                            />
                            <input
                                type="email"
                                placeholder="Email của bạn"
                                className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-yellow-400"
                                disabled
                            />
                            <textarea
                                placeholder="Nội dung tin nhắn"
                                className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-yellow-400"
                                rows={4}
                                disabled
                            />
                            <button
                                type="submit"
                                className="w-full bg-yellow-500 text-white font-bold py-2 rounded hover:bg-yellow-600 transition-colors"
                                disabled
                            >
                                Gửi (Demo)
                            </button>
                        </form>
                        <p className="text-xs text-gray-500 mt-2">*Form này chỉ là demo, vui lòng liên hệ qua email hoặc hotline!</p>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
}