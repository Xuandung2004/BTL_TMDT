'use client';

import React from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export default function AboutPage() {
    return (
        <>
            <Header />
            <main className="bg-gradient-to-b from-yellow-50 to-white min-h-[80vh] py-10">
                <div className="max-w-3xl mx-auto px-4">
                    <h1 className="text-4xl font-extrabold text-center text-yellow-600 mb-4">Về LazyShop</h1>
                    <p className="text-lg text-gray-700 text-center mb-8">
                        <span className="font-semibold text-yellow-700">LazyShop</span> là điểm đến lý tưởng cho những ai yêu thích thời trang hiện đại, trẻ trung và năng động. Chúng tôi mang đến cho bạn trải nghiệm mua sắm quần áo trực tuyến dễ dàng, nhanh chóng và an toàn.
                    </p>
                    <div className="grid md:grid-cols-2 gap-8 mb-10">
                        <div className="flex flex-col items-center">
                            <img
                                src="/about-fashion.svg"
                                alt="Thời trang LazyShop"
                                className="w-40 h-40 object-contain mb-4"
                            />
                            <h2 className="text-xl font-bold text-yellow-700 mb-2">Sản phẩm đa dạng</h2>
                            <p className="text-gray-600 text-center">
                                Từ áo thun, sơ mi, quần jeans đến váy đầm, phụ kiện... LazyShop luôn cập nhật những xu hướng mới nhất, phù hợp với mọi phong cách và lứa tuổi.
                            </p>
                        </div>
                        <div className="flex flex-col items-center">
                            <img
                                src="/about-service.svg"
                                alt="Dịch vụ LazyShop"
                                className="w-40 h-40 object-contain mb-4"
                            />
                            <h2 className="text-xl font-bold text-yellow-700 mb-2">Dịch vụ tận tâm</h2>
                            <p className="text-gray-600 text-center">
                                Đội ngũ hỗ trợ khách hàng thân thiện, giao hàng nhanh chóng, đổi trả dễ dàng và nhiều ưu đãi hấp dẫn dành cho bạn mỗi ngày.
                            </p>
                        </div>
                    </div>
                    <div className="bg-yellow-100 rounded-xl p-6 shadow text-center">
                        <h3 className="text-lg font-semibold text-yellow-800 mb-2">Sứ mệnh của chúng tôi</h3>
                        <p className="text-gray-700">
                            LazyShop mong muốn trở thành người bạn đồng hành đáng tin cậy của bạn trên hành trình làm đẹp và thể hiện cá tính qua thời trang.
                        </p>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
}