"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { uploadToCloudinary } from "@/lib/cloudinary";

type Settings = {
  school_name: string;
  tagline: string;
  logo_url: string;
  hero_image_url: string;
  address: string;
  phone: string;
  whatsapp: string;
  email: string;
  google_maps_url: string;
  seo_description: string;
};

export default function SettingsForm({ initial }: { initial: Settings }) {
  const router = useRouter();
  const supabase = createClient();
  const [values, setValues] = useState<Settings>(initial);
  const [saving, setSaving] = useState(false);
  const [uploadingLogo, setUploadingLogo] = useState(false);
  const [uploadingHero, setUploadingHero] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  function field(key: keyof Settings) {
    return {
      value: values[key],
      onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
        setValues((v) => ({ ...v, [key]: e.target.value })),
    };
  }

  async function handleLogoChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadingLogo(true);
    try {
      const url = await uploadToCloudinary(file);
      setValues((v) => ({ ...v, logo_url: url }));
    } catch (err: any) {
      setError(err.message);
    } finally {
      setUploadingLogo(false);
    }
  }

  async function handleHeroChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadingHero(true);
    try {
      const url = await uploadToCloudinary(file);
      setValues((v) => ({ ...v, hero_image_url: url }));
    } catch (err: any) {
      setError(err.message);
    } finally {
      setUploadingHero(false);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setMessage(null);
    setError(null);

    const { error } = await supabase.from("school_settings").update(values).eq("id", 1);

    setSaving(false);
    if (error) {
      setError("Gagal menyimpan pengaturan.");
      return;
    }
    setMessage("Pengaturan tersimpan.");
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl space-y-5">
      {message && (
        <div className="rounded-md bg-green-50 px-3 py-2 text-[13px] text-accent-green">
          {message}
        </div>
      )}
      {error && (
        <div className="rounded-md bg-red-50 px-3 py-2 text-[13px] text-red-700">{error}</div>
      )}

      <div>
        <label className="mb-1.5 block text-[13px] font-medium text-ink">Nama Sekolah</label>
        <input {...field("school_name")} className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm" />
      </div>

      <div>
        <label className="mb-1.5 block text-[13px] font-medium text-ink">Tagline</label>
        <input {...field("tagline")} className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm" />
      </div>

      <div>
        <label className="mb-1.5 block text-[13px] font-medium text-ink">Logo Sekolah</label>
        <p className="mb-2 text-[12px] text-gray-500">
          Gunakan logo resmi sekolah. Kalau logo sudah memuat nama sekolah, nama tidak akan
          ditulis ulang di navbar/footer supaya tidak dobel.
        </p>
        {values.logo_url && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={values.logo_url} alt="Logo" className="mb-2 h-16 w-auto max-w-[180px] object-contain" />
        )}
        <input type="file" accept="image/*" onChange={handleLogoChange} className="text-sm" />
        {uploadingLogo && <p className="mt-1 text-xs text-gray-500">Mengunggah...</p>}
      </div>

      <div>
        <label className="mb-1.5 block text-[13px] font-medium text-ink">
          Foto Lingkungan Sekolah (Hero Beranda)
        </label>
        <p className="mb-2 text-[12px] text-gray-500">
          Foto ini tampil sebagai latar besar di paling atas halaman beranda. Pakai foto
          gedung/lingkungan/kegiatan sekolah, bukan logo.
        </p>
        {values.hero_image_url && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={values.hero_image_url}
            alt="Foto hero"
            className="mb-2 aspect-video w-full max-w-md rounded-md object-cover"
          />
        )}
        <input type="file" accept="image/*" onChange={handleHeroChange} className="text-sm" />
        {uploadingHero && <p className="mt-1 text-xs text-gray-500">Mengunggah...</p>}
      </div>

      <div>
        <label className="mb-1.5 block text-[13px] font-medium text-ink">Alamat</label>
        <textarea rows={2} {...field("address")} className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm" />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="mb-1.5 block text-[13px] font-medium text-ink">Telepon</label>
          <input {...field("phone")} className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm" />
        </div>
        <div>
          <label className="mb-1.5 block text-[13px] font-medium text-ink">WhatsApp</label>
          <input {...field("whatsapp")} className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm" />
        </div>
      </div>

      <div>
        <label className="mb-1.5 block text-[13px] font-medium text-ink">Email</label>
        <input {...field("email")} className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm" />
      </div>

      <div>
        <label className="mb-1.5 block text-[13px] font-medium text-ink">
          Google Maps (URL embed)
        </label>
        <p className="mb-2 text-[12px] text-gray-500">
          Link ini dipakai <strong>apa adanya</strong> untuk menampilkan peta — pastikan sudah
          mengandung <code>&amp;output=embed</code> di akhirnya. Cara paling gampang: buka Google
          Maps, cari lokasi sekolah sampai pin-nya persis, copy link dari address bar, lalu
          tambahkan <code>&amp;output=embed</code> di akhir link tersebut. Link yang diawali{" "}
          <code>https://share.google/...</code> atau <code>https://maps.app.goo.gl/...</code>{" "}
          tidak akan tampil.
        </p>
        <input {...field("google_maps_url")} placeholder="https://www.google.com/maps/embed?pb=..." className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm" />
      </div>

      <div>
        <label className="mb-1.5 block text-[13px] font-medium text-ink">
          Deskripsi SEO (meta description)
        </label>
        <textarea rows={2} {...field("seo_description")} className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm" />
      </div>

      <button
        type="submit"
        disabled={saving || uploadingLogo || uploadingHero}
        className="rounded-md bg-blue-700 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-900 disabled:opacity-60"
      >
        {saving ? "Menyimpan..." : "Simpan Pengaturan"}
      </button>
    </form>
  );
}
