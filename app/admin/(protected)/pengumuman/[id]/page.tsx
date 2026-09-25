import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import AnnouncementForm from "@/components/admin/AnnouncementForm";

export default async function EditPengumumanPage({ params }: { params: { id: string } }) {
  const supabase = createClient();
  const { data: item } = await supabase
    .from("announcements")
    .select("*")
    .eq("id", params.id)
    .maybeSingle();

  if (!item) return notFound();

  return (
    <div>
      <h1 className="mb-6 font-serif text-2xl text-blue-900">Edit Pengumuman</h1>
      <AnnouncementForm
        initial={{
          id: item.id,
          title: item.title,
          content: item.content,
          is_published: item.is_published,
        }}
      />
    </div>
  );
}
