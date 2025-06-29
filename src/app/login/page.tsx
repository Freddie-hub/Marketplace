'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useMutation } from '@apollo/client';
import { signInWithEmailAndPassword, signInWithPopup, UserCredential } from 'firebase/auth';
import { auth, googleProvider } from '@/lib/firebase';
import LOGIN_MUTATION from '../graphql/loginMutation';
import Image from 'next/image';

export default function LoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);

  const [login, { loading, error }] = useMutation(LOGIN_MUTATION);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleBackendLogin = async (userCredential: UserCredential) => {
    try {
      const idToken = await userCredential.user.getIdToken();

      const { data } = await login({
        variables: { idToken },
      });

      if (data?.login?.token) {
        localStorage.setItem('token', data.login.token);
        // localStorage.setItem('user', JSON.stringify(data.login.user));
        
        router.push('/dashboard'); 
      } else {
        throw new Error('Login failed: No token received from server.');
      }
    } catch (err: any) {
      auth.signOut();
      throw err;
    }
  };

  const handleEmailLogin = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, form.email, form.password);
      await handleBackendLogin(userCredential);
    } catch (err: any) {
      console.error(err.message);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const userCredential = await signInWithPopup(auth, googleProvider);
      await handleBackendLogin(userCredential);
    } catch (err: any) {
      console.error(err.message);
    }
  };
  
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
          <h2 className="text-3xl font-bold text-[#205D5A]">Welcome Back</h2>
          <p className="text-gray-600 mt-2">Log in to continue to the Marketplace.</p>
        </div>

        {error && <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded-xl text-center">{error.message}</div>}

        <div className="space-y-4">
          <InputField name="email" type="email" placeholder="Email Address" value={form.email} onChange={handleChange} />
          <div className="relative">
            <InputField name="password" type={showPassword ? 'text' : 'password'} placeholder="Password" value={form.password} onChange={handleChange} />
            <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-medium text-[#00A79D]">
              {showPassword ? 'Hide' : 'Show'}
            </button>
          </div>
        </div>

        <div className="space-y-4">
          <button onClick={handleEmailLogin} disabled={loading} className="w-full bg-[#00A79D] text-white py-3 rounded-xl hover:bg-[#205D5A] transition duration-300 font-semibold disabled:bg-gray-400">
            {loading ? 'Logging in...' : 'Log In'}
          </button>
          <button onClick={handleGoogleLogin} disabled={loading} className="w-full flex items-center justify-center gap-2 border border-gray-300 text-gray-700 py-3 rounded-xl hover:bg-gray-100 transition duration-300 font-semibold disabled:bg-gray-200">
             <Image src="/google.png" alt="Google" className="w-5 h-5" width={100} height={100}/>
             {loading ? 'Processing...' : 'Log In with Google'}
          </button>
        </div>
        
        <div className="flex justify-between text-sm text-gray-600 font-medium">
            <a href="/reset-password" className="text-[#BD011F] hover:underline">Forgot password?</a>
            <a href="/signup" className="text-[#205D5A] hover:underline">Create an account</a>
        </div>
      </div>
    </div>
  );
}