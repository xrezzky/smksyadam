import { createClient } from "@/lib/supabase/server";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PpdbQuickForm from "@/components/PpdbQuickForm";
import Reveal from "@/components/Reveal";

export default async function PpdbPage() {
  const supabase = createClient();
  const [{ data: settings }, { data: ppdb }, { data: departments }, { count: newAnnouncementsCount }] =
    await Promise.all([
      supabase.from("school_settings").select("*").eq("id", 1).maybeSingle(),
      supabase.from("ppdb").select("*").eq("id", 1).maybeSingle(),
      supabase.from("departments").select("slug, name").order("display_order", { ascending: true }),
      supabase
        .from("announcements")
        .select("*", { count: "exact", head: true })
        .eq("is_published", true)
        .gte("published_at", new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString()),
    ]);

  return (
    <>
      <Navbar
        schoolName={settings?.school_name ?? undefined}
        logoUrl={settings?.logo_url}
        whatsapp={settings?.whatsapp}
        newAnnouncementsCount={newAnnouncementsCount ?? 0}
      />
      <main className="mx-auto max-w-3xl px-5 py-10 md:py-14">
        <Reveal>
          <h1 className="mb-5 font-serif text-[clamp(24px,4vw,30px)] text-blue-900 dark:text-gray-100">
            Penerimaan Peserta Didik Baru
          </h1>
        </Reveal>

        <Reveal delay={40}>
          <section className="mb-8">
            <h2 className="mb-2 text-lg font-semibold text-ink dark:text-gray-100">Deskripsi</h2>
            <p className="text-[15px] leading-relaxed text-gray-500 dark:text-gray-400">
              {ppdb?.description ?? "[Deskripsi PPDB akan diisi oleh admin.]"}
            </p>
          </section>
        </Reveal>

        <Reveal delay={80}>
          <section className="mb-8">
            <h2 className="mb-2 text-lg font-semibold text-ink dark:text-gray-100">Persyaratan</h2>
            <p className="whitespace-pre-line text-[15px] leading-relaxed text-gray-500 dark:text-gray-400">
              {ppdb?.requirements ?? "[Persyaratan akan diisi oleh admin.]"}
            </p>
          </section>
        </Reveal>

        <Reveal delay={120}>
          <section className="mb-8">
            <h2 className="mb-2 text-lg font-semibold text-ink dark:text-gray-100">Jadwal</h2>
            <p className="whitespace-pre-line text-[15px] leading-relaxed text-gray-500 dark:text-gray-400">
              {ppdb?.schedule ?? "[Jadwal akan diisi oleh admin.]"}
            </p>
          </section>
        </Reveal>

        {ppdb?.registration_link && (
          <Reveal delay={160}>
            <section id="daftar" className="mb-10 scroll-mt-20">
              <h2 className="mb-2 text-lg font-semibold text-ink dark:text-gray-100">
                Pendaftaran Resmi
              </h2>
              <a
                href={ppdb.registration_link}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-pop inline-block rounded-md bg-blue-700 px-[22px] py-3 text-sm font-semibold text-white hover:bg-blue-900"
              >
                Daftar Sekarang
              </a>
            </section>
          </Reveal>
        )}

        <Reveal delay={200}>
          <section id={ppdb?.registration_link ? undefined : "daftar"} className="scroll-mt-20">
            <h2 className="mb-1 text-lg font-semibold text-ink dark:text-gray-100">
              Daftar Minat Cepat
            </h2>
            <p className="mb-4 text-[13.5px] text-gray-500 dark:text-gray-400">
              Belum sempat isi form resmi? Tinggalkan kontak kamu di sini, tim kami yang akan
              menghubungi lewat WhatsApp.
            </p>
            <PpdbQuickForm departments={departments ?? []} />
          </section>
        </Reveal>
      </main>
      <Footer settings={settings ?? undefined} />
    </>
  );
}
