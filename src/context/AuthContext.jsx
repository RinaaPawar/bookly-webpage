import { createContext, useContext, useEffect, useState } from "react";
import api from "../api/axios";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext(null);
export const useAuth = () => useContext(AuthContext);

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;
    try {
      const { exp } = jwtDecode(token);
      if (exp * 1000 > Date.now()) {
        api.get("/api/auth/me").then((res) => setUser(res.data.user)).catch(() => logout());
      } else {
        logout();
      }
    } catch {
      logout();
    }
  }, []);

  function login(token, user) {
    localStorage.setItem("token", token);
    setUser(user);
  }

  function logout() {
    localStorage.removeItem("token");
    setUser(null);
  }

  return <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>;
}
