"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import { StarIcon } from "lucide-react";
import { createTestimoni } from "@/services/testimoniService";

export default function TestimoniForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [profession, setProfession] = useState("");
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);
  const [loading, setLoading] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  // Auto close popup setelah 2 detik
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (showPopup) {
      timer = setTimeout(() => {
        setShowPopup(false);
      }, 2000);
    }
    return () => clearTimeout(timer);
  }, [showPopup]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!comment) {
      alert("Komentar wajib diisi");
      return;
    }

    if (rating !== 5) {
      alert("Mohon beri bintang 5 sebelum mengirim testimoni 😊");
      return;
    }

    setLoading(true);

    try {
      await createTestimoni({
        name: name || undefined,
        email: email || undefined,
        profession: profession || undefined,
        comment,
        rating: rating || undefined,
      });

      // reset form
      setName("");
      setEmail("");
      setProfession("");
      setComment("");
      setRating(0);

      // tampilkan popup
      setShowPopup(true);
    } catch (error: unknown) {
      if (error instanceof Error) {
        alert(error.message);
      } else {
        alert("Terjadi kesalahan server");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="relative flex flex-col items-center justify-center min-h-screen overflow-hidden pb-32">
      <div className="absolute inset-0 bg-linear-to-b from-blue-100 via-blue-100 to-blue-200"></div>

      <div className="absolute inset-0 opacity-5">
        <Image
          src="/images/tekturgaris.svg"
          alt="Tekstur garis"
          fill
          className="object-cover"
        />
      </div>

      <div className="relative z-10 text-center mb-10 px-6 pt-28">
        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900">
          Ceritakan Momen Serumumu
        </h2>
        <p className="text-gray-600 text-sm md:text-base mt-2">
          Bagikan pengalaman bahagiamu bersama{" "}
          <span className="font-semibold text-blue-600">LamiGo</span> dan bantu
          wisatawan lain menemukan perjalanan terbaik.
        </p>
      </div>

      <div className="relative z-10 flex flex-col md:flex-row items-center justify-center w-full px-6 md:px-20 space-y-8 md:space-y-0 md:space-x-10">
        <div className="w-full md:w-1/2 flex flex-col items-center text-center space-y-6">
          <form className="w-full max-w-md space-y-4" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Nama"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-3 rounded-lg border border-gray-300 bg-white focus:ring-2 focus:ring-blue-400"
            />

            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 rounded-lg border border-gray-300 bg-white focus:ring-2 focus:ring-blue-400"
            />

            <input
              type="text"
              placeholder="Status"
              value={profession}
              onChange={(e) => setProfession(e.target.value)}
              className="w-full p-3 rounded-lg border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-blue-400"
            />

            <textarea
              placeholder="Komentar"
              rows={4}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="w-full p-3 rounded-lg border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-blue-400"
            ></textarea>

            <div className="backdrop-blur-md bg-white/70 shadow-lg rounded-2xl p-6 w-full border border-gray-200 transition-all">
              <h3 className="text-lg font-semibold text-gray-700 mb-3 text-center md:text-left">
                Beri Rating
              </h3>

              <div className="flex gap-3 justify-center md:justify-start">
                {[1, 2, 3, 4, 5].map((value) => {
                  const full = value <= rating;
                  const half = rating + 0.5 === value;

                  return (
                    <div
                      key={value}
                      className="relative cursor-pointer transition-transform duration-200 hover:scale-125 group"
                      onClick={() =>
                        setRating(
                          value === rating
                            ? value - 0.5
                            : value === rating + 0.5
                            ? value
                            : value
                        )
                      }
                      onContextMenu={(e) => {
                        e.preventDefault();
                        setRating(value - 0.5);
                      }}
                    >
                      <StarIcon
                        size={30}
                        className="text-gray-300 transition-colors duration-200"
                      />

                      {full && (
                        <StarIcon
                          size={30}
                          className="absolute top-0 left-0 text-yellow-400 fill-yellow-400 drop-shadow-[0_0_6px_rgba(255,200,0,0.7)] group-hover:drop-shadow-[0_0_10px_rgba(255,200,0,1)]"
                        />
                      )}

                      {half && (
                        <StarIcon
                          size={30}
                          className="absolute top-0 left-0 text-yellow-400 fill-yellow-400 drop-shadow-[0_0_6px_rgba(255,200,0,0.7)] group-hover:drop-shadow-[0_0_10px_rgba(255,200,0,1)]"
                          style={{ clipPath: "inset(0 50% 0 0)" }}
                        />
                      )}
                    </div>
                  );
                })}
              </div>

              <p className="text-sm text-gray-600 mt-4 text-center md:text-left font-medium">
                {rating > 0
                  ? `Rating kamu: ${rating} / 5`
                  : "Klik untuk rating • Klik kanan = setengah bintang"}
              </p>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition disabled:opacity-60 cursor-pointer"
            >
              {loading ? "Mengirim..." : "Kirim"}
            </button>
          </form>
        </div>

        <div className="w-full md:w-1/2 flex justify-center relative">
          <Image
            src="/images/test.png"
            alt="Traveler"
            width={700}
            height={700}
            className="object-contain"
          />
        </div>
      </div>

      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="bg-white rounded-xl p-8 max-w-sm w-full text-center shadow-lg relative">
            <h3 className="text-xl font-bold mb-4">Terima kasih!</h3>
            <p className="mb-6">
              Testimoni kamu berhasil dikirim dan menunggu persetujuan admin 🙏
            </p>
            <button
              onClick={() => setShowPopup(false)}
              className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold"
            >
              Tutup
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
