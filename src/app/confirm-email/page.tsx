import { Suspense } from 'react';
import ConfirmEmailClient from './ConfirmEmailClient';

function LoadingFallback() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
        <h2 className="mt-6 text-xl font-semibold text-gray-800">
          Preparing Confirmation...
        </h2>
      </div>
    </div>
  );
}

export default function ConfirmEmailPage() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <ConfirmEmailClient />
    </Suspense>
  );
}