'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  signInWithEmailAndPassword,
  signInWithPopup,
} from 'firebase/auth';
import { auth, googleProvider } from '@/lib/firebase';

export default function LoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleEmailLogin = async () => {
    setLoading(true);
    setError(null);
    try {
      const { email, password } = form;
      await signInWithEmailAndPassword(auth, email, password);
      router.push('/');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    setError(null);
    try {
      await signInWithPopup(auth, googleProvider);
      router.push('/');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#476869] px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 space-y-6">
        <h2 className="text-3xl font-bold text-center text-[#205D5A]">Log In</h2>

        <input
          name="email"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="w-full p-3 border-2 rounded-xl border-[#00A79D] bg-white text-black placeholder-gray-600 placeholder-opacity-100 focus:outline-none focus:ring-2 focus:ring-[#00A79D]"
        />

        <div className="relative">
          <input
            name="password"
            type={showPassword ? 'text' : 'password'}
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className="w-full p-3 pr-10 border-2 rounded-xl border-[#00A79D] bg-white text-black placeholder-gray-600 placeholder-opacity-100 focus:outline-none focus:ring-2 focus:ring-[#00A79D]"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-sm text-[#00A79D] font-medium focus:outline-none"
          >
            {showPassword ? 'Hide' : 'Show'}
          </button>
        </div>

        {error && (
          <div className="text-sm text-red-600 font-medium text-center">{error}</div>
        )}

        <button
          onClick={handleEmailLogin}
          disabled={loading}
          className="w-full bg-[#00A79D] text-white py-3 rounded-xl hover:bg-[#205D5A] transition duration-200 font-semibold"
        >
          {loading ? 'Logging in...' : 'Log in with Email'}
        </button>

        <div className="flex justify-between text-sm text-gray-600">
          <a href="/reset-password" className="hover:underline text-[#BD011F] font-medium">
            Forgot password?
          </a>
          <a href="/signup" className="hover:underline text-[#205D5A] font-medium">
            Create an account
          </a>
        </div>

        <div className="flex items-center justify-center space-x-2 text-gray-400 text-sm">
          <span className="h-px bg-gray-300 w-1/4" />
          <span>or</span>
          <span className="h-px bg-gray-300 w-1/4" />
        </div>

        <button
          onClick={handleGoogleLogin}
          disabled={loading}
          className="w-full border border-[#FF990B] text-[#FF990B] py-3 rounded-xl hover:bg-[#FF990B] hover:text-white transition duration-200 font-semibold"
        >
          {loading ? 'Signing in...' : 'Log in with Google'}
        </button>
      </div>
    </div>
  );
}
