import { createClient } from "@/lib/supabase/server";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default async function KontakPage() {
  const supabase = createClient();
  const [{ data: settings }, { data: socials }] = await Promise.all([
    supabase.from("school_settings").select("*").eq("id", 1).maybeSingle(),
    supabase.from("social_links").select("*"),
  ]);

  // Link yang diinput admin dipakai apa adanya, tidak diutak-atik atau dicari ulang.
  const mapEmbedSrc = settings?.google_maps_url || null;

  return (
    <>
      <Navbar schoolName={settings?.school_name ?? undefined} logoUrl={settings?.logo_url} />
      <main className="mx-auto max-w-3xl px-5 py-10 md:py-14">
        <h1 className="mb-5 font-serif text-[clamp(24px,4vw,30px)] text-blue-900">Kontak</h1>
        <div className="space-y-3 rounded-xl border border-gray-200 bg-white p-5 text-[15px] leading-relaxed text-gray-500 sm:p-6">
          <p><strong className="text-ink">Alamat:</strong> {settings?.address ?? "[Alamat resmi sekolah]"}</p>
          <p><strong className="text-ink">Telepon:</strong> {settings?.phone ?? "[Nomor telepon]"}</p>
          <p><strong className="text-ink">WhatsApp:</strong> {settings?.whatsapp ?? "[Nomor WhatsApp]"}</p>
          <p><strong className="text-ink">Email:</strong> {settings?.email ?? "[Email sekolah]"}</p>
        </div>

        {socials && socials.length > 0 && (
          <div className="mt-6 flex gap-4 text-sm text-blue-700">
            {socials.map((s: any) => (
              <a key={s.id} href={s.url} className="font-semibold capitalize">
                {s.platform}
              </a>
            ))}
          </div>
        )}

        {mapEmbedSrc && (
          <div className="mt-8">
            <div className="aspect-video overflow-hidden rounded-md border border-gray-200">
              <iframe
                src={mapEmbedSrc}
                className="h-full w-full"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
            {settings?.google_maps_url && (
              <a
                href={settings.google_maps_url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-block text-[13.5px] font-semibold text-blue-700"
              >
                Buka di Google Maps →
              </a>
            )}
          </div>
        )}
      </main>
      <Footer settings={settings ?? undefined} />
    </>
  );
}
