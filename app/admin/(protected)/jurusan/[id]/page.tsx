import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import DepartmentForm from "@/components/admin/DepartmentForm";

export default async function EditJurusanPage({ params }: { params: { id: string } }) {
  const supabase = createClient();
  const { data: item } = await supabase.from("departments").select("*").eq("id", params.id).maybeSingle();

  if (!item) return notFound();

  return (
    <div>
      <h1 className="mb-6 font-serif text-2xl text-blue-900">Edit Jurusan</h1>
      <DepartmentForm
        initial={{
          id: item.id,
          name: item.name,
          slug: item.slug,
          photo_url: item.photo_url ?? "",
          short_description: item.short_description ?? "",
          full_description: item.full_description ?? "",
          display_order: item.display_order ?? 0,
        }}
      />
    </div>
  );
}
