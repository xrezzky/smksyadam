import { createClient } from "@/lib/supabase/server";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default async function PpdbPage() {
  const supabase = createClient();
  const [{ data: settings }, { data: ppdb }] = await Promise.all([
    supabase.from("school_settings").select("*").eq("id", 1).maybeSingle(),
    supabase.from("ppdb").select("*").eq("id", 1).maybeSingle(),
  ]);

  return (
    <>
      <Navbar schoolName={settings?.school_name ?? undefined} logoUrl={settings?.logo_url} />
      <main className="mx-auto max-w-3xl px-5 py-14">
        <h1 className="mb-5 font-serif text-3xl text-blue-900">
          Penerimaan Peserta Didik Baru
        </h1>

        <section className="mb-8">
          <h2 className="mb-2 text-lg font-semibold text-ink">Deskripsi</h2>
          <p className="text-[15px] leading-relaxed text-gray-500">
            {ppdb?.description ?? "[Deskripsi PPDB akan diisi oleh admin.]"}
          </p>
        </section>

        <section className="mb-8">
          <h2 className="mb-2 text-lg font-semibold text-ink">Persyaratan</h2>
          <p className="whitespace-pre-line text-[15px] leading-relaxed text-gray-500">
            {ppdb?.requirements ?? "[Persyaratan akan diisi oleh admin.]"}
          </p>
        </section>

        <section className="mb-8">
          <h2 className="mb-2 text-lg font-semibold text-ink">Jadwal</h2>
          <p className="whitespace-pre-line text-[15px] leading-relaxed text-gray-500">
            {ppdb?.schedule ?? "[Jadwal akan diisi oleh admin.]"}
          </p>
        </section>

        <section id="daftar" className="mb-4">
          <h2 className="mb-2 text-lg font-semibold text-ink">Pendaftaran</h2>
          {ppdb?.registration_link ? (
            <a
              href={ppdb.registration_link}
              className="inline-block rounded-md bg-blue-700 px-5.5 py-3 text-sm font-semibold text-white hover:bg-blue-900"
            >
              Daftar Sekarang
            </a>
          ) : (
            <p className="text-[15px] text-gray-500">
              Tautan pendaftaran belum tersedia — akan diisi oleh admin.
            </p>
          )}
        </section>
      </main>
      <Footer settings={settings ?? undefined} />
    </>
  );
}
