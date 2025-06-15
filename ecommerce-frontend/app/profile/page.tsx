'use client';

import React, { useEffect, useState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { changeUserPassword, fetchUserById, updateUser } from "../services/api";

export default function ProfilePage() {
    const [user, setUser] = useState<any>(null);
    const [edit, setEdit] = useState(false);
    const [form, setForm] = useState({ username: "", fullName: "", phone: "" });
    const [message, setMessage] = useState("");
    const [showChangePassword, setShowChangePassword] = useState(false);
    const [passwordForm, setPasswordForm] = useState({ oldPassword: "", newPassword: "" });
    const [passwordMsg, setPasswordMsg] = useState("");

    // Lấy userId từ token (giả sử lưu trong localStorage)
    const getUserIdFromToken = () => {
        try {
            const token = localStorage.getItem("token");
            if (!token) return null;
            const payload = JSON.parse(atob(token.split('.')[1]));
            return payload.id || payload.userId || payload.sub;
        } catch {
            return null;
        }
    };

    useEffect(() => {
        const userId = getUserIdFromToken();
        if (!userId) return;
        fetchUserById(userId)
            .then(res => {
                setUser(res.data);
                setForm({
                    username: res.data.username,
                    fullName: res.data.fullName,
                    phone: res.data.phone || "",
                });
            })
            .catch(() => setMessage("Không thể tải thông tin người dùng"));
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleUpdate = async (e: React.FormEvent) => {
        e.preventDefault();
        setMessage("");
        try {
            await updateUser(user.id, {
                fullName: form.fullName,
                phone: form.phone,
            });
            setUser({ ...user, ...form });
            setEdit(false);
            setMessage("Cập nhật thành công!");
        } catch {
            setMessage("Cập nhật thất bại!");
        }
    };

    // Đổi mật khẩu
    const handlePasswordChange = async (e: React.FormEvent) => {
        e.preventDefault();
        setPasswordMsg("");
        try {
            await changeUserPassword(user.id, passwordForm);
            setPasswordMsg("Đổi mật khẩu thành công!");
            setPasswordForm({ oldPassword: "", newPassword: "" });
        } catch {
            setPasswordMsg("Đổi mật khẩu thất bại!");
        }
    };

    if (!user) return (
        <div className="min-h-screen flex flex-col bg-blue-50">
            <Header />
            <div className="flex flex-1 items-center justify-center">Đang tải thông tin...</div>
            <Footer />
        </div>
    );

    return (
        <div className="min-h-screen flex flex-col bg-blue-50">
            <Header />
            <div className="flex flex-1 items-center justify-center py-8">
                <div className="max-w-md w-full p-6 bg-white shadow-md rounded-lg">
                    <h2 className="text-2xl font-bold text-center mb-6">Thông tin cá nhân</h2>
                    {message && <p className="text-center text-green-600">{message}</p>}
                    {!edit ? (
                        <div>
                            <div className="mb-4">
                                <label className="block text-sm font-semibold text-gray-700 mb-1">Username</label>
                                <input
                                    type="text"
                                    className="p-2 w-full border border-gray-400 rounded bg-white text-gray-800"
                                    value={user.username}
                                    disabled
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-semibold text-gray-700 mb-1">Họ tên</label>
                                <input
                                    type="text"
                                    className="p-2 w-full border border-gray-400 rounded bg-white text-gray-800"
                                    value={user.fullName}
                                    disabled
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-semibold text-gray-700 mb-1">Số điện thoại</label>
                                <input
                                    type="text"
                                    className="p-2 w-full border border-gray-400 rounded bg-white text-gray-800"
                                    value={user.phone}
                                    disabled
                                />
                            </div>
                            <button
                                className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 mb-2"
                                onClick={() => setEdit(true)}
                            >
                                Sửa thông tin
                            </button>
                            <button
                                className="w-full bg-gray-200 text-gray-700 py-2 rounded hover:bg-gray-300"
                                onClick={() => setShowChangePassword(!showChangePassword)}
                            >
                                Đổi mật khẩu
                            </button>
                        </div>
                    ) : (
                        <form onSubmit={handleUpdate}>
                            <div className="mb-4">
                                <label className="block text-sm font-medium">Username</label>
                                <input
                                    type="text"
                                    name="username"
                                    className="p-2 w-full border border-gray-400 rounded bg-white text-gray-800"
                                    value={form.username}
                                    disabled
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium">Họ tên</label>
                                <input
                                    type="text"
                                    name="fullName"
                                    className="p-2 w-full border border-gray-400 rounded bg-white text-gray-800"
                                    value={form.fullName}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium">Số điện thoại</label>
                                <input
                                    type="text"
                                    name="phone"
                                    className="p-2 w-full border border-gray-400 rounded bg-white text-gray-800"
                                    value={form.phone}
                                    onChange={handleChange}
                                />
                            </div>
                            <button
                                type="submit"
                                className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 mb-2"
                            >
                                Lưu thay đổi
                            </button>
                            <button
                                type="button"
                                className="w-full bg-gray-200 text-gray-700 py-2 rounded hover:bg-gray-300"
                                onClick={() => setEdit(false)}
                            >
                                Hủy
                            </button>
                        </form>
                    )}

                    {showChangePassword && (
                        <form onSubmit={handlePasswordChange} className="mt-6">
                            <h3 className="font-semibold mb-2 text-center">Đổi mật khẩu</h3>
                            <input
                                type="password"
                                name="oldPassword"
                                className="mb-2 p-2 w-full border rounded"
                                placeholder="Mật khẩu cũ"
                                value={passwordForm.oldPassword}
                                onChange={e => setPasswordForm({ ...passwordForm, oldPassword: e.target.value })}
                                required
                            />
                            <input
                                type="password"
                                name="newPassword"
                                className="mb-2 p-2 w-full border rounded"
                                placeholder="Mật khẩu mới"
                                value={passwordForm.newPassword}
                                onChange={e => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
                                required
                            />
                            {passwordMsg && <p className="text-center text-green-600">{passwordMsg}</p>}
                            <button
                                type="submit"
                                className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 mb-2"
                            >
                                Đổi mật khẩu
                            </button>
                            <button
                                type="button"
                                className="w-full bg-gray-200 text-gray-700 py-2 rounded hover:bg-gray-300"
                                onClick={() => setShowChangePassword(false)}
                            >
                                Đóng
                            </button>
                        </form>
                    )}
                </div>
            </div>
            <Footer />
        </div>
    );
}