import { createClient } from "@/lib/supabase/server";
import PublicShell from "@/components/PublicShell";
import EmptyState from "@/components/EmptyState";
import Reveal from "@/components/Reveal";
import BlurImage from "@/components/BlurImage";

export default async function EkstrakurikulerPage() {
  const supabase = createClient();
  const { data: items } = await supabase
    .from("extracurriculars")
    .select("*")
    .order("display_order", { ascending: true });

  return (
    <PublicShell>
      <main className="mx-auto max-w-6xl px-5 py-10 md:py-14">
        <Reveal>
          <h1 className="mb-7 font-serif text-[clamp(24px,4vw,30px)] text-blue-900 dark:text-gray-100">
            Ekstrakurikuler
          </h1>
        </Reveal>

        {items && items.length > 0 ? (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3">
            {items.map((item, i) => (
              <Reveal key={item.id} delay={i * 80}>
                <div className="card-lift group overflow-hidden rounded-md border border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900">
                  {item.photo_url ? (
                    <BlurImage
                      src={item.photo_url}
                      alt={item.name}
                      className="img-zoom h-40 w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-40 w-full items-center justify-center bg-blue-100 text-3xl transition-transform duration-300 ease-out group-hover:scale-110 dark:bg-blue-500/10">
                      🏅
                    </div>
                  )}
                  <div className="p-5">
                    <h3 className="mb-1.5 text-base font-semibold text-ink dark:text-gray-100">
                      {item.name}
                    </h3>
                    {item.description && (
                      <p className="text-[14px] leading-relaxed text-gray-500 dark:text-gray-400">
                        {item.description}
                      </p>
                    )}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        ) : (
          <EmptyState icon="🏅" message="Data ekstrakurikuler akan diperbarui." />
        )}
      </main>
    </PublicShell>
  );
}
