import api from "./axios";

export const getInventoryByCategory = (category) => api.get(`/inventory?category=${category}`);
export const getAllInventoryAdmin = () => api.get("/inventory/admin/all");
export const updateInventoryItem = (id, data) => api.put(`/inventory/admin/${id}`, data);
export const createInventoryItem = (data) => api.post("/inventory/admin", data);
export const deleteInventoryItem = (id) => api.delete(`/inventory/admin/${id}`);