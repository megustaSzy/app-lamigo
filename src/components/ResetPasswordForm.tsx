"use client";

import { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import Image from "next/image";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ResetPasswordFormData,
  resetPasswordSchema,
} from "@/schema/resetPasswordSchema";

import { Eye, EyeOff } from "lucide-react";

type ApiError = {
  message?: string;
};

export default function ResetPasswordForm() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const sessionToken = searchParams.get("sessionToken") ?? "";

  const [success, setSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
  });

  const onSubmit = async (data: ResetPasswordFormData) => {
    if (!sessionToken) {
      setErrorMessage("Token reset tidak valid atau sudah kadaluarsa.");
      return;
    }

    try {
      setErrorMessage("");

      const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? "";
      if (!API_BASE) {
        setErrorMessage("Service API belum dikonfigurasi.");
        return;
      }

      const res = await fetch(`${API_BASE}/api/auth/reset-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sessionToken,
          newPassword: data.password,
        }),
      });

      const resData: unknown = await res.json();

      if (!res.ok) {
        const error = resData as ApiError;
        throw new Error(error.message ?? "Gagal reset password");
      }

      setSuccess(true);

      setTimeout(() => {
        router.push("/login");
      }, 1500);
    } catch (error: unknown) {
      if (error instanceof Error) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage("Terjadi kesalahan yang tidak diketahui.");
      }
    }
  };

  return (
    <section className="flex flex-col items-center justify-center min-h-screen px-4 bg-linear-to-b from-blue-50 to-white">
      <Card className="w-full max-w-md shadow-lg border border-gray-100 rounded-2xl bg-white/80 backdrop-blur">
        <CardHeader className="text-center pb-2 flex flex-col items-center">
          <Image
            src="/images/logo.png"
            alt="Logo"
            width={61}
            height={61}
            className="w-16 h-16 object-contain mb-3"
          />
          <CardTitle className="text-2xl font-bold text-gray-800">
            Reset Password
          </CardTitle>
          <CardDescription className="text-gray-500">
            Buat password baru untuk akun Anda
          </CardDescription>
        </CardHeader>

        <CardContent>
          {!success ? (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              {errorMessage && (
                <p className="text-sm text-red-600 text-center">
                  {errorMessage}
                </p>
              )}

              {/* PASSWORD BARU */}
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Password Baru
                </label>

                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    className="w-full pr-10"
                    {...register("password")}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>

                {errors.password && (
                  <p className="text-sm text-red-600 mt-1">
                    {errors.password.message}
                  </p>
                )}
              </div>

              {/* KONFIRMASI PASSWORD */}
              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Konfirmasi Password
                </label>

                <div className="relative">
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="••••••••"
                    className="w-full pr-10"
                    {...register("confirmPassword")}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword((v) => !v)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                  >
                    {showConfirmPassword ? (
                      <EyeOff size={18} />
                    ) : (
                      <Eye size={18} />
                    )}
                  </button>
                </div>

                {errors.confirmPassword && (
                  <p className="text-sm text-red-600 mt-1">
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-lg transition-all duration-200"
              >
                {isSubmitting ? "Menyimpan..." : "Simpan Password Baru"}
              </Button>
            </form>
          ) : (
            <div className="text-center space-y-4 py-6">
              <p className="text-gray-600 text-sm">
                Password kamu berhasil diubah! 🎉
              </p>
              <p className="text-xs text-gray-500">
                Mengarahkan ke halaman login...
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </section>
  );
}
