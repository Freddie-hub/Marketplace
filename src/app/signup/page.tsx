/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useMutation } from '@apollo/client';
import { createUserWithEmailAndPassword, signInWithPopup, updateProfile } from 'firebase/auth';
import { auth, googleProvider } from '@/lib/firebase';
import { CREATE_FARMER_OR_BUYER_MUTATION, CREATE_WAREHOUSE_WITH_MANAGER_MUTATION } from "@/app/graphql/usersMutations"
import Image from 'next/image';

const splitFullName = (fullName) => {
  const parts = fullName.trim().split(' ');
  const Fname = parts[0] || '';
  const Lname = parts.slice(1).join(' ') || '';
  return { Fname, Lname };
};

export default function SignupPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialRole = searchParams.get('role')?.toUpperCase() || 'BUYER';

  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    role: initialRole,
    phone: '',
    address: '',
    warehouse_name: '',
    warehouse_location: '',
    warehouse_address: '',
    warehouse_capacity: '',
    warehouse_phone: '',
    warehouse_email: '',
  });
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  const [createFarmerOrBuyer, { loading: farmerLoading }] = useMutation(CREATE_FARMER_OR_BUYER_MUTATION);
  const [createWarehouseWithManager, { loading: warehouseLoading }] = useMutation(CREATE_WAREHOUSE_WITH_MANAGER_MUTATION);

  const loading = farmerLoading || warehouseLoading;

  const handleChange = (e:any) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const syncUserToBackend = async (firebaseUser, role, isGoogleUser = false) => {
    const { Fname, Lname } = splitFullName(firebaseUser.displayName || form.name);
    
    const baseArgs = {
      email: firebaseUser.email,
      Fname,
      Lname,
      phone: form.phone || null,
      address: form.address || null,
      isGoogleUser,
      googleId: isGoogleUser ? firebaseUser.uid : null,
      password: isGoogleUser ? null : form.password,
    };

    try {
      let result;
      
      if (role === 'WAREHOUSE_GUY') {
        result = await createWarehouseWithManager({ 
          variables: { 
            args: {
              ...baseArgs,
              warehouse_name: form.warehouse_name,
              warehouse_location: form.warehouse_location,
              warehouse_address: form.warehouse_address,
              warehouse_capacity: parseInt(form.warehouse_capacity) || 0,
              warehouse_phone: form.warehouse_phone,
              warehouse_email: form.warehouse_email,
            }
          } 
        });
      } else {
        result = await createFarmerOrBuyer({ 
          variables: { 
            args: {
              ...baseArgs,
              role: role 
            }
          } 
        });
      }
      
      const backendToken = result.data?.createFarmer?.token || result.data?.createWarehouseWithManager?.token;
      if (backendToken) {
        localStorage.setItem('token', backendToken);
      }

      router.push('/login');
    } catch (err:any) {
      setError(err.message);
      throw err;
    }
  };

  const validateForm = () => {
    if (!form.email || !form.password || !form.name) {
      setError('Please fill in all required fields.');
      return false;
    }

    if (form.role === 'WAREHOUSE_GUY') {
      if (!form.warehouse_name || !form.warehouse_location) {
        setError('Please fill in warehouse name and location.');
        return false;
      }
    }

    return true;
  };

  const handleEmailSignup = async () => {
    setError(null);
    
    if (!validateForm()) return;

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, form.email, form.password);
      await updateProfile(userCredential.user, { displayName: form.name });
      
      await syncUserToBackend(userCredential.user, form.role, false);

    } catch (err:any) {
      setError(err.message.replace('Firebase:', ''));
    }
  };

  const handleGoogleSignup = async () => {
    setError(null);
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      
      await syncUserToBackend(user, form.role, true);

    } catch (err:any) {
      setError(err.message.replace('Firebase:', ''));
    }
  };

  const InputField = (props) => (
    <input
      {...props}
      className="w-full p-3 border-2 rounded-xl border-[#00A79D] bg-white text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#00A79D] transition"
    />
  );

  const isWarehouseRole = form.role === 'WAREHOUSE_GUY';
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#476869] p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 space-y-6 animate-fade-in">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-[#205D5A]">Create An Account</h2>
          <p className="text-gray-600 mt-2">Join our marketplace today!</p>
        </div>

        {error && <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded-xl text-center">{error}</div>}

        <div className="space-y-4">
          {/* User Role Selection */}
          <select
            name="role"
            value={form.role}
            onChange={handleChange}
            className="w-full p-3 border-2 rounded-xl border-[#00A79D] bg-white text-black focus:outline-none focus:ring-2 focus:ring-[#00A79D] transition"
          >
            <option value="BUYER">I want to Buy Coffee</option>
            <option value="FARMER">I want to Sell Coffee (as a Farmer)</option>
            <option value="WAREHOUSE_GUY">I have a Warehouse</option>
          </select>

          {/* Basic User Information */}
          <InputField name="name" type="text" placeholder="Full Name *" value={form.name} onChange={handleChange} required />
          <InputField name="email" type="email" placeholder="Email Address *" value={form.email} onChange={handleChange} required />
          
          <div className="relative">
            <InputField
              name="password"
              type={showPassword ? 'text' : 'password'}
              placeholder="Password *"
              value={form.password}
              onChange={handleChange}
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-medium text-[#00A79D]"
            >
              {showPassword ? 'Hide' : 'Show'}
            </button>
          </div>

          {/* Optional Fields */}
          <InputField name="phone" type="tel" placeholder="Phone Number (Optional)" value={form.phone} onChange={handleChange} />
          <InputField name="address" type="text" placeholder="Address (Optional)" value={form.address} onChange={handleChange} />

          {/* Warehouse-specific fields */}
          {isWarehouseRole && (
            <div className="space-y-4 p-4 bg-gray-50 rounded-xl">
              <h3 className="text-lg font-semibold text-[#205D5A]">Warehouse Information</h3>
              <InputField name="warehouse_name" type="text" placeholder="Warehouse Name *" value={form.warehouse_name} onChange={handleChange} required />
              <InputField name="warehouse_location" type="text" placeholder="Warehouse Location *" value={form.warehouse_location} onChange={handleChange} required />
              <InputField name="warehouse_address" type="text" placeholder="Warehouse Address" value={form.warehouse_address} onChange={handleChange} />
              <InputField name="warehouse_capacity" type="number" placeholder="Storage Capacity (kg)" value={form.warehouse_capacity} onChange={handleChange} />
              <InputField name="warehouse_phone" type="tel" placeholder="Warehouse Phone" value={form.warehouse_phone} onChange={handleChange} />
              <InputField name="warehouse_email" type="email" placeholder="Warehouse Email" value={form.warehouse_email} onChange={handleChange} />
            </div>
          )}
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
            <Image src="/google.png" alt="Google" className="w-5 h-5" height={900} width={600}/> 
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