import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true, // konfigurasi lama tetap
  images: {
    domains: ["res.cloudinary.com"], // tambahkan domain gambar eksternal
  },
};

export default nextConfig;
