import { createClient } from "@/lib/supabase/server";
import SettingsForm from "@/components/admin/SettingsForm";

export default async function PengaturanPage() {
  const supabase = createClient();
  const { data } = await supabase.from("school_settings").select("*").eq("id", 1).maybeSingle();

  return (
    <div>
      <h1 className="mb-6 font-serif text-2xl text-blue-900">Pengaturan Situs</h1>
      <SettingsForm
        initial={{
          school_name: data?.school_name ?? "SMK Syadam Bojonggede",
          tagline: data?.tagline ?? "",
          logo_url: data?.logo_url ?? "",
          hero_image_url: data?.hero_image_url ?? "",
          address: data?.address ?? "",
          phone: data?.phone ?? "",
          whatsapp: data?.whatsapp ?? "",
          email: data?.email ?? "",
          google_maps_url: data?.google_maps_url ?? "",
          seo_description: data?.seo_description ?? "",
        }}
      />
    </div>
  );
}
