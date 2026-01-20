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
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
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
        }
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
        className="w-full max-w-md shadow-lg border border-gray-100 rounded-2xl"
      >
        {/* LOGO */}
        <div className="flex justify-center mb-4">
          <img
            src="/images/logo.png"
            alt="Logo"
            className="h-20 w-auto object-contain"
          />
        </div>

        <CardHeader className="text-center space-y-0">
          <CardTitle className="text-2xl font-semibold text-gray-800">
            Create an Account
          </CardTitle>
          <CardDescription className="text-gray-500 text-sm">
            Enter your information to get started
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit(handleSignup)} className="space-y-4">
            <FieldGroup className="space-y-0">
              <Field>
                <FieldLabel htmlFor="name">Full Name</FieldLabel>
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
              </Field>

              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
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
              </Field>

              <Field>
                <FieldLabel htmlFor="password">Password</FieldLabel>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  {...register("password")}
                />
                {errors.password && (
                  <p className="text-xs text-red-500 mt-1">
                    {errors.password.message}
                  </p>
                )}
              </Field>

              <Field>
                <FieldLabel htmlFor="notelp">No Handphone</FieldLabel>
                <Input
                  id="notelp"
                  type="text"
                  placeholder="08xxxxxxxxxx"
                  {...register("notelp")}
                />
                {errors.notelp && (
                  <p className="text-xs text-red-500 mt-1">
                    {errors.notelp.message}
                  </p>
                )}
              </Field>
            </FieldGroup>

            <div className="flex flex-col gap-3">
              <Button
                type="submit"
                className="w-full bg-blue-500 hover:bg-blue-700 text-white"
                disabled={loading}
              >
                {loading ? "Membuat akun..." : "Create Account"}
              </Button>

              <Button
                variant="outline"
                type="button"
                className="w-full flex items-center justify-center gap-2"
              >
                <FcGoogle size={20} />
                Sign up with Google
              </Button>
            </div>

            {message && (
              <p className="text-center text-sm text-gray-600 mt-2">
                {message}
              </p>
            )}

            <p className="text-sm text-center text-gray-500 mt-4">
              Already have an account?{" "}
              <Link
                href="/login"
                className="text-primary font-medium hover:underline"
              >
                Sign in
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
