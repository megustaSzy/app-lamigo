"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import SearchCard from "./SearchCard";
// import { Calendar, Clock, Users, Search, MapPin } from "lucide-react";

const images = ["/images/hero1.jpg", "/images/hero2.jpg", "/images/hero3.jpg"];

export default function Hero() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative w-full h-[90vh] flex flex-col justify-end overflow-visible">
      {/* Background Slider */}
      <div className="absolute inset-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={images[current]}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="absolute inset-0"
          >
            <Image
              src={images[current]}
              alt={`Hero Background ${current + 1}`}
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-black/50" />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Hero Content */}
      <div className="relative z-10 flex flex-col justify-center items-center text-center text-white px-4 py-28 md:py-40">
        <div className="flex flex-col items-center gap-1">
          <div className="relative z-10 flex flex-col justify-center items-center text-center px-4 py-0 md:py-0">
            <div className="w-24 h-24 md:w-40 md:h-40 relative mb-6 md:mb-0">
              <Image
                src="/images/best.png"
                alt="Best"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                style={{ objectFit: "cover" }}
              />
            </div>
          </div>
        </div>

        <h1 className="text-4xl md:text-6xl font-extrabold mb-5">
          LamiGo Jelajah Alam Lampung
        </h1>

        <p className="max-w-2xl text-sm md:text-base mb-5 opacity-90">
          Temukan destinasi terbaik, atur perjalanan impianmu, dan pesan tiket
          dengan mudah dalam satu aplikasi lengkap untuk semua kebutuhan
          liburan.
        </p>

        <div className="flex gap-2 mb-0">
          {images.map((_, index) => (
            <span
              key={index}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                current === index ? "bg-white" : "bg-white/40"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Hanya satu SearchCard di sini */}
      <div className="absolute left-1/2 bottom-0 transform -translate-x-1/2 translate-y-1/2 w-full px-4 z-20">
        <SearchCard />
      </div>
    </section>
  );
}
