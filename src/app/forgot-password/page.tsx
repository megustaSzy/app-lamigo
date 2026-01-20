import { ForgotPasswordForm } from "@/components/ForgotPasswordForm";
import { cn } from "@/lib/utils";

export default function ForgotPasswordPage() {
  return (
    <div
      className={cn(
        "flex min-h-svh w-full items-center justify-center",
        "bg-slate-50 p-6 md:p-10"
      )}
    >
      <div className="w-full max-w-sm">
        <ForgotPasswordForm />
      </div>
    </div>
  );
}
