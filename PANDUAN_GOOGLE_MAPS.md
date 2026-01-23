# Panduan Mengaktifkan Google Maps API

Jika Anda ingin menggunakan lokasi yang **sangat akurat** seperti Google Maps asli, Anda perlu mendapatkan **API Key**.

Berikut langkah-langkahnya (Gratis kredit $200 setiap bulan, cukup untuk penggunaan pribadi/magang):

## 1. Buat API Key di Google Cloud Console
1. Buka [Google Cloud Console](https://console.cloud.google.com/).
2. Buat Project baru (misal: `LamigoApp`).
3. Buka menu **APIs & Services** > **Library**.
4. Cari dan aktifkan **"Geocoding API"** (ini yang paling penting untuk mengubah koordinat jadi alamat).
5. (Opsional tapi disarankan) Aktifkan juga **"Maps JavaScript API"**.
6. Pergi ke **APIs & Services** > **Credentials**.
7. Klik **Create Credentials** > **API Key**.
8. Salin API Key yang muncul (contoh: `AIzaSyD...`).

## 2. Masukkan ke Project
1. Buka file `.env` atau `.env.local` di folder proyek Anda.
2. Tambahkan baris berikut:

```env
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=AIzaSyD... (paste key Anda disini)
```

## 3. Restart Server
Matikan terminal (`Ctrl + C`) dan jalankan ulang:
```bash
npm run dev
```

---

## Tanpa Google Maps API?
Jangan khawatir! Jika Anda tidak memasukkan API Key, sistem otomatis menggunakan **OpenStreetMap Enhanced** yang sudah saya upgrade agar menampilkan **Nama Jalan & Nomor** (lebih detail dari sebelumnya).
