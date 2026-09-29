import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

// Pencarian ringan lintas beberapa tabel publik — dipakai oleh SearchModal.
// Sengaja hanya query kolom yang dibutuhkan & hanya konten yang sudah published.
export async function GET(request: Request) {
  const q = new URL(request.url).searchParams.get("q")?.trim() ?? "";
  if (q.length < 2) return NextResponse.json({ results: [] });

  const supabase = createClient();
  const safeQ = q.replace(/[,()]/g, " ").trim();
  const like = `%${safeQ}%`;

  const [news, announcements, departments, achievements, extracurriculars] = await Promise.all([
    supabase
      .from("news")
      .select("title, slug, excerpt")
      .eq("is_published", true)
      .or(`title.ilike.${like},excerpt.ilike.${like}`)
      .limit(5),
    supabase
      .from("announcements")
      .select("title, content")
      .eq("is_published", true)
      .ilike("title", like)
      .limit(5),
    supabase.from("departments").select("name, slug, short_description").ilike("name", like).limit(5),
    supabase.from("achievements").select("title, year").ilike("title", like).limit(5),
    supabase.from("extracurriculars").select("name, description").ilike("name", like).limit(5),
  ]);

  const results = [
    ...(news.data ?? []).map((n) => ({
      type: "Berita",
      title: n.title,
      excerpt: n.excerpt ?? "",
      href: `/berita/${n.slug}`,
    })),
    ...(announcements.data ?? []).map((a) => ({
      type: "Pengumuman",
      title: a.title,
      excerpt: (a.content ?? "").slice(0, 90),
      href: `/pengumuman`,
    })),
    ...(departments.data ?? []).map((d) => ({
      type: "Jurusan",
      title: d.name,
      excerpt: d.short_description ?? "",
      href: `/akademik/jurusan/${d.slug}`,
    })),
    ...(achievements.data ?? []).map((a) => ({
      type: "Prestasi",
      title: a.title,
      excerpt: a.year ? String(a.year) : "",
      href: `/akademik/prestasi`,
    })),
    ...(extracurriculars.data ?? []).map((e) => ({
      type: "Ekstrakurikuler",
      title: e.name,
      excerpt: e.description ?? "",
      href: `/akademik/ekstrakurikuler`,
    })),
  ];

  return NextResponse.json({ results });
}
