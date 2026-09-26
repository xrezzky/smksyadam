import { createClient } from "@/lib/supabase/server";
import AboutImageUploadForm from "@/components/admin/AboutImageUploadForm";
import DeleteButton from "@/components/admin/DeleteButton";

export const dynamic = "force-dynamic";

export default async function AdminFotoTentangPage() {
  const supabase = createClient();
  const { data: items } = await supabase
    .from("about_images")
    .select("id, image_url, caption, display_order")
    .order("display_order", { ascending: true });

  const nextOrder = (items?.length ?? 0) === 0 ? 0 : Math.max(...items!.map((i) => i.display_order)) + 1;

  return (
    <div>
      <h1 className="mb-2 font-serif text-2xl text-blue-900">Foto Lingkungan Sekolah</h1>
      <p className="mb-6 text-[13.5px] text-gray-500">
        Foto ini tampil sebagai carousel (bisa geser otomatis/manual) di section &quot;Tentang
        SMK Syadam&quot; pada beranda — terpisah dari foto hero di paling atas. Upload lebih
        dari 1 foto supaya carousel bisa jalan.
      </p>

      <AboutImageUploadForm nextOrder={nextOrder} />

      {(items ?? []).length === 0 ? (
        <p className="text-[14px] text-gray-500">Belum ada foto.</p>
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
          {(items ?? []).map((g) => (
            <div key={g.id} className="overflow-hidden rounded-md border border-gray-200 bg-white">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={g.image_url} alt={g.caption ?? ""} className="aspect-[4/3] w-full object-cover" />
              <div className="flex items-center justify-between gap-2 p-2.5">
                <span className="truncate text-[12.5px] text-gray-500">
                  {g.caption || "-"} · urutan {g.display_order}
                </span>
                <DeleteButton table="about_images" id={g.id} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
