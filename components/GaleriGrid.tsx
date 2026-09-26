"use client";

import { useCallback, useEffect, useState } from "react";

export type GalleryItem = {
  id: string;
  image_url: string;
  caption: string | null;
};

export default function GaleriGrid({ items }: { items: GalleryItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const close = useCallback(() => setOpenIndex(null), []);
  const prev = useCallback(
    () => setOpenIndex((i) => (i === null ? null : (i - 1 + items.length) % items.length)),
    [items.length]
  );
  const next = useCallback(
    () => setOpenIndex((i) => (i === null ? null : (i + 1) % items.length)),
    [items.length]
  );

  // Escape untuk tutup, panah kiri/kanan untuk navigasi, dan kunci scroll body selagi lightbox terbuka
  useEffect(() => {
    if (openIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [openIndex, close, prev, next]);

  return (
    <>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
        {items.map((g, i) => (
          <button
            key={g.id}
            type="button"
            onClick={() => setOpenIndex(i)}
            className="group animate-fade-in overflow-hidden rounded-md border border-gray-200"
            style={{ animationDelay: `${Math.min(i, 12) * 60}ms` }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={g.image_url}
              alt={g.caption ?? ""}
              loading="lazy"
              className="img-zoom aspect-square w-full object-cover"
            />
          </button>
        ))}
      </div>

      {openIndex !== null && (
        <div
          className="animate-fade-in fixed inset-0 z-[100] flex items-center justify-center bg-black/85 p-4"
          onClick={close}
        >
          <button
            aria-label="Tutup"
            onClick={close}
            className="btn-pop absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-xl text-white hover:bg-white/20"
          >
            ✕
          </button>

          {items.length > 1 && (
            <>
              <button
                aria-label="Foto sebelumnya"
                onClick={(e) => {
                  e.stopPropagation();
                  prev();
                }}
                className="btn-pop absolute left-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-2xl text-white hover:bg-white/20 sm:left-6"
              >
                ‹
              </button>
              <button
                aria-label="Foto berikutnya"
                onClick={(e) => {
                  e.stopPropagation();
                  next();
                }}
                className="btn-pop absolute right-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-2xl text-white hover:bg-white/20 sm:right-6"
              >
                ›
              </button>
            </>
          )}

          {/* key={openIndex} memaksa animasi zoom-in jalan ulang tiap ganti foto */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            key={openIndex}
            src={items[openIndex].image_url}
            alt={items[openIndex].caption ?? ""}
            onClick={(e) => e.stopPropagation()}
            className="animate-lightbox-in max-h-[85vh] max-w-full rounded-md object-contain shadow-2xl"
          />

          {items[openIndex].caption && (
            <div
              onClick={(e) => e.stopPropagation()}
              className="absolute bottom-6 left-1/2 max-w-[90vw] -translate-x-1/2 rounded-md bg-black/50 px-4 py-2 text-center text-[13px] text-white"
            >
              {items[openIndex].caption}
            </div>
          )}
        </div>
      )}
    </>
  );
}
