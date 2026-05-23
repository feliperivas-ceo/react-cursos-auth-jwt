import { createContext, useState } from "react";
import { request } from "../api/client";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem("token"));

  const isAuthenticated = Boolean(token);

  async function login(username, password) {
    const data = await request("/api/auth/login", {
      method: "POST",
      body: JSON.stringify({
        username,
        password,
      }),
    });

    localStorage.setItem("token", data.token);
    setToken(data.token);

    return data;
  }

  function logout() {
    localStorage.removeItem("token");
    setToken(null);
  }

  return (
    <AuthContext.Provider value={{ token, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContext;