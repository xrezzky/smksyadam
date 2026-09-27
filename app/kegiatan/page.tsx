import { createClient } from "@/lib/supabase/server";
import PublicShell from "@/components/PublicShell";
import Link from "next/link";

export const revalidate = 60;

export default async function KegiatanPage() {
  const supabase = createClient();
  const { data: items } = await supabase
    .from("gallery")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(12);

  return (
    <PublicShell>
      <main className="mx-auto max-w-6xl px-5 py-10 md:py-14">
        <div className="mb-7 flex items-baseline justify-between">
          <h1 className="font-serif text-[clamp(24px,4vw,30px)] text-blue-900">Kegiatan Sekolah</h1>
          <Link href="/galeri" className="text-[13.5px] font-semibold text-blue-700">
            Lihat Semua Galeri →
          </Link>
        </div>

        {items && items.length > 0 ? (
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
            {items.map((g) => (
              <div key={g.id} className="overflow-hidden rounded-md border border-gray-200">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={g.image_url}
                  alt={g.caption ?? ""}
                  loading="lazy"
                  className="aspect-square w-full object-cover"
                />
              </div>
            ))}
          </div>
        ) : (
          <p className="text-[14px] text-gray-500">
            Dokumentasi kegiatan sekolah akan ditampilkan di sini.
          </p>
        )}
      </main>
    </PublicShell>
  );
}
