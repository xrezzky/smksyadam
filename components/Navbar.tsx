"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import ThemeToggle from "@/components/ThemeToggle";
import SearchModal from "@/components/SearchModal";
import { SearchIcon, ArrowUpIcon } from "@/components/icons";

const menu = [
  { label: "Beranda", href: "/" },
  {
    label: "Profil",
    href: "/profil/tentang",
    children: [
      { label: "Tentang Sekolah", href: "/profil/tentang" },
      { label: "Sejarah", href: "/profil/sejarah" },
      { label: "Visi & Misi", href: "/profil/visi-misi" },
      { label: "Struktur Organisasi", href: "/profil/struktur" },
      { label: "Guru & Tenaga Kependidikan", href: "/profil/guru" },
      { label: "Fasilitas", href: "/profil/fasilitas" },
    ],
  },
  {
    label: "Akademik",
    href: "/akademik/jurusan",
    children: [
      { label: "Kompetensi Keahlian", href: "/akademik/jurusan" },
      { label: "Ekstrakurikuler", href: "/akademik/ekstrakurikuler" },
      { label: "Prestasi", href: "/akademik/prestasi" },
    ],
  },
  {
    label: "Informasi",
    href: "/berita",
    children: [
      { label: "Berita", href: "/berita" },
      { label: "Pengumuman", href: "/pengumuman", badgeKey: "announcements" as const },
      { label: "Agenda", href: "/agenda" },
    ],
  },
  { label: "Kegiatan", href: "/kegiatan" },
  { label: "Galeri", href: "/galeri" },
  { label: "Kontak", href: "/kontak" },
];

export default function Navbar({
  schoolName = "SMK Syadam",
  logoUrl,
  whatsapp,
  newAnnouncementsCount = 0,
}: {
  schoolName?: string;
  logoUrl?: string | null;
  whatsapp?: string | null;
  newAnnouncementsCount?: number;
}) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  // Satu listener scroll untuk tiga hal: bayangan navbar, progress bar, dan tombol "ke atas"
  useEffect(() => {
    const onScroll = () => {
      const scrollY = window.scrollY;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setScrolled(scrollY > 8);
      setShowBackToTop(scrollY > 480);
      setProgress(max > 0 ? Math.min(100, (scrollY / max) * 100) : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  // Pintasan keyboard Cmd/Ctrl+K untuk buka pencarian dari mana saja
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setSearchOpen(true);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <header
        className={`sticky top-0 z-50 border-b bg-white/95 backdrop-blur transition-shadow duration-300 dark:bg-gray-950/95 ${
          scrolled ? "border-gray-200 shadow-md dark:border-gray-800" : "border-transparent shadow-none"
        }`}
      >
        {/* Progress bar tipis — menunjukkan seberapa jauh halaman sudah dibaca/discroll */}
        <div
          className="absolute inset-x-0 top-full h-[3px] bg-accent-green transition-[width] duration-150 ease-out"
          style={{ width: `${progress}%` }}
          aria-hidden="true"
        />
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3.5">
          <Link href="/" className="flex flex-shrink-0 items-center gap-2.5">
            {logoUrl ? (
              // Logo dianggap sudah memuat nama sekolah — tidak perlu diulang jadi teks di sampingnya
              // eslint-disable-next-line @next/next/no-img-element
              <img src={logoUrl} alt={schoolName} className="h-12 w-auto max-w-[220px] object-contain" />
            ) : (
              <>
                <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-blue-700 font-serif text-sm font-bold text-white">
                  SS
                </span>
                <span className="leading-tight">
                  <span className="block text-sm font-bold dark:text-gray-100">
                    {schoolName.toUpperCase()}
                  </span>
                  <span className="block text-[11px] text-gray-500 dark:text-gray-400">
                    Bojonggede · Kab. Bogor
                  </span>
                </span>
              </>
            )}
          </Link>

          <nav className="hidden items-center gap-7 text-sm md:flex">
            {menu.map((item) => (
              <div key={item.label} className="group relative flex h-full items-center">
                <Link
                  href={item.href}
                  className="relative flex items-center border-b-2 border-transparent py-2 text-blue-900 transition-colors duration-200 hover:border-blue-500 dark:text-gray-100"
                >
                  {item.label}
                  {item.label === "Informasi" && newAnnouncementsCount > 0 && (
                    <span className="absolute -right-2.5 -top-0.5 flex h-2 w-2 animate-pulse rounded-full bg-accent-orange" />
                  )}
                </Link>
                {item.children && (
                  <div className="invisible absolute left-0 top-full min-w-[210px] -translate-y-1.5 rounded-md border border-gray-200 bg-white py-2 opacity-0 shadow-lg transition-all duration-200 ease-out group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 dark:border-gray-800 dark:bg-gray-900">
                    {item.children.map((child: any) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className="flex items-center justify-between px-4 py-2 text-[13.5px] text-ink transition-colors duration-150 hover:bg-blue-100 hover:text-blue-700 dark:text-gray-200 dark:hover:bg-white/10 dark:hover:text-blue-300"
                      >
                        {child.label}
                        {child.badgeKey === "announcements" && newAnnouncementsCount > 0 && (
                          <span className="ml-2 rounded-full bg-accent-orange px-1.5 py-0.5 text-[10px] font-bold text-white">
                            {newAnnouncementsCount}
                          </span>
                        )}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>

          <div className="hidden flex-shrink-0 items-center gap-1.5 md:flex">
            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              aria-label="Cari (Ctrl+K)"
              className="btn-pop flex h-9 w-9 items-center justify-center rounded-full text-blue-900 hover:bg-blue-100 dark:text-blue-200 dark:hover:bg-white/10"
            >
              <SearchIcon className="h-[18px] w-[18px]" />
            </button>
            <ThemeToggle />
            <Link
              href="/ppdb"
              className="btn-pop ml-1 flex-shrink-0 rounded-md bg-blue-700 px-[18px] py-2.5 text-sm font-semibold text-white hover:bg-blue-900"
            >
              Informasi PPDB
            </Link>
          </div>

          <div className="flex items-center gap-1 md:hidden">
            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              aria-label="Cari"
              className="flex h-8 w-8 items-center justify-center text-blue-900 dark:text-blue-200"
            >
              <SearchIcon className="h-[18px] w-[18px]" />
            </button>
            <ThemeToggle />
            <button
              aria-label="Buka menu"
              aria-expanded={mobileOpen}
              className="relative flex h-8 w-8 flex-shrink-0 items-center justify-center"
              onClick={() => setMobileOpen((v) => !v)}
            >
              <span
                className={`absolute block h-0.5 w-6 rounded-full bg-blue-900 transition-all duration-300 dark:bg-gray-100 ${
                  mobileOpen ? "rotate-45" : "-translate-y-2"
                }`}
              />
              <span
                className={`absolute block h-0.5 w-6 rounded-full bg-blue-900 transition-all duration-200 dark:bg-gray-100 ${
                  mobileOpen ? "opacity-0" : "opacity-100"
                }`}
              />
              <span
                className={`absolute block h-0.5 w-6 rounded-full bg-blue-900 transition-all duration-300 dark:bg-gray-100 ${
                  mobileOpen ? "-rotate-45" : "translate-y-2"
                }`}
              />
            </button>
          </div>
        </div>

        <nav
          className={`grid overflow-hidden border-gray-200 bg-white transition-all duration-300 ease-out dark:border-gray-800 dark:bg-gray-950 md:hidden ${
            mobileOpen ? "grid-rows-[1fr] border-t opacity-100" : "grid-rows-[0fr] border-t-0 opacity-0"
          }`}
        >
          <div className="max-h-[80vh] overflow-y-auto px-5 py-3">
            {menu.map((item) => (
              <div key={item.label} className="py-1.5">
                <Link
                  href={item.href}
                  className="block py-1.5 text-[15px] font-medium text-blue-900 dark:text-gray-100"
                  onClick={() => setMobileOpen(false)}
                >
                  {item.label}
                </Link>
                {item.children && (
                  <div className="ml-3 border-l border-gray-200 pl-3 dark:border-gray-800">
                    {item.children.map((child: any) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className="flex items-center gap-2 py-1.5 text-[13.5px] text-gray-500 dark:text-gray-400"
                        onClick={() => setMobileOpen(false)}
                      >
                        {child.label}
                        {child.badgeKey === "announcements" && newAnnouncementsCount > 0 && (
                          <span className="rounded-full bg-accent-orange px-1.5 py-0.5 text-[10px] font-bold text-white">
                            {newAnnouncementsCount}
                          </span>
                        )}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <Link
              href="/ppdb"
              className="mt-2 block rounded-md bg-blue-700 px-4 py-2 text-center text-sm font-semibold text-white"
              onClick={() => setMobileOpen(false)}
            >
              Informasi PPDB
            </Link>
          </div>
        </nav>
      </header>

      <SearchModal open={searchOpen} onClose={() => setSearchOpen(false)} />

      <button
        aria-label="Kembali ke atas"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className={`btn-pop fixed bottom-6 right-5 z-50 flex h-11 w-11 items-center justify-center rounded-full bg-blue-700 text-lg text-white shadow-lg transition-all duration-300 hover:bg-blue-900 ${
          showBackToTop ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0"
        }`}
      >
        <ArrowUpIcon className="h-5 w-5" strokeWidth={2.2} />
      </button>

      {/* Tombol WhatsApp mengambang — hanya tampil kalau admin sudah mengisi nomor WhatsApp sekolah */}
      {whatsapp && (
        <a
          href={`https://wa.me/${whatsapp.replace(/[^0-9]/g, "").replace(/^0/, "62")}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Hubungi via WhatsApp"
          className="btn-pop fixed bottom-6 left-5 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg hover:bg-[#1ebc59]"
        >
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#25D366] opacity-40" />
          <svg viewBox="0 0 24 24" fill="currentColor" className="relative h-6 w-6">
            <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.28-1.38a9.9 9.9 0 0 0 4.76 1.21h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2Zm5.78 14.09c-.24.68-1.4 1.31-1.93 1.36-.49.05-.98.25-3.31-.7-2.79-1.15-4.58-3.99-4.72-4.18-.14-.19-1.13-1.5-1.13-2.86 0-1.36.72-2.02.97-2.3.25-.27.55-.34.73-.34.19 0 .37 0 .53.01.17.01.4-.06.62.48.24.58.81 2 .88 2.14.07.14.12.31.02.5-.1.19-.15.31-.29.48-.15.17-.31.38-.44.51-.15.15-.3.31-.13.6.17.29.75 1.24 1.61 2.01 1.11.99 2.04 1.3 2.33 1.44.29.15.46.13.63-.07.17-.2.72-.84.91-1.13.19-.29.38-.24.63-.15.26.1 1.65.78 1.93.92.29.15.48.22.55.34.07.13.07.72-.17 1.4Z" />
          </svg>
        </a>
      )}
    </>
  );
}
