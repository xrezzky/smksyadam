import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import NewsForm from "@/components/admin/NewsForm";

export default async function EditBeritaPage({ params }: { params: { id: string } }) {
  const supabase = createClient();
  const { data: item } = await supabase.from("news").select("*").eq("id", params.id).maybeSingle();

  if (!item) return notFound();

  return (
    <div>
      <h1 className="mb-6 font-serif text-2xl text-blue-900">Edit Berita</h1>
      <NewsForm
        initial={{
          id: item.id,
          title: item.title,
          slug: item.slug,
          excerpt: item.excerpt ?? "",
          content: item.content,
          thumbnail_url: item.thumbnail_url ?? "",
          is_published: item.is_published,
        }}
      />
    </div>
  );
}
