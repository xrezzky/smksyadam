import { createClient } from "@/lib/supabase/server";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import NewsCard, { type NewsItem } from "@/components/NewsCard";
import EmptyState from "@/components/EmptyState";

export const revalidate = 60;

export default async function BeritaListPage() {
  const supabase = createClient();
  const [{ data: settings }, { data: news }] = await Promise.all([
    supabase.from("school_settings").select("*").eq("id", 1).maybeSingle(),
    supabase
      .from("news")
      .select("slug, title, excerpt, thumbnail_url, published_at, categories(name)")
      .eq("is_published", true)
      .order("published_at", { ascending: false }),
  ]);

  const newsList: NewsItem[] = (news ?? []).map((n: any) => ({
    ...n,
    category_name: n.categories?.name ?? null,
  }));

  return (
    <>
      <Navbar schoolName={settings?.school_name ?? undefined} logoUrl={settings?.logo_url} />
      <main className="mx-auto max-w-6xl px-5 py-10 md:py-14">
        <h1 className="mb-6 font-serif text-[clamp(24px,4vw,30px)] text-blue-900">Berita Sekolah</h1>
        {newsList.length > 0 ? (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3">
            {newsList.map((n) => (
              <NewsCard key={n.slug} item={n} />
            ))}
          </div>
        ) : (
          <EmptyState icon="📰" message="Belum ada berita yang dipublikasikan." />
        )}
      </main>
      <Footer settings={settings ?? undefined} />
    </>
  );
}
