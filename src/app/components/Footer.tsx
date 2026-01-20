/* eslint-disable @next/next/no-img-element */
import { Poppins } from "next/font/google";
import { MapPin, Phone, Mail } from "lucide-react";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export default function Footer() {
  return (
    <footer
      className={`${poppins.className} bg-[#0c1220] text-white pt-16 pb-12 relative overflow-hidden`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10 grid grid-cols-1 md:grid-cols-3 gap-y-8 gap-x-10 space-y-6 md:space-y-0">
        {/* Logo & Deskripsi */}
        <div>
          <div className="flex items-center gap-3 mb-6">
            <img
              src="/images/logo.png"
              alt="LamiGo Logo"
              className="w-12 h-12 object-contain"
            />
            <div className="flex flex-col">
              <h2 className="text-xl font-bold">LamiGo</h2>
              <span className="text-sm text-gray-400 mt-1">
                Ayo, jelajahi keindahan bersama LamiGo
              </span>
            </div>
          </div>
          <p className="text-slate-300 text-sm leading-relaxed">
            Jelajahi keindahan Lampung bersama LamiGo, dari pantai memukau,
            pegunungan hijau, hingga pesona alam yang menakjubkan
          </p>
        </div>

        {/* Tautan Cepat */}
        <div className="md:pl-10">
          <h3 className="font-semibold mb-4 text-white">Tautan Cepat</h3>
          <ul className="space-y-2 text-slate-300 text-sm">
            <li>
              <a href="./" className="hover:text-blue-500 transition-colors">
                Beranda
              </a>
            </li>
            <li>
              <a
                href="./about"
                className="hover:text-blue-500 transition-colors"
              >
                Tentang Kami
              </a>
            </li>
            <li>
              <a
                href="./tourlist"
                className="hover:text-blue-500 transition-colors"
              >
                Daftar Kabupaten
              </a>
            </li>
            <li>
              <a
                href="./tiket"
                className="hover:text-blue-500 transition-colors"
              >
                Tiket Saya
              </a>
            </li>
            <li>
              <a
                href="#kontak"
                className="hover:text-blue-500 transition-colors"
              >
                Kontak
              </a>
            </li>
          </ul>
        </div>

        {/* Kontak */}
        <div id="kontak">
          <h3 className="font-semibold mb-4 text-white">Kontak</h3>
          <ul className="space-y-3 text-slate-300 text-sm">
            <li className="flex items-center gap-3">
              <Mail className="w-4 h-4 text-blue-500" />
              <span>info@lamigo.com</span>
            </li>

            <li className="flex items-center gap-3">
              <Phone className="w-4 h-4 text-blue-500" />
              <span>+62 821-7846-2234</span>
            </li>
            <li className="flex items-center gap-3">
              <MapPin className="w-4 h-4 text-blue-500" />
              <span>Bandar Lampung, Indonesia</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Footer bawah */}
      <div className="mt-10 border-t border-slate-800 pt-10 pb-6 text-center text-slate-400">
        <div className="flex flex-wrap justify-center gap-6 mb-4">
          <img src="/images/dikti.png" alt="Partner 1" className="h-13" />
          <img src="/images/tekno.png" alt="Partner 2" className="h-13" />
          <img src="/images/if.png" alt="Partner 3" className="h-13" />
        </div>
        <p className="text-base">© 2025 LamiGo. Semua hak cipta dilindungi.</p>
      </div>
    </footer>
  );
}
