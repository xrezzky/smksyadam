import { createClient } from "@/lib/supabase/server";
import PpdbForm from "@/components/admin/PpdbForm";

export default async function AdminPpdbPage() {
  const supabase = createClient();
  const { data } = await supabase.from("ppdb").select("*").eq("id", 1).maybeSingle();

  return (
    <div>
      <h1 className="mb-6 font-serif text-2xl text-blue-900">Penerimaan Peserta Didik Baru</h1>
      <PpdbForm
        initial={{
          description: data?.description ?? "",
          requirements: data?.requirements ?? "",
          schedule: data?.schedule ?? "",
          registration_link: data?.registration_link ?? "",
          contact_info: data?.contact_info ?? "",
        }}
      />
    </div>
  );
}
