import { createClient } from "@/lib/supabase/server";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import SectionTitle from "@/components/SectionTitle";
import NewsCard, { type NewsItem } from "@/components/NewsCard";
import JurusanCard, { type Department } from "@/components/JurusanCard";
import Footer from "@/components/Footer";
import Link from "next/link";

export const revalidate = 60; // ISR — homepage di-refresh tiap 60 detik

export default async function HomePage() {
  const supabase = createClient();

  const [{ data: settings }, { data: departments }, { data: news }] = await Promise.all([
    supabase.from("school_settings").select("*").eq("id", 1).maybeSingle(),
    supabase
      .from("departments")
      .select("slug, name, short_description")
      .order("display_order", { ascending: true })
      .limit(6),
    supabase
      .from("news")
      .select("slug, title, excerpt, thumbnail_url, published_at, categories(name)")
      .eq("is_published", true)
      .order("published_at", { ascending: false })
      .limit(3),
  ]);

  const departmentList: Department[] = departments ?? [];
  const newsList: NewsItem[] = (news ?? []).map((n: any) => ({
    ...n,
    category_name: n.categories?.name ?? null,
  }));

  return (
    <>
      <Navbar schoolName={settings?.school_name ?? undefined} logoUrl={settings?.logo_url} />
      <Hero heroImageUrl={settings?.hero_image_url} />

      {/* SECTION 1 — Tentang Sekolah */}
      <section className="py-14">
        <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-10 px-5 md:grid-cols-[1.1fr_0.9fr] md:gap-12">
          <div>
            <SectionTitle eyebrow="Tentang Kami" title="Tentang SMK Syadam" />
            <p className="mb-4 max-w-[52ch] text-[15.5px] text-gray-500">
              [Deskripsi singkat sekolah — dapat diisi admin melalui menu Pengaturan.] Bagian ini
              menjelaskan sejarah singkat, ciri khas, dan komitmen sekolah dalam mendidik siswa.
            </p>
            <Link
              href="/profil/tentang"
              className="inline-block rounded-md border border-blue-500 px-5.5 py-3 text-sm font-semibold text-blue-700 hover:bg-blue-100"
            >
              Selengkapnya
            </Link>
          </div>
          <div className="flex aspect-[4/3] items-center justify-center rounded-md border border-dashed border-gray-200 bg-gray-50 p-5 text-center text-[13.5px] text-gray-500">
            Foto lingkungan sekolah
            <br />
            (diisi via Cloudinary di Pengaturan)
          </div>
        </div>
      </section>

      {/* SECTION 4 — Kompetensi Keahlian */}
      <section className="bg-gray-50 py-14">
        <div className="mx-auto max-w-6xl px-5">
          <SectionTitle eyebrow="Akademik" title="Kompetensi Keahlian" />
          {departmentList.length > 0 ? (
            <div className="mt-6 grid grid-cols-1 gap-4.5 md:grid-cols-3">
              {departmentList.map((d, i) => (
                <JurusanCard key={d.slug} item={d} index={i} />
              ))}
            </div>
          ) : (
            <p className="mt-6 text-[14px] text-gray-500">Data jurusan akan diperbarui.</p>
          )}
        </div>
      </section>

      {/* SECTION 5 — Berita Terbaru */}
      <section className="py-14">
        <div className="mx-auto max-w-6xl px-5">
          <div className="mb-1 flex items-baseline justify-between">
            <SectionTitle eyebrow="Informasi" title="Berita Terbaru" />
            <Link href="/berita" className="text-[13.5px] font-semibold text-blue-700">
              Lihat Semua Berita →
            </Link>
          </div>
          {newsList.length > 0 ? (
            <div className="mt-5 grid grid-cols-1 gap-4.5 md:grid-cols-3">
              {newsList.map((n) => (
                <NewsCard key={n.slug} item={n} />
              ))}
            </div>
          ) : (
            <p className="mt-5 text-[14px] text-gray-500">Belum ada berita yang dipublikasikan.</p>
          )}
        </div>
      </section>

      {/* SECTION 11 — PPDB CTA */}
      <div className="mx-auto max-w-6xl px-5 pb-14">
        <div className="rounded-xl bg-blue-900 p-8 text-white md:p-11">
          <h2 className="mb-2.5 font-serif text-[clamp(22px,3vw,28px)]">
            Penerimaan Peserta Didik Baru
          </h2>
          <p className="mb-5.5 max-w-[56ch] text-[14.5px] text-[#c9d7ea]">
            Informasi jadwal, persyaratan, dan alur pendaftaran PPDB dapat dilihat pada halaman
            PPDB.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link href="/ppdb" className="rounded-md bg-white px-5.5 py-3 text-sm font-semibold text-blue-900 hover:bg-gray-50">
              Lihat Informasi PPDB
            </Link>
            <Link
              href="/ppdb#daftar"
              className="rounded-md border border-[#7c9cc7] px-5.5 py-3 text-sm font-semibold text-white hover:bg-blue-700"
            >
              Daftar Sekarang
            </Link>
          </div>
        </div>
      </div>

      <Footer settings={settings ?? undefined} />
    </>
  );
}
