/* eslint-disable @next/next/no-img-element */
"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Eye, EyeOff } from "lucide-react";
import { Input } from "@/components/ui/input";
import { FcGoogle } from "react-icons/fc";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { registerSchema } from "@/schema/registerSchema";

type RegisterFormInput = z.input<typeof registerSchema>;

export default function SignupForm(props: React.ComponentProps<typeof Card>) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormInput>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      role: "User",
      notelp: "",
    },
  });

  const handleSignup = async (data: RegisterFormInput): Promise<void> => {
    try {
      setLoading(true);
      setMessage("");

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/register`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        },
      );

      const result: { message?: string } = await response.json();
      if (!response.ok) {
        setMessage(result.message ?? "Pendaftaran gagal. Coba lagi.");
        return;
      }

      setShowSuccess(true);

      setTimeout(() => {
        setShowSuccess(false);
        router.push("/login");
      }, 3000);
    } catch (error) {
      console.error(error);
      setMessage("Tidak dapat terhubung ke server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <Card
        {...props}
        className="w-full max-w-md shadow-lg border border-gray-100 rounded-2xl bg-white/80 backdrop-blur"
      >
        <CardHeader className="text-center pb-2 flex flex-col items-center">
          <img
            src="/images/logo.png"
            alt="Logo"
            className="w-16 h-16 object-contain mb-3"
          />

          <CardTitle className="text-2xl font-bold text-gray-800">
            Create an Account
          </CardTitle>

          <CardDescription className="text-gray-500">
            Enter your information to get started
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit(handleSignup)} className="space-y-4">
            {/* Full Name Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Full Name
              </label>
              <Input
                id="name"
                type="text"
                placeholder="LamiGo"
                {...register("name")}
              />
              {errors.name && (
                <p className="text-xs text-red-500 mt-1">
                  {errors.name.message}
                </p>
              )}
            </div>

            {/* Email Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <Input
                id="email"
                type="email"
                placeholder="example@gmail.com"
                {...register("email")}
              />
              {errors.email && (
                <p className="text-xs text-red-500 mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password Field */}
            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700">
                Password
              </label>

              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  {...register("password")}
                  className={
                    errors.password
                      ? "border-red-500 focus-visible:ring-red-500"
                      : ""
                  }
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer"
                >
                  {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
                </button>
              </div>

              {errors.password && (
                <p className="text-xs text-red-500">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* No Handphone Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                No Handphone
              </label>
              <Input
                id="notelp"
                type="text"
                placeholder="+628872738"
                {...register("notelp")}
              />
              {errors.notelp && (
                <p className="text-xs text-red-500 mt-1">
                  {errors.notelp.message}
                </p>
              )}
            </div>

            {/* Create Account Button */}
            <Button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white mt-4 cursor-pointer"
              disabled={loading}
            >
              {loading ? "Membuat akun..." : "Create Account"}
            </Button>

            {/* Divider */}
            <div className="relative">
              <hr />
              <span className="absolute left-1/2 -translate-x-1/2 -top-2 bg-white px-2 text-gray-400 text-sm">
                atau
              </span>
            </div>

            {/* Google Signup Button */}
            <Button
              variant="outline"
              type="button"
              className="w-full flex gap-2 cursor-pointer"
            >
              <FcGoogle size={20} />
              Sign up with Google
            </Button>

            {message && (
              <p className="text-center text-sm text-red-500 mt-2">{message}</p>
            )}

            {/* Sign In Link */}
            <p className="text-center text-sm text-gray-500">
              Already have an account?{" "}
              <Link href="/login" className="text-blue-600 hover:underline">
                Sign In
              </Link>
            </p>
          </form>
        </CardContent>
      </Card>

      {showSuccess && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
          <div className="w-[90%] max-w-sm rounded-xl bg-white px-6 py-7 shadow-xl text-center">
            {/* ICON */}
            <div className="mx-auto mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-green-50">
              <svg
                className="h-5 w-5 text-green-600"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>

            {/* TITLE */}
            <h2 className="text-base font-semibold text-gray-900">
              Registrasi Berhasil
            </h2>

            {/* DESCRIPTION */}
            <p className="mt-1.5 text-sm text-gray-500 leading-relaxed">
              Akun Anda berhasil dibuat. Anda akan diarahkan ke halaman login.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
