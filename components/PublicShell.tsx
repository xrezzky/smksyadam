import { createClient } from "@/lib/supabase/server";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default async function PublicShell({ children }: { children: React.ReactNode }) {
  const supabase = createClient();
  const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString();

  const [{ data: settings }, { count: newAnnouncementsCount }] = await Promise.all([
    supabase.from("school_settings").select("*").eq("id", 1).maybeSingle(),
    supabase
      .from("announcements")
      .select("*", { count: "exact", head: true })
      .eq("is_published", true)
      .gte("published_at", sevenDaysAgo),
  ]);

  return (
    <>
      <Navbar
        schoolName={settings?.school_name ?? undefined}
        logoUrl={settings?.logo_url}
        whatsapp={settings?.whatsapp}
        newAnnouncementsCount={newAnnouncementsCount ?? 0}
      />
      {children}
      <Footer settings={settings ?? undefined} />
    </>
  );
}
