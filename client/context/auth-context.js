"use client";

import { createContext, useContext, useState } from "react";

const AuthContext = createContext({
  isAuthenticated: false,
  user: null,
  login: () => {},
  logout: () => {},
  register: () => {},
});

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  const login = (email, password) => {
    // This would be replaced with actual API call
    console.log("Logging in with", email, password);
    setIsAuthenticated(true);
    setUser({
      name: "John Doe",
      email: email,
    });
    return Promise.resolve();
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
    return Promise.resolve();
  };

  const register = (name, email, password) => {
    // This would be replaced with actual API call
    console.log("Registering", name, email, password);
    setIsAuthenticated(true);
    setUser({
      name: name,
      email: email,
    });
    return Promise.resolve();
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, user, login, logout, register }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
