import PublicShell from "@/components/PublicShell";

export default function VisiMisiPage() {
  return (
    <PublicShell>
      <main className="mx-auto max-w-3xl px-5 py-14">
        <h1 className="mb-7 font-serif text-3xl text-blue-900">Visi & Misi</h1>

        <section className="mb-9 rounded-md border border-gray-200 bg-blue-100 p-6">
          <h2 className="mb-2 text-[13px] font-semibold uppercase tracking-wide text-blue-700">
            Visi
          </h2>
          <p className="font-serif text-xl leading-relaxed text-blue-900">
            [Visi sekolah akan ditampilkan di sini setelah data resmi tersedia.]
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-[13px] font-semibold uppercase tracking-wide text-accent-green">
            Misi
          </h2>
          <ol className="list-decimal space-y-2 pl-5 text-[15px] text-gray-500">
            <li>[Poin misi 1 akan diisi oleh admin.]</li>
            <li>[Poin misi 2 akan diisi oleh admin.]</li>
            <li>[Poin misi 3 akan diisi oleh admin.]</li>
          </ol>
        </section>
      </main>
    </PublicShell>
  );
}
