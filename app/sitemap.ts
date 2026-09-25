import { createClient } from "@/lib/supabase/server";
import type { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const supabase = createClient();
  const { data: news } = await supabase.from("news").select("slug").eq("is_published", true);

  const staticRoutes = [
    "",
    "/profil/tentang",
    "/akademik/jurusan",
    "/berita",
    "/ppdb",
    "/kontak",
  ].map((path) => ({
    url: `https://SITUS-ANDA.vercel.app${path}`,
    lastModified: new Date(),
  }));

  const newsRoutes = (news ?? []).map((n) => ({
    url: `https://SITUS-ANDA.vercel.app/berita/${n.slug}`,
    lastModified: new Date(),
  }));

  return [...staticRoutes, ...newsRoutes];
}
