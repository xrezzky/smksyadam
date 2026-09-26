"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

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
      { label: "Pengumuman", href: "/pengumuman" },
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
}: {
  schoolName?: string;
  logoUrl?: string | null;
}) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Bayangan tipis muncul begitu halaman mulai discroll — bikin navbar terasa "mengambang"
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 border-b bg-white/95 backdrop-blur transition-shadow duration-300 ${
        scrolled ? "border-gray-200 shadow-md" : "border-transparent shadow-none"
      }`}
    >
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
                <span className="block text-sm font-bold">{schoolName.toUpperCase()}</span>
                <span className="block text-[11px] text-gray-500">Bojonggede · Kab. Bogor</span>
              </span>
            </>
          )}
        </Link>

        <nav className="hidden items-center gap-7 text-sm md:flex">
          {menu.map((item) => (
            <div key={item.label} className="group relative flex h-full items-center">
              <Link
                href={item.href}
                className="border-b-2 border-transparent py-2 text-blue-900 transition-colors duration-200 hover:border-blue-500"
              >
                {item.label}
              </Link>
              {item.children && (
                <div className="invisible absolute left-0 top-full min-w-[210px] -translate-y-1.5 rounded-md border border-gray-200 bg-white py-2 opacity-0 shadow-lg transition-all duration-200 ease-out group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
                  {item.children.map((child) => (
                    <Link
                      key={child.href}
                      href={child.href}
                      className="block px-4 py-2 text-[13.5px] text-ink transition-colors duration-150 hover:bg-blue-100 hover:text-blue-700"
                    >
                      {child.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>

        <Link
          href="/ppdb"
          className="hidden flex-shrink-0 rounded-md bg-blue-700 px-[18px] py-2.5 text-sm font-semibold text-white hover:bg-blue-900 md:inline-block"
        >
          Informasi PPDB
        </Link>

        <button
          aria-label="Buka menu"
          aria-expanded={mobileOpen}
          className="relative flex h-8 w-8 flex-shrink-0 items-center justify-center md:hidden"
          onClick={() => setMobileOpen((v) => !v)}
        >
          <span
            className={`absolute block h-0.5 w-6 rounded-full bg-blue-900 transition-all duration-300 ${
              mobileOpen ? "rotate-45" : "-translate-y-2"
            }`}
          />
          <span
            className={`absolute block h-0.5 w-6 rounded-full bg-blue-900 transition-all duration-200 ${
              mobileOpen ? "opacity-0" : "opacity-100"
            }`}
          />
          <span
            className={`absolute block h-0.5 w-6 rounded-full bg-blue-900 transition-all duration-300 ${
              mobileOpen ? "-rotate-45" : "translate-y-2"
            }`}
          />
        </button>
      </div>

      <nav
        className={`grid overflow-hidden border-gray-200 bg-white transition-all duration-300 ease-out md:hidden ${
          mobileOpen ? "grid-rows-[1fr] border-t opacity-100" : "grid-rows-[0fr] border-t-0 opacity-0"
        }`}
      >
        <div className="max-h-[80vh] overflow-y-auto px-5 py-3">
          {menu.map((item) => (
            <div key={item.label} className="py-1.5">
              <Link
                href={item.href}
                className="block py-1.5 text-[15px] font-medium text-blue-900"
                onClick={() => setMobileOpen(false)}
              >
                {item.label}
              </Link>
              {item.children && (
                <div className="ml-3 border-l border-gray-200 pl-3">
                  {item.children.map((child) => (
                    <Link
                      key={child.href}
                      href={child.href}
                      className="block py-1.5 text-[13.5px] text-gray-500"
                      onClick={() => setMobileOpen(false)}
                    >
                      {child.label}
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
  );
}
