import { createClient } from "@/lib/supabase/server";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default async function TentangPage() {
  const supabase = createClient();
  const { data: settings } = await supabase
    .from("school_settings")
    .select("*")
    .eq("id", 1)
    .maybeSingle();

  return (
    <>
      <Navbar schoolName={settings?.school_name ?? undefined} logoUrl={settings?.logo_url} />
      <main className="mx-auto max-w-3xl px-5 py-10 md:py-14">
        <h1 className="mb-5 font-serif text-[clamp(24px,4vw,30px)] text-blue-900">Tentang Sekolah</h1>
        <div className="space-y-4 text-[15.5px] leading-relaxed text-gray-500">
          <p>
            SMK Syadam Bojonggede adalah sekolah menengah kejuruan (SMK) swasta yang berdiri sejak
            tahun 2011 di Tajur Halang, Kabupaten Bogor, Jawa Barat, di bawah naungan Yayasan
            Aqilah Hidayah. Sekolah ini hadir sebagai bagian dari komitmen yayasan dalam
            menyediakan pendidikan kejuruan yang terjangkau dan berkualitas bagi masyarakat di
            wilayah Bojonggede dan sekitarnya.
          </p>
          <p>
            Dalam menjalankan kegiatan belajar mengajar, SMK Syadam Bojonggede menerapkan
            Kurikulum Merdeka yang menekankan pembelajaran berbasis proyek dan pengembangan
            kompetensi sesuai kebutuhan dunia kerja. Sekolah membuka empat kompetensi keahlian,
            yaitu Teknik Komputer dan Jaringan (TKJ), Desain Komunikasi Visual (DKV), Akomodasi
            Perhotelan (APH), dan Manajemen Perkantoran dan Layanan Bisnis (MPLB), yang dirancang
            untuk membekali siswa dengan keterampilan teknis sekaligus kesiapan kerja di
            bidangnya masing-masing.
          </p>
          <p>
            Selain penguasaan kompetensi keahlian, SMK Syadam Bojonggede juga menekankan
            pembentukan karakter dan akhlak siswa sebagai bagian tak terpisahkan dari proses
            pendidikan, sejalan dengan nilai-nilai yang dijunjung oleh Yayasan Aqilah Hidayah.
          </p>
        </div>
      </main>
      <Footer settings={settings ?? undefined} />
    </>
  );
}
