import PublicShell from "@/components/PublicShell";

export default function StrukturPage() {
  return (
    <PublicShell>
      <main className="mx-auto max-w-3xl px-5 py-10 md:py-14">
        <h1 className="mb-5 font-serif text-[clamp(24px,4vw,30px)] text-blue-900">Struktur Organisasi</h1>
        <p className="mb-6 text-[15.5px] leading-relaxed text-gray-500">
          Tata kelola SMK Syadam Bojonggede terbagi menjadi dua tingkat: Yayasan Aqilah Hidayah
          sebagai badan penyelenggara, dan manajemen internal sekolah sebagai pelaksana
          operasional harian.
        </p>

        <div className="space-y-3 text-[14.5px] text-ink">
          <div className="rounded-md border border-gray-200 bg-blue-100 p-3 text-center font-semibold text-blue-900">
            Yayasan Aqilah Hidayah (Penyelenggara)
          </div>
          <div className="rounded-md border border-gray-200 bg-white p-3 text-center font-semibold">
            Kepala Sekolah
          </div>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div className="rounded-md border border-gray-200 bg-gray-50 p-3 text-center">Komite Sekolah</div>
            <div className="rounded-md border border-gray-200 bg-gray-50 p-3 text-center">Kepala Tata Usaha</div>
          </div>
          <div className="rounded-md border border-dashed border-gray-200 p-3">
            <div className="mb-2 text-center text-[13px] font-semibold uppercase tracking-wide text-gray-500">
              Wakil Kepala Sekolah
            </div>
            <div className="grid grid-cols-2 gap-2 text-[13.5px] sm:grid-cols-4">
              <div className="rounded-md bg-gray-50 p-2 text-center">Kurikulum</div>
              <div className="rounded-md bg-gray-50 p-2 text-center">Kesiswaan</div>
              <div className="rounded-md bg-gray-50 p-2 text-center">Hubungan Industri</div>
              <div className="rounded-md bg-gray-50 p-2 text-center">Sarana & Prasarana</div>
            </div>
          </div>
          <div className="rounded-md border border-dashed border-gray-200 p-3">
            <div className="mb-2 text-center text-[13px] font-semibold uppercase tracking-wide text-gray-500">
              Kepala Kompetensi Keahlian
            </div>
            <div className="grid grid-cols-2 gap-2 text-[13.5px] sm:grid-cols-4">
              <div className="rounded-md bg-gray-50 p-2 text-center">TKJ</div>
              <div className="rounded-md bg-gray-50 p-2 text-center">DKV</div>
              <div className="rounded-md bg-gray-50 p-2 text-center">APH</div>
              <div className="rounded-md bg-gray-50 p-2 text-center">MPLB</div>
            </div>
          </div>
          <div className="rounded-md border border-gray-200 bg-white p-3 text-center font-semibold">
            Dewan Guru & Wali Kelas
          </div>
        </div>

        <p className="mt-6 text-[13.5px] text-gray-500">
          Nama dan foto pejabat struktural dapat dilihat di halaman{" "}
          <a href="/profil/guru" className="font-semibold text-blue-700">
            Guru &amp; Tenaga Kependidikan
          </a>
          .
        </p>
      </main>
    </PublicShell>
  );
}
