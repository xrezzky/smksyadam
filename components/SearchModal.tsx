"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

type Result = { type: string; title: string; excerpt: string; href: string };

const typeColor: Record<string, string> = {
  Berita: "bg-blue-100 text-blue-700 dark:bg-blue-500/15 dark:text-blue-300",
  Pengumuman: "bg-orange-100 text-orange-700 dark:bg-orange-500/15 dark:text-orange-300",
  Jurusan: "bg-green-100 text-green-700 dark:bg-green-500/15 dark:text-green-300",
  Prestasi: "bg-amber-100 text-amber-700 dark:bg-amber-500/15 dark:text-amber-300",
  Ekstrakurikuler: "bg-purple-100 text-purple-700 dark:bg-purple-500/15 dark:text-purple-300",
};

export default function SearchModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Result[]>([]);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (open) {
      setQuery("");
      setResults([]);
      // beri waktu satu frame supaya elemen sudah ter-render sebelum di-fokus
      requestAnimationFrame(() => inputRef.current?.focus());
      const prevOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prevOverflow;
      };
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  // Debounce 300ms — biar nggak nembak API tiap ketikan huruf
  useEffect(() => {
    if (query.trim().length < 2) {
      setResults([]);
      setLoading(false);
      return;
    }
    setLoading(true);
    const t = setTimeout(async () => {
      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(query.trim())}`);
        const data = await res.json();
        setResults(data.results ?? []);
      } catch {
        setResults([]);
      } finally {
        setLoading(false);
      }
    }, 300);
    return () => clearTimeout(t);
  }, [query]);

  if (!open) return null;

  return (
    <div
      className="animate-fade-in fixed inset-0 z-[200] flex items-start justify-center bg-black/60 px-4 pt-[12vh] backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="animate-lightbox-in w-full max-w-lg overflow-hidden rounded-xl bg-white shadow-2xl dark:bg-gray-900"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-2.5 border-b border-gray-200 px-4 py-3 dark:border-gray-800">
          <span className="text-gray-400">🔍</span>
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Cari berita, jurusan, pengumuman..."
            className="w-full bg-transparent text-[15px] text-ink outline-none placeholder:text-gray-400 dark:text-gray-100"
          />
          <button
            onClick={onClose}
            aria-label="Tutup pencarian"
            className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded text-gray-400 hover:bg-gray-100 dark:hover:bg-white/10"
          >
            ✕
          </button>
        </div>

        <div className="max-h-[55vh] overflow-y-auto">
          {loading && (
            <div className="flex items-center gap-2 px-4 py-6 text-[13.5px] text-gray-500">
              <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-gray-300 border-t-blue-600" />
              Mencari...
            </div>
          )}

          {!loading && query.trim().length >= 2 && results.length === 0 && (
            <p className="px-4 py-6 text-[13.5px] text-gray-500">
              Tidak ada hasil untuk &quot;{query}&quot;.
            </p>
          )}

          {!loading &&
            results.map((r, i) => (
              <Link
                key={`${r.type}-${r.title}-${i}`}
                href={r.href}
                onClick={onClose}
                className="animate-fade-in-up flex items-start gap-3 border-b border-gray-100 px-4 py-3 transition-colors last:border-0 hover:bg-blue-50 dark:border-gray-800 dark:hover:bg-white/5"
                style={{ animationDelay: `${i * 40}ms`, animationDuration: "300ms" }}
              >
                <span
                  className={`mt-0.5 flex-shrink-0 rounded-full px-2 py-0.5 text-[10.5px] font-semibold ${
                    typeColor[r.type] ?? "bg-gray-100 text-gray-600"
                  }`}
                >
                  {r.type}
                </span>
                <span className="min-w-0">
                  <span className="block truncate text-[14px] font-medium text-ink dark:text-gray-100">
                    {r.title}
                  </span>
                  {r.excerpt && (
                    <span className="block truncate text-[12.5px] text-gray-500 dark:text-gray-400">
                      {r.excerpt}
                    </span>
                  )}
                </span>
              </Link>
            ))}

          {query.trim().length < 2 && (
            <p className="px-4 py-6 text-center text-[13px] text-gray-400">
              Ketik minimal 2 huruf untuk mulai mencari.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
