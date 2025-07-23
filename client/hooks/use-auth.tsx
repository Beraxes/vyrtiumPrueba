'use client';

import { useState, useEffect, createContext, useContext, ReactNode } from 'react';
import { apiClient } from '@/lib/api';
import { LoginRequest, RegisterRequest } from '@/types';

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

  useEffect(() => {
    const checkAuthStatus = () => {
      setIsAuthenticated(apiClient.isAuthenticated());
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

  const logout = () => {
    apiClient.logout();
    setIsAuthenticated(false);
  };

  // Define the context value object
  const value = { isAuthenticated, isLoading, login, register, logout };

  return (<AuthContext.Provider value={value}> {children} </AuthContext.Provider>);
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}