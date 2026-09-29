import { createClient } from "@/lib/supabase/server";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import { PinIcon, PhoneIcon, ChatIcon, MailIcon } from "@/components/icons";

export default async function KontakPage() {
  const supabase = createClient();
  const [{ data: settings }, { data: socials }, { count: newAnnouncementsCount }] = await Promise.all([
    supabase.from("school_settings").select("*").eq("id", 1).maybeSingle(),
    supabase.from("social_links").select("*"),
    supabase
      .from("announcements")
      .select("*", { count: "exact", head: true })
      .eq("is_published", true)
      .gte("published_at", new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString()),
  ]);

  // Prioritas lokasi peta:
  // 1) google_maps_url — kalau ada, SELALU dipakai apa adanya, tidak divalidasi/diubah,
  //    karena ini sudah pasti titik lokasi yang benar (diinput manual oleh admin).
  // 2) address — hanya dipakai sebagai fallback pencarian kalau google_maps_url kosong.
  const mapEmbedSrc = settings?.google_maps_url
    ? settings.google_maps_url
    : settings?.address
    ? `https://www.google.com/maps?q=${encodeURIComponent(
        `${settings?.school_name ?? "SMK Syadam Bojonggede"}, ${settings.address}`
      )}&output=embed`
    : null;

  return (
    <>
      <Navbar
        schoolName={settings?.school_name ?? undefined}
        logoUrl={settings?.logo_url}
        whatsapp={settings?.whatsapp}
        newAnnouncementsCount={newAnnouncementsCount ?? 0}
      />
      <main className="mx-auto max-w-3xl px-5 py-10 md:py-14">
        <Reveal>
          <h1 className="mb-5 font-serif text-[clamp(24px,4vw,30px)] text-blue-900 dark:text-gray-100">Kontak</h1>
        </Reveal>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <Reveal delay={0}>
            <div className="card-lift flex h-full items-start gap-3 rounded-md border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-gray-900">
              <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-md bg-blue-100 text-base dark:bg-blue-500/15">
                <PinIcon className="h-[18px] w-[18px] text-blue-700 dark:text-blue-300" />
              </span>
              <div>
                <div className="text-[13px] font-semibold text-ink dark:text-gray-100">Alamat</div>
                <div className="text-[14px] leading-relaxed text-gray-500 dark:text-gray-400">
                  {settings?.address ? (
                    mapEmbedSrc ? (
                      <a
                        href={settings.google_maps_url || mapEmbedSrc}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline decoration-gray-300 underline-offset-2 hover:text-blue-700 hover:decoration-blue-500 dark:text-gray-300 dark:decoration-gray-600 dark:hover:text-blue-300"
                      >
                        {settings.address}
                      </a>
                    ) : (
                      settings.address
                    )
                  ) : (
                    "[Alamat resmi sekolah]"
                  )}
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={70}>
            <div className="card-lift flex h-full items-start gap-3 rounded-md border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-gray-900">
              <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-md bg-blue-100 text-base dark:bg-blue-500/15">
                <PhoneIcon className="h-[18px] w-[18px] text-blue-700 dark:text-blue-300" />
              </span>
              <div>
                <div className="text-[13px] font-semibold text-ink dark:text-gray-100">Telepon</div>
                <div className="text-[14px] text-gray-500 dark:text-gray-400">{settings?.phone ?? "[Nomor telepon]"}</div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={140}>
            <div className="card-lift flex h-full items-start gap-3 rounded-md border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-gray-900">
              <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-md bg-green-100 text-base dark:bg-green-500/15">
                <ChatIcon className="h-[18px] w-[18px] text-green-700 dark:text-green-300" />
              </span>
              <div>
                <div className="text-[13px] font-semibold text-ink dark:text-gray-100">WhatsApp</div>
                <div className="text-[14px] text-gray-500 dark:text-gray-400">
                  {settings?.whatsapp ?? "[Nomor WhatsApp]"}
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={210}>
            <div className="card-lift flex h-full items-start gap-3 rounded-md border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-gray-900">
              <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-md bg-blue-100 text-base dark:bg-blue-500/15">
                <MailIcon className="h-[18px] w-[18px] text-blue-700 dark:text-blue-300" />
              </span>
              <div>
                <div className="text-[13px] font-semibold text-ink dark:text-gray-100">Email</div>
                <div className="text-[14px] text-gray-500 dark:text-gray-400">{settings?.email ?? "[Email sekolah]"}</div>
              </div>
            </div>
          </Reveal>
        </div>

        {socials && socials.length > 0 && (
          <Reveal delay={260} className="mt-6 flex flex-wrap gap-4 text-sm">
            {socials.map((s: any) => (
              <a
                key={s.id}
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-pop rounded-md border border-gray-200 px-3 py-1.5 font-semibold capitalize text-blue-700 hover:border-blue-500 hover:bg-blue-100 dark:border-gray-700 dark:text-blue-300 dark:hover:bg-white/10"
              >
                {s.platform}
              </a>
            ))}
          </Reveal>
        )}

        {mapEmbedSrc && (
          <Reveal delay={320} className="mt-8 aspect-video overflow-hidden rounded-md border border-gray-200 shadow-sm dark:border-gray-800">
            <iframe
              src={mapEmbedSrc}
              className="h-full w-full"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </Reveal>
        )}
      </main>
      <Footer settings={settings ?? undefined} />
    </>
  );
}
