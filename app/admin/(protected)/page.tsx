import { createClient } from "@/lib/supabase/server";

export default async function AdminDashboard() {
  const supabase = createClient();

  const [{ count: newsCount }, { count: announcementCount }, { count: eventCount }] =
    await Promise.all([
      supabase.from("news").select("*", { count: "exact", head: true }),
      supabase.from("announcements").select("*", { count: "exact", head: true }),
      supabase.from("events").select("*", { count: "exact", head: true }),
    ]);

  const stats = [
    { label: "Berita", value: newsCount ?? 0 },
    { label: "Pengumuman", value: announcementCount ?? 0 },
    { label: "Agenda", value: eventCount ?? 0 },
  ];

  return (
    <div>
      <h1 className="mb-6 font-serif text-2xl text-blue-900">Dashboard</h1>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {stats.map((s) => (
          <div key={s.label} className="rounded-md border border-gray-200 bg-white p-5">
            <div className="font-serif text-3xl text-blue-900">{s.value}</div>
            <div className="text-[13px] text-gray-500">{s.label}</div>
          </div>
        ))}
      </div>
      <p className="mt-8 text-[13.5px] text-gray-500">
        Gunakan menu di samping untuk mengelola konten. Mulai dari menu <strong>Pengaturan</strong>{" "}
        untuk mengisi identitas sekolah (logo, alamat, kontak) terlebih dahulu.
      </p>
    </div>
  );
}
