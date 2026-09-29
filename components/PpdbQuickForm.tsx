"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

type Department = { slug: string; name: string };

type Errors = Partial<Record<"full_name" | "whatsapp", string>>;

export default function PpdbQuickForm({ departments }: { departments: Department[] }) {
  const [fullName, setFullName] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [schoolOrigin, setSchoolOrigin] = useState("");
  const [departmentSlug, setDepartmentSlug] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [shake, setShake] = useState(false);
  const [serverError, setServerError] = useState("");

  const validate = (): Errors => {
    const next: Errors = {};
    if (fullName.trim().length < 3) next.full_name = "Nama minimal 3 huruf.";
    if (!/^[0-9+][0-9\s-]{7,}$/.test(whatsapp.trim())) next.whatsapp = "Nomor WhatsApp belum valid.";
    return next;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const found = validate();
    setErrors(found);
    if (Object.keys(found).length > 0) {
      setShake(true);
      setTimeout(() => setShake(false), 400);
      return;
    }

    setSubmitting(true);
    setServerError("");
    const supabase = createClient();
    const { error } = await supabase.from("ppdb_registrations").insert({
      full_name: fullName.trim(),
      whatsapp: whatsapp.trim(),
      school_origin: schoolOrigin.trim() || null,
      department_slug: departmentSlug || null,
    });
    setSubmitting(false);

    if (error) {
      setServerError("Gagal mengirim, coba lagi sebentar lagi ya.");
      return;
    }
    setDone(true);
  };

  if (done) {
    return (
      <div className="animate-fade-in-up flex flex-col items-center gap-3 rounded-md border border-green-200 bg-green-50 px-6 py-10 text-center dark:border-green-500/20 dark:bg-green-500/10">
        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-green-500 text-2xl text-white">
          <span className="animate-fade-in" style={{ animationDelay: "150ms" }}>
            ✓
          </span>
        </span>
        <h3 className="text-[16px] font-semibold text-green-800 dark:text-green-300">
          Terima kasih, {fullName.split(" ")[0]}!
        </h3>
        <p className="max-w-sm text-[13.5px] leading-relaxed text-green-700 dark:text-green-400">
          Data minat kamu sudah kami terima. Tim kami akan menghubungi lewat WhatsApp untuk info
          selanjutnya.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={`grid grid-cols-1 gap-3 rounded-md border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-gray-900 sm:grid-cols-2 ${
        shake ? "animate-shake" : ""
      }`}
    >
      <div className="sm:col-span-2">
        <label className="mb-1 block text-[13px] font-medium text-ink dark:text-gray-200">
          Nama Lengkap
        </label>
        <input
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          placeholder="Nama sesuai KTP/KK"
          className={`w-full rounded-md border px-3 py-2 text-[14px] outline-none transition-colors dark:bg-gray-800 dark:text-gray-100 ${
            errors.full_name
              ? "border-red-400 focus:border-red-500"
              : "border-gray-200 focus:border-blue-500 dark:border-gray-700"
          }`}
        />
        {errors.full_name && (
          <p className="mt-1 text-[12px] text-red-600 dark:text-red-400">{errors.full_name}</p>
        )}
      </div>

      <div>
        <label className="mb-1 block text-[13px] font-medium text-ink dark:text-gray-200">
          Nomor WhatsApp
        </label>
        <input
          value={whatsapp}
          onChange={(e) => setWhatsapp(e.target.value)}
          placeholder="08xxxxxxxxxx"
          className={`w-full rounded-md border px-3 py-2 text-[14px] outline-none transition-colors dark:bg-gray-800 dark:text-gray-100 ${
            errors.whatsapp
              ? "border-red-400 focus:border-red-500"
              : "border-gray-200 focus:border-blue-500 dark:border-gray-700"
          }`}
        />
        {errors.whatsapp && (
          <p className="mt-1 text-[12px] text-red-600 dark:text-red-400">{errors.whatsapp}</p>
        )}
      </div>

      <div>
        <label className="mb-1 block text-[13px] font-medium text-ink dark:text-gray-200">
          Asal Sekolah (opsional)
        </label>
        <input
          value={schoolOrigin}
          onChange={(e) => setSchoolOrigin(e.target.value)}
          placeholder="SMP/MTs asal"
          className="w-full rounded-md border border-gray-200 px-3 py-2 text-[14px] outline-none transition-colors focus:border-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
        />
      </div>

      {departments.length > 0 && (
        <div className="sm:col-span-2">
          <label className="mb-1 block text-[13px] font-medium text-ink dark:text-gray-200">
            Jurusan Diminati (opsional)
          </label>
          <select
            value={departmentSlug}
            onChange={(e) => setDepartmentSlug(e.target.value)}
            className="w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-[14px] outline-none transition-colors focus:border-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
          >
            <option value="">Belum tahu / semua boleh</option>
            {departments.map((d) => (
              <option key={d.slug} value={d.slug}>
                {d.name}
              </option>
            ))}
          </select>
        </div>
      )}

      {serverError && (
        <p className="text-[12.5px] text-red-600 dark:text-red-400 sm:col-span-2">{serverError}</p>
      )}

      <div className="sm:col-span-2">
        <button
          type="submit"
          disabled={submitting}
          className="btn-pop w-full rounded-md bg-blue-700 px-[22px] py-3 text-sm font-semibold text-white hover:bg-blue-900 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
        >
          {submitting ? "Mengirim..." : "Kirim Minat Daftar"}
        </button>
      </div>
    </form>
  );
}
