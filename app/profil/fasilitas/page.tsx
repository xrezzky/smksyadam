import PublicShell from "@/components/PublicShell";

export default function FasilitasPage() {
  return (
    <PublicShell>
      <main className="mx-auto max-w-3xl px-5 py-10 md:py-14">
        <h1 className="mb-5 font-serif text-[clamp(24px,4vw,30px)] text-blue-900">Fasilitas Sekolah</h1>
        <div className="space-y-6 text-[15.5px] leading-relaxed text-gray-500">
          <div>
            <h2 className="mb-2 text-[13px] font-semibold uppercase tracking-wide text-blue-700">
              Gedung & Lahan
            </h2>
            <ul className="list-disc space-y-1 pl-5 text-[14.5px]">
              <li>Luas lahan total 3.240 m², milik Yayasan Aqilah Hidayah.</li>
              <li>Kompleks sekolah digunakan bersama MTs Sahid Darul Mu&apos;minin dan SMP Aqilah Hidayah.</li>
              <li>Gedung permanen dengan ruang kelas untuk siswa tingkat 10 hingga 12.</li>
            </ul>
          </div>
          <div>
            <h2 className="mb-2 text-[13px] font-semibold uppercase tracking-wide text-blue-700">
              Ruang Pembelajaran & Praktik
            </h2>
            <ul className="list-disc space-y-1 pl-5 text-[14.5px]">
              <li>Ruang teori untuk kegiatan belajar mengajar reguler.</li>
              <li>Laboratorium komputer untuk praktik jurusan TKJ.</li>
              <li>Laboratorium bahasa untuk praktik komunikasi dan kebahasaan.</li>
              <li>Perpustakaan sekolah dengan buku teks dan referensi bacaan.</li>
            </ul>
          </div>
          <div>
            <h2 className="mb-2 text-[13px] font-semibold uppercase tracking-wide text-blue-700">
              Fasilitas Penunjang
            </h2>
            <ul className="list-disc space-y-1 pl-5 text-[14.5px]">
              <li>Akses internet Wi-Fi untuk kebutuhan administrasi dan pembelajaran.</li>
              <li>Musala di lingkungan kompleks yayasan.</li>
              <li>Toilet dan sarana kebersihan yang terpisah untuk siswa dan tenaga pendidik.</li>
            </ul>
          </div>
          <div>
            <h2 className="mb-2 text-[13px] font-semibold uppercase tracking-wide text-blue-700">
              Sarana Olahraga
            </h2>
            <ul className="list-disc space-y-1 pl-5 text-[14.5px]">
              <li>Lapangan futsal</li>
              <li>Lapangan bola voli</li>
              <li>Lapangan bulu tangkis</li>
            </ul>
          </div>
        </div>
      </main>
    </PublicShell>
  );
}
