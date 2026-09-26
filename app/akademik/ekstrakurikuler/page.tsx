import PublicShell from "@/components/PublicShell";

export default function EkstrakurikulerPage() {
  return (
    <PublicShell>
      <main className="mx-auto max-w-3xl px-5 py-10 md:py-14">
        <h1 className="mb-5 font-serif text-[clamp(24px,4vw,30px)] text-blue-900">Ekstrakurikuler</h1>
        <p className="text-[15.5px] leading-relaxed text-gray-500">
          Daftar kegiatan ekstrakurikuler sekolah akan ditampilkan di sini setelah data resmi
          tersedia.
        </p>
      </main>
    </PublicShell>
  );
}
