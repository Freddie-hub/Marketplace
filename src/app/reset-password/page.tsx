/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useState } from 'react';
import REQUEST_RESET_PASSWORD_MUTATION from '../graphql/requestPasswordResetMutation';
import { useMutation } from '@apollo/client';
import { useRouter } from 'next/navigation';
import { RequestPasswordResetVariables } from '@/types/RequestPasswordReset';
import { RequestPasswordResetResponse } from '@/types/RequestPasswordResetResponse';

export default function ResetPasswordPage() {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();
  const [requestPasswordReset, { loading }] = useMutation<
    RequestPasswordResetResponse,
    RequestPasswordResetVariables
  >(REQUEST_RESET_PASSWORD_MUTATION);

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email.trim()) {
      setError('Please enter your email address');
      return;
    }

    if (!validateEmail(email)) {
      setError('Please enter a valid email address');
      return;
    }

    try {
      const result = await requestPasswordReset({
        variables: {
          args: {
            email: email.toLowerCase().trim()
          }
        }
      });

      if (result.data?.requestPasswordReset?.status === 'Success') {
        setSent(true);
        alert(result.data.requestPasswordReset.message);
        
      } else {
        setError('Failed to send reset email. Please try again.');
      }
    } catch (err: any) {
      console.error('Password reset request error:', err);
      
      if (err.graphQLErrors && err.graphQLErrors.length > 0) {
        setError(err.graphQLErrors[0].message);
      } else if (err.networkError) {
        setError('Network error. Please check your connection and try again.');
      } else {
        setError('An error occurred. Please try again later.');
      }
    }
  };

  if (sent) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#476869] px-4">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 space-y-6 text-center">
          <div className="text-green-600 mb-4">
            <svg className="w-16 h-16 mx-auto" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
          </div>
          
          <h2 className="text-2xl font-bold text-[#205D5A]">Check Your Email</h2>
          
          <p className="text-gray-600">
            If an account with <strong>{email}</strong> exists, you will receive a password reset link shortly.
          </p>
          
          <div className="space-y-4">
            <button
              onClick={() => {
                setSent(false);
                setEmail('');
                setError(null);
              }}
              className="w-full bg-gray-200 text-gray-800 py-3 rounded-xl hover:bg-gray-300 transition duration-200 font-semibold"
            >
              Send Another Email
            </button>
            
            <button
              onClick={() => router.push('/login')}
              className="w-full bg-[#FCB000] text-black py-3 rounded-xl hover:bg-[#FF990B] transition duration-200 font-semibold"
            >
              Back to Login
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#476869] px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 space-y-6">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-[#205D5A] mb-2">Reset Password</h2>
          <p className="text-gray-600 text-sm">
            Enter your email address and we&apos;ll send you a link to reset your password.
          </p>
        </div>

        <form onSubmit={handleReset} className="space-y-4">
          <div>
            <input
              type="email"
              placeholder="Your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border-2 border-[#00A79D] rounded-xl bg-white text-black placeholder-gray-600 placeholder-opacity-100 focus:outline-none focus:ring-2 focus:ring-[#00A79D] focus:border-[#00A79D]"
              disabled={loading}
              required
            />
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3">
              <p className="text-red-600 text-sm text-center">{error}</p>
            </div>
          )}

          <button
            type="submit"
            disabled={loading || !email.trim()}
            className="w-full bg-[#FCB000] text-black py-3 rounded-xl hover:bg-[#FF990B] transition duration-200 font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Sending...
              </span>
            ) : (
              'Send Reset Email'
            )}
          </button>
        </form>

        <div className="text-center">
          <p className="text-sm text-gray-600">
            Remember your password?{' '}
            <button
              onClick={() => router.push('/login')}
              className="text-[#BD011F] font-semibold hover:underline"
            >
              Log in
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}