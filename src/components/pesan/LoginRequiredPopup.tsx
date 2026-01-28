"use client";

import { X, LogIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export function LoginRequiredPopup({
  onClose,
  redirectTo,
}: {
  onClose: () => void;
  redirectTo: string;
}) {
  const router = useRouter();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
      <div className="w-full max-w-sm rounded-3xl bg-white shadow-xl overflow-hidden">
        {/* HEADER */}
        <div className="relative bg-blue-600 px-6 py-4 text-white">
          <h3 className="text-center text-base font-semibold">
            Login Diperlukan
          </h3>

          <button
            onClick={onClose}
            className="absolute right-4 top-4 text-white/80 hover:text-white"
          >
            <X size={18} />
          </button>
        </div>

        {/* CONTENT */}
        <div className="px-6 py-5 text-sm text-center space-y-3">
          <p className="text-neutral-700">
            Untuk melanjutkan pemesanan tiket, silakan login terlebih dahulu.
          </p>
        </div>

        {/* ACTION */}
        <div className="px-6 pb-6 flex gap-3">
          <Button
            variant="outline"
            onClick={onClose}
            className="flex-1 rounded-xl cursor-pointer"
          >
            Batal
          </Button>

          <Button
            onClick={() =>
              router.push(`/login?redirect=${encodeURIComponent(redirectTo)}`)
            }
            className="flex-1 rounded-xl bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2 justify-center cursor-pointer"
          >
            <LogIn size={16} />
            Login
          </Button>
        </div>
      </div>
    </div>
  );
}
