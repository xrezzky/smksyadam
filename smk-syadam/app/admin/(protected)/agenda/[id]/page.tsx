import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import EventForm from "@/components/admin/EventForm";

function toDatetimeLocal(iso: string | null) {
  if (!iso) return "";
  const d = new Date(iso);
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(
    d.getHours()
  )}:${pad(d.getMinutes())}`;
}

export default async function EditAgendaPage({ params }: { params: { id: string } }) {
  const supabase = createClient();
  const { data: item } = await supabase.from("events").select("*").eq("id", params.id).maybeSingle();

  if (!item) return notFound();

  return (
    <div>
      <h1 className="mb-6 font-serif text-2xl text-blue-900">Edit Agenda</h1>
      <EventForm
        initial={{
          id: item.id,
          title: item.title,
          description: item.description ?? "",
          location: item.location ?? "",
          start_at: toDatetimeLocal(item.start_at),
          end_at: toDatetimeLocal(item.end_at),
        }}
      />
    </div>
  );
}
