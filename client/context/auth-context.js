"use client";

import { createContext, useContext, useState } from "react";

const AuthContext = createContext({
  isAuthenticated: false,
  user: null,
  login: () => {},
  logout: () => {},
  register: () => {},
  quickLogin: () => {}, // Add quick login function
});

export function AuthProvider({ children }) {
  // Change initial state to true for testing
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  // Add default user
  const [user, setUser] = useState({
    id: "user-test",
    name: "Test User",
    email: "test@example.com",
    username: "TestUser",
    profile_picture_url: "/placeholder.svg?height=40&width=40",
  });

  const login = (email, password) => {
    // This would be replaced with actual API call
    console.log("Logging in with", email, password);
    setIsAuthenticated(true);
    setUser({
      id: "user-test",
      name: "Test User",
      email: email || "test@example.com",
      username: "TestUser",
      profile_picture_url: "/placeholder.svg?height=40&width=40",
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
      id: "user-test",
      name: name || "Test User",
      email: email || "test@example.com",
      username: name?.replace(/\s+/g, "") || "TestUser",
      profile_picture_url: "/placeholder.svg?height=40&width=40",
    });
    return Promise.resolve();
  };

  // Add quick login function for testing
  const quickLogin = () => {
    setIsAuthenticated(true);
    setUser({
      id: "user-test",
      name: "Test User",
      email: "test@example.com",
      username: "TestUser",
      profile_picture_url: "/placeholder.svg?height=40&width=40",
    });
    return Promise.resolve();
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, user, login, logout, register, quickLogin }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
