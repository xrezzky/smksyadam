import { createClient } from "@/lib/supabase/server";
import PublicShell from "@/components/PublicShell";
import EmptyState from "@/components/EmptyState";

export default async function GuruPage() {
  const supabase = createClient();
  const { data: teachers } = await supabase
    .from("teachers")
    .select("*")
    .order("display_order", { ascending: true });

  return (
    <PublicShell>
      <main className="mx-auto max-w-6xl px-5 py-10 md:py-14">
        <h1 className="mb-7 font-serif text-[clamp(24px,4vw,30px)] text-blue-900">Guru & Tenaga Kependidikan</h1>

        {teachers && teachers.length > 0 ? (
          <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 md:grid-cols-4">
            {teachers.map((t) => (
              <div key={t.id} className="text-center">
                {t.photo_url ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={t.photo_url}
                    alt={t.full_name}
                    className="mx-auto mb-3 h-28 w-28 rounded-full object-cover"
                  />
                ) : (
                  <div className="mx-auto mb-3 h-28 w-28 rounded-full bg-gray-50" />
                )}
                <h3 className="text-[14.5px] font-semibold text-ink">{t.full_name}</h3>
                <p className="text-[13px] text-gray-500">{t.position}</p>
                {t.subject_area && (
                  <p className="text-[12px] text-accent-green">{t.subject_area}</p>
                )}
              </div>
            ))}
          </div>
        ) : (
          <EmptyState icon="🧑‍🏫" message="Data guru akan diperbarui." />
        )}
      </main>
    </PublicShell>
  );
}
