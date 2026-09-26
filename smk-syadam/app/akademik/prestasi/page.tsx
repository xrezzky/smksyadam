import { createClient } from "@/lib/supabase/server";
import PublicShell from "@/components/PublicShell";
import EmptyState from "@/components/EmptyState";

export default async function PrestasiPage() {
  const supabase = createClient();
  const { data: items } = await supabase
    .from("achievements")
    .select("*")
    .order("year", { ascending: false });

  return (
    <PublicShell>
      <main className="mx-auto max-w-6xl px-5 py-10 md:py-14">
        <h1 className="mb-7 font-serif text-[clamp(24px,4vw,30px)] text-blue-900">Prestasi</h1>

        {items && items.length > 0 ? (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3">
            {items.map((a) => (
              <div key={a.id} className="overflow-hidden rounded-md border border-gray-200">
                <div className="flex aspect-video items-center justify-center bg-gray-50 text-[12.5px] text-gray-500">
                  {a.photo_url ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={a.photo_url} alt={a.title} className="h-full w-full object-cover" />
                  ) : (
                    "Foto prestasi"
                  )}
                </div>
                <div className="p-4">
                  <h3 className="mb-1 text-[15px] font-semibold text-ink">{a.title}</h3>
                  {a.student_or_team && (
                    <p className="text-[13px] text-gray-500">{a.student_or_team}</p>
                  )}
                  <div className="mt-2 flex gap-2 text-[12px] text-accent-green">
                    {a.level && <span>{a.level}</span>}
                    {a.year && <span>· {a.year}</span>}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <EmptyState icon="🏆" message="Data prestasi akan diperbarui." />
        )}
      </main>
    </PublicShell>
  );
}
