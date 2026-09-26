import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import DeleteButton from "@/components/admin/DeleteButton";

export const dynamic = "force-dynamic";

export default async function AdminJurusanListPage() {
  const supabase = createClient();
  const { data: items } = await supabase
    .from("departments")
    .select("id, name, short_description")
    .order("display_order", { ascending: true });

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="font-serif text-2xl text-blue-900">Kompetensi Keahlian</h1>
        <Link
          href="/admin/jurusan/baru"
          className="rounded-md bg-blue-700 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-900"
        >
          + Tambah Jurusan
        </Link>
      </div>

      <div className="overflow-hidden rounded-md border border-gray-200 bg-white">
        <table className="w-full text-left text-[13.5px]">
          <thead className="bg-gray-50 text-gray-500">
            <tr>
              <th className="px-4 py-3 font-medium">Nama Jurusan</th>
              <th className="px-4 py-3 font-medium">Deskripsi Singkat</th>
              <th className="px-4 py-3 font-medium">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {(items ?? []).length === 0 && (
              <tr>
                <td colSpan={3} className="px-4 py-8 text-center text-gray-500">
                  Belum ada data jurusan.
                </td>
              </tr>
            )}
            {(items ?? []).map((d) => (
              <tr key={d.id} className="border-t border-gray-200">
                <td className="px-4 py-3">{d.name}</td>
                <td className="px-4 py-3 text-gray-500">{d.short_description ?? "-"}</td>
                <td className="px-4 py-3">
                  <div className="flex gap-3">
                    <Link href={`/admin/jurusan/${d.id}`} className="font-semibold text-blue-700">
                      Edit
                    </Link>
                    <DeleteButton table="departments" id={d.id} />
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
