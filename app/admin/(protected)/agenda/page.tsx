import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import DeleteButton from "@/components/admin/DeleteButton";

export const dynamic = "force-dynamic";

export default async function AdminAgendaListPage() {
  const supabase = createClient();
  const { data: items } = await supabase
    .from("events")
    .select("id, title, location, start_at")
    .order("start_at", { ascending: true });

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="font-serif text-2xl text-blue-900">Agenda</h1>
        <Link
          href="/admin/agenda/baru"
          className="rounded-md bg-blue-700 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-900"
        >
          + Tambah Agenda
        </Link>
      </div>

      <div className="overflow-hidden rounded-md border border-gray-200 bg-white">
        <table className="w-full text-left text-[13.5px]">
          <thead className="bg-gray-50 text-gray-500">
            <tr>
              <th className="px-4 py-3 font-medium">Kegiatan</th>
              <th className="px-4 py-3 font-medium">Tanggal</th>
              <th className="px-4 py-3 font-medium">Lokasi</th>
              <th className="px-4 py-3 font-medium">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {(items ?? []).length === 0 && (
              <tr>
                <td colSpan={4} className="px-4 py-8 text-center text-gray-500">
                  Belum ada agenda.
                </td>
              </tr>
            )}
            {(items ?? []).map((n) => (
              <tr key={n.id} className="border-t border-gray-200">
                <td className="px-4 py-3">{n.title}</td>
                <td className="px-4 py-3 text-gray-500">
                  {new Date(n.start_at).toLocaleString("id-ID", {
                    dateStyle: "medium",
                    timeStyle: "short",
                  })}
                </td>
                <td className="px-4 py-3 text-gray-500">{n.location ?? "-"}</td>
                <td className="px-4 py-3">
                  <div className="flex gap-3">
                    <Link href={`/admin/agenda/${n.id}`} className="font-semibold text-blue-700">
                      Edit
                    </Link>
                    <DeleteButton table="events" id={n.id} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
