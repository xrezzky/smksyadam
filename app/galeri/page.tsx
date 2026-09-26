import { createClient } from "@/lib/supabase/server";
import PublicShell from "@/components/PublicShell";
import EmptyState from "@/components/EmptyState";
import GaleriGrid from "@/components/GaleriGrid";

export const revalidate = 60;

export default async function GaleriPage() {
  const supabase = createClient();
  const { data: items } = await supabase
    .from("gallery")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <PublicShell>
      <main className="mx-auto max-w-6xl px-5 py-10 md:py-14">
        <h1 className="mb-7 font-serif text-[clamp(24px,4vw,30px)] text-blue-900">Galeri</h1>

        {items && items.length > 0 ? (
          <GaleriGrid items={items} />
        ) : (
          <EmptyState icon="🖼️" message="Belum ada foto di galeri." />
        )}
      </main>
    </PublicShell>
  );
}
