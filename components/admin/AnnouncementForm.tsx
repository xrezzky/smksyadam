"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

type Values = {
  id?: string;
  title: string;
  content: string;
  is_published: boolean;
};

export default function AnnouncementForm({ initial }: { initial?: Values }) {
  const router = useRouter();
  const supabase = createClient();
  const isEdit = Boolean(initial?.id);

  const [values, setValues] = useState<Values>(
    initial ?? { title: "", content: "", is_published: false }
  );
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError(null);

    if (!values.title.trim() || !values.content.trim()) {
      setError("Judul dan isi pengumuman wajib diisi.");
      setSaving(false);
      return;
    }

    const payload = {
      title: values.title.trim(),
      content: values.content.trim(),
      is_published: values.is_published,
      published_at: values.is_published ? new Date().toISOString() : null,
    };

    const query = isEdit
      ? supabase.from("announcements").update(payload).eq("id", initial!.id)
      : supabase.from("announcements").insert(payload);

    const { error } = await query;
    setSaving(false);

    if (error) {
      setError("Gagal menyimpan pengumuman.");
      return;
    }

    router.push("/admin/pengumuman");
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl space-y-5">
      {error && <div className="rounded-md bg-red-50 px-3 py-2 text-[13px] text-red-700">{error}</div>}

      <div>
        <label className="mb-1.5 block text-[13px] font-medium text-ink">Judul</label>
        <input
          required
          value={values.title}
          onChange={(e) => setValues((v) => ({ ...v, title: e.target.value }))}
          className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm"
        />
      </div>

      <div>
        <label className="mb-1.5 block text-[13px] font-medium text-ink">Isi Pengumuman</label>
        <textarea
          required
          rows={8}
          value={values.content}
          onChange={(e) => setValues((v) => ({ ...v, content: e.target.value }))}
          className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm"
        />
      </div>

      <label className="flex items-center gap-2 text-[13.5px]">
        <input
          type="checkbox"
          checked={values.is_published}
          onChange={(e) => setValues((v) => ({ ...v, is_published: e.target.checked }))}
        />
        Publikasikan sekarang
      </label>

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
