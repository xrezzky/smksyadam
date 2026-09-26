import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import LogoutButton from "@/components/admin/LogoutButton";

export default async function MenungguPage() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/admin/login");

  const { data: profile } = await supabase
    .from("profiles")
    .select("status")
    .eq("id", user.id)
    .maybeSingle();

  // Kalau ternyata sudah approved (mis. baru saja di-approve owner), lempar ke dashboard
  if (profile?.status === "approved") redirect("/admin");

  const isRejected = profile?.status === "rejected";

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-50 px-5">
      <div className="w-full max-w-sm rounded-lg border border-gray-200 bg-white p-7 text-center">
        <h1 className="mb-2 text-lg font-bold text-blue-900">
          {isRejected ? "Pendaftaran Ditolak" : "Menunggu Persetujuan"}
        </h1>
        <p className="mb-5 text-[13.5px] text-gray-500">
          {isRejected
            ? "Maaf, pendaftaran akun admin kamu tidak disetujui oleh owner. Hubungi owner untuk info lebih lanjut."
            : "Akun kamu sudah terdaftar dan sedang menunggu persetujuan owner. Coba masuk lagi nanti setelah disetujui."}
        </p>
        <LogoutButton />
      </div>
    </main>
  );
}
