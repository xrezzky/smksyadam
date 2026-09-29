import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "SMK Syadam Bojonggede — Website Resmi",
    template: "%s — SMK Syadam Bojonggede",
  },
  description:
    "Website resmi SMK Syadam Bojonggede, Kabupaten Bogor. Informasi akademik, berita, kegiatan, dan penerimaan peserta didik baru (PPDB).",
  openGraph: {
    title: "SMK Syadam Bojonggede — Website Resmi",
    description:
      "Website resmi SMK Syadam Bojonggede, Kabupaten Bogor.",
    type: "website",
    locale: "id_ID",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" suppressHydrationWarning>
      <head>
        {/* Set tema sebelum React hydrate supaya tidak ada kedipan warna salah saat load */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme');var d=t?t==='dark':window.matchMedia('(prefers-color-scheme: dark)').matches;if(d)document.documentElement.classList.add('dark');}catch(e){}})();`,
          }}
        />
      </head>
      <body className="bg-white font-sans text-ink antialiased transition-colors duration-300 dark:bg-gray-950 dark:text-gray-100">
        {children}
      </body>
    </html>
  );
}
