"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

type Values = {
  description: string;
  requirements: string;
  schedule: string;
  registration_link: string;
  contact_info: string;
};

export default function PpdbForm({ initial }: { initial: Values }) {
  const router = useRouter();
  const supabase = createClient();
  const [values, setValues] = useState<Values>(initial);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  function field(key: keyof Values) {
    return {
      value: values[key],
      onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
        setValues((v) => ({ ...v, [key]: e.target.value })),
    };
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setMessage(null);
    setError(null);

    const { error } = await supabase.from("ppdb").update(values).eq("id", 1);
    setSaving(false);

    if (error) {
      setError("Gagal menyimpan.");
      return;
    }
    setMessage("Informasi PPDB tersimpan.");
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl space-y-5">
      {message && (
        <div className="rounded-md bg-green-50 px-3 py-2 text-[13px] text-accent-green">{message}</div>
      )}
      {error && <div className="rounded-md bg-red-50 px-3 py-2 text-[13px] text-red-700">{error}</div>}

      <div>
        <label className="mb-1.5 block text-[13px] font-medium text-ink">Deskripsi</label>
        <textarea rows={3} {...field("description")} className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm" />
      </div>

      <div>
        <label className="mb-1.5 block text-[13px] font-medium text-ink">Persyaratan</label>
        <textarea rows={5} {...field("requirements")} className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm" />
      </div>

      <div>
        <label className="mb-1.5 block text-[13px] font-medium text-ink">Jadwal</label>
        <textarea rows={4} {...field("schedule")} className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm" />
      </div>

      <div>
        <label className="mb-1.5 block text-[13px] font-medium text-ink">Tautan Pendaftaran</label>
        <input {...field("registration_link")} placeholder="https://..." className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm" />
      </div>

      <div>
        <label className="mb-1.5 block text-[13px] font-medium text-ink">Kontak PPDB</label>
        <input {...field("contact_info")} className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm" />
      </div>

      <button
        type="submit"
        disabled={saving}
        className="rounded-md bg-blue-700 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-900 disabled:opacity-60"
      >
        {saving ? "Menyimpan..." : "Simpan"}
      </button>
    </form>
  );
}
