import { createClient } from "@/lib/supabase/server";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default async function TentangPage() {
  const supabase = createClient();
  const { data: settings } = await supabase
    .from("school_settings")
    .select("*")
    .eq("id", 1)
    .maybeSingle();

  return (
    <>
      <Navbar schoolName={settings?.school_name ?? undefined} logoUrl={settings?.logo_url} />
      <main className="mx-auto max-w-3xl px-5 py-14">
        <h1 className="mb-5 font-serif text-3xl text-blue-900">Tentang Sekolah</h1>
        <p className="text-[15.5px] leading-relaxed text-gray-500">
          [Konten profil sekolah — sejarah, ciri khas, dan komitmen pendidikan. Diisi oleh admin
          melalui panel admin setelah data resmi tersedia.]
        </p>
      </main>
      <Footer settings={settings ?? undefined} />
    </>
  );
}
