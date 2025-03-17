"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { authService } from "@/lib/api-service";

const AuthContext = createContext({
  isAuthenticated: false,
  user: null,
  login: () => {},
  logout: () => {},
  register: () => {},
  quickLogin: () => {},
  loading: true,
});

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  // Store the registered username for login purposes
  const [registeredUsername, setRegisteredUsername] = useState(null); 

  // Check for existing token and fetch user on load
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    const savedUsername = localStorage.getItem('username');
    if (savedUsername) {
      setRegisteredUsername(savedUsername);
    }
    
    if (token) {
      // Try to get current user with token
      authService.getCurrentUser()
        .then(userData => {
          setUser(userData);
          setIsAuthenticated(true);
        })
        .catch(() => {
          // Token is invalid or expired
          localStorage.removeItem('authToken');
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, []);

  const login = async (username, password) => {
    try {
      // Call the real login API
      const response = await authService.login(username, password);
      
      // Save the username for future logins
      localStorage.setItem('username', username);
      setRegisteredUsername(username);
      
      // Set authenticated state and user data
      setIsAuthenticated(true);
      
      // Create a basic user object if user data isn't returned
      const userData = {
        username: username,
        id: "temp-id", // Will be updated when getCurrentUser() succeeds
      };
      setUser(userData);
      
      // Try to get complete user profile in the background
      authService.getCurrentUser().then(fullUserData => {
        setUser(fullUserData);
      }).catch(err => {
        console.warn("Could not fetch complete user profile:", err);
        // Keep using the basic user data, don't fail the login
      });
      
      return Promise.resolve();
    } catch (error) {
      console.error("Login failed:", error);
      return Promise.reject(error);
    }
  };

  const logout = () => {
    // Call logout service
    authService.logout();
    
    // Update state
    setIsAuthenticated(false);
    setUser(null);
    
    return Promise.resolve();
  };

  const register = async (username, email, password) => {
    try {
      // Call the real register API with provided username
      const response = await authService.register(username, email, password);
      
      // Save the username for future logins
      localStorage.setItem('username', username);
      setRegisteredUsername(username);
      
      // Set authenticated state
      setIsAuthenticated(true);
      
      // Create a basic user object without making an additional API call
      const userData = {
        username: username,
        email: email,
        id: response.id || "temp-id" // Use ID from response if available
      };
      setUser(userData);
      
      // No immediate call to getCurrentUser() which was causing the error
      // Instead, we'll try to get the complete profile in the background
      if (response.access_token) {
        // Only try to get user data if we have a token
        setTimeout(() => {
          authService.getCurrentUser().then(fullUserData => {
            setUser(fullUserData);
          }).catch(err => {
            console.warn("Could not fetch complete user profile after registration:", err);
            // Keep using the basic user data, don't fail the registration
          });
        }, 500); // Short delay to ensure token is processed by backend
      }
      
      return Promise.resolve();
    } catch (error) {
      console.error("Registration failed:", error);
      return Promise.reject(error);
    }
  };

  // Keep quick login for testing
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
      value={{ 
        isAuthenticated, 
        user, 
        login, 
        logout, 
        register, 
        quickLogin,
        loading
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
