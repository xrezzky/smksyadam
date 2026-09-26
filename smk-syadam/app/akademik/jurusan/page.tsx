import { createClient } from "@/lib/supabase/server";
import PublicShell from "@/components/PublicShell";
import JurusanCard from "@/components/JurusanCard";

export const revalidate = 60;

export default async function JurusanListPage() {
  const supabase = createClient();
  const { data: departments } = await supabase
    .from("departments")
    .select("slug, name, short_description")
    .order("display_order", { ascending: true });

  return (
    <PublicShell>
      <main className="mx-auto max-w-6xl px-5 py-14">
        <h1 className="mb-7 font-serif text-3xl text-blue-900">Kompetensi Keahlian</h1>
        {departments && departments.length > 0 ? (
          <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
            {departments.map((d, i) => (
              <JurusanCard key={d.slug} item={d} index={i} />
            ))}
          </div>
        ) : (
          <p className="text-[14px] text-gray-500">Data jurusan akan diperbarui.</p>
        )}
      </main>
    </PublicShell>
  );
}
