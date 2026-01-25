"use client";

import { useEffect, useState } from "react";
import {
  Menu,
  Sun,
  Moon,
  ChevronDown,
  Search,
  User,
  LogOut,
  AlertTriangle,
} from "lucide-react";
import { apiFetch } from "@/helpers/api";
import Cookies from "js-cookie";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { AvatarImage } from "@radix-ui/react-avatar";
import { Profile } from "@/types/admin/profile";

export default function TopBar({
  toggleSidebar,
}: {
  toggleSidebar: () => void;
}) {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [dark, setDark] = useState(false);
  const [logoutOpen, setLogoutOpen] = useState(false);

  // fetch profile
  useEffect(() => {
    const token = Cookies.get("accessToken");
    if (!token) return;

    const fetchProfile = async () => {
      try {
        const res = await apiFetch<{ data: Profile }>("/api/users/profile");
        setProfile(res.data);
      } catch {
        // silent
      }
    };

    fetchProfile();
  }, []);

  // logout logic
  const handleLogout = async () => {
    try {
      await apiFetch("/api/auth/logout", {
        method: "POST",
        body: JSON.stringify({
          refreshToken: Cookies.get("refreshToken"),
        }),
      });
    } catch (err) {
      console.error("Logout error:", err);
    } finally {
      Cookies.remove("accessToken");
      Cookies.remove("refreshToken");
      Cookies.remove("role");

      localStorage.clear();
      sessionStorage.clear();

      window.location.href = "/login";
    }
  };

  return (
    <>
      <header className="sticky top-0 z-30 w-full bg-white dark:bg-[#0b0f19] shadow-sm border-b dark:border-neutral-800">
        <div className="flex h-16 items-center justify-between px-6">
          {/* LEFT */}
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleSidebar}
              className="lg:hidden text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-neutral-800"
            >
              <Menu className="h-5 w-5" />
            </Button>

            <div className="relative hidden md:flex items-center">
              <Search className="absolute left-3 h-4 w-4 text-gray-400 dark:text-gray-500" />
              <Input
                type="search"
                placeholder="Search..."
                className="pl-10 w-64 lg:w-80 bg-gray-50 dark:bg-neutral-900 border-gray-200 dark:border-neutral-700 focus-visible:ring-blue-500"
              />
            </div>
          </div>

          {/* RIGHT */}
          <div className="flex items-center gap-3">
            {/* THEME TOGGLE */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => {
                const newMode = !dark;
                setDark(newMode);
                document.documentElement.classList.toggle("dark", newMode);
                localStorage.setItem("theme", newMode ? "dark" : "light");
              }}
              className="text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-neutral-800"
            >
              {dark ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </Button>

            {/* PROFILE DROPDOWN */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="flex items-center gap-3 hover:bg-gray-100 dark:hover:bg-neutral-800"
                >
                  <Avatar className="h-9 w-9 border-2 border-blue-100 dark:border-neutral-700">
                    <AvatarImage
                      src={profile?.avatar}
                      className="object-cover"
                    />
                  </Avatar>

                  <div className="hidden sm:flex flex-col items-start">
                    <span className="text-sm font-semibold dark:text-gray-200">
                      {profile?.name ?? "Loading..."}
                    </span>
                    <span className="text-xs text-gray-500 dark:text-gray-400 capitalize">
                      {profile?.role ?? ""}
                    </span>
                  </div>

                  <ChevronDown className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent
                align="end"
                className="w-56 bg-white dark:bg-neutral-900 border-gray-200 dark:border-neutral-700"
              >
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none dark:text-gray-200">
                      {profile?.name}
                    </p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {profile?.email}
                    </p>
                  </div>
                </DropdownMenuLabel>

                <DropdownMenuSeparator className="dark:bg-neutral-800" />

                <DropdownMenuItem
                  onClick={() => {
                    window.location.href = "/admin/profile";
                  }}
                  className="cursor-pointer dark:hover:bg-neutral-800 dark:focus:bg-neutral-800"
                >
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>

                <DropdownMenuSeparator className="dark:bg-neutral-800" />

                <DropdownMenuItem
                  onClick={() => setLogoutOpen(true)}
                  className="cursor-pointer text-red-600 dark:text-red-400 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800 focus:text-red-600 dark:focus:text-red-400"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Logout</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      {/* ALERT LOGOUT */}
      <AlertDialog open={logoutOpen} onOpenChange={setLogoutOpen}>
        <AlertDialogContent className="rounded-2xl">
          <AlertDialogHeader>
            <div className="flex items-center gap-3 mb-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/20">
                <AlertTriangle className="h-5 w-5 text-red-600 dark:text-red-400" />
              </div>
              <AlertDialogTitle className="text-xl">
                Konfirmasi Logout
              </AlertDialogTitle>
            </div>
            <AlertDialogDescription className="text-base">
              Apakah kamu yakin ingin keluar dari akun admin? Kamu harus login
              kembali untuk mengakses dashboard.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="gap-2 sm:gap-2">
            <AlertDialogCancel className="rounded-lg">Batal</AlertDialogCancel>
            <AlertDialogAction
              className="bg-red-600 hover:bg-red-700 rounded-lg"
              onClick={handleLogout}
            >
              Ya, Logout
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
