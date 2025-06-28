'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useMutation } from '@apollo/client';
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  updateProfile,
  User,
} from 'firebase/auth';
import { auth, googleProvider } from '@/lib/firebase';
// import { CREATE_FARMER_MUTATION, CREATE_BUYER_MUTATION } from '@/graphql/mutations';
import { CREATE_USER_MUTATION } from '../graphql/mutations';

// A utility to split the full name
const splitFullName = (fullName: string) => {
  const parts = fullName.trim().split(' ');
  const Fname = parts[0] || '';
  const Lname = parts.slice(1).join(' ') || '';
  return { Fname, Lname };
};

export default function SignupPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    role: 'buyer',
  });
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  // Use the correct mutation based on the selected role
  const [createFarmer, { loading: loadingFarmer }] = useMutation(CREATE_USER_MUTATION);
  const [createBuyer, { loading: loadingBuyer }] = useMutation(CREATE_USER_MUTATION);

  const loading = loadingFarmer || loadingBuyer;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const syncUserToBackend = async (firebaseUser: User, role: string, isGoogleUser: boolean = false) => {
    const { Fname, Lname } = splitFullName(firebaseUser.displayName || form.name);
    const variables = {
      args: {
        email: firebaseUser.email!,
        Fname,
        Lname,
        isGoogleUser,
        googleId: isGoogleUser ? firebaseUser.uid : null,
        password: isGoogleUser ? null : form.password,
      },
    };

    try {
      let result;
      if (role === 'farmer') {
        result = await createFarmer({ variables });
      } else {
        result = await createBuyer({ variables });
      }
      
      const backendToken = result.data?.createFarmer?.token || result.data?.createBuyer?.token;
      if (backendToken) {
        localStorage.setItem('token', backendToken);
      }

      router.push('/login');
    } catch (err: any) {
      setError(err.message);
      throw err;
    }
  };

  const handleEmailSignup = async () => {
    setError(null);
    if (!form.email || !form.password || !form.name) {
      setError("Please fill in all fields.");
      return;
    }

    try {
      // 1. Create user in Firebase
      const userCredential = await createUserWithEmailAndPassword(auth, form.email, form.password);
      await updateProfile(userCredential.user, { displayName: form.name });
      
      // 2. Sync user to your GraphQL backend
      await syncUserToBackend(userCredential.user, form.role, false);

    } catch (err: any) {
      setError(err.message.replace('Firebase:', ''));
    }
  };

  const handleGoogleSignup = async () => {
    setError(null);
    try {
      // 1. Sign in with Google
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      
      // 2. Sync user to your GraphQL backend
      // Note: We'll use the 'buyer' role as a default for Google signups for now.
      // You might want a screen after this to ask for the role.
      await syncUserToBackend(user, 'buyer', true);

    } catch (err: any) {
      setError(err.message.replace('Firebase:', ''));
    }
  };

  // Reusable Input component for cleaner code
  const InputField = (props: React.InputHTMLAttributes<HTMLInputElement>) => (
    <input
      {...props}
      className="w-full p-3 border-2 rounded-xl border-[#00A79D] bg-white text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#00A79D] transition"
    />
  );
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#476869] p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 space-y-6 animate-fade-in">
        <div className="text-center">
            <h2 className="text-3xl font-bold text-[#205D5A]">Create An Account</h2>
            <p className="text-gray-600 mt-2">Join our marketplace today!</p>
        </div>

        {error && <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded-xl text-center">{error}</div>}

        <div className="space-y-4">
          <InputField name="name" type="text" placeholder="Full Name" value={form.name} onChange={handleChange} />
          <InputField name="email" type="email" placeholder="Email Address" value={form.email} onChange={handleChange} />
          
          <div className="relative">
            <InputField
              name="password"
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-medium text-[#00A79D]"
            >
              {showPassword ? 'Hide' : 'Show'}
            </button>
          </div>

          <select
            name="role"
            value={form.role}
            onChange={handleChange}
            className="w-full p-3 border-2 rounded-xl border-[#00A79D] bg-white text-black focus:outline-none focus:ring-2 focus:ring-[#00A79D] transition"
          >
            <option value="buyer">I want to Buy</option>
            <option value="farmer">I want to Sell (as a Farmer)</option>
          </select>
        </div>

        <div className="space-y-4">
           <button
              onClick={handleEmailSignup}
              disabled={loading}
              className="w-full bg-[#00A79D] text-white py-3 rounded-xl hover:bg-[#205D5A] transition duration-300 font-semibold disabled:bg-gray-400"
            >
              {loading ? 'Creating Account...' : 'Sign up with Email'}
            </button>

            <div className="flex items-center text-gray-400">
                <hr className="flex-grow border-t border-gray-300"/>
                <span className="px-4 text-sm">OR</span>
                <hr className="flex-grow border-t border-gray-300"/>
            </div>

            <button
                onClick={handleGoogleSignup}
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 border border-gray-300 text-gray-700 py-3 rounded-xl hover:bg-gray-100 transition duration-300 font-semibold disabled:bg-gray-200"
            >
                <img src="/google-icon.svg" alt="Google" className="w-5 h-5"/> 
                {loading ? 'Processing...' : 'Sign up with Google'}
            </button>
        </div>

        <p className="text-center text-sm text-gray-600">
          Already have an account?{' '}
          <a href="/login" className="font-semibold text-[#BD011F] hover:underline">
            Log In
          </a>
        </p>
      </div>
    </div>
  );
}