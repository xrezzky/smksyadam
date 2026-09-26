import { createClient } from "@/lib/supabase/server";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { notFound } from "next/navigation";

export default async function BeritaDetailPage({ params }: { params: { slug: string } }) {
  const supabase = createClient();
  const [{ data: settings }, { data: item }] = await Promise.all([
    supabase.from("school_settings").select("*").eq("id", 1).maybeSingle(),
    supabase
      .from("news")
      .select("*, categories(name)")
      .eq("slug", params.slug)
      .eq("is_published", true)
      .maybeSingle(),
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
      <Navbar schoolName={settings?.school_name ?? undefined} logoUrl={settings?.logo_url} />
      <main className="mx-auto max-w-3xl px-5 py-14">
        {item.categories?.name && (
          <div className="mb-2 text-[12.5px] font-semibold text-accent-green">
            {item.categories.name}
          </div>
        )}
        <h1 className="mb-2 font-serif text-3xl text-blue-900">{item.title}</h1>
        {date && <div className="mb-6 text-sm text-gray-500">{date}</div>}
        {item.thumbnail_url && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={item.thumbnail_url}
            alt={item.title}
            className="mb-7 w-full rounded-md object-cover"
          />
        )}
        <div className="whitespace-pre-line text-[15.5px] leading-relaxed text-ink">
          {item.content}
        </div>
      </main>
      <Footer settings={settings ?? undefined} />
    </>
  );
}
