import { createClient } from "@/lib/supabase/server";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import NewsCard, { type NewsItem } from "@/components/NewsCard";

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
      <main className="mx-auto max-w-6xl px-5 py-14">
        <h1 className="mb-7 font-serif text-3xl text-blue-900">Berita Sekolah</h1>
        {newsList.length > 0 ? (
          <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
            {newsList.map((n) => (
              <NewsCard key={n.slug} item={n} />
            ))}
          </div>
        ) : (
          <p className="text-[15px] text-gray-500">Belum ada berita yang dipublikasikan.</p>
        )}
      </main>
      <Footer settings={settings ?? undefined} />
    </>
  );
}
