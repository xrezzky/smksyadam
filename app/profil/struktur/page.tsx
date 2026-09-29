import PublicShell from "@/components/PublicShell";

export default function StrukturPage() {
  return (
    <PublicShell>
      <main className="mx-auto max-w-3xl px-5 py-10 md:py-14">
        <h1 className="mb-5 font-serif text-[clamp(24px,4vw,30px)] text-blue-900 dark:text-gray-100">Struktur Organisasi</h1>
        <p className="mb-6 text-[15.5px] leading-relaxed text-gray-500 dark:text-gray-400">
          Tata kelola SMK Syadam Bojonggede terbagi menjadi dua tingkat: Yayasan Aqilah Hidayah
          sebagai badan penyelenggara, dan manajemen internal sekolah sebagai pelaksana
          operasional harian.
        </p>

        <div className="space-y-3 text-[14.5px] text-ink dark:text-gray-100">
          <div className="rounded-md border border-blue-200 bg-blue-100 p-3 text-center font-semibold text-blue-900 dark:border-blue-500/20 dark:bg-blue-500/15 dark:text-blue-200">
            Yayasan Aqilah Hidayah (Penyelenggara)
          </div>
          <div className="rounded-md border border-gray-200 bg-white p-3 text-center font-semibold dark:border-gray-800 dark:bg-gray-900">
            Kepala Sekolah
          </div>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div className="rounded-md border border-gray-200 bg-gray-50 p-3 text-center dark:border-gray-800 dark:bg-gray-800">Komite Sekolah</div>
            <div className="rounded-md border border-gray-200 bg-gray-50 p-3 text-center dark:border-gray-800 dark:bg-gray-800">Kepala Tata Usaha</div>
          </div>
          <div className="rounded-md border border-dashed border-gray-200 p-3 dark:border-gray-800">
            <div className="mb-2 text-center text-[13px] font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
              Wakil Kepala Sekolah
            </div>
            <div className="grid grid-cols-2 gap-2 text-[13.5px] sm:grid-cols-4">
              <div className="rounded-md bg-gray-50 p-2 text-center dark:bg-gray-800">Kurikulum</div>
              <div className="rounded-md bg-gray-50 p-2 text-center dark:bg-gray-800">Kesiswaan</div>
              <div className="rounded-md bg-gray-50 p-2 text-center dark:bg-gray-800">Hubungan Industri</div>
              <div className="rounded-md bg-gray-50 p-2 text-center dark:bg-gray-800">Sarana & Prasarana</div>
            </div>
          </div>
          <div className="rounded-md border border-dashed border-gray-200 p-3 dark:border-gray-800">
            <div className="mb-2 text-center text-[13px] font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
              Kepala Kompetensi Keahlian
            </div>
            <div className="grid grid-cols-2 gap-2 text-[13.5px] sm:grid-cols-4">
              <div className="rounded-md bg-gray-50 p-2 text-center dark:bg-gray-800">TKJ</div>
              <div className="rounded-md bg-gray-50 p-2 text-center dark:bg-gray-800">DKV</div>
              <div className="rounded-md bg-gray-50 p-2 text-center dark:bg-gray-800">APH</div>
              <div className="rounded-md bg-gray-50 p-2 text-center dark:bg-gray-800">MPLB</div>
            </div>
          </div>
          <div className="rounded-md border border-gray-200 bg-white p-3 text-center font-semibold dark:border-gray-800 dark:bg-gray-900">
            Dewan Guru & Wali Kelas
          </div>
        </div>

        <p className="mt-6 text-[13.5px] text-gray-500 dark:text-gray-400">
          Nama dan foto pejabat struktural dapat dilihat di halaman{" "}
          <a href="/profil/guru" className="font-semibold text-blue-700 dark:text-blue-300">
            Guru &amp; Tenaga Kependidikan
          </a>
          .
        </p>
      </main>
    </PublicShell>
  );
}
