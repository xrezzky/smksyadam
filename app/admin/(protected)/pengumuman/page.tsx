import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import DeleteButton from "@/components/admin/DeleteButton";

export const dynamic = "force-dynamic";

export default async function AdminPengumumanListPage() {
  const supabase = createClient();
  const { data: items } = await supabase
    .from("announcements")
    .select("id, title, is_published, created_at")
    .order("created_at", { ascending: false });

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="font-serif text-2xl text-blue-900">Pengumuman</h1>
        <Link
          href="/admin/pengumuman/baru"
          className="rounded-md bg-blue-700 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-900"
        >
          + Buat Pengumuman
        </Link>
      </div>

      <div className="overflow-hidden rounded-md border border-gray-200 bg-white">
        <table className="w-full text-left text-[13.5px]">
          <thead className="bg-gray-50 text-gray-500">
            <tr>
              <th className="px-4 py-3 font-medium">Judul</th>
              <th className="px-4 py-3 font-medium">Status</th>
              <th className="px-4 py-3 font-medium">Dibuat</th>
              <th className="px-4 py-3 font-medium">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {(items ?? []).length === 0 && (
              <tr>
                <td colSpan={4} className="px-4 py-8 text-center text-gray-500">
                  Belum ada pengumuman.
                </td>
              </tr>
            )}
            {(items ?? []).map((n) => (
              <tr key={n.id} className="border-t border-gray-200">
                <td className="px-4 py-3">{n.title}</td>
                <td className="px-4 py-3">
                  <span
                    className={
                      n.is_published
                        ? "rounded-full bg-green-50 px-2.5 py-1 text-xs font-medium text-accent-green"
                        : "rounded-full bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-500"
                    }
                  >
                    {n.is_published ? "Terbit" : "Draf"}
                  </span>
                </td>
                <td className="px-4 py-3 text-gray-500">
                  {new Date(n.created_at).toLocaleDateString("id-ID")}
                </td>
                <td className="px-4 py-3">
                  <div className="flex gap-3">
                    <Link href={`/admin/pengumuman/${n.id}`} className="font-semibold text-blue-700">
                      Edit
                    </Link>
                    <DeleteButton table="announcements" id={n.id} />
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
