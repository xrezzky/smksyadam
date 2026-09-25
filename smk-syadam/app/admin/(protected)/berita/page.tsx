import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import DeleteNewsButton from "@/components/admin/DeleteNewsButton";

export const dynamic = "force-dynamic";

export default async function AdminBeritaListPage() {
  const supabase = createClient();
  const { data: news } = await supabase
    .from("news")
    .select("id, title, is_published, published_at, created_at")
    .order("created_at", { ascending: false });

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="font-serif text-2xl text-blue-900">Berita</h1>
        <Link
          href="/admin/berita/baru"
          className="rounded-md bg-blue-700 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-900"
        >
          + Tulis Berita
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
            {(news ?? []).length === 0 && (
              <tr>
                <td colSpan={4} className="px-4 py-8 text-center text-gray-500">
                  Belum ada berita. Klik &quot;Tulis Berita&quot; untuk membuat yang pertama.
                </td>
              </tr>
            )}
            {(news ?? []).map((n) => (
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
                    <Link href={`/admin/berita/${n.id}`} className="font-semibold text-blue-700">
                      Edit
                    </Link>
                    <DeleteNewsButton id={n.id} />
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
