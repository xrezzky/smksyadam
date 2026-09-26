import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import AboutImageEditForm from "@/components/admin/AboutImageEditForm";

export default async function EditFotoTentangPage({ params }: { params: { id: string } }) {
  const supabase = createClient();
  const { data: item } = await supabase
    .from("about_images")
    .select("*")
    .eq("id", params.id)
    .maybeSingle();

  if (!item) return notFound();

  return (
    <div>
      <h1 className="mb-6 font-serif text-2xl text-blue-900">Edit Foto Lingkungan Sekolah</h1>
      <AboutImageEditForm
        initial={{
          id: item.id,
          image_url: item.image_url,
          caption: item.caption ?? "",
          display_order: item.display_order ?? 0,
        }}
      />
    </div>
  );
}
