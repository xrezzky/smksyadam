"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { uploadToCloudinary } from "@/lib/cloudinary";

export default function AboutImageUploadForm({ nextOrder }: { nextOrder: number }) {
  const router = useRouter();
  const supabase = createClient();
  const [caption, setCaption] = useState("");
  const [displayOrder, setDisplayOrder] = useState(nextOrder);
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!file) {
      setError("Pilih foto terlebih dahulu.");
      return;
    }
    setUploading(true);
    setError(null);

    try {
      const url = await uploadToCloudinary(file);
      const { error } = await supabase.from("about_images").insert({
        image_url: url,
        caption: caption.trim() || null,
        display_order: displayOrder,
      });
      if (error) throw error;

      setCaption("");
      setFile(null);
      setDisplayOrder((v) => v + 1);
      (document.getElementById("about-file-input") as HTMLInputElement).value = "";
      router.refresh();
    } catch (err: any) {
      setError(err.message ?? "Gagal mengunggah foto.");
    } finally {
      setUploading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mb-8 max-w-lg rounded-md border border-gray-200 bg-white p-5">
      {error && (
        <div className="mb-3 rounded-md bg-red-50 px-3 py-2 text-[13px] text-red-700">{error}</div>
      )}
      <label className="mb-1.5 block text-[13px] font-medium text-ink">Foto Lingkungan Sekolah</label>
      <input
        id="about-file-input"
        type="file"
        accept="image/*"
        onChange={(e) => setFile(e.target.files?.[0] ?? null)}
        className="mb-4 text-sm"
      />

      <label className="mb-1.5 block text-[13px] font-medium text-ink">Keterangan (opsional)</label>
      <input
        value={caption}
        onChange={(e) => setCaption(e.target.value)}
        placeholder="mis. Gedung utama, Lab Komputer"
        className="mb-4 w-full rounded-md border border-gray-200 px-3 py-2 text-sm"
      />

      <label className="mb-1.5 block text-[13px] font-medium text-ink">Urutan Tampil</label>
      <input
        type="number"
        value={displayOrder}
        onChange={(e) => setDisplayOrder(Number(e.target.value))}
        className="mb-4 w-32 rounded-md border border-gray-200 px-3 py-2 text-sm"
      />

      <button
        type="submit"
        disabled={uploading}
        className="rounded-md bg-blue-700 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-900 disabled:opacity-60"
      >
        {uploading ? "Mengunggah..." : "Unggah Foto"}
      </button>
    </form>
  );
}
