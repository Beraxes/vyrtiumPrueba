'use client';

import { useState, useEffect, createContext, useContext, ReactNode } from 'react';
import { apiClient } from '@/lib/api';
import { LoginRequest, RegisterRequest } from '@/types';

/**
 * @param token
 * @returns
 */
const decodeToken = (token: string): { exp?: number } | null => {
  try {
    const base64Url = token.split('.')[1];
    if (!base64Url) return null;
    
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error('Failed to decode token:', error);
    return null;
  }
};

interface AuthContextType {
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (data: LoginRequest) => Promise<void>;
  register: (data: RegisterRequest) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const logout = () => {
    apiClient.logout();
    setIsAuthenticated(false);
  };

  useEffect(() => {
    const checkAuthStatus = () => {
      const token = localStorage.getItem('access_token');

      if (token) {
        const decodedToken = decodeToken(token);

        // Check if token is valid and not expired
        if (decodedToken && decodedToken.exp && decodedToken.exp * 1000 > Date.now()) {
          setIsAuthenticated(true);
        } else {
          logout(); // Logout if token is expired or invalid
        }
      } else {
        setIsAuthenticated(false);
      }
      setIsLoading(false);
    };

    checkAuthStatus();
  }, []);

  const login = async (data: LoginRequest) => {
    await apiClient.login(data);
    setIsAuthenticated(true);
  };

  const register = async (data: RegisterRequest) => {
    await apiClient.register(data);
  };

  const value = { isAuthenticated, isLoading, login, register, logout };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}