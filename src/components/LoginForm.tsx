"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, XCircle, Eye, EyeOff, ArrowLeft } from "lucide-react";
import { FcGoogle } from "react-icons/fc";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { loginSchema } from "@/schema/loginSchema";

function AuthModal({
  open,
  status,
  message,
}: {
  open: boolean;
  status: "success" | "error" | null;
  message: string;
}) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="modal"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
        >
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.9 }}
            className={`rounded-2xl shadow-xl p-6 text-center w-[90%] max-w-sm ${
              status === "success" ? "bg-green-50" : "bg-red-50"
            }`}
          >
            {status === "success" ? (
              <CheckCircle className="w-12 h-12 mx-auto text-green-600 mb-3" />
            ) : (
              <XCircle className="w-12 h-12 mx-auto text-red-600 mb-3" />
            )}

            <h3
              className={`text-lg font-semibold mb-1 ${
                status === "success" ? "text-green-700" : "text-red-700"
              }`}
            >
              {status === "success" ? "Berhasil!" : "Gagal!"}
            </h3>

            <p className="text-gray-600 text-sm">{message}</p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const router = useRouter();

  // State Management
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalStatus, setModalStatus] = useState<"success" | "error" | null>(
    null,
  );
  const [modalMessage, setModalMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  function setCookie(name: string, value: string, days = 1) {
    const expires = new Date(Date.now() + days * 864e5).toUTCString();
    document.cookie = `${name}=${value}; path=/; expires=${expires}`;
  }

  const validateEmail = (email: string) => {
    const result = loginSchema.safeParse({ email, password: "dummy" });

    if (!result.success) {
      const emailError = result.error.flatten().fieldErrors.email?.[0];
      if (emailError) {
        setEmailError(emailError);
        return false;
      }
    }

    setEmailError("");
    return true;
  };

  const validatePassword = (password: string) => {
    const result = loginSchema.safeParse({
      email: "test@email.com",
      password,
    });

    if (!result.success) {
      const passwordError = result.error.flatten().fieldErrors.password?.[0];
      if (passwordError) {
        setPasswordError(passwordError);
        return false;
      }
    }

    setPasswordError("");
    return true;
  };

  useEffect(() => {
    if (typeof window === "undefined") return;

    const params = new URLSearchParams(window.location.search);
    const code = params.get("code");
    const accessToken = params.get("accessToken");
    const refreshToken = params.get("refreshToken");

    // Handle direct token callback
    if (accessToken && refreshToken) {
      setCookie("accessToken", accessToken);
      setCookie("refreshToken", refreshToken);

      setModalStatus("success");
      setModalMessage("Login Google berhasil!");
      setModalOpen(true);

      router.replace("/login");

      setTimeout(() => {
        setModalOpen(false);
        router.push("/");
      }, 1200);
      return;
    }

    // Handle Google OAuth code callback
    if (code) {
      (async () => {
        try {
          const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/api/auth/google/callback?code=${code}`,
          );
          const data = await res.json();

          if (!res.ok) {
            setModalStatus("error");
            setModalMessage(data.message || "Gagal login Google.");
            setModalOpen(true);
            setTimeout(() => setModalOpen(false), 1500);
            return;
          }

          setCookie("accessToken", data.data?.accessToken);
          setCookie("refreshToken", data.data?.refreshToken);

          setModalStatus("success");
          setModalMessage("Login Google berhasil!");
          setModalOpen(true);

          window.history.replaceState({}, "", "/login");

          setTimeout(() => {
            setModalOpen(false);
            router.push("/");
          }, 1200);
        } catch {
          setModalStatus("error");
          setModalMessage("Tidak dapat terhubung ke server.");
          setModalOpen(true);
          setTimeout(() => setModalOpen(false), 1500);
        }
      })();
    }
  }, [router]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    const email = (document.getElementById("email") as HTMLInputElement)?.value;
    const password = (document.getElementById("password") as HTMLInputElement)
      ?.value;

    const result = loginSchema.safeParse({ email, password });

    if (!result.success) {
      const errors = result.error.flatten().fieldErrors;

      setEmailError(errors.email?.[0] || "");
      setPasswordError(errors.password?.[0] || "");

      setModalStatus("error");
      setModalMessage("Periksa kembali email dan password");
      setModalOpen(true);
      setTimeout(() => setModalOpen(false), 1500);
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(result.data),
        },
      );

      const data = await response.json();

      if (response.ok) {
        const role = (data.data?.user?.role || "user").toLowerCase();
        setCookie("accessToken", data.data?.accessToken);
        setCookie("role", role);

        setModalStatus("success");
        setModalMessage(`Login berhasil sebagai ${role}!`);
        setModalOpen(true);

        setTimeout(() => {
          setModalOpen(false);
          router.push(role === "admin" ? "/admin" : "/");
        }, 1200);
      } else {
        setModalStatus("error");
        setModalMessage(data.message || "Email atau password salah.");
        setModalOpen(true);
        setTimeout(() => setModalOpen(false), 1500);
      }
    } catch {
      setModalStatus("error");
      setModalMessage("Tidak dapat terhubung ke server.");
      setModalOpen(true);
      setTimeout(() => setModalOpen(false), 1500);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    router.push(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/google`);
  };

  return (
    <>
      <section
        className={cn(
          "flex flex-col items-center justify-center min-h-screen px-4",
          className,
        )}
        {...props}
      >
        <Card className="w-full max-w-md shadow-lg border border-gray-100 rounded-2xl bg-white/80 backdrop-blur">
          {/* Header */}
          <CardHeader className="text-center pb-2 flex flex-col items-center">
            <Link
              href="/"
              aria-label="Kembali ke beranda"
              className="absolute left-6 top-6 flex items-center gap-1 text-blue-600 hover:text-blue-700 transition-all duration-200 hover:-translate-x-0.5"
            >
              <ArrowLeft size={22} />
              <span className="text-sm font-medium hidden sm:inline">Home</span>
            </Link>

            <Image
              src="/images/logo.png"
              alt="Logo"
              width={61}
              height={61}
              className="w-16 h-16 object-contain mb-3"
            />

            <CardTitle className="text-2xl font-bold text-gray-800">
              Login Akun
            </CardTitle>

            <CardDescription className="text-gray-500">
              Masuk ke akun kamu untuk melanjutkan
            </CardDescription>
          </CardHeader>

          {/* Content */}
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-5">
              {/* Email Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  onBlur={(e) => validateEmail(e.target.value)}
                />
                {emailError && (
                  <p className="text-xs text-red-500 mt-1">{emailError}</p>
                )}
              </div>

              {/* Password Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>

                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    onBlur={(e) => validatePassword(e.target.value)}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer"
                  >
                    {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
                  </button>
                </div>

                {passwordError && (
                  <p className="text-xs text-red-500 mt-1">{passwordError}</p>
                )}

                <Link
                  href="/forgot-password"
                  className="block text-right text-sm text-gray-500
             hover:text-blue-600
             focus:outline-none
             active:text-gray-500"
                >
                  Lupa password?
                </Link>
              </div>

              {/* Login Button */}
              <Button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white cursor-pointer"
                disabled={loading}
              >
                {loading ? "Sedang masuk..." : "Login"}
              </Button>

              {/* Divider */}
              <div className="relative">
                <hr />
                <span className="absolute left-1/2 -translate-x-1/2 -top-2 bg-white px-2 text-gray-400 text-sm">
                  atau
                </span>
              </div>

              {/* Google Login Button */}
              <Button
                variant="outline"
                type="button"
                onClick={handleGoogleLogin}
                className="w-full flex gap-2 cursor-pointer"
              >
                <FcGoogle size={20} />
                Login dengan Google
              </Button>

              {/* Sign Up Link */}
              <p className="text-center text-sm text-gray-500">
                Don't have an account?{" "}
                <Link href="/signup" className="text-blue-600 hover:underline">
                  Sign Up
                </Link>
              </p>
            </form>
          </CardContent>
        </Card>
      </section>

      {/* Modal */}
      <AuthModal open={modalOpen} status={modalStatus} message={modalMessage} />
    </>
  );
}
