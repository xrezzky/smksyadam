import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import AchievementForm from "@/components/admin/AchievementForm";

export default async function EditPrestasiPage({ params }: { params: { id: string } }) {
  const supabase = createClient();
  const { data: item } = await supabase
    .from("achievements")
    .select("*")
    .eq("id", params.id)
    .maybeSingle();

  if (!item) return notFound();

  return (
    <div>
      <h1 className="mb-6 font-serif text-2xl text-blue-900">Edit Prestasi</h1>
      <AchievementForm
        initial={{
          id: item.id,
          title: item.title,
          student_or_team: item.student_or_team ?? "",
          level: item.level ?? "",
          year: item.year ? String(item.year) : "",
          photo_url: item.photo_url ?? "",
          description: item.description ?? "",
        }}
      />
    </div>
  );
}
