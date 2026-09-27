import { createClient } from "@/lib/supabase/server";
import PublicShell from "@/components/PublicShell";
import EmptyState from "@/components/EmptyState";

export default async function EkstrakurikulerPage() {
  const supabase = createClient();
  const { data: items } = await supabase
    .from("extracurriculars")
    .select("*")
    .order("display_order", { ascending: true });

  return (
    <PublicShell>
      <main className="mx-auto max-w-6xl px-5 py-10 md:py-14">
        <h1 className="mb-7 font-serif text-[clamp(24px,4vw,30px)] text-blue-900">Ekstrakurikuler</h1>

        {items && items.length > 0 ? (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3">
            {items.map((item) => (
              <div key={item.id} className="overflow-hidden rounded-md border border-gray-200 bg-white">
                {item.photo_url ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={item.photo_url} alt={item.name} className="h-40 w-full object-cover" />
                ) : (
                  <div className="flex h-40 w-full items-center justify-center bg-blue-100 text-3xl">
                    🏅
                  </div>
                )}
                <div className="p-5">
                  <h3 className="mb-1.5 text-base font-semibold text-ink">{item.name}</h3>
                  {item.description && (
                    <p className="text-[14px] leading-relaxed text-gray-500">{item.description}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <EmptyState icon="🏅" message="Data ekstrakurikuler akan diperbarui." />
        )}
      </main>
    </PublicShell>
  );
}
