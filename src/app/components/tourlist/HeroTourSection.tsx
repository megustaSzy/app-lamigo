"use client";
import Image from "next/image";

export default function HeroTourSection() {
  return (
    <div className="relative w-full h-107.5 overflow-hidden rounded-b-none shadow-lg font-poppins">
      {/* Background Image */}
      <Image src="/images/image.png" alt="Hero" fill className="object-cover" />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40"></div>

      {/* Text */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-4">
        <h1 className="text-3xl font-bold mb-2">
          Kabupaten & Kota{" "}
          <span className="text-yellow-400 font-bold">di Lampung</span>
        </h1>

        <p className="max-w-xl text-sm opacity-90 leading-relaxed font-sans ">
          Jelajahi berbagai wisata di kabupaten dan kota provinsi Lampung.
          <br />
          setiap daerah memiliki keunikan dan pesona wisata yang berbeda-beda.
        </p>
      </div>
    </div>
  );
}
