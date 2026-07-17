import api from "./axios";

export const getInventoryByCategory = (category) => api.get(`/inventory?category=${category}`);