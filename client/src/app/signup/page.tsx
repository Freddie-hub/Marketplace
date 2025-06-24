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
  const [form, setForm] = useState({ email: '', password: '', name: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const syncUserToBackend = async (uid: string, email: string, name: string) => {
    try {
      await fetch('http://localhost:5000/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ firebase_uid: uid, email, name }),
      });
    } catch (err) {
      console.error('Backend sync failed:', err);
    }
  };

  const handleEmailSignup = async () => {
    setLoading(true);
    setError(null);
    try {
      const { email, password, name } = form;
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(userCredential.user, { displayName: name });

      await syncUserToBackend(userCredential.user.uid, email, name);
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
      await syncUserToBackend(user.uid, user.email || '', user.displayName || '');
      router.push('/');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#78CCD0] px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 space-y-6">
        <h2 className="text-3xl font-bold text-center text-[#205D5A]">Create Account</h2>

        <input
          name="name"
          type="text"
          placeholder="Full Name"
          value={form.name}
          onChange={handleChange}
          className="w-full p-3 border rounded-xl border-[#00A79D] focus:outline-none focus:ring-2 focus:ring-[#00A79D]"
        />
        <input
          name="email"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="w-full p-3 border rounded-xl border-[#00A79D] focus:outline-none focus:ring-2 focus:ring-[#00A79D]"
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          className="w-full p-3 border rounded-xl border-[#00A79D] focus:outline-none focus:ring-2 focus:ring-[#00A79D]"
        />

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
