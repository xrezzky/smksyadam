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
        className="relative bg-blue-100 py-14 md:py-20"
        style={
          heroImageUrl
            ? {
                backgroundImage: `url(${heroImageUrl})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }
            : undefined
        }
      >
        {/* Overlay tipis di atas foto supaya tone foto seragam — kontras teks dijamin oleh kartu solid di bawah, bukan overlay ini */}
        {heroImageUrl && <div className="absolute inset-0 bg-blue-900/25" aria-hidden="true" />}

        <div className="relative mx-auto max-w-6xl px-5">
          <div className="max-w-xl rounded-xl bg-white p-6 shadow-md md:p-8">
            <span className="mb-5 inline-block rounded-full border border-blue-500 bg-blue-100 px-3 py-1.5 text-xs font-semibold text-blue-700">
              SMK SYADAM BOJONGGEDE
            </span>
            <h1 className="mb-4 font-serif text-[clamp(26px,4.5vw,40px)] leading-tight text-blue-900">
              Selamat Datang di SMK Syadam Bojonggede
            </h1>
            <p className="mb-2.5 text-base font-semibold text-blue-700">
              Website Resmi SMK Syadam Bojonggede
            </p>
            <p className="mb-7 text-[15px] leading-relaxed text-gray-500">
              {description ??
                "Website ini menjadi pusat informasi resmi sekolah — profil, akademik, berita, agenda, dan penerimaan peserta didik baru — bagi siswa, orang tua, calon siswa, guru, dan masyarakat umum."}
            </p>
            <div className="mb-4 flex flex-wrap gap-3">
              <Link
                href="/profil/tentang"
                className="rounded-md bg-blue-700 px-[22px] py-3 text-sm font-semibold text-white hover:bg-blue-900"
              >
                Tentang Sekolah
              </Link>
              <Link
                href="/ppdb"
                className="rounded-md border border-blue-500 px-[22px] py-3 text-sm font-semibold text-blue-700 hover:bg-blue-100"
              >
                Informasi PPDB
              </Link>
            </div>
            <div className="flex flex-wrap gap-5 text-sm">
              <Link href="/akademik/jurusan" className="border-b border-blue-500 font-semibold text-blue-700">
                Lihat Jurusan
              </Link>
              <Link href="/berita" className="border-b border-blue-500 font-semibold text-blue-700">
                Berita Sekolah
              </Link>
            </div>
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
