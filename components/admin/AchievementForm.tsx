"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { uploadToCloudinary } from "@/lib/cloudinary";

type Values = {
  id?: string;
  title: string;
  student_or_team: string;
  level: string;
  year: string;
  photo_url: string;
  description: string;
};

export default function AchievementForm({ initial }: { initial?: Values }) {
  const router = useRouter();
  const supabase = createClient();
  const isEdit = Boolean(initial?.id);

  const [values, setValues] = useState<Values>(
    initial ?? {
      title: "",
      student_or_team: "",
      level: "",
      year: String(new Date().getFullYear()),
      photo_url: "",
      description: "",
    }
  );
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handlePhotoChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const url = await uploadToCloudinary(file);
      setValues((v) => ({ ...v, photo_url: url }));
    } catch (err: any) {
      setError(err.message);
    } finally {
      setUploading(false);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError(null);

    if (!values.title.trim()) {
      setError("Judul prestasi wajib diisi.");
      setSaving(false);
      return;
    }

    const payload = {
      title: values.title.trim(),
      student_or_team: values.student_or_team.trim() || null,
      level: values.level.trim() || null,
      year: values.year ? Number(values.year) : null,
      photo_url: values.photo_url || null,
      description: values.description.trim() || null,
    };

    const query = isEdit
      ? supabase.from("achievements").update(payload).eq("id", initial!.id)
      : supabase.from("achievements").insert(payload);

    const { error } = await query;
    setSaving(false);

    if (error) {
      setError("Gagal menyimpan prestasi.");
      return;
    }

    router.push("/admin/prestasi");
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl space-y-5">
      {error && <div className="rounded-md bg-red-50 px-3 py-2 text-[13px] text-red-700">{error}</div>}

      <div>
        <label className="mb-1.5 block text-[13px] font-medium text-ink">Judul Prestasi</label>
        <input
          required
          value={values.title}
          onChange={(e) => setValues((v) => ({ ...v, title: e.target.value }))}
          className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm"
        />
      </div>

      <div>
        <label className="mb-1.5 block text-[13px] font-medium text-ink">Siswa/Tim</label>
        <input
          value={values.student_or_team}
          onChange={(e) => setValues((v) => ({ ...v, student_or_team: e.target.value }))}
          className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="mb-1.5 block text-[13px] font-medium text-ink">Tingkat</label>
          <input
            placeholder="mis. Kabupaten, Provinsi, Nasional"
            value={values.level}
            onChange={(e) => setValues((v) => ({ ...v, level: e.target.value }))}
            className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm"
          />
        </div>
        <div>
          <label className="mb-1.5 block text-[13px] font-medium text-ink">Tahun</label>
          <input
            type="number"
            value={values.year}
            onChange={(e) => setValues((v) => ({ ...v, year: e.target.value }))}
            className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm"
          />
        </div>
      </div>

      <div>
        <label className="mb-1.5 block text-[13px] font-medium text-ink">Foto</label>
        {values.photo_url && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={values.photo_url} alt="" className="mb-2 h-32 w-full max-w-xs rounded-md object-cover" />
        )}
        <input type="file" accept="image/*" onChange={handlePhotoChange} className="text-sm" />
        {uploading && <p className="mt-1 text-xs text-gray-500">Mengunggah...</p>}
      </div>

      <div>
        <label className="mb-1.5 block text-[13px] font-medium text-ink">Deskripsi</label>
        <textarea
          rows={4}
          value={values.description}
          onChange={(e) => setValues((v) => ({ ...v, description: e.target.value }))}
          className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm"
        />
      </div>

      <button
        type="submit"
        disabled={saving || uploading}
        className="rounded-md bg-blue-700 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-900 disabled:opacity-60"
      >
        {saving ? "Menyimpan..." : "Simpan"}
      </button>
    </form>
  );
}
