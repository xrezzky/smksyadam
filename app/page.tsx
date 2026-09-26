import { createClient } from "@/lib/supabase/server";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import SectionTitle from "@/components/SectionTitle";
import NewsCard, { type NewsItem } from "@/components/NewsCard";
import JurusanCard, { type Department } from "@/components/JurusanCard";
import AboutCarousel, { type AboutImage } from "@/components/AboutCarousel";
import Footer from "@/components/Footer";
import EmptyState from "@/components/EmptyState";
import Link from "next/link";

// Pilih jumlah kolom grid berdasarkan jumlah jurusan yang benar-benar ada,
// supaya baris terakhir tidak pernah "menggantung" (mis. 3 lalu 1 sendirian).
function jurusanGridClass(count: number) {
  if (count <= 2) return "sm:grid-cols-2";
  if (count === 4) return "sm:grid-cols-2 lg:grid-cols-4";
  return "sm:grid-cols-2 md:grid-cols-3";
}

export const revalidate = 60; // ISR — homepage di-refresh tiap 60 detik

export default async function HomePage() {
  const supabase = createClient();

  const [{ data: settings }, { data: departments }, { data: news }, { data: aboutImages }] =
    await Promise.all([
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
      supabase
        .from("about_images")
        .select("id, image_url, caption")
        .order("display_order", { ascending: true }),
    ]);

  const departmentList: Department[] = departments ?? [];
  const newsList: NewsItem[] = (news ?? []).map((n: any) => ({
    ...n,
    category_name: n.categories?.name ?? null,
  }));
  const aboutImageList: AboutImage[] = aboutImages ?? [];

  return (
    <>
      <Navbar schoolName={settings?.school_name ?? undefined} logoUrl={settings?.logo_url} />
      <Hero heroImageUrl={settings?.hero_image_url} />

      {/* SECTION 1 — Tentang Sekolah */}
      <section className="py-10 md:py-14">
        <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-8 px-5 md:grid-cols-[1.1fr_0.9fr] md:gap-10">
          <div>
            <SectionTitle eyebrow="Tentang Kami" title="Tentang SMK Syadam" />
            <p className="mb-5 max-w-[52ch] text-[15px] leading-relaxed text-gray-500">
              [Deskripsi singkat sekolah — dapat diisi admin melalui menu Pengaturan.] Bagian ini
              menjelaskan sejarah singkat, ciri khas, dan komitmen sekolah dalam mendidik siswa.
            </p>
            <Link
              href="/profil/tentang"
              className="inline-block rounded-md border border-blue-500 px-[22px] py-3 text-sm font-semibold text-blue-700 hover:bg-blue-100"
            >
              Selengkapnya
            </Link>
          </div>
          <div>
            {aboutImageList.length > 0 ? (
              <AboutCarousel images={aboutImageList} />
            ) : (
              <div className="flex aspect-[4/3] flex-col items-center justify-center gap-2 rounded-xl bg-gradient-to-br from-blue-100 to-blue-50 p-6 text-center">
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-xl shadow-sm">
                  🏫
                </span>
                <p className="text-[13.5px] font-medium text-blue-900">Foto lingkungan sekolah</p>
                <p className="text-[12.5px] text-blue-700/70">
                  Segera hadir — dapat diisi admin lewat menu &quot;Foto Tentang&quot;
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* SECTION 4 — Kompetensi Keahlian */}
      <section className="bg-gray-50 py-10 md:py-14">
        <div className="mx-auto max-w-6xl px-5">
          <SectionTitle eyebrow="Akademik" title="Kompetensi Keahlian" />
          {departmentList.length > 0 ? (
            <div
              className={`mt-6 grid grid-cols-1 gap-[18px] ${jurusanGridClass(departmentList.length)}`}
            >
              {departmentList.map((d, i) => (
                <JurusanCard key={d.slug} item={d} index={i} />
              ))}
            </div>
          ) : (
            <div className="mt-6">
              <EmptyState icon="🎓" message="Data jurusan akan diperbarui." />
            </div>
          )}
        </div>
      </section>

      {/* SECTION 5 — Berita Terbaru */}
      <section className="py-10 md:py-14">
        <div className="mx-auto max-w-6xl px-5">
          <div className="mb-1 flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between">
            <SectionTitle eyebrow="Informasi" title="Berita Terbaru" />
            <Link href="/berita" className="text-[13.5px] font-semibold text-blue-700">
              Lihat Semua Berita →
            </Link>
          </div>
          {newsList.length > 0 ? (
            <div className="mt-5 grid grid-cols-1 gap-[18px] sm:grid-cols-2 md:grid-cols-3">
              {newsList.map((n) => (
                <NewsCard key={n.slug} item={n} />
              ))}
            </div>
          ) : (
            <div className="mt-5">
              <EmptyState icon="📰" message="Belum ada berita yang dipublikasikan." />
            </div>
          )}
        </div>
      </section>

      {/* SECTION 11 — PPDB CTA */}
      <div className="mx-auto max-w-6xl px-5 pb-10 md:pb-14">
        <div className="rounded-xl bg-blue-900 p-6 text-white sm:p-8 md:p-10">
          <h2 className="mb-2.5 font-serif text-[clamp(22px,3vw,28px)]">
            Penerimaan Peserta Didik Baru
          </h2>
          <p className="mb-[22px] max-w-[56ch] text-[14.5px] leading-relaxed text-[#c9d7ea]">
            Informasi jadwal, persyaratan, dan alur pendaftaran PPDB dapat dilihat pada halaman
            PPDB.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link href="/ppdb" className="rounded-md bg-white px-[22px] py-3 text-sm font-semibold text-blue-900 hover:bg-gray-50">
              Lihat Informasi PPDB
            </Link>
            <Link
              href="/ppdb#daftar"
              className="rounded-md border border-[#7c9cc7] px-[22px] py-3 text-sm font-semibold text-white hover:bg-blue-700"
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
