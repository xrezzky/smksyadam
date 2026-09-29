"use client";

import { useState } from "react";

export default function BlurImage({
  src,
  alt,
  className = "",
}: {
  src: string;
  alt: string;
  className?: string;
}) {
  const [loaded, setLoaded] = useState(false);

  return (
    <span className="relative block h-full w-full overflow-hidden">
      {/* Placeholder abu-abu berkedip pelan — tersembunyi begitu foto asli selesai dimuat */}
      <span
        className={`absolute inset-0 animate-pulse bg-gray-200 transition-opacity duration-500 dark:bg-gray-700 ${
          loaded ? "opacity-0" : "opacity-100"
        }`}
        aria-hidden="true"
      />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        loading="lazy"
        onLoad={() => setLoaded(true)}
        className={`${className} transition-all duration-500 ${
          loaded ? "scale-100 opacity-100 blur-none" : "scale-105 opacity-0 blur-md"
        }`}
      />
    </span>
  );
}
