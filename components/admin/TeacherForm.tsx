"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { uploadToCloudinary } from "@/lib/cloudinary";

type Values = {
  id?: string;
  full_name: string;
  position: string;
  subject_area: string;
  photo_url: string;
  bio: string;
  display_order: number;
};

export default function TeacherForm({ initial }: { initial?: Values }) {
  const router = useRouter();
  const supabase = createClient();
  const isEdit = Boolean(initial?.id);

  const [values, setValues] = useState<Values>(
    initial ?? {
      full_name: "",
      position: "",
      subject_area: "",
      photo_url: "",
      bio: "",
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

    if (!values.full_name.trim() || !values.position.trim()) {
      setError("Nama dan jabatan wajib diisi.");
      setSaving(false);
      return;
    }

    const payload = {
      full_name: values.full_name.trim(),
      position: values.position.trim(),
      subject_area: values.subject_area.trim() || null,
      photo_url: values.photo_url || null,
      bio: values.bio.trim() || null,
      display_order: values.display_order,
    };

    const query = isEdit
      ? supabase.from("teachers").update(payload).eq("id", initial!.id)
      : supabase.from("teachers").insert(payload);

    const { error } = await query;
    setSaving(false);

    if (error) {
      setError("Gagal menyimpan data guru.");
      return;
    }

    router.push("/admin/guru");
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl space-y-5">
      {error && <div className="rounded-md bg-red-50 px-3 py-2 text-[13px] text-red-700">{error}</div>}

      <div>
        <label className="mb-1.5 block text-[13px] font-medium text-ink">Foto</label>
        {values.photo_url && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={values.photo_url} alt="" className="mb-2 h-24 w-24 rounded-full object-cover" />
        )}
        <input type="file" accept="image/*" onChange={handlePhotoChange} className="text-sm" />
        {uploading && <p className="mt-1 text-xs text-gray-500">Mengunggah...</p>}
      </div>

      <div>
        <label className="mb-1.5 block text-[13px] font-medium text-ink">Nama Lengkap</label>
        <input
          required
          value={values.full_name}
          onChange={(e) => setValues((v) => ({ ...v, full_name: e.target.value }))}
          className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm"
        />
      </div>

      <div>
        <label className="mb-1.5 block text-[13px] font-medium text-ink">Jabatan</label>
        <input
          required
          placeholder="mis. Kepala Sekolah, Guru, Wali Kelas"
          value={values.position}
          onChange={(e) => setValues((v) => ({ ...v, position: e.target.value }))}
          className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm"
        />
      </div>

      <div>
        <label className="mb-1.5 block text-[13px] font-medium text-ink">Bidang/Mata Pelajaran</label>
        <input
          value={values.subject_area}
          onChange={(e) => setValues((v) => ({ ...v, subject_area: e.target.value }))}
          className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm"
        />
      </div>

      <div>
        <label className="mb-1.5 block text-[13px] font-medium text-ink">Bio Singkat</label>
        <textarea
          rows={3}
          value={values.bio}
          onChange={(e) => setValues((v) => ({ ...v, bio: e.target.value }))}
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
