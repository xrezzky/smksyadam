import { createClient } from "@/lib/supabase/server";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";

export default async function KontakPage() {
  const supabase = createClient();
  const [{ data: settings }, { data: socials }] = await Promise.all([
    supabase.from("school_settings").select("*").eq("id", 1).maybeSingle(),
    supabase.from("social_links").select("*"),
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
      />
      <main className="mx-auto max-w-3xl px-5 py-10 md:py-14">
        <Reveal>
          <h1 className="mb-5 font-serif text-[clamp(24px,4vw,30px)] text-blue-900">Kontak</h1>
        </Reveal>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <Reveal delay={0}>
            <div className="card-lift flex h-full items-start gap-3 rounded-md border border-gray-200 bg-white p-4">
              <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-md bg-blue-100 text-base">
                📍
              </span>
              <div>
                <div className="text-[13px] font-semibold text-ink">Alamat</div>
                <div className="text-[14px] leading-relaxed text-gray-500">
                  {settings?.address ? (
                    mapEmbedSrc ? (
                      <a
                        href={settings.google_maps_url || mapEmbedSrc}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline decoration-gray-300 underline-offset-2 hover:text-blue-700 hover:decoration-blue-500"
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
            <div className="card-lift flex h-full items-start gap-3 rounded-md border border-gray-200 bg-white p-4">
              <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-md bg-blue-100 text-base">
                ☎️
              </span>
              <div>
                <div className="text-[13px] font-semibold text-ink">Telepon</div>
                <div className="text-[14px] text-gray-500">{settings?.phone ?? "[Nomor telepon]"}</div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={140}>
            <div className="card-lift flex h-full items-start gap-3 rounded-md border border-gray-200 bg-white p-4">
              <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-md bg-green-100 text-base">
                💬
              </span>
              <div>
                <div className="text-[13px] font-semibold text-ink">WhatsApp</div>
                <div className="text-[14px] text-gray-500">
                  {settings?.whatsapp ?? "[Nomor WhatsApp]"}
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={210}>
            <div className="card-lift flex h-full items-start gap-3 rounded-md border border-gray-200 bg-white p-4">
              <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-md bg-blue-100 text-base">
                ✉️
              </span>
              <div>
                <div className="text-[13px] font-semibold text-ink">Email</div>
                <div className="text-[14px] text-gray-500">{settings?.email ?? "[Email sekolah]"}</div>
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
                className="btn-pop rounded-md border border-gray-200 px-3 py-1.5 font-semibold capitalize text-blue-700 hover:border-blue-500 hover:bg-blue-100"
              >
                {s.platform}
              </a>
            ))}
          </Reveal>
        )}

        {mapEmbedSrc && (
          <Reveal delay={320} className="mt-8 aspect-video overflow-hidden rounded-md border border-gray-200 shadow-sm">
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
