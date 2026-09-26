import { createClient } from "@/lib/supabase/server";
import GalleryUploadForm from "@/components/admin/GalleryUploadForm";
import DeleteButton from "@/components/admin/DeleteButton";

export const dynamic = "force-dynamic";

export default async function AdminGaleriPage() {
  const supabase = createClient();
  const { data: items } = await supabase
    .from("gallery")
    .select("id, image_url, caption, created_at")
    .order("created_at", { ascending: false });

  return (
    <div>
      <h1 className="mb-6 font-serif text-2xl text-blue-900">Galeri</h1>

      <GalleryUploadForm />

      {(items ?? []).length === 0 ? (
        <p className="text-[14px] text-gray-500">Belum ada foto.</p>
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
          {(items ?? []).map((g) => (
            <div key={g.id} className="overflow-hidden rounded-md border border-gray-200 bg-white">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={g.image_url} alt={g.caption ?? ""} className="aspect-square w-full object-cover" />
              <div className="flex items-center justify-between gap-2 p-2.5">
                <span className="truncate text-[12.5px] text-gray-500">{g.caption || "-"}</span>
                <DeleteButton table="gallery" id={g.id} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
