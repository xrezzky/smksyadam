import { createClient } from "@/lib/supabase/server";
import PublicShell from "@/components/PublicShell";
import GaleriGrid from "@/components/GaleriGrid";
import Reveal from "@/components/Reveal";
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
        <Reveal className="mb-7 flex items-baseline justify-between">
          <h1 className="font-serif text-[clamp(24px,4vw,30px)] text-blue-900 dark:text-gray-100">Kegiatan Sekolah</h1>
          <Link href="/galeri" className="group text-[13.5px] font-semibold text-blue-700 dark:text-blue-300">
            Lihat Semua Galeri <span className="arrow-nudge">→</span>
          </Link>
        </Reveal>

        {items && items.length > 0 ? (
          <GaleriGrid items={items} />
        ) : (
          <p className="text-[14px] text-gray-500 dark:text-gray-400">
            Dokumentasi kegiatan sekolah akan ditampilkan di sini.
          </p>
        )}
      </main>
    </PublicShell>
  );
}
