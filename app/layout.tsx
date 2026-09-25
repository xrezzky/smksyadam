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
    <html lang="id">
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
