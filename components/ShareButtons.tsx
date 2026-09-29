"use client";

import { useEffect, useState } from "react";
import { CheckIcon } from "@/components/icons";

export default function ShareButtons({ title }: { title: string }) {
  const [copied, setCopied] = useState(false);
  const [url, setUrl] = useState("");

  useEffect(() => {
    setUrl(window.location.href);
  }, []);

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // clipboard API tidak tersedia — abaikan, tombol tetap tidak error ke user
    }
  };

  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="text-[13px] font-semibold text-gray-500 dark:text-gray-400">Bagikan:</span>
      <a
        href={`https://wa.me/?text=${encodeURIComponent(`${title} — ${url}`)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="btn-pop flex items-center gap-1.5 rounded-full bg-[#25D366]/10 px-3 py-1.5 text-[13px] font-semibold text-[#1ebc59] hover:bg-[#25D366]/20 dark:text-[#25D366]"
      >
        WhatsApp
      </a>
      <button
        type="button"
        onClick={copyLink}
        className="btn-pop relative flex items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1.5 text-[13px] font-semibold text-gray-600 hover:bg-gray-200 dark:bg-white/10 dark:text-gray-300 dark:hover:bg-white/20"
      >
        {copied ? (
          <span className="animate-fade-in flex items-center gap-1">
            Tersalin! <CheckIcon className="h-3.5 w-3.5" strokeWidth={2.4} />
          </span>
        ) : (
          <span>Salin Tautan</span>
        )}
      </button>
    </div>
  );
}
