import axios from 'axios';

const API = axios.create({
  baseURL: "http://localhost:5091/api"
})

//API lấy danh sách nhóm sản phẩm
export const fetchCategories = () => API.get('/categories');

//API tạo mới nhóm sản phẩm
export const createCategory = (
  data: { name: String, description: String }) => API.post(
    '/categories', data);

//API sửa nhóm sản phẩm
export const updateCategory = (id: number,
  data: { name: String, description: String }) => API.put(
    `/categories/${id}`, data);

//API xóa nhóm sản phẩm
export const deleteCategory = (id: number) => API.delete(
  `/categories/${id}`);




// PRODUCT API
export const fetchProducts = () => API.get("/products", {
  headers: {
    'Content-Type': 'application/json',  // Đảm bảo gửi header hợp lệ
  },
});
export const createProduct = (data: any) =>
  API.post("/products", data);
export const updateProduct = (id: number, data: any) =>
  API.put(`/products/${id}`, data);
export const deleteProduct = (id: number) =>
  API.delete(`/products/${id}`);
// Lấy sản phẩm theo nhóm sản phẩm (CategoryId)
export const fetchProductsByCategory = (categoryId: number) => {
  return API.get(`/products/by-category/${categoryId}`);
};

// Upload image
export const uploadImage = (file: File) => {
  const formData = new FormData();
  formData.append('file', file);
  return API.post('/files/upload', formData, {
    headers: { "Content-Type": "multipart/form-data" }
  });
};

//Xử lý đăng nhập
export const login = (username: string, password: string) => {
  return API.post("/auth/login", { username, password });
}

//Xử lý giỏ hàng
//Thêm sản phẩm vào giỏ
export const addToCart = (data: { productId: number, quantity: number }) => {
  return API.post("/cart/add", data, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  });
}

//Lấy danh sách sản phẩm trong giỏ
export const fetchCart = () => {
  return API.get("/cart/get", {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  });
}

//Cập nhật số lượng sản phẩm trong giỏ
export const updateCartItem = (productId: number, quantity: number) => {
  return API.put('/cart/update-quantity', { productId: productId, quantity }, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  });
}

//Xoá sản phẩm khỏi giỏ hàng
export const deleteCartItem = (productId: number) => {
  return API.delete(`/cart/delete/${productId}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  });
};

// Lấy thông tin user hiện tại
export const fetchCurrentUser = () => {
  return API.get('/users/me', {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  });
};
// Xóa token để đăng xuất
export const logout = () => {
  localStorage.removeItem('token');
};

//quản lý users
// Lấy danh sách tất cả người dùng
export const fetchAllUsers = () => {
  return API.get('/users/getAll', {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  });
};
// Xoá người dùng theo ID (chỉ admin)
export const deleteUser = (id: number) => {
  return API.delete(`/users/${id}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  });
};
// Đăng ký tài khoản mới
export const registerUser = (data: {
  username: string;
  password: string;
  fullName: string;
  phone: string;
}) => API.post("/users", data);
// Đổi mật khẩu user
export const changeUserPassword = (
  id: number,
  data: { oldPassword: string; newPassword: string }
) => API.post(`/users/${id}/change-password`, data, {
  headers: {
    Authorization: `Bearer ${localStorage.getItem('token')}`
  }
});
// Lấy thông tin user theo id
export const fetchUserById = (id: number) => API.get(`/users/${id}`);
// Sửa thông tin user (admin)
export const updateUser = (
  id: number,
  data: { fullName?: string; phone?: string; isActive?: boolean }
) => API.put(`/users/${id}`, data);

// quản lý đơn hàng
// Lấy tất cả đơn hàng
export const fetchAllOrder = () => {
  return API.get('/Order/getAll', {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  });
};
// Xoá người dùng theo ID (chỉ admin)
export const deleteOrder = (id: number) => {
  return API.delete(`/users/${id}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  });
};

// Thêm hàm gửi đơn hàng
// Gửi đơn hàng
export const submitOrder = () => {
  return API.post(`/Order/`, null, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  });
};

// thống kê báo cáo
export const fetchAdminDashboard = () => {
  return API.get('/admin/dashboard', {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    }
  }).then(res => res.data);
};


export default API;