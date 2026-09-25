import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import LogoutButton from "@/components/admin/LogoutButton";

const links = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/berita", label: "Berita" },
  { href: "/admin/pengumuman", label: "Pengumuman" },
  { href: "/admin/agenda", label: "Agenda" },
  { href: "/admin/galeri", label: "Galeri" },
  { href: "/admin/guru", label: "Guru" },
  { href: "/admin/jurusan", label: "Jurusan" },
  { href: "/admin/prestasi", label: "Prestasi" },
  { href: "/admin/ppdb", label: "PPDB" },
  { href: "/admin/pengaturan", label: "Pengaturan" },
];

export default async function AdminProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Lapisan kedua di samping middleware — mencegah render sisi server jika sesi kosong
  if (!user) redirect("/admin/login");

  return (
    <div className="flex min-h-screen bg-gray-50">
      <aside className="hidden w-60 flex-shrink-0 border-r border-gray-200 bg-white p-5 md:block">
        <div className="mb-7 flex items-center gap-2.5">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-700 font-serif text-xs font-bold text-white">
            SS
          </span>
          <span className="text-sm font-bold text-blue-900">Admin Panel</span>
        </div>
        <nav className="space-y-0.5">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="block rounded-md px-3 py-2 text-[13.5px] text-ink hover:bg-blue-100 hover:text-blue-900"
            >
              {l.label}
            </Link>
          ))}
        </nav>
        <div className="mt-8 border-t border-gray-200 pt-4">
          <LogoutButton />
        </div>
      </aside>
      <main className="flex-1 p-6 md:p-9">{children}</main>
    </div>
  );
}
