# Website Resmi SMK Syadam Bojonggede

Stack: **Next.js 14 (App Router) + Supabase (Postgres + Auth) + Cloudinary + Vercel**.

## 1. Setup lokal

```bash
npm install
cp .env.example .env.local
# isi .env.local dengan kredensial di langkah 2 & 3
npm run dev
```

## 2. Setup Supabase

1. Buat project baru di https://supabase.com (paket gratis sudah cukup untuk tahap awal).
2. Buka **SQL Editor** → jalankan seluruh isi `supabase/schema.sql`. Ini akan membuat semua
   tabel (news, announcements, events, teachers, departments, achievements, gallery, ppdb,
   school_settings, dll) beserta Row Level Security-nya.
3. Ambil `Project URL` dan `anon public key` dari **Project Settings → API**, isi ke
   `.env.local` sebagai `NEXT_PUBLIC_SUPABASE_URL` dan `NEXT_PUBLIC_SUPABASE_ANON_KEY`.
   `service_role key` (SUPABASE_SERVICE_ROLE_KEY) hanya perlu jika nanti ada operasi server
   khusus — **jangan pernah** taruh di kode yang berjalan di browser.
4. **Buat akun owner (admin pertama):**
   - Di dashboard Supabase → **Authentication → Users → Add user**, buat user dengan email &
     password owner.
   - Trigger di schema otomatis membuat baris di tabel `profiles` untuk user ini
     (role=`admin`, status=`pending`).
   - Salin `User UID`-nya, lalu jadikan owner lewat SQL Editor:
     ```sql
     update profiles set role = 'super_admin', status = 'approved'
     where id = 'TEMPEL-UID-DI-SINI';
     ```
   - Sekarang owner bisa login di `/admin/login`.

### Kalau project Supabase kamu sudah pernah pakai schema versi lama

Jalankan tambahan migration berikut di SQL Editor (urut, aman dijalankan sekali):
- `supabase/migrations/002_admin_approval.sql` — sistem approval admin baru.
- `supabase/migrations/003_about_images.sql` — foto carousel untuk section "Tentang" di
  beranda (terpisah dari foto hero).

## Alur approval admin baru

- Admin baru daftar sendiri lewat `/admin/register` → otomatis masuk sebagai
  role=`admin`, status=`pending`.
- Selama `pending`, kalau mereka login akan diarahkan ke halaman "Menunggu Persetujuan" dan
  belum bisa akses dashboard.
- **Owner** (role=`super_admin`) login seperti biasa, lalu buka menu **Pengguna** di sidebar
  (menu ini cuma muncul untuk owner) untuk **Setujui**, **Tolak**, atau menjadikan admin lain
  sebagai **Owner**.
- Admin biasa tidak bisa mengubah status/role dirinya sendiri (diblokir di level database).

## 3. Setup Cloudinary

1. Buat akun gratis di https://cloudinary.com.
2. Di **Settings → Upload → Upload presets**, buat preset baru dengan mode **Unsigned**,
   beri nama misalnya `smk-syadam-uploads`.
3. Isi `.env.local`:
   - `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` — dari Dashboard.
   - `NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET` — nama preset di atas.
   - `CLOUDINARY_API_KEY` / `CLOUDINARY_API_SECRET` — disiapkan untuk kebutuhan server di masa
     depan, belum dipakai upload dari admin panel saat ini (upload dilakukan unsigned dari
     browser demi kesederhanaan tahap awal).

## 4. Isi data awal

Setelah login ke `/admin`:

1. Buka **Pengaturan** → isi nama sekolah, logo, alamat, kontak, Google Maps.
2. Buka **Berita** → tulis berita pertama.
3. Modul lain (Pengumuman, Agenda, Galeri, Guru, Jurusan, Prestasi, PPDB) mengikuti pola yang
   sama seperti Berita — lihat catatan "Menambah modul admin baru" di bawah.

## 5. Deploy ke Vercel

1. Push repo ini ke GitHub.
2. Import project di https://vercel.com, pilih repo tersebut.
3. Di **Settings → Environment Variables**, isi semua variabel dari `.env.local`.
4. Deploy. Selesai — semuanya jalan di free tier (Vercel Hobby + Supabase Free + Cloudinary Free).

## Menambah modul admin baru (Pengumuman, Agenda, Galeri, dst.)

Modul **Berita** (`app/admin/(protected)/berita/`) adalah polanya:

- `page.tsx` — daftar data + tombol hapus.
- `baru/page.tsx` — form tambah.
- `[id]/page.tsx` — form edit.
- `components/admin/NewsForm.tsx` — form reusable untuk tambah & edit.

Untuk modul baru, duplikasi struktur ini dan sesuaikan nama tabel, kolom, dan komponen form.
Struktur tabel untuk semua modul sudah tersedia di `supabase/schema.sql`.

## Struktur folder

```
app/                  → halaman (App Router)
  admin/(protected)/  → panel admin (dilindungi middleware + cek sesi)
  admin/login/        → login admin (di luar proteksi)
  berita/, ppdb/, ...→ halaman publik
components/           → komponen reusable (Navbar, Hero, NewsCard, dll)
components/admin/     → komponen khusus admin (form, tombol aksi)
lib/supabase/         → client Supabase (browser & server)
lib/cloudinary.ts     → helper upload gambar
supabase/schema.sql   → skema database lengkap + RLS
middleware.ts         → proteksi rute /admin
```

## Catatan penting

- **Jangan mengarang data sekolah.** Semua field yang belum ada datanya sengaja ditampilkan
  sebagai placeholder (`[Nama Kepala Sekolah]`, dsb) di kode maupun database.
- Halaman publik yang belum dibuatkan datanya di database (Sejarah, Visi & Misi, Struktur
  Organisasi, Fasilitas, Ekstrakurikuler, Galeri, Kegiatan) belum ada file halamannya — bisa
  ditambahkan mengikuti pola halaman yang sudah ada (`app/profil/tentang/page.tsx`) begitu
  datanya siap, supaya tidak menampilkan halaman kosong sebelum ada isi.
- Saat sekolah sudah resmi mengambil alih proyek ini, cukup pindahkan kepemilikan akun Vercel,
  Supabase, dan Cloudinary — tidak ada vendor lock-in di luar tiga layanan ini.
