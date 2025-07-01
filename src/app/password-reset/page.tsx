"use client"
import { Suspense } from "react";
import LoadingFallback from "@/components/LoadingFallback";
import ResetPasswordForm from "@/components/forms/ResetPasswordForm";

export default function ResetPasswordConfirm() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <ResetPasswordForm />
    </Suspense>
  );
}