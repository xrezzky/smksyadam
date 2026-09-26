import { createClient } from "@/lib/supabase/server";
import PublicShell from "@/components/PublicShell";
import { notFound } from "next/navigation";

export default async function JurusanDetailPage({ params }: { params: { slug: string } }) {
  const supabase = createClient();
  const { data: item } = await supabase
    .from("departments")
    .select("*")
    .eq("slug", params.slug)
    .maybeSingle();

  if (!item) return notFound();

  return (
    <PublicShell>
      <main className="mx-auto max-w-3xl px-5 py-10 md:py-14">
        <h1 className="mb-5 font-serif text-[clamp(24px,4vw,30px)] text-blue-900">{item.name}</h1>
        {item.photo_url && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={item.photo_url}
            alt={item.name}
            className="mb-7 aspect-video w-full rounded-md object-cover"
          />
        )}
        <div className="whitespace-pre-line text-[15.5px] leading-relaxed text-ink">
          {item.full_description ?? item.short_description ?? "Deskripsi jurusan akan diperbarui."}
        </div>
      </main>
    </PublicShell>
  );
}
