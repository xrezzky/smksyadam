"use client";

import { useEffect, useState, useCallback } from "react";

export type AboutImage = {
  id: string;
  image_url: string;
  caption: string | null;
};

export default function AboutCarousel({ images }: { images: AboutImage[] }) {
  const [index, setIndex] = useState(0);

  const goTo = useCallback(
    (i: number) => {
      setIndex((i + images.length) % images.length);
    },
    [images.length]
  );

  // Geser otomatis tiap 5 detik — berhenti sendiri kalau cuma 1 foto
  useEffect(() => {
    if (images.length <= 1) return;
    const timer = setInterval(() => setIndex((i) => (i + 1) % images.length), 5000);
    return () => clearInterval(timer);
  }, [images.length]);

  if (images.length === 0) return null;

  const current = images[index];

  return (
    <div className="relative aspect-[4/3] w-full overflow-hidden rounded-md border border-gray-200 bg-gray-50">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={current.image_url}
        alt={current.caption ?? "Foto lingkungan sekolah"}
        className="h-full w-full object-cover"
      />

      {current.caption && (
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent px-4 py-3 text-[12.5px] text-white">
          {current.caption}
        </div>
      )}

      {images.length > 1 && (
        <>
          <button
            aria-label="Foto sebelumnya"
            onClick={() => goTo(index - 1)}
            className="absolute left-2 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-blue-900 shadow hover:bg-white"
          >
            ‹
          </button>
          <button
            aria-label="Foto berikutnya"
            onClick={() => goTo(index + 1)}
            className="absolute right-2 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-blue-900 shadow hover:bg-white"
          >
            ›
          </button>
          <div className="absolute bottom-2 left-1/2 flex -translate-x-1/2 gap-1.5">
            {images.map((img, i) => (
              <button
                key={img.id}
                aria-label={`Ke foto ${i + 1}`}
                onClick={() => goTo(i)}
                className={`h-1.5 rounded-full transition-all ${
                  i === index ? "w-5 bg-white" : "w-1.5 bg-white/60"
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
