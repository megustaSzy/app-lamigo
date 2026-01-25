// /* eslint-disable react-hooks/rules-of-hooks */
"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState, useRef } from "react";
import { Menu, X, ChevronDown, Activity } from "lucide-react";
import Cookies from "js-cookie";
import { apiFetch } from "@/helpers/api";
import { usePathname } from "next/navigation";
import { Poppins } from "next/font/google";
import {
  User as LucideUser,
  LogOut as LucideLogOut,
  LogIn as LucideLogIn,
  Ticket as LucideTicket,
} from "lucide-react";

// ========================
// TIPE API
// ========================
export type ApiProfileResponse = {
  status: number;
  message: string;
  data: {
    id: number;
    name: string;
    email: string;
    role: string;
    avatar?: string | null;
  };
};
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

// ========================
// KOMPONEN NAVBAR
// ========================
export default function NavBar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState({
    name: "User",
    avatar: "/images/profile.jpg",
  });

  const [language, setLanguage] = useState("id");
  const [langOpen, setLangOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [logoutConfirm, setLogoutConfirm] = useState(false);

  const [activeMenu, setActiveMenu] = useState("home");

  const translationSource = {
    home: "Beranda",
    about: "Tentang Kami",
    tour: "Daftar Kabupaten",
    ticket: "Tiket Saya",
    activity: "Log Aktivitas",
    contact: "Kontak",
    login: "Masuk",
    signup: "Daftar",
    editProfile: "Profil",
    logout: "Logout",
  };

  const [translations] = useState(translationSource);

  // const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const pathname = usePathname();

  const buildAvatarUrl = (avatar?: string | null) => {
    if (!avatar) return "/images/profile.jpg";
    return avatar;
  };
  const langRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  // ==========================
  // SCROLL EFFECT
  // ==========================
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const token = Cookies.get("accessToken");

    if (!token) {
      setIsLoggedIn(false);
      setUserData({ name: "User", avatar: "/images/profile.jpg" });
      return;
    }

    const loadProfile = async () => {
      try {
        const res = await apiFetch<ApiProfileResponse>("/api/users/profile");

        if (res?.data) {
          setIsLoggedIn(true);
          setUserData({
            name: res.data.name || "User",
            avatar: buildAvatarUrl(res.data.avatar),
          });

          localStorage.setItem(
            "profile",
            JSON.stringify({
              name: res.data.name,
              avatar: res.data.avatar,
            }),
          );
        }
      } catch {
        // token invalid / expired
        setIsLoggedIn(false);
        setUserData({ name: "User", avatar: "/images/profile.jpg" });
      }
    };

    loadProfile();
  }, [pathname]);

  useEffect(() => {
    const savedLang = localStorage.getItem("language") || "id";
    setLanguage(savedLang);
  }, []);

  useEffect(() => {
    if (pathname === "/") setActiveMenu("home");
    else if (pathname.startsWith("/about")) setActiveMenu("about");
    else if (pathname.startsWith("/tourlist")) setActiveMenu("tour");
    else if (pathname.startsWith("/tiket")) setActiveMenu("ticket");
    else if (pathname.startsWith("/contact")) setActiveMenu("contact");
    else setActiveMenu(""); // default
  }, [pathname]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(e.target as Node)) {
        setLangOpen(false);
      }
      if (
        profileRef.current &&
        !profileRef.current.contains(e.target as Node)
      ) {
        setProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  const handleLogout = async () => {
    try {
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/logout`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      Cookies.remove("accessToken", { path: "/" });
      Cookies.remove("refreshToken", { path: "/" });
      Cookies.remove("role", { path: "/" });

      localStorage.clear();
      sessionStorage.clear();
      localStorage.removeItem("profile");
      setIsLoggedIn(false);
      setUserData({ name: "User", avatar: "/images/profile.jpg" });
      window.location.href = "/login";
    }
  };

  const textColor = scrolled ? "text-gray-800" : "text-white";
  const borderColor = scrolled ? "border-gray-700" : "border-white";

  return (
    <header
      className={`${poppins.className} fixed top-0 left-0 w-full z-50
  text-sm
  transition-all duration-300
  ${
    scrolled
      ? "bg-white shadow-md border-b border-gray-200"
      : "bg-white/2 backdrop-blur-[1px] border-b border-white/2"
  } 
  `}
    >
      <div className="max-w-7xl mx-auto px-4 flex items-center h-16">
        {/* LOGO */}
        <div className="relative w-10 h-10">
          <Image
            src="/images/logo.png"
            alt="Logo"
            fill
            sizes="(max-width: 768px) 30px, 40px"
            style={{ objectFit: "contain" }}
            priority
          />
        </div>

        {/* DESKTOP MENU */}
        <nav
          className={`hidden md:flex absolute left-1/2 -translate-x-1/2 gap-8`}
        >
          <Link
            href="/"
            onClick={() => setActiveMenu("home")}
            className={`transition-colors duration-200 font-medium ${
              activeMenu === "home" ? "text-blue-600" : textColor
            }`}
          >
            {translations.home}
          </Link>
          <Link
            href="/about"
            onClick={() => setActiveMenu("about")}
            className={`transition-colors duration-200 font-medium ${
              activeMenu === "about" ? "text-blue-600" : textColor
            }`}
          >
            {translations.about}
          </Link>
          <Link
            href="/tourlist"
            onClick={() => setActiveMenu("tour")}
            className={`transition-colors duration-200 font-medium ${
              activeMenu === "tour" ? "text-blue-600" : textColor
            }`}
          >
            {translations.tour}
          </Link>
          <Link
            href="/tiket"
            onClick={() => setActiveMenu("ticket")}
            className={`transition-colors duration-200 font-medium ${
              activeMenu === "ticket" ? "text-blue-600" : textColor
            }`}
          >
            {translations.ticket}
          </Link>
          <button
            onClick={() => {
              setActiveMenu("contact"); // set menu aktif
              window.scrollTo({
                top: document.body.scrollHeight, // scroll ke bawah
                behavior: "smooth",
              });
            }}
            className={`transition-colors duration-200 cursor-pointer font-medium ${
              activeMenu === "contact" ? "text-blue-600" : textColor
            }`}
          >
            {translations.contact}
          </button>
        </nav>

        {/* RIGHT SIDE */}
        <div className="hidden md:flex gap-4 ml-auto items-center">
          {/* LANGUAGE */}
          <div className="relative" ref={langRef}>
            <button
              onClick={() => setLangOpen((prev) => !prev)}
              className={`flex items-center gap-1 px-3 py-1 border rounded-md text-sm ${textColor} cursor-pointer`}
            >
              {language.toUpperCase()}
              <ChevronDown
                size={16}
                className={`transition-transform duration-200 cursor-pointer ${
                  langOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {langOpen && (
              <div
                className={`absolute right-0 mt-1 w-36 bg-white shadow rounded-md overflow-hidden z-50 ${poppins.className}`}
              >
                <button
                  onClick={() => {
                    setLanguage("id");
                    localStorage.setItem("language", "id");
                    setLangOpen(false);
                  }}
                  className="w-full flex items-center gap-2 px-4 py-2 
                 font-normal text-gray-700
                 hover:bg-blue-50 hover:text-blue-600
                 active:bg-blue-100
                 transition-colors duration-150"
                >
                  <span className="text-lg">🇮🇩</span>
                  <span>Indonesia</span>
                </button>

                <button
                  onClick={() => {
                    setLanguage("en");
                    localStorage.setItem("language", "en");
                    setLangOpen(false);
                  }}
                  className="w-full flex items-center gap-2 px-4 py-2
                 font-normal text-gray-700
                 hover:bg-blue-50 hover:text-blue-600
                 active:bg-blue-100
                 transition-colors duration-150"
                >
                  <span className="text-lg">🇺🇸</span>
                  <span>English</span>
                </button>
              </div>
            )}
          </div>
          {/* PROFILE */}
          <div className="relative" ref={profileRef}>
            {isLoggedIn ? (
              <>
                <button
                  onClick={() => setProfileOpen((prev) => !prev)}
                  className={`flex items-center gap-2 px-2 py-1 rounded-md text-sm-gray-100 transition ${textColor} cursor-pointer`}
                >
                  <Image
                    src={userData.avatar}
                    width={32}
                    height={32}
                    alt="Profile"
                    className="rounded-full"
                    unoptimized
                  />
                  <span className="text-sm">{userData.name}</span>
                  <ChevronDown
                    size={14}
                    className={`transition-transform duration-200 ${
                      profileOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {profileOpen && (
                  <div className="absolute right-0 mt-1 w-44 bg-white shadow rounded-md overflow-hidden z-50">
                    <Link
                      href="/profil"
                      className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 text-sm text-gray-800"
                      onClick={() => setProfileOpen(false)}
                    >
                      <LucideUser size={16} />
                      {translations.editProfile}
                    </Link>
                    <Link
                      href="/tiket"
                      className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 text-sm text-gray-800"
                      onClick={() => setProfileOpen(false)}
                    >
                      <LucideTicket size={16} />
                      {translations.ticket}
                    </Link>
                    <Link
                      href="/log-aktivitas"
                      className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 text-sm text-gray-800"
                      onClick={() => setProfileOpen(false)}
                    >
                      <Activity size={16} />
                      {translations.activity}
                    </Link>
                    <button
                      onClick={() => {
                        setLogoutConfirm(true);
                        setProfileOpen(false);
                      }}
                      className="flex items-center gap-2 w-full text-left px-4 py-2 hover:bg-red-100 text-red-600 text-sm cursor-pointer"
                    >
                      <LucideLogOut size={16} />
                      {translations.logout}
                    </button>
                  </div>
                )}
              </>
            ) : (
              <Link
                href="/login"
                className={`flex items-center gap-2 px-4 py-1 rounded-full border ${textColor} ${borderColor}`}
              >
                <LucideLogIn size={16} />
                {translations.login}
              </Link>
            )}
          </div>
        </div>

        {/* BURGER MENU */}
        <button
          onClick={() => setOpen((p) => !p)}
          className="md:hidden ml-auto p-2"
        >
          {open ? (
            <X className={scrolled ? "text-gray-800" : "text-white"} />
          ) : (
            <Menu className={scrolled ? "text-gray-800" : "text-white"} />
          )}
        </button>
      </div>

      {/* MOBILE MENU */}
      <div
        className={`md:hidden overflow-hidden transition-all ${
          open ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="bg-white border-t px-4 py-4 text-gray-800">
          <nav className="flex flex-col gap-4 text-center">
            <Link
              href="/"
              onClick={() => {
                setActiveMenu("home");
                setOpen(false);
              }}
              className={`${activeMenu === "home" ? "text-blue-600" : ""}`}
            >
              {translations.home}
            </Link>
            <Link
              href="/about"
              onClick={() => {
                setActiveMenu("about");
                setOpen(false);
              }}
              className={`${activeMenu === "about" ? "text-blue-600" : ""}`}
            >
              {translations.about}
            </Link>
            <Link
              href="/tourlist"
              onClick={() => {
                setActiveMenu("tour");
                setOpen(false);
              }}
              className={`${activeMenu === "tour" ? "text-blue-600" : ""}`}
            >
              {translations.tour}
            </Link>
            <Link
              href="/tiket"
              onClick={() => {
                setActiveMenu("ticket");
                setOpen(false);
              }}
              className={`${activeMenu === "ticket" ? "text-blue-600" : ""}`}
            >
              {translations.ticket}
            </Link>
            <button
              onClick={() => {
                setActiveMenu("contact");
                window.scrollTo({
                  top: document.body.scrollHeight,
                  behavior: "smooth",
                });
              }}
              className={`${activeMenu === "contact" ? "text-blue-600" : ""}`}
            >
              {translations.contact}
            </button>

            {isLoggedIn ? (
              <>
                <Link
                  href="/profil"
                  onClick={() => setOpen(false)}
                  className="py-2"
                >
                  {translations.editProfile}
                </Link>
                <button
                  onClick={() => {
                    setLogoutConfirm(true);
                    setOpen(false);
                  }}
                  className="py-2 bg-red-500 text-white rounded-md"
                >
                  {translations.logout}
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  onClick={() => setOpen(false)}
                  className="py-2 bg-blue-600 text-white rounded-md"
                >
                  {translations.login}
                </Link>
                <Link
                  href="/signup"
                  onClick={() => setOpen(false)}
                  className="py-2 border border-blue-600 text-blue-600 rounded-md"
                >
                  {translations.signup}
                </Link>
              </>
            )}
          </nav>
        </div>
      </div>

      {/* ===================== */}
      {/* LOGOUT CONFIRM MODAL */}
      {/* ===================== */}
      {logoutConfirm && (
        <div className="fixed inset-0 h-screen z-9999 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl w-[90%] max-w-sm p-6 shadow-2xl animate-scaleIn">
            <div className="flex flex-col items-center text-center">
              <div className="w-14 h-14 flex items-center justify-center rounded-full bg-red-100 text-red-600 mb-4">
                ⚠️
              </div>

              <h2 className="text-lg font-semibold text-gray-800">
                Konfirmasi Logout
              </h2>
              <p className="text-sm text-gray-500 mt-2">
                Apakah Anda yakin ingin keluar dari akun ini?
              </p>

              <div className="flex gap-3 mt-6 w-full">
                <button
                  onClick={() => setLogoutConfirm(false)}
                  className="flex-1 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 transition cursor-pointer"
                >
                  Batal
                </button>

                <button
                  onClick={() => {
                    setLogoutConfirm(false);
                    handleLogout();
                  }}
                  className="flex-1 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition cursor-pointer"
                >
                  Ya, Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
