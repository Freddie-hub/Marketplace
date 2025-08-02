"use client";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useQuery } from '@apollo/client';
import { gql } from '@apollo/client';
import { StoredUser } from "@/types/StoredUser";

const GET_USER_AUTH_DATA = gql`
  query GetUserAuthData {
    User {
      id
      role
      status
      paymentDetails
      receivedInvitations {
        status
      }
    }
  }
`;

const useAuth = () => {
  const [user, setUser] = useState<StoredUser | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const { data, error } = useQuery(GET_USER_AUTH_DATA, {
    skip: !localStorage.getItem('token'),
    context: { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } },
    onCompleted: (data) => {
      if (data?.User) {
        const updatedUser = {
          id: data.User.id,
          role: data.User.role,
          status: data.User.status,
          paymentDetails: data.User.paymentDetails,
        };
        setUser(updatedUser);
        localStorage.setItem('user', JSON.stringify(updatedUser));
        if (data.User.role === 'FARMER' && !data.User.paymentDetails) {
          router.push('/dashboards/farmer');
        }
      }
    },
    onError: () => {
      logout();
    },
  });

  useEffect(() => {
    const checkAuthState = () => {
      try {
        const storedToken = localStorage.getItem('token');
        const storedUserData = localStorage.getItem('user');
        
        if (storedToken && storedUserData) {
          const parsedUser = JSON.parse(storedUserData) as StoredUser;
          setUser(parsedUser);
          setToken(storedToken);
          if (parsedUser.role === 'FARMER') {
            const invitationStatus = data?.User?.receivedInvitations?.[0]?.status;
            if (parsedUser.status !== 'ACTIVE' || invitationStatus !== 'ACCEPTED') {
              logout();
            }
          }
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
  }, [data]);

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    setToken(null);
    router.push('/login');
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

export default useAuth;