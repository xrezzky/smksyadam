import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import DeleteButton from "@/components/admin/DeleteButton";

export const dynamic = "force-dynamic";

export default async function AdminPrestasiListPage() {
  const supabase = createClient();
  const { data: items } = await supabase
    .from("achievements")
    .select("id, title, student_or_team, level, year")
    .order("year", { ascending: false });

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="font-serif text-2xl text-blue-900">Prestasi</h1>
        <Link
          href="/admin/prestasi/baru"
          className="rounded-md bg-blue-700 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-900"
        >
          + Tambah Prestasi
        </Link>
      </div>

      <div className="overflow-hidden rounded-md border border-gray-200 bg-white">
        <table className="w-full text-left text-[13.5px]">
          <thead className="bg-gray-50 text-gray-500">
            <tr>
              <th className="px-4 py-3 font-medium">Judul</th>
              <th className="px-4 py-3 font-medium">Siswa/Tim</th>
              <th className="px-4 py-3 font-medium">Tingkat</th>
              <th className="px-4 py-3 font-medium">Tahun</th>
              <th className="px-4 py-3 font-medium">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {(items ?? []).length === 0 && (
              <tr>
                <td colSpan={5} className="px-4 py-8 text-center text-gray-500">
                  Belum ada data prestasi.
                </td>
              </tr>
            )}
            {(items ?? []).map((a) => (
              <tr key={a.id} className="border-t border-gray-200">
                <td className="px-4 py-3">{a.title}</td>
                <td className="px-4 py-3 text-gray-500">{a.student_or_team ?? "-"}</td>
                <td className="px-4 py-3 text-gray-500">{a.level ?? "-"}</td>
                <td className="px-4 py-3 text-gray-500">{a.year ?? "-"}</td>
                <td className="px-4 py-3">
                  <div className="flex gap-3">
                    <Link href={`/admin/prestasi/${a.id}`} className="font-semibold text-blue-700">
                      Edit
                    </Link>
                    <DeleteButton table="achievements" id={a.id} />
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
