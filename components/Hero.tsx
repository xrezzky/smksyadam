import Link from "next/link";

export default function Hero({
  heroImageUrl,
  description,
}: {
  heroImageUrl?: string | null;
  description?: string | null;
}) {
  return (
    <>
      <section
        className="bg-gradient-to-b from-blue-100 to-white py-16"
        style={
          heroImageUrl
            ? {
                backgroundImage: `linear-gradient(180deg, rgba(18,48,92,0.55), rgba(255,255,255,0.9)), url(${heroImageUrl})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }
            : undefined
        }
      >
        <div className="mx-auto max-w-6xl px-5">
          <span className="mb-5 inline-block rounded-full border border-blue-500 bg-white px-3 py-1.5 text-xs font-semibold text-blue-700">
            SMK SYADAM BOJONGGEDE
          </span>
          <h1 className="mb-4 max-w-[14ch] font-serif text-[clamp(30px,5vw,48px)] leading-tight text-blue-900">
            Selamat Datang di SMK Syadam Bojonggede
          </h1>
          <p className="mb-2.5 text-lg font-semibold text-blue-700">
            Website Resmi SMK Syadam Bojonggede
          </p>
          <p className="mb-7 max-w-[56ch] text-[15.5px] text-gray-500">
            {description ??
              "Website ini menjadi pusat informasi resmi sekolah — profil, akademik, berita, agenda, dan penerimaan peserta didik baru — bagi siswa, orang tua, calon siswa, guru, dan masyarakat umum."}
          </p>
          <div className="mb-4 flex flex-wrap gap-3">
            <Link
              href="/profil/tentang"
              className="rounded-md bg-blue-700 px-5.5 py-3 text-sm font-semibold text-white hover:bg-blue-900"
            >
              Tentang Sekolah
            </Link>
            <Link
              href="/ppdb"
              className="rounded-md border border-blue-500 px-5.5 py-3 text-sm font-semibold text-blue-700 hover:bg-blue-100"
            >
              Informasi PPDB
            </Link>
          </div>
          <div className="flex gap-5 text-sm">
            <Link href="/akademik/jurusan" className="border-b border-blue-500 font-semibold text-blue-700">
              Lihat Jurusan
            </Link>
            <Link href="/berita" className="border-b border-blue-500 font-semibold text-blue-700">
              Berita Sekolah
            </Link>
          </div>
        </div>
      </section>
      <svg viewBox="0 0 1440 60" preserveAspectRatio="none" className="block h-14 w-full">
        <path
          d="M0,32 C240,60 480,0 720,20 C960,40 1200,10 1440,30 L1440,60 L0,60 Z"
          fill="#f4f6f8"
        />
      </svg>
    </>
  );
}
