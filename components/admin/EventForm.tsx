"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

type Values = {
  id?: string;
  title: string;
  description: string;
  location: string;
  start_at: string; // format datetime-local
  end_at: string;
};

export default function EventForm({ initial }: { initial?: Values }) {
  const router = useRouter();
  const supabase = createClient();
  const isEdit = Boolean(initial?.id);

  const [values, setValues] = useState<Values>(
    initial ?? { title: "", description: "", location: "", start_at: "", end_at: "" }
  );
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError(null);

    if (!values.title.trim() || !values.start_at) {
      setError("Nama kegiatan dan tanggal mulai wajib diisi.");
      setSaving(false);
      return;
    }

    const payload = {
      title: values.title.trim(),
      description: values.description.trim() || null,
      location: values.location.trim() || null,
      start_at: new Date(values.start_at).toISOString(),
      end_at: values.end_at ? new Date(values.end_at).toISOString() : null,
    };

    const query = isEdit
      ? supabase.from("events").update(payload).eq("id", initial!.id)
      : supabase.from("events").insert(payload);

    const { error } = await query;
    setSaving(false);

    if (error) {
      setError("Gagal menyimpan agenda.");
      return;
    }

    router.push("/admin/agenda");
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl space-y-5">
      {error && <div className="rounded-md bg-red-50 px-3 py-2 text-[13px] text-red-700">{error}</div>}

      <div>
        <label className="mb-1.5 block text-[13px] font-medium text-ink">Nama Kegiatan</label>
        <input
          required
          value={values.title}
          onChange={(e) => setValues((v) => ({ ...v, title: e.target.value }))}
          className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm"
        />
      </div>

      <div>
        <label className="mb-1.5 block text-[13px] font-medium text-ink">Deskripsi</label>
        <textarea
          rows={3}
          value={values.description}
          onChange={(e) => setValues((v) => ({ ...v, description: e.target.value }))}
          className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm"
        />
      </div>

      <div>
        <label className="mb-1.5 block text-[13px] font-medium text-ink">Lokasi</label>
        <input
          value={values.location}
          onChange={(e) => setValues((v) => ({ ...v, location: e.target.value }))}
          className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="mb-1.5 block text-[13px] font-medium text-ink">Mulai</label>
          <input
            type="datetime-local"
            required
            value={values.start_at}
            onChange={(e) => setValues((v) => ({ ...v, start_at: e.target.value }))}
            className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm"
          />
        </div>
        <div>
          <label className="mb-1.5 block text-[13px] font-medium text-ink">Selesai (opsional)</label>
          <input
            type="datetime-local"
            value={values.end_at}
            onChange={(e) => setValues((v) => ({ ...v, end_at: e.target.value }))}
            className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm"
          />
        </div>
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
