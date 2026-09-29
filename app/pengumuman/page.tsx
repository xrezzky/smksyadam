import { createClient } from "@/lib/supabase/server";
import PublicShell from "@/components/PublicShell";
import EmptyState from "@/components/EmptyState";
import Reveal from "@/components/Reveal";

export const revalidate = 60;

export default async function PengumumanPage() {
  const supabase = createClient();
  const { data: items } = await supabase
    .from("announcements")
    .select("*")
    .eq("is_published", true)
    .order("published_at", { ascending: false });

  return (
    <PublicShell>
      <main className="mx-auto max-w-3xl px-5 py-10 md:py-14">
        <Reveal><h1 className="mb-7 font-serif text-[clamp(24px,4vw,30px)] text-blue-900 dark:text-gray-100">Pengumuman</h1></Reveal>

        {items && items.length > 0 ? (
          <div className="space-y-5">
            {items.map((a, i) => {
              const isNew =
                a.published_at &&
                Date.now() - new Date(a.published_at).getTime() < 7 * 24 * 60 * 60 * 1000;

              return (
                <Reveal key={a.id} delay={i * 70}><div className="card-lift rounded-md border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-gray-900">
                  <div className="mb-1 flex flex-wrap items-center gap-2">
                    <h3 className="text-[15.5px] font-semibold text-ink dark:text-gray-100">{a.title}</h3>
                    {isNew && (
                      <span className="inline-flex animate-pulse items-center rounded-full bg-accent-orange/15 px-2 py-0.5 text-[10.5px] font-bold uppercase tracking-wide text-accent-orange">
                        Baru
                      </span>
                    )}
                  </div>
                  {a.published_at && (
                    <p className="mb-2 text-xs text-gray-500 dark:text-gray-400">
                      {new Date(a.published_at).toLocaleDateString("id-ID", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </p>
                  )}
                  <p className="whitespace-pre-line text-[14.5px] text-gray-500 dark:text-gray-400">{a.content}</p>
                </div></Reveal>
              );
            })}
          </div>
        ) : (
          <EmptyState icon="📢" message="Belum ada pengumuman." />
        )}
      </main>
    </PublicShell>
  );
}
