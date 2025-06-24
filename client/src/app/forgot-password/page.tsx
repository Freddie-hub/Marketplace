'use client';

import { useState } from 'react';
import { sendResetEmail } from '@/lib/firebase';

export default function ResetPasswordPage() {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleReset = async () => {
    setLoading(true);
    setError(null);
    try {
      await sendResetEmail(email);
      setSent(true);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FFF8F5] px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 space-y-6">
        <h2 className="text-3xl font-bold text-center text-[#205D5A]">Reset Password</h2>

        <input
          type="email"
          placeholder="Your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 border rounded-xl border-[#00A79D] focus:outline-none focus:ring-2 focus:ring-[#00A79D]"
        />

        {error && <p className="text-red-600 text-sm text-center">{error}</p>}
        {sent && <p className="text-green-700 text-sm text-center">Reset email sent. Check your inbox.</p>}

        <button
          onClick={handleReset}
          disabled={loading}
          className="w-full bg-[#FCB000] text-black py-3 rounded-xl hover:bg-[#FF990B] transition duration-200 font-semibold"
        >
          {loading ? 'Sending...' : 'Send Reset Email'}
        </button>

        <p className="text-center text-sm text-gray-600">
          Remember your password?{' '}
          <a href="/login" className="text-[#BD011F] font-semibold hover:underline">
            Log in
          </a>
        </p>
      </div>
    </div>
  );
}
