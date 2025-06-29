'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useMutation } from '@apollo/client';
import LOGIN_MUTATION from '../graphql/loginMutation';
import { toast } from 'react-toastify';
import { GoogleLogin, CredentialResponse } from "@react-oauth/google";
import { jwtDecode, JwtPayload } from "jwt-decode";
import { LoginFormData } from '@/types/LoginFormDataTypes';
import { LoginResponse } from '@/types/LoginResponse';
import Link from 'next/link';
export interface GoogleJwtPayload extends JwtPayload {
  email?: string;
  given_name?: string;
  family_name?: string;
  picture?: string;
}

export default function LoginPage() {
  const router = useRouter();
  const [form, setForm] = useState<LoginFormData>({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [login, { loading, error }] = useMutation<LoginResponse>(LOGIN_MUTATION);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm(prevForm => ({
      ...prevForm,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await handleLogin();
  };

  const handleLogin = async () => {
    if (!form.email || !form.password) {
      toast.error('Please fill in all fields');
      return;
    }
  
    setIsSubmitting(true);
    
    try {
      const { data } = await login({
        variables: {
          args: {
            email: form.email.trim(),
            password: form.password,
          }
        }
      });
  
      console.log("Login response:", data);
  
      if (data?.Login?.token) {
        localStorage.setItem('token', data.Login.token);
        if (data.Login.user) {
          if(data?.Login?.user.role==="ADMINISTRATOR"){
            router.push("/admin-dashboard")
          } else if(data?.Login?.user.role==="WAREHOUSE_GUY") {
            router.push("/warehouse-dashboard")
          } else if(data?.Login?.user.role==="BUYER"){
            router.push("/buyer-dashboard")
          }
          else{
            router.push("dashboard")
          }
          localStorage.setItem('user', JSON.stringify(data.Login.user));
        }
  
        toast.success(data.Login.message || 'Login successful!');
        
        router.push('/dashboard');
      } else {
        throw new Error(data?.Login?.message || 'Login failed: No token received from server.');
      }
    } catch (err) {
      console.error('Login error:', err);
      toast.error('An error occurred during login');
    } finally {
      setIsSubmitting(false);
    }
  };
  const handleGoogleLogin = async (credentialResponse: CredentialResponse) => {
    try {
      if (credentialResponse.credential) {
        const decodedToken = jwtDecode<GoogleJwtPayload>(credentialResponse.credential);
        const googleEmail = decodedToken.email;

        if (!googleEmail) {
          toast.error("Google login failed", {
          });
          return;
        }

        const response = await login({
          variables: { email: googleEmail, password: "" },
        });

        if (response.data?.Login.status === "Success") {
          toast.success("Welcome back!", {
          });
          router.push("/dashboard")
        } else {
          toast.error("Google login failed");
        }
      } else {
        toast.error("Google login failed", {
        });
      }
    } catch (error) {
      console.error("Google Login Error:", error);
      toast.error("Google login failed", {
      });
    } finally {
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const isLoading = loading || isSubmitting;

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#476869] p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 space-y-6 animate-fade-in">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-[#205D5A]">Welcome Back</h2>
          <p className="text-gray-600 mt-2">Log in to continue to the Marketplace.</p>
        </div>

        {error && (
          <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded-xl text-center">
            {error.message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              name="email"
              type="email"
              placeholder="Email Address"
              value={form.email}
              onChange={handleChange}
              required
              disabled={isLoading}
              className="w-full p-3 border-2 rounded-xl border-[#00A79D] bg-white text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#00A79D] transition disabled:bg-gray-100 disabled:cursor-not-allowed"
            />
          </div>

          {/* Password Input */}
          <div className="relative">
            <input
              name="password"
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              required
              disabled={isLoading}
              className="w-full p-3 border-2 rounded-xl border-[#00A79D] bg-white text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#00A79D] transition disabled:bg-gray-100 disabled:cursor-not-allowed pr-16"
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              disabled={isLoading}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-medium text-[#00A79D] hover:text-[#205D5A] transition disabled:text-gray-400"
            >
              {showPassword ? 'Hide' : 'Show'}
            </button>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-[#00A79D] text-white py-3 rounded-xl hover:bg-[#205D5A] transition duration-300 font-semibold disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Logging in...' : 'Log In'}
          </button>
        </form>
                    <div className="flex justify-center">
              <GoogleLogin
                size="large"
                shape="rectangular"
                theme="outline"
                onSuccess={handleGoogleLogin}
                onError={() => {
                  toast.error("Google login failed", 
                  );
                }}
              />
            </div>

        <div className="flex justify-between text-sm text-gray-600 font-medium">
          <Link
            href="/reset-password" 
            className="text-[#BD011F] hover:underline transition"
          >
            Forgot password?
          </Link>
          <Link
            href="/" 
            className="text-[#205D5A] hover:underline transition"
          >
            Create an account
          </Link>
        </div>
      </div>
    </div>
  );
}