import api from "./axios";

export const createOrder = (pizzaSelection) => api.post("/orders", pizzaSelection);
export const createRazorpayOrder = (orderId) => api.post(`/orders/${orderId}/razorpay`);
export const verifyPayment = (orderId, paymentData) => api.post(`/orders/${orderId}/verify`, paymentData);
export const getOrderById = (orderId) => api.get(`/orders/${orderId}`);
export const getMyOrders = () => api.get("/orders/my");
export const getAllOrdersAdmin = () => api.get("/orders/admin/all");
export const updateOrderStatusAdmin = (orderId, status) =>
  api.put(`/orders/admin/${orderId}/status`, { status });