"use client";

import Link from "next/link";
import { useState } from "react";

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

  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3">
        <Link href="/" className="flex items-center gap-2.5">
          {logoUrl ? (
            // Logo dianggap sudah memuat nama sekolah — tidak perlu diulang jadi teks di sampingnya
            // eslint-disable-next-line @next/next/no-img-element
            <img src={logoUrl} alt={schoolName} className="h-11 w-auto max-w-[220px] object-contain" />
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

        <nav className="hidden items-center gap-6 text-sm md:flex">
          {menu.map((item) => (
            <div key={item.label} className="group relative">
              <Link
                href={item.href}
                className="border-b-2 border-transparent py-1 text-blue-900 hover:border-blue-500"
              >
                {item.label}
              </Link>
              {item.children && (
                <div className="invisible absolute left-0 top-full min-w-[210px] rounded-md border border-gray-200 bg-white py-2 opacity-0 shadow-lg transition group-hover:visible group-hover:opacity-100">
                  {item.children.map((child) => (
                    <Link
                      key={child.href}
                      href={child.href}
                      className="block px-4 py-2 text-[13.5px] text-ink hover:bg-gray-50"
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
          className="hidden rounded-md bg-blue-700 px-[18px] py-2 text-sm font-semibold text-white hover:bg-blue-900 md:inline-block"
        >
          Informasi PPDB
        </Link>

        <button
          aria-label="Buka menu"
          aria-expanded={mobileOpen}
          className="text-2xl text-blue-900 md:hidden"
          onClick={() => setMobileOpen((v) => !v)}
        >
          {mobileOpen ? "✕" : "☰"}
        </button>
      </div>

      {mobileOpen && (
        <nav className="max-h-[80vh] overflow-y-auto border-t border-gray-200 bg-white px-5 py-3 md:hidden">
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
        </nav>
      )}
    </header>
  );
}
