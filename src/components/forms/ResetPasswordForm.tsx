/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Eye, EyeOff, Loader2, AlertCircle } from "lucide-react";
import { useMutation } from "@apollo/client";
import RESET_PASSWORD_MUTATION from "@/app/graphql/resetPasswordMutation";
import { ResetPasswordResponse } from "@/types/ResetPasswordResponse";
import { ResetPasswordVariables } from "@/types/ResetPasswordVariables";

export default function ResetPasswordForm() {
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [token, setToken] = useState("");
    const [tokenError, setTokenError] = useState("");
  
    const router = useRouter();
    const searchParams = useSearchParams();
    const [resetPassword, { loading }] = useMutation<
      ResetPasswordResponse,
      ResetPasswordVariables
    >(RESET_PASSWORD_MUTATION);
  
    useEffect(() => {
      const urlToken = searchParams.get("token");
      if (urlToken) {
        setToken(urlToken);
        setTokenError("");
      } else {
        setTokenError(
          "Invalid or missing reset token. Please check your email link.",
        );
      }
    }, [searchParams]);
  
    const validatePassword = (password: string) => {
      if (!password.trim()) {
        return "Password cannot be empty";
      }
      if (password.length < 8) {
        return "Password must be at least 8 characters";
      }
      if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(password)) {
        return "Password must contain at least one uppercase letter, one lowercase letter, and one number";
      }
      return null;
    };
  
    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      setError("");
  
      if (!token) {
        setError("Reset token is missing. Please use the link from your email.");
        return;
      }
  
      const passwordValidation = validatePassword(password);
      if (passwordValidation) {
        setError(passwordValidation);
        return;
      }
  
      if (password !== confirmPassword) {
        setError("Passwords do not match");
        return;
      }
  
      try {
        const result = await resetPassword({
          variables: {
            args: {
              token: token,
              newPassword: password,
              confirmPassword: confirmPassword,
            },
          },
        });
  
        if (result.data?.resetPassword?.status === "Success") {
          alert(result.data.resetPassword.message);
          router.push("/login");
        } else {
          setError("Password reset failed. Please try again.");
        }
      } catch (err: any) {
        console.error("Password reset error:", err);
  
        if (err.graphQLErrors && err.graphQLErrors.length > 0) {
          const graphQLError = err.graphQLErrors[0];
          if (graphQLError.message.includes("token")) {
            setError(
              "Reset token is invalid or has expired. Please request a new password reset.",
            );
          } else {
            setError(
              graphQLError.message ||
                "Failed to reset password. Please try again.",
            );
          }
        } else if (err.networkError) {
          setError("Network error. Please check your connection and try again.");
        } else {
          setError("Failed to reset password. Please try again.");
        }
      }
    };
  
    if (tokenError) {
      return (
        <div className="flex items-center justify-center min-h-screen w-full bg-gradient-to-br from-gray-50 to-gray-100">
          <div className="w-full max-w-md mx-4 bg-white shadow-lg rounded-xl overflow-hidden border">
            <div className="p-6 space-y-1">
              <h2 className="text-2xl font-bold text-center text-red-600 flex items-center justify-center gap-2">
                <AlertCircle size={24} />
                Invalid Link
              </h2>
            </div>
            <div className="p-6 pt-0 space-y-4 text-center">
              <p className="text-gray-600">{tokenError}</p>
              <button
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
                onClick={() => router.push("/forgot-password")}
              >
                Request New Reset Link
              </button>
              <div className="text-center text-sm text-gray-600">
                Remember your password?{" "}
                <button
                  onClick={() => router.push("/login")}
                  className="text-blue-600 hover:underline"
                >
                  Sign in
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    }
  
    return (
      <div className="flex items-center justify-center min-h-screen w-full bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="w-full max-w-md mx-4 bg-white shadow-lg rounded-xl overflow-hidden border">
          <div className="p-6 space-y-1">
            <h2 className="text-2xl font-bold text-center">
              Set a New Password
            </h2>
            <p className="text-sm text-gray-600 text-center">
              Enter your new password below
            </p>
          </div>
          <form onSubmit={handleSubmit} className="p-6 pt-0 space-y-4">
            <div className="space-y-2">
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="New password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pr-10 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  disabled={loading}
                  required
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={loading}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
  
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm new password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full pr-10 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  disabled={loading}
                  required
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  disabled={loading}
                >
                  {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
  
              <div className="text-xs text-gray-600 space-y-1">
                <p>Password must contain:</p>
                <ul className="list-disc list-inside space-y-0.5 ml-2">
                  <li>At least 8 characters</li>
                  <li>One uppercase letter</li>
                  <li>One lowercase letter</li>
                  <li>One number</li>
                </ul>
              </div>
  
              {error && (
                <p className="text-red-500 text-sm px-2 flex items-center gap-2">
                  <AlertCircle size={16} />
                  {error}
                </p>
              )}
            </div>
  
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              disabled={loading || !token}
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Resetting Password...
                </span>
              ) : (
                "Reset Password"
              )}
            </button>
  
            <div className="text-center text-sm text-gray-600">
              Remember your password?{" "}
              <button
                type="button"
                onClick={() => router.push("/login")}
                className="text-blue-600 hover:underline"
              >
                Sign in
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }