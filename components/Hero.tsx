"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";

export default function Hero({
  heroImageUrl,
  description,
}: {
  heroImageUrl?: string | null;
  description?: string | null;
}) {
  const bgRef = useRef<HTMLDivElement | null>(null);

  // Parallax halus: foto latar bergerak sedikit lebih lambat dari scroll, dibatasi biar tetap subtle
  useEffect(() => {
    if (!heroImageUrl) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        if (bgRef.current) {
          const offset = Math.min(window.scrollY * 0.2, 40);
          bgRef.current.style.transform = `translate3d(0, ${offset}px, 0)`;
        }
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, [heroImageUrl]);

  return (
    <>
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-100 to-white py-8 sm:py-11 md:py-14">
        {heroImageUrl && (
          <div
            ref={bgRef}
            className="pointer-events-none absolute -inset-y-10 inset-x-0 bg-cover bg-center will-change-transform"
            style={{ backgroundImage: `url(${heroImageUrl})` }}
            aria-hidden="true"
          />
        )}

        {/* Overlay tipis di atas foto supaya tone foto seragam — kontras teks tetap dijamin oleh kartu solid, bukan overlay ini */}
        {heroImageUrl && <div className="absolute inset-0 bg-blue-900/25" aria-hidden="true" />}

        {/* Aksen visual halus supaya hero tidak terasa kosong saat belum ada foto — mengambang pelan */}
        {!heroImageUrl && (
          <>
            <div
              className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 animate-float-slow rounded-full bg-blue-500/10 md:h-80 md:w-80"
              aria-hidden="true"
            />
            <div
              className="pointer-events-none absolute -bottom-10 left-[-4rem] hidden h-48 w-48 animate-float-slower rounded-full bg-accent-green/10 md:block"
              aria-hidden="true"
            />
          </>
        )}

        <div className="relative mx-auto max-w-6xl px-5">
          <div className="animate-fade-in-up rounded-xl bg-white p-6 shadow-md sm:p-7 md:max-w-xl md:p-8">
            <h1 className="mb-3.5 font-serif text-[clamp(28px,6vw,40px)] leading-[1.2] text-blue-900">
              Selamat Datang di SMK Syadam Bojonggede
            </h1>
            <p className="mb-6 text-[15px] leading-relaxed text-gray-500">
              {description ??
                "Website ini menjadi pusat informasi resmi sekolah — profil, akademik, berita, agenda, dan penerimaan peserta didik baru — bagi siswa, orang tua, calon siswa, guru, dan masyarakat umum."}
            </p>
            <div className="mb-4 flex flex-wrap gap-3">
              <Link
                href="/profil/tentang"
                className="btn-pop rounded-md bg-blue-700 px-[22px] py-3 text-sm font-semibold text-white hover:bg-blue-900"
              >
                Tentang Sekolah
              </Link>
              <Link
                href="/ppdb"
                className="btn-pop rounded-md border border-blue-500 px-[22px] py-3 text-sm font-semibold text-blue-700 hover:bg-blue-100"
              >
                Informasi PPDB
              </Link>
            </div>
            <div className="flex flex-wrap gap-5 text-sm">
              <Link
                href="/akademik/jurusan"
                className="group border-b border-blue-500 font-semibold text-blue-700"
              >
                Lihat Jurusan <span className="arrow-nudge">→</span>
              </Link>
              <Link href="/berita" className="group border-b border-blue-500 font-semibold text-blue-700">
                Berita Sekolah <span className="arrow-nudge">→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
      <svg viewBox="0 0 1440 40" preserveAspectRatio="none" className="block h-8 w-full sm:h-10">
        <path d="M0,20 C240,40 480,0 720,14 C960,28 1200,6 1440,20 L1440,40 L0,40 Z" fill="#f4f6f8" />
      </svg>
    </>
  );
}
