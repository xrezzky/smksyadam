import { createClient } from "@/lib/supabase/server";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BlurImage from "@/components/BlurImage";
import ShareButtons from "@/components/ShareButtons";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function BeritaDetailPage({ params }: { params: { slug: string } }) {
  const supabase = createClient();
  const [{ data: settings }, { data: item }, { count: newAnnouncementsCount }] = await Promise.all([
    supabase.from("school_settings").select("*").eq("id", 1).maybeSingle(),
    supabase
      .from("news")
      .select("*, categories(name)")
      .eq("slug", params.slug)
      .eq("is_published", true)
      .maybeSingle(),
    supabase
      .from("announcements")
      .select("*", { count: "exact", head: true })
      .eq("is_published", true)
      .gte("published_at", new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString()),
  ]);

  if (!item) return notFound();

  const date = item.published_at
    ? new Date(item.published_at).toLocaleDateString("id-ID", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : null;

  return (
    <>
      <Navbar
        schoolName={settings?.school_name ?? undefined}
        logoUrl={settings?.logo_url}
        whatsapp={settings?.whatsapp}
        newAnnouncementsCount={newAnnouncementsCount ?? 0}
      />
      <main className="mx-auto max-w-3xl px-5 py-10 md:py-14">
        <Link
          href="/berita"
          className="group mb-5 inline-flex items-center gap-1.5 text-[13.5px] font-semibold text-blue-700 dark:text-blue-400"
        >
          <span className="arrow-nudge inline-block rotate-180">→</span> Kembali ke Berita
        </Link>

        <div className="animate-fade-in-up">
          {item.categories?.name && (
            <div className="mb-2 text-[12.5px] font-semibold text-accent-green">
              {item.categories.name}
            </div>
          )}
          <h1 className="mb-2 font-serif text-[clamp(24px,4vw,30px)] text-blue-900 dark:text-gray-100">
            {item.title}
          </h1>
          {date && <div className="mb-6 text-sm text-gray-500 dark:text-gray-400">{date}</div>}
        </div>

        {item.thumbnail_url && (
          <div
            className="animate-fade-in mb-7 aspect-video w-full overflow-hidden rounded-md"
            style={{ animationDelay: "120ms" }}
          >
            <BlurImage
              src={item.thumbnail_url}
              alt={item.title}
              className="h-full w-full object-cover"
            />
          </div>
        )}
        <div
          className="animate-fade-in-up whitespace-pre-line text-[15.5px] leading-relaxed text-ink dark:text-gray-200"
          style={{ animationDelay: "200ms" }}
        >
          {item.content}
        </div>

        <div
          className="animate-fade-in mt-8 border-t border-gray-200 pt-5 dark:border-gray-800"
          style={{ animationDelay: "240ms" }}
        >
          <ShareButtons title={item.title} />
        </div>

        {item.source_url && (
          <p
            className="animate-fade-in mt-5 text-[13.5px] text-gray-500 dark:text-gray-400"
            style={{ animationDelay: "280ms" }}
          >
            Sumber:{" "}
            <a
              href={item.source_url}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-blue-700 hover:underline dark:text-blue-400"
            >
              {item.source_url}
            </a>
          </p>
        )}
      </main>
      <Footer settings={settings ?? undefined} />
    </>
  );
}
