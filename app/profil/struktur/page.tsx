import PublicShell from "@/components/PublicShell";

export default function StrukturPage() {
  return (
    <PublicShell>
      <main className="mx-auto max-w-3xl px-5 py-14">
        <h1 className="mb-5 font-serif text-3xl text-blue-900">Struktur Organisasi</h1>
        <p className="mb-6 text-[15.5px] leading-relaxed text-gray-500">
          Bagan struktur organisasi sekolah akan ditampilkan di sini setelah data resmi
          tersedia.
        </p>
        <div className="flex aspect-video items-center justify-center rounded-md border border-dashed border-gray-200 bg-gray-50 text-[13.5px] text-gray-500">
          [Bagan struktur organisasi]
        </div>
      </main>
    </PublicShell>
  );
}
