"use client"
import { StoredUser } from "@/types/StoredUser";
import { useEffect, useState } from 'react';

const useAuth = () => {
  const [user, setUser] = useState<StoredUser | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuthState = () => {
      try {
        const storedToken = localStorage.getItem('token');
        const storedUserData = localStorage.getItem('user');
        
        if (storedToken && storedUserData) {
          const parsedUser = JSON.parse(storedUserData) as StoredUser;
          setUser(parsedUser);
          setToken(storedToken);
        } else {
          setUser(null);
          setToken(null);
        }
      } catch (error) {
        console.error('Error parsing stored auth data:', error);
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setUser(null);
        setToken(null);
      }
      
      setLoading(false);
    };

    checkAuthState();

    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'token' || e.key === 'user') {
        checkAuthState();
      }
    };

    window.addEventListener('storage', handleStorageChange);

    const handleAuthChange = () => {
      checkAuthState();
    };

    window.addEventListener('authStateChanged', handleAuthChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('authStateChanged', handleAuthChange);
    };
  }, []);

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    setToken(null);
    
    window.dispatchEvent(new Event('authStateChanged'));
  };

  const updateUser = (newUser: StoredUser, newToken?: string) => {
    setUser(newUser);
    localStorage.setItem('user', JSON.stringify(newUser));
    
    if (newToken) {
      setToken(newToken);
      localStorage.setItem('token', newToken);
    }
    
    window.dispatchEvent(new Event('authStateChanged'));
  };

  return {
    user,
    token,
    loading,
    isAuthenticated: !!user && !!token,
    logout,
    updateUser
  };
};

export default useAuth