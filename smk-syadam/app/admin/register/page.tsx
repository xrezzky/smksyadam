"use client";

import { useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

export default function AdminRegisterPage() {
  const supabase = createClient();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (password.length < 6) {
      setError("Kata sandi minimal 6 karakter.");
      setLoading(false);
      return;
    }

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { full_name: fullName } },
    });

    setLoading(false);

    if (error) {
      setError(
        error.message.includes("already registered")
          ? "Email sudah terdaftar. Coba login."
          : "Gagal mendaftar. Coba lagi."
      );
      return;
    }

    setDone(true);
  }

  if (done) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-gray-50 px-5">
        <div className="w-full max-w-sm rounded-lg border border-gray-200 bg-white p-7 text-center">
          <h1 className="mb-2 text-lg font-bold text-blue-900">Pendaftaran Terkirim</h1>
          <p className="mb-5 text-[13.5px] text-gray-500">
            Akun kamu akan aktif setelah disetujui oleh owner. Silakan cek berkala atau tunggu
            konfirmasi.
          </p>
          <Link href="/admin/login" className="text-sm font-semibold text-blue-700">
            Kembali ke halaman login
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-50 px-5">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm rounded-lg border border-gray-200 bg-white p-7"
      >
        <div className="mb-6 text-center">
          <span className="mx-auto mb-3 flex h-11 w-11 items-center justify-center rounded-lg bg-blue-700 font-serif text-base font-bold text-white">
            SS
          </span>
          <h1 className="text-lg font-bold text-blue-900">Daftar Akun Admin</h1>
          <p className="text-[13px] text-gray-500">
            Akun baru menunggu persetujuan owner sebelum bisa dipakai
          </p>
        </div>

        {error && (
          <div className="mb-4 rounded-md bg-red-50 px-3 py-2 text-[13px] text-red-700">
            {error}
          </div>
        )}

        <label className="mb-1.5 block text-[13px] font-medium text-ink">Nama Lengkap</label>
        <input
          required
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          className="mb-4 w-full rounded-md border border-gray-200 px-3 py-2 text-sm"
        />

        <label className="mb-1.5 block text-[13px] font-medium text-ink">Email</label>
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mb-4 w-full rounded-md border border-gray-200 px-3 py-2 text-sm"
        />

        <label className="mb-1.5 block text-[13px] font-medium text-ink">Kata Sandi</label>
        <input
          type="password"
          required
          minLength={6}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mb-6 w-full rounded-md border border-gray-200 px-3 py-2 text-sm"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-md bg-blue-700 py-2.5 text-sm font-semibold text-white hover:bg-blue-900 disabled:opacity-60"
        >
          {loading ? "Memproses..." : "Daftar"}
        </button>

        <p className="mt-4 text-center text-[13px] text-gray-500">
          Sudah punya akun?{" "}
          <Link href="/admin/login" className="font-semibold text-blue-700">
            Masuk
          </Link>
        </p>
      </form>
    </main>
  );
}
