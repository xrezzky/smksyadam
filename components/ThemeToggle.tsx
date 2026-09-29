"use client";

import { useEffect, useState } from "react";
import { SunIcon, MoonIcon } from "@/components/icons";

export default function ThemeToggle() {
  const [dark, setDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setDark(document.documentElement.classList.contains("dark"));
  }, []);

  const toggle = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    try {
      localStorage.setItem("theme", next ? "dark" : "light");
    } catch {
      // localStorage tidak tersedia (mis. mode private) — abaikan, tema tetap berubah untuk sesi ini
    }
  };

  // Render placeholder netral sebelum mount supaya tidak mismatch dengan hasil script di <head>
  if (!mounted) {
    return <span className="h-9 w-9 flex-shrink-0" aria-hidden="true" />;
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={dark ? "Ganti ke mode terang" : "Ganti ke mode gelap"}
      className="btn-pop relative flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full text-blue-900 hover:bg-blue-100 dark:text-blue-200 dark:hover:bg-white/10"
    >
      <span
        className={`absolute transition-all duration-300 ${
          dark ? "-rotate-90 scale-0 opacity-0" : "rotate-0 scale-100 opacity-100"
        }`}
      >
        <SunIcon className="h-[18px] w-[18px]" />
      </span>
      <span
        className={`absolute transition-all duration-300 ${
          dark ? "rotate-0 scale-100 opacity-100" : "rotate-90 scale-0 opacity-0"
        }`}
      >
        <MoonIcon className="h-[18px] w-[18px]" />
      </span>
    </button>
  );
}
