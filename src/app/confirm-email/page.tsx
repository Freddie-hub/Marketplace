'use client';

import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';

export default function ConfirmEmailPage() {
  const [status, setStatus] = useState<'loading' | 'success' | 'error' | 'expired'>('loading');
  const [message, setMessage] = useState('');
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get('token');

  useEffect(() => {
    if (!token) {
      setStatus('error');
      setMessage('No confirmation token found in the URL.');
      return;
    }

    const confirmEmail = async () => {
      try {
        const response = await fetch('/api/confirm-email', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ token }),
        });

        const data = await response.json();

        if (response.ok) {
          setStatus('success');
          setMessage('Your email has been successfully confirmed! You can now log in to your account.');
          
          setTimeout(() => {
            router.push('/login');
          }, 3000);
        } else {
          if (data.error?.includes('expired') || data.error?.includes('invalid')) {
            setStatus('expired');
            setMessage(data.error || 'The confirmation link has expired or is invalid.');
          } else {
            setStatus('error');
            setMessage(data.error || 'Failed to confirm email. Please try again.');
          }
        }
      } catch (error) {
        console.error('Confirmation error:', error);
        setStatus('error');
        setMessage('An unexpected error occurred. Please try again later.');
      }
    };

    confirmEmail();
  }, [token, router]);

  const getStatusIcon = () => {
    switch (status) {
      case 'loading':
        return '⏳';
      case 'success':
        return '✅';
      case 'error':
        return '❌';
      case 'expired':
        return '⏰';
      default:
        return '⏳';
    }
  };

  const getStatusColor = () => {
    switch (status) {
      case 'success':
        return 'text-green-600';
      case 'error':
        return 'text-red-600';
      case 'expired':
        return 'text-orange-600';
      default:
        return 'text-blue-600';
    }
  };

  const getStatusBgColor = () => {
    switch (status) {
      case 'success':
        return 'bg-green-50 border-green-200';
      case 'error':
        return 'bg-red-50 border-red-200';
      case 'expired':
        return 'bg-orange-50 border-orange-200';
      default:
        return 'bg-blue-50 border-blue-200';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <div className="mx-auto h-12 w-12 flex items-center justify-center rounded-full bg-blue-100">
            <span className="text-2xl">{getStatusIcon()}</span>
          </div>
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            Email Confirmation
          </h2>
          <div className="mt-2 h-1 bg-gradient-to-r from-blue-500 to-green-500 mx-auto w-16 rounded"></div>
        </div>

        {/* Status Card */}
        <div className={`rounded-lg border p-6 ${getStatusBgColor()}`}>
          <div className="text-center">
            <div className="text-4xl mb-4">{getStatusIcon()}</div>
            <h3 className={`text-lg font-medium mb-3 ${getStatusColor()}`}>
              {status === 'loading' && 'Confirming your email...'}
              {status === 'success' && 'Email Confirmed Successfully!'}
              {status === 'error' && 'Confirmation Failed'}
              {status === 'expired' && 'Link Expired'}
            </h3>
            <p className="text-gray-700 mb-4">{message}</p>

            {/* Loading spinner */}
            {status === 'loading' && (
              <div className="flex justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              </div>
            )}

            {/* Success redirect notice */}
            {status === 'success' && (
              <div className="bg-white rounded-md p-3 mt-4">
                <p className="text-sm text-gray-600">
                  You will be redirected to the login page in 3 seconds...
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          {status === 'success' && (
            <Link
              href="/login"
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-all duration-200"
            >
              Go to Login
            </Link>
          )}

          {(status === 'error' || status === 'expired') && (
            <>
              <button
                onClick={() => window.location.reload()}
                className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
              >
                Try Again
              </button>
              
              <Link
                href="/signup/farmer"
                className="group relative w-full flex justify-center py-3 px-4 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
              >
                Back to Registration
              </Link>
            </>
          )}

          <Link
            href="/"
            className="group relative w-full flex justify-center py-3 px-4 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
          >
            Go to Homepage
          </Link>
        </div>

        {/* Support Information */}
        <div className="text-center">
          <p className="text-sm text-gray-600">
            Need help?{' '}
            <a
              href="mailto:support@coffeehub.com"
              className="font-medium text-blue-600 hover:text-blue-500"
            >
              Contact Support
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}