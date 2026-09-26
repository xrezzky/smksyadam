import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import TeacherForm from "@/components/admin/TeacherForm";

export default async function EditGuruPage({ params }: { params: { id: string } }) {
  const supabase = createClient();
  const { data: item } = await supabase.from("teachers").select("*").eq("id", params.id).maybeSingle();

  if (!item) return notFound();

  return (
    <div>
      <h1 className="mb-6 font-serif text-2xl text-blue-900">Edit Guru</h1>
      <TeacherForm
        initial={{
          id: item.id,
          full_name: item.full_name,
          position: item.position,
          subject_area: item.subject_area ?? "",
          photo_url: item.photo_url ?? "",
          bio: item.bio ?? "",
          display_order: item.display_order ?? 0,
        }}
      />
    </div>
  );
}
