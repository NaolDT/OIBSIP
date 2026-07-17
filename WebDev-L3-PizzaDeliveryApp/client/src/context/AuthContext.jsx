import { createContext, useContext, useState } from "react";
import { loginUser as loginRequest } from "../api/authApi";

const AuthContext = createContext(null);


function getStoredAuth() {
  const storedToken = localStorage.getItem("token");
  const storedUser = localStorage.getItem("user");

  if (storedToken && storedUser) {
    return { token: storedToken, user: JSON.parse(storedUser) };
  }

  return { token: null, user: null };
}

export function AuthProvider({ children }) {
  const [{ token, user }, setAuth] = useState(getStoredAuth);

  const login = async (email, password) => {
    const res = await loginRequest({ email, password });
    const { token, user } = res.data;

    setAuth({ token, user });
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));

    return user;
  };

  const logout = () => {
    setAuth({ token: null, user: null });
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}