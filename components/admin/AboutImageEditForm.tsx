"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { uploadToCloudinary } from "@/lib/cloudinary";

type Values = {
  id: string;
  image_url: string;
  caption: string;
  display_order: number;
};

export default function AboutImageEditForm({ initial }: { initial: Values }) {
  const router = useRouter();
  const supabase = createClient();
  const [values, setValues] = useState<Values>(initial);
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setError(null);
    try {
      const url = await uploadToCloudinary(file);
      setValues((v) => ({ ...v, image_url: url }));
    } catch (err: any) {
      setError(err.message ?? "Gagal mengunggah foto.");
    } finally {
      setUploading(false);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError(null);

    const { error } = await supabase
      .from("about_images")
      .update({
        image_url: values.image_url,
        caption: values.caption.trim() || null,
        display_order: values.display_order,
      })
      .eq("id", values.id);

    setSaving(false);

    if (error) {
      setError("Gagal menyimpan perubahan.");
      return;
    }

    router.push("/admin/foto-tentang");
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-lg space-y-5">
      {error && <div className="rounded-md bg-red-50 px-3 py-2 text-[13px] text-red-700">{error}</div>}

      <div>
        <label className="mb-1.5 block text-[13px] font-medium text-ink">Foto</label>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={values.image_url}
          alt={values.caption || "Foto lingkungan sekolah"}
          className="mb-2 aspect-[4/3] w-full max-w-xs rounded-md object-cover"
        />
        <input type="file" accept="image/*" onChange={handleImageChange} className="text-sm" />
        {uploading && <p className="mt-1 text-xs text-gray-500">Mengunggah...</p>}
        <p className="mt-1 text-xs text-gray-500">Pilih file baru untuk mengganti foto ini.</p>
      </div>

      <div>
        <label className="mb-1.5 block text-[13px] font-medium text-ink">Keterangan (opsional)</label>
        <input
          value={values.caption}
          onChange={(e) => setValues((v) => ({ ...v, caption: e.target.value }))}
          placeholder="mis. Gedung utama, Lab Komputer"
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
        {saving ? "Menyimpan..." : "Simpan Perubahan"}
      </button>
    </form>
  );
}
