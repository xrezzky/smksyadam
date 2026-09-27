import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import ExtracurricularForm from "@/components/admin/ExtracurricularForm";

export default async function EditEkstrakurikulerPage({ params }: { params: { id: string } }) {
  const supabase = createClient();
  const { data: item } = await supabase
    .from("extracurriculars")
    .select("*")
    .eq("id", params.id)
    .maybeSingle();

  if (!item) return notFound();

  return (
    <div>
      <h1 className="mb-6 font-serif text-2xl text-blue-900">Edit Ekstrakurikuler</h1>
      <ExtracurricularForm
        initial={{
          id: item.id,
          name: item.name,
          photo_url: item.photo_url ?? "",
          description: item.description ?? "",
          display_order: item.display_order ?? 0,
        }}
      />
    </div>
  );
}
