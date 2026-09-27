import { createClient } from "@/lib/supabase/server";
import PublicShell from "@/components/PublicShell";
import EmptyState from "@/components/EmptyState";
import Reveal from "@/components/Reveal";

export const revalidate = 60;

export default async function AgendaPage() {
  const supabase = createClient();
  const { data: items } = await supabase
    .from("events")
    .select("*")
    .order("start_at", { ascending: true });

  return (
    <PublicShell>
      <main className="mx-auto max-w-3xl px-5 py-10 md:py-14">
        <Reveal>
          <h1 className="mb-7 font-serif text-[clamp(24px,4vw,30px)] text-blue-900">
            Agenda Sekolah
          </h1>
        </Reveal>

        {items && items.length > 0 ? (
          <div className="relative space-y-4 sm:pl-1">
            {/* Garis vertikal penghubung — kesan timeline, hanya terlihat mulai sm ke atas */}
            <div
              className="absolute bottom-4 left-[27px] top-4 hidden w-px bg-gray-200 sm:block"
              aria-hidden="true"
            />
            {items.map((e, i) => (
              <Reveal key={e.id} delay={i * 80} direction="left">
                <div className="card-lift relative flex gap-4 rounded-md border border-gray-200 bg-white p-4">
                  <div className="relative z-10 flex-shrink-0 rounded-md bg-blue-100 px-3 py-2 text-center">
                    <div className="font-serif text-lg text-blue-900">
                      {new Date(e.start_at).getDate()}
                    </div>
                    <div className="text-[11px] uppercase text-blue-700">
                      {new Date(e.start_at).toLocaleDateString("id-ID", { month: "short" })}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-[15px] font-semibold text-ink">{e.title}</h3>
                    <p className="text-[13px] text-gray-500">
                      {new Date(e.start_at).toLocaleTimeString("id-ID", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}{" "}
                      WIB{e.location ? ` · ${e.location}` : ""}
                    </p>
                    {e.description && (
                      <p className="mt-1 text-[14px] leading-relaxed text-gray-500">
                        {e.description}
                      </p>
                    )}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        ) : (
          <EmptyState icon="🗓️" message="Belum ada agenda mendatang." />
        )}
      </main>
    </PublicShell>
  );
}
