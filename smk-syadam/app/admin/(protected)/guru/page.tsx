import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import DeleteButton from "@/components/admin/DeleteButton";

export const dynamic = "force-dynamic";

export default async function AdminGuruListPage() {
  const supabase = createClient();
  const { data: items } = await supabase
    .from("teachers")
    .select("id, full_name, position, photo_url")
    .order("display_order", { ascending: true });

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="font-serif text-2xl text-blue-900">Guru & Tenaga Kependidikan</h1>
        <Link
          href="/admin/guru/baru"
          className="rounded-md bg-blue-700 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-900"
        >
          + Tambah Guru
        </Link>
      </div>

      <div className="overflow-hidden rounded-md border border-gray-200 bg-white">
        <table className="w-full text-left text-[13.5px]">
          <thead className="bg-gray-50 text-gray-500">
            <tr>
              <th className="px-4 py-3 font-medium">Foto</th>
              <th className="px-4 py-3 font-medium">Nama</th>
              <th className="px-4 py-3 font-medium">Jabatan</th>
              <th className="px-4 py-3 font-medium">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {(items ?? []).length === 0 && (
              <tr>
                <td colSpan={4} className="px-4 py-8 text-center text-gray-500">
                  Belum ada data guru.
                </td>
              </tr>
            )}
            {(items ?? []).map((t) => (
              <tr key={t.id} className="border-t border-gray-200">
                <td className="px-4 py-3">
                  {t.photo_url ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={t.photo_url} alt={t.full_name} className="h-9 w-9 rounded-full object-cover" />
                  ) : (
                    <div className="h-9 w-9 rounded-full bg-gray-100" />
                  )}
                </td>
                <td className="px-4 py-3">{t.full_name}</td>
                <td className="px-4 py-3 text-gray-500">{t.position}</td>
                <td className="px-4 py-3">
                  <div className="flex gap-3">
                    <Link href={`/admin/guru/${t.id}`} className="font-semibold text-blue-700">
                      Edit
                    </Link>
                    <DeleteButton table="teachers" id={t.id} />
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
