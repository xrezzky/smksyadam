import PublicShell from "@/components/PublicShell";

export default function FasilitasPage() {
  return (
    <PublicShell>
      <main className="mx-auto max-w-3xl px-5 py-10 md:py-14">
        <h1 className="mb-5 font-serif text-[clamp(24px,4vw,30px)] text-blue-900">Fasilitas Sekolah</h1>
        <p className="text-[15.5px] leading-relaxed text-gray-500">
          Daftar fasilitas sekolah (ruang kelas, laboratorium, perpustakaan, dll.) akan
          ditampilkan di sini setelah data resmi tersedia.
        </p>
      </main>
    </PublicShell>
  );
}
