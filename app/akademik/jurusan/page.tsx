import { createClient } from "@/lib/supabase/server";
import PublicShell from "@/components/PublicShell";
import JurusanCard from "@/components/JurusanCard";
import EmptyState from "@/components/EmptyState";

export const revalidate = 60;

export default async function JurusanListPage() {
  const supabase = createClient();
  const { data: departments } = await supabase
    .from("departments")
    .select("slug, name, short_description")
    .order("display_order", { ascending: true });

  return (
    <PublicShell>
      <main className="mx-auto max-w-6xl px-5 py-10 md:py-14">
        <h1 className="mb-7 font-serif text-[clamp(24px,4vw,30px)] text-blue-900">Kompetensi Keahlian</h1>
        {departments && departments.length > 0 ? (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3">
            {departments.map((d, i) => (
              <JurusanCard key={d.slug} item={d} index={i} />
            ))}
          </div>
        ) : (
          <EmptyState icon="🎓" message="Data jurusan akan diperbarui." />
        )}
      </main>
    </PublicShell>
  );
}
