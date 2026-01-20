"use client";

import dynamic from "next/dynamic";

const ResetPasswordForm = dynamic(
  () => import("@/components/ResetPasswordForm"),
  { ssr: false }
);

export default function ResetPasswordPage() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center bg-slate-50 p-6 md:p-10">
      <div className="w-full max-w-sm">
        <ResetPasswordForm />
      </div>
    </div>
  );
}
