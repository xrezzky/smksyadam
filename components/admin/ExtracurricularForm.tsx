"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { uploadToCloudinary } from "@/lib/cloudinary";

type Values = {
  id?: string;
  name: string;
  photo_url: string;
  description: string;
  display_order: number;
};

export default function ExtracurricularForm({ initial }: { initial?: Values }) {
  const router = useRouter();
  const supabase = createClient();
  const isEdit = Boolean(initial?.id);

  const [values, setValues] = useState<Values>(
    initial ?? {
      name: "",
      photo_url: "",
      description: "",
      display_order: 0,
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

    if (!values.name.trim()) {
      setError("Nama kegiatan wajib diisi.");
      setSaving(false);
      return;
    }

    const payload = {
      name: values.name.trim(),
      photo_url: values.photo_url || null,
      description: values.description.trim() || null,
      display_order: values.display_order,
    };

    const query = isEdit
      ? supabase.from("extracurriculars").update(payload).eq("id", initial!.id)
      : supabase.from("extracurriculars").insert(payload);

    const { error } = await query;
    setSaving(false);

    if (error) {
      setError("Gagal menyimpan data ekstrakurikuler.");
      return;
    }

    router.push("/admin/ekstrakurikuler");
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl space-y-5">
      {error && <div className="rounded-md bg-red-50 px-3 py-2 text-[13px] text-red-700">{error}</div>}

      <div>
        <label className="mb-1.5 block text-[13px] font-medium text-ink">Nama Kegiatan</label>
        <input
          required
          value={values.name}
          onChange={(e) => setValues((v) => ({ ...v, name: e.target.value }))}
          placeholder="Contoh: Pramuka, Futsal, PMR"
          className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm"
        />
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
          placeholder="Jadwal latihan, pembina, atau info singkat lainnya"
          className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm"
        />
      </div>

      <div>
        <label className="mb-1.5 block text-[13px] font-medium text-ink">Urutan Tampil</label>
        <input
          type="number"
          value={values.display_order}
          onChange={(e) => setValues((v) => ({ ...v, display_order: Number(e.target.value) }))}
          className="w-32 rounded-md border border-gray-200 px-3 py-2 text-sm"
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
