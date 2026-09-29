import { createClient } from "@/lib/supabase/server";
import PublicShell from "@/components/PublicShell";
import EmptyState from "@/components/EmptyState";
import { TrophyIcon } from "@/components/icons";
import Reveal from "@/components/Reveal";
import BlurImage from "@/components/BlurImage";

// Warna badge tingkat kejuaraan disesuaikan biar sekilas jelas levelnya
function levelBadgeClass(level?: string | null) {
  const l = (level ?? "").toLowerCase();
  if (l.includes("nasional") || l.includes("internasional"))
    return "bg-amber-100 text-amber-700 dark:bg-amber-500/15 dark:text-amber-300";
  if (l.includes("provinsi")) return "bg-blue-100 text-blue-700 dark:bg-blue-500/15 dark:text-blue-300";
  return "bg-green-100 text-green-700 dark:bg-green-500/15 dark:text-green-300";
}

export default async function PrestasiPage() {
  const supabase = createClient();
  const { data: items } = await supabase
    .from("achievements")
    .select("*")
    .order("year", { ascending: false });

  return (
    <PublicShell>
      <main className="mx-auto max-w-6xl px-5 py-10 md:py-14">
        <Reveal>
          <h1 className="mb-7 font-serif text-[clamp(24px,4vw,30px)] text-blue-900 dark:text-gray-100">
            Prestasi
          </h1>
        </Reveal>

        {items && items.length > 0 ? (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3">
            {items.map((a, i) => (
              <Reveal key={a.id} delay={i * 80}>
                <div className="card-lift group overflow-hidden rounded-md border border-gray-200 dark:border-gray-800 dark:bg-gray-900">
                  <div className="flex aspect-video items-center justify-center overflow-hidden bg-gray-50 text-[12.5px] text-gray-500 dark:bg-gray-800 dark:text-gray-400">
                    {a.photo_url ? (
                      <BlurImage
                        src={a.photo_url}
                        alt={a.title}
                        className="img-zoom h-full w-full object-cover"
                      />
                    ) : (
                      <TrophyIcon className="h-7 w-7 text-gray-300 dark:text-gray-600" />
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="mb-1 text-[15px] font-semibold text-ink dark:text-gray-100">
                      {a.title}
                    </h3>
                    {a.student_or_team && (
                      <p className="text-[13px] text-gray-500 dark:text-gray-400">
                        {a.student_or_team}
                      </p>
                    )}
                    <div className="mt-2 flex flex-wrap items-center gap-2 text-[12px]">
                      {a.level && (
                        <span
                          className={`rounded-full px-2 py-0.5 font-semibold ${levelBadgeClass(a.level)}`}
                        >
                          {a.level}
                        </span>
                      )}
                      {a.year && <span className="text-gray-500 dark:text-gray-400">{a.year}</span>}
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        ) : (
          <EmptyState icon={<TrophyIcon className="h-6 w-6" />} message="Data prestasi akan diperbarui." />
        )}
      </main>
    </PublicShell>
  );
}
