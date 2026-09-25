"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { uploadToCloudinary } from "@/lib/cloudinary";

type NewsFormValues = {
  id?: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  thumbnail_url: string;
  is_published: boolean;
};

function slugify(text: string) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-");
}

export default function NewsForm({ initial }: { initial?: NewsFormValues }) {
  const router = useRouter();
  const supabase = createClient();
  const isEdit = Boolean(initial?.id);

  const [values, setValues] = useState<NewsFormValues>(
    initial ?? {
      title: "",
      slug: "",
      excerpt: "",
      content: "",
      thumbnail_url: "",
      is_published: false,
    }
  );
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [confirmDelete, setConfirmDelete] = useState(false);

  async function handleThumbnailChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setError(null);
    try {
      const url = await uploadToCloudinary(file);
      setValues((v) => ({ ...v, thumbnail_url: url }));
    } catch (err: any) {
      setError(err.message ?? "Gagal mengunggah gambar.");
    } finally {
      setUploading(false);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError(null);

    const payload = {
      title: values.title.trim(),
      slug: values.slug.trim() || slugify(values.title),
      excerpt: values.excerpt.trim() || null,
      content: values.content.trim(),
      thumbnail_url: values.thumbnail_url || null,
      is_published: values.is_published,
      published_at: values.is_published ? new Date().toISOString() : null,
    };

    if (!payload.title || !payload.content) {
      setError("Judul dan isi berita wajib diisi.");
      setSaving(false);
      return;
    }

    const query = isEdit
      ? supabase.from("news").update(payload).eq("id", initial!.id)
      : supabase.from("news").insert(payload);

    const { error } = await query;

    if (error) {
      setError(
        error.message.includes("duplicate")
          ? "Slug sudah dipakai berita lain — ubah judul atau slug."
          : "Gagal menyimpan berita. Coba lagi."
      );
      setSaving(false);
      return;
    }

    router.push("/admin/berita");
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl space-y-5">
      {error && (
        <div className="rounded-md bg-red-50 px-3 py-2 text-[13px] text-red-700">{error}</div>
      )}

      <div>
        <label className="mb-1.5 block text-[13px] font-medium text-ink">Judul</label>
        <input
          required
          value={values.title}
          onChange={(e) =>
            setValues((v) => ({
              ...v,
              title: e.target.value,
              slug: isEdit ? v.slug : slugify(e.target.value),
            }))
          }
          className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm"
        />
      </div>

      <div>
        <label className="mb-1.5 block text-[13px] font-medium text-ink">Slug (URL)</label>
        <input
          value={values.slug}
          onChange={(e) => setValues((v) => ({ ...v, slug: slugify(e.target.value) }))}
          className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm"
        />
      </div>

      <div>
        <label className="mb-1.5 block text-[13px] font-medium text-ink">Ringkasan</label>
        <textarea
          rows={2}
          value={values.excerpt}
          onChange={(e) => setValues((v) => ({ ...v, excerpt: e.target.value }))}
          className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm"
        />
      </div>

      <div>
        <label className="mb-1.5 block text-[13px] font-medium text-ink">Isi Berita</label>
        <textarea
          required
          rows={10}
          value={values.content}
          onChange={(e) => setValues((v) => ({ ...v, content: e.target.value }))}
          className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm"
        />
      </div>

      <div>
        <label className="mb-1.5 block text-[13px] font-medium text-ink">Thumbnail</label>
        {values.thumbnail_url && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={values.thumbnail_url}
            alt="Thumbnail"
            className="mb-2 h-32 w-full max-w-xs rounded-md object-cover"
          />
        )}
        <input type="file" accept="image/*" onChange={handleThumbnailChange} className="text-sm" />
        {uploading && <p className="mt-1 text-xs text-gray-500">Mengunggah...</p>}
      </div>

      <label className="flex items-center gap-2 text-[13.5px]">
        <input
          type="checkbox"
          checked={values.is_published}
          onChange={(e) => setValues((v) => ({ ...v, is_published: e.target.checked }))}
        />
        Publikasikan sekarang
      </label>

      <div className="flex gap-3 pt-2">
        <button
          type="submit"
          disabled={saving || uploading}
          className="rounded-md bg-blue-700 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-900 disabled:opacity-60"
        >
          {saving ? "Menyimpan..." : "Simpan"}
        </button>
      </div>
    </form>
  );
}
