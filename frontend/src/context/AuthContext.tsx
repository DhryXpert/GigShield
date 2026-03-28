'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Rider Profile Type
export interface Rider {
  id: string;
  name: string;
  phone: string;
  isOnboarded: boolean;
  issScore: number;
}

interface AuthContextType {
  rider: Rider | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (rider: Rider) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [rider, setRider] = useState<Rider | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(true);

  // Initialize via API to check if HttpOnly cookie is valid
  useEffect(() => {
    fetchRiderProfile();
  }, []);

  const fetchRiderProfile = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'}/auth/me`, {
        credentials: 'include', // Important for cookies!
      });

      const data = await res.json();
      if (data.success) {
        setIsAuthenticated(true);
        setRider({
          id: data.data._id,
          name: data.data.name,
          phone: data.data.phone,
          isOnboarded: data.data.isOnboarded,
          issScore: data.data.issScore,
        });
      } else {
        setIsAuthenticated(false);
      }
    } catch (error) {
      console.error('Auth Hydration Error:', error);
      setIsAuthenticated(false);
    } finally {
      setIsLoading(false);
    }
  };

  const login = (newRider: Rider) => {
    setIsAuthenticated(true);
    setRider(newRider);
  };

  const logout = async () => {
    try {
      await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'}/auth/logout`, {
        method: 'POST',
        credentials: 'include',
      });
    } catch (error) {
      console.error('Logout error:', error);
    }
    
    setIsAuthenticated(false);
    setRider(null);
  };

  return (
    <AuthContext.Provider
      value={{
        rider,
        isAuthenticated,
        isLoading,
        login,
        logout,
      }}
    >
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
