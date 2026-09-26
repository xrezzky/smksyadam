import PublicShell from "@/components/PublicShell";

export default function SejarahPage() {
  return (
    <PublicShell>
      <main className="mx-auto max-w-3xl px-5 py-10 md:py-14">
        <h1 className="mb-5 font-serif text-[clamp(24px,4vw,30px)] text-blue-900">Sejarah Sekolah</h1>
        <div className="space-y-4 text-[15.5px] leading-relaxed text-gray-500">
          <p>
            SMK Syadam Bojonggede didirikan pada 10 Juni 2011 oleh Yayasan Aqilah Hidayah, sebagai
            respons atas kebutuhan masyarakat di wilayah perbatasan Tajur Halang dan Bojonggede
            akan pendidikan kejuruan yang terjangkau dan berbasis nilai keagamaan. Sekolah
            mengantongi izin operasional melalui SK Pendirian Nomor 421/87/DISDIK dari Dinas
            Pendidikan Kabupaten Bogor.
          </p>
          <p>
            Sejak awal berdiri, SMK Syadam menempati satu kompleks lahan seluas 3.240 m² di Jalan
            Manunggal bersama dua unit pendidikan lain di bawah yayasan yang sama, yaitu MTs Sahid
            Darul Mu&apos;minin dan SMP Aqilah Hidayah. Pengelolaan lahan bersama ini memungkinkan
            sarana ibadah, lapangan, dan beberapa ruang praktik dipakai secara efisien oleh
            ketiga sekolah.
          </p>
          <p>
            Pada masa awal berdiri, kompetensi keahlian yang dibuka difokuskan pada bidang yang
            paling dibutuhkan dunia kerja di wilayah Bogor, yaitu Teknik Komputer dan Jaringan
            serta Manajemen Perkantoran. Seiring berjalannya waktu, SMK Syadam mengembangkan
            kompetensi keahliannya menjadi empat program: TKJ, DKV, APH, dan MPLB, sejalan dengan
            penerapan Kurikulum Merdeka yang berlaku saat ini.
          </p>
        </div>
      </main>
    </PublicShell>
  );
}
