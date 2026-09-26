import { createClient } from "@/lib/supabase/server";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default async function PublicShell({ children }: { children: React.ReactNode }) {
  const supabase = createClient();
  const { data: settings } = await supabase
    .from("school_settings")
    .select("*")
    .eq("id", 1)
    .maybeSingle();

  return (
    <>
      <Navbar schoolName={settings?.school_name ?? undefined} logoUrl={settings?.logo_url} />
      {children}
      <Footer settings={settings ?? undefined} />
    </>
  );
}
