import { createClient } from "@/lib/supabase/server";
import UserActionButtons from "@/components/admin/UserActionButtons";

export const dynamic = "force-dynamic";

const statusLabel: Record<string, { text: string; className: string }> = {
  pending: { text: "Menunggu", className: "bg-[#fbf0e4] text-accent-orange" },
  approved: { text: "Disetujui", className: "bg-green-50 text-accent-green" },
  rejected: { text: "Ditolak", className: "bg-gray-100 text-gray-500" },
};

export default async function PenggunaPage() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: currentProfile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user!.id)
    .maybeSingle();

  if (currentProfile?.role !== "super_admin") {
    return (
      <div>
        <h1 className="mb-3 font-serif text-2xl text-blue-900">Pengguna</h1>
        <p className="text-[14px] text-gray-500">
          Halaman ini hanya bisa diakses oleh owner (super admin).
        </p>
      </div>
    );
  }

  const { data: profiles } = await supabase
    .from("profiles")
    .select("id, full_name, email, role, status, created_at")
    .order("status", { ascending: true }) // pending duluan
    .order("created_at", { ascending: false });

  return (
    <div>
      <h1 className="mb-6 font-serif text-2xl text-blue-900">Kelola Pengguna Admin</h1>

      <div className="overflow-hidden rounded-md border border-gray-200 bg-white">
        <table className="w-full text-left text-[13.5px]">
          <thead className="bg-gray-50 text-gray-500">
            <tr>
              <th className="px-4 py-3 font-medium">Nama</th>
              <th className="px-4 py-3 font-medium">Email</th>
              <th className="px-4 py-3 font-medium">Role</th>
              <th className="px-4 py-3 font-medium">Status</th>
              <th className="px-4 py-3 font-medium">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {(profiles ?? []).length === 0 && (
              <tr>
                <td colSpan={5} className="px-4 py-8 text-center text-gray-500">
                  Belum ada pendaftar.
                </td>
              </tr>
            )}
            {(profiles ?? []).map((p) => {
              const badge = statusLabel[p.status] ?? statusLabel.pending;
              return (
                <tr key={p.id} className="border-t border-gray-200 align-top">
                  <td className="px-4 py-3">{p.full_name || "(tanpa nama)"}</td>
                  <td className="px-4 py-3 text-gray-500">{p.email}</td>
                  <td className="px-4 py-3 capitalize text-gray-500">{p.role}</td>
                  <td className="px-4 py-3">
                    <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${badge.className}`}>
                      {badge.text}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    {p.id === user!.id ? (
                      <span className="text-xs text-gray-500">Akun kamu</span>
                    ) : (
                      <UserActionButtons id={p.id} status={p.status} role={p.role} />
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
