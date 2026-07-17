import api from "./axios";

export const getAllPizzas = () => api.get("/pizzas");