/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useState, type FC, type ChangeEvent } from 'react';
import { useRouter } from 'next/navigation';
import { useMutation } from '@apollo/client';
import { CREATE_FARMER_OR_BUYER_MUTATION } from "@/app/graphql/usersMutations";
import { GOOGLE_SIGNUP_MUTATION } from '../graphql/googleMutations';
import { CircleUser, Lock, Mail, Phone, Home } from 'lucide-react';
import { SignUpFormProps } from '@/types/SignupFormProps';
import { FormState } from '@/types/FormState';
import { GoogleLogin } from '@react-oauth/google';

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon: React.ReactNode;
}

const InputField: FC<InputFieldProps> = ({ icon, ...props }) => (
  <div className="relative flex items-center">
    <span className="absolute left-4 text-gray-400">{icon}</span>
    <input
      {...props}
      className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#00796B] focus:border-transparent transition-shadow duration-300"
    />
  </div>
);

const SignUpForm: FC<SignUpFormProps> = ({ role, title, subtitle }) => {
  const router = useRouter();
  const [form, setForm] = useState<FormState>({
    firstName: '',
    middleName: '',
    lastName: '',
    email: '',
    password: '',
    phone: '',
    address: '',
  });
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  const [createFarmerOrBuyer, { loading }] = useMutation(CREATE_FARMER_OR_BUYER_MUTATION);
  const [googleSignup, { loading: googleLoading }] = useMutation(GOOGLE_SIGNUP_MUTATION);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({ ...prevForm, [name]: value }));
  };

  const validateForm = (): boolean => {
    if (!form.firstName || !form.lastName || !form.email || !form.password) {
      setError('Please fill in all required fields: First Name, Last Name, Email, and Password.');
      return false;
    }
    setError(null);
    return true;
  };

  const handleEmailSignup = async () => {
    if (!validateForm()) return;

    try {
      const variables = {
        args: {
          email: form.email,
          Fname: form.firstName,
          Lname: form.lastName,
          Mname: form.middleName,
          phone: form.phone || null,
          address: form.address || null,
          isGoogleUser: false,
          googleId: null,
          password: form.password,
          role,
        }
      };

      const result = await createFarmerOrBuyer({ variables });
      const backendToken = result.data?.createFarmerOrBuyer?.token;

      if (backendToken) {
        localStorage.setItem('token', backendToken);
        router.push('/dashboard'); 
      } else {
        throw new Error("Authentication token not received.");
      }
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleGoogleSuccess = async (credentialResponse: any) => {
    setError(null);
    
    try {
      const payload = JSON.parse(atob(credentialResponse.credential.split('.')[1]));
      
      const googleUserData = {
        email: payload.email,
        Fname: payload.given_name,
        Lname: payload.family_name || '',
        googleId: payload.sub,
        photo: payload.picture
      };

      const variables = {
        args: {
          googleUserData,
          role,
          ...((role as string) === 'WAREHOUSE_GUY' && {
            warehouse_name: form.firstName + "'s Warehouse", 
            warehouse_location: form.address || 'Location TBD',
            warehouse_address: form.address,
            warehouse_capacity: 1000,
            warehouse_phone: form.phone,
            warehouse_email: form.email
          })
        }
      };

      const result = await googleSignup({ variables });
      const backendToken = result.data?.GoogleSignup?.token;

      if (backendToken) {
        localStorage.setItem('token', backendToken);
        router.push('/dashboard');
      } else {
        throw new Error("Authentication token not received.");
      }
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleGoogleError = () => {
    setError('Google Sign-In failed. Please try again.');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4 font-sans">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-lg p-8 space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-800">{title}</h1>
          <p className="text-gray-500 mt-2">{subtitle}</p>
        </div>

        {error && (
          <div className="p-3 bg-red-50 border border-red-300 text-red-700 rounded-lg text-center" role="alert">
            {error}
          </div>
        )}

        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputField 
              icon={<CircleUser size={16} />} 
              name="firstName" 
              type="text" 
              placeholder="First Name *" 
              value={form.firstName} 
              onChange={handleChange} 
              required 
              aria-label="First Name" 
            />
            <InputField 
              icon={<span className="opacity-0 w-4"/>} 
              name="lastName" 
              type="text" 
              placeholder="Last Name *" 
              value={form.lastName} 
              onChange={handleChange} 
              required 
              aria-label="Last Name" 
            />
          </div>
          
          <InputField 
            icon={<CircleUser size={16} className="text-transparent" />} 
            name="middleName" 
            type="text" 
            placeholder="Middle Name (Optional)" 
            value={form.middleName} 
            onChange={handleChange} 
            aria-label="Middle Name" 
          />

          <InputField 
            icon={<Mail size={16} />} 
            name="email" 
            type="email" 
            placeholder="Email Address *" 
            value={form.email} 
            onChange={handleChange} 
            required 
            aria-label="Email Address" 
          />
          
          <div className="relative">
            <InputField
              icon={<Lock size={16} />}
              name="password"
              type={showPassword ? 'text' : 'password'}
              placeholder="Password *"
              value={form.password}
              onChange={handleChange}
              required
              aria-label="Password"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-medium text-[#00796B]"
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? 'Hide' : 'Show'}
            </button>
          </div>

          <hr className="border-t border-gray-200" />
          
          <p className="text-sm text-center text-gray-500">Optional Information</p>
          
          <InputField 
            icon={<Phone size={16} />} 
            name="phone" 
            type="tel" 
            placeholder="Phone Number" 
            value={form.phone} 
            onChange={handleChange} 
            aria-label="Phone Number" 
          />
          <InputField 
            icon={<Home size={16} />} 
            name="address" 
            type="text" 
            placeholder="Address" 
            value={form.address} 
            onChange={handleChange} 
            aria-label="Address" 
          />
        </div>

        <div className="space-y-4 pt-2">
          <button
            onClick={handleEmailSignup}
            disabled={loading}
            className="w-full bg-[#00796B] text-white py-3 rounded-lg hover:bg-[#004D40] transition-colors duration-300 font-semibold disabled:bg-gray-400 shadow-md hover:shadow-lg"
          >
            {loading ? 'Creating Account...' : 'Sign up with Email'}
          </button>

          <div className="flex items-center text-gray-400">
            <hr className="flex-grow border-t border-gray-200"/>
            <span className="px-4 text-xs font-semibold">OR</span>
            <hr className="flex-grow border-t border-gray-200"/>
          </div>

          <div className={`w-full flex justify-center ${loading || googleLoading ? 'opacity-50 pointer-events-none' : ''}`}>
            <GoogleLogin
              onSuccess={handleGoogleSuccess}
              onError={handleGoogleError}
              theme="outline"
              size="large"
              width="100%"
              text="signup_with"
            />
          </div>
        </div>

        <p className="text-center text-sm text-gray-600">
          Already have an account?{' '}
          <a href="/login" className="font-semibold text-[#00796B] hover:underline">
            Log In
          </a>
        </p>
      </div>
    </div>
  );
};

export default SignUpForm;