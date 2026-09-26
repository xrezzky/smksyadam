"use client";

// Next.js me-remount file ini setiap kali pindah route (beda dengan layout.tsx yang persist),
// jadi animasi fade-in di bawah ini otomatis "jalan lagi" tiap kali user pindah halaman.
export default function Template({ children }: { children: React.ReactNode }) {
  return <div className="animate-page-fade">{children}</div>;
}
