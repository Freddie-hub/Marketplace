'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  updateProfile,
} from 'firebase/auth';
import { auth, googleProvider } from '@/lib/firebase';

export default function SignupPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    email: '',
    password: '',
    name: '',
    role: 'buyer', // default role
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const syncUserToBackend = async (
    uid: string,
    email: string,
    name: string,
    role: string
  ) => {
    try {
      await fetch('http://localhost:5000/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ firebase_uid: uid, email, name, role }),
      });
    } catch (err) {
      console.error('Backend sync failed:', err);
    }
  };

  const handleEmailSignup = async () => {
    setLoading(true);
    setError(null);
    try {
      const { email, password, name, role } = form;
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      await updateProfile(userCredential.user, { displayName: name });

      await syncUserToBackend(userCredential.user.uid, email, name, role);
      router.push('/');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignup = async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      // You may want to assign a default role like 'buyer' or prompt later
      await syncUserToBackend(user.uid, user.email || '', user.displayName || '', 'buyer');
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
        <h2 className="text-3xl font-bold text-center text-[#205D5A]">Create Account</h2>

        <input
          name="name"
          type="text"
          placeholder="Full Name"
          value={form.name}
          onChange={handleChange}
          className="w-full p-3 border-2 rounded-xl border-[#00A79D] bg-white text-black placeholder-gray-600 placeholder-opacity-100 focus:outline-none focus:ring-2 focus:ring-[#00A79D]"
        />

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

        {/* Role dropdown */}
        <select
          name="role"
          value={form.role}
          onChange={handleChange}
          className="w-full p-3 border-2 rounded-xl border-[#00A79D] bg-white text-black focus:outline-none focus:ring-2 focus:ring-[#00A79D]"
        >
          <option value="buyer">Buyer</option>
          <option value="farmer">Seller/Farmer</option>
        </select>

        {error && (
          <div className="text-sm text-red-600 font-medium text-center">
            {error}
          </div>
        )}

        <button
          onClick={handleEmailSignup}
          disabled={loading}
          className="w-full bg-[#00A79D] text-white py-3 rounded-xl hover:bg-[#205D5A] transition duration-200 font-semibold"
        >
          {loading ? 'Signing up...' : 'Sign up with Email'}
        </button>

        <div className="flex items-center justify-center space-x-2 text-gray-400 text-sm">
          <span className="h-px bg-gray-300 w-1/4" />
          <span>or</span>
          <span className="h-px bg-gray-300 w-1/4" />
        </div>

        <button
          onClick={handleGoogleSignup}
          disabled={loading}
          className="w-full border border-[#FF990B] text-[#FF990B] py-3 rounded-xl hover:bg-[#FF990B] hover:text-white transition duration-200 font-semibold"
        >
          {loading ? 'Signing in...' : 'Sign up with Google'}
        </button>

        <p className="text-center text-sm text-gray-600">
          Already have an account?{' '}
          <a href="/login" className="text-[#BD011F] font-semibold hover:underline">
            Log in
          </a>
        </p>
      </div>
    </div>
  );
}
