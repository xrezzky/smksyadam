type Settings = {
  school_name?: string | null;
  logo_url?: string | null;
  address?: string | null;
  phone?: string | null;
  email?: string | null;
};

export default function Footer({ settings }: { settings?: Settings }) {
  const name = settings?.school_name ?? "SMK Syadam Bojonggede";

  return (
    <footer className="border-t border-gray-200 bg-gray-50 pb-5 pt-8 md:pt-10">
      <div className="mx-auto max-w-6xl px-5">
        <div className="mb-6 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-[1.3fr_1fr_1fr] md:gap-8">
          <div>
            {settings?.logo_url ? (
              // Logo dianggap sudah memuat nama sekolah — tidak diulang jadi teks
              // eslint-disable-next-line @next/next/no-img-element
              <img src={settings.logo_url} alt={name} className="h-9 w-auto max-w-[180px] object-contain" />
            ) : (
              <div className="flex items-center gap-2.5">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-700 font-serif text-sm font-bold text-white">
                  SS
                </span>
                <span className="text-sm font-bold">{name.toUpperCase()}</span>
              </div>
            )}
            <p className="mt-2 max-w-[36ch] text-[13.5px] leading-relaxed text-gray-500">
              Website resmi {name}, Kabupaten Bogor. Pusat informasi akademik, kegiatan, dan
              penerimaan peserta didik baru.
            </p>
          </div>
          <div>
            <h4 className="mb-2.5 text-[13px] font-semibold uppercase tracking-wide text-ink">
              Navigasi
            </h4>
            <div className="space-y-1.5">
              <a href="/profil/tentang" className="block text-[13.5px] text-gray-500 hover:text-blue-700">
                Profil Sekolah
              </a>
              <a href="/akademik/jurusan" className="block text-[13.5px] text-gray-500 hover:text-blue-700">
                Akademik
              </a>
              <a href="/berita" className="block text-[13.5px] text-gray-500 hover:text-blue-700">
                Berita
              </a>
              <a href="/ppdb" className="block text-[13.5px] text-gray-500 hover:text-blue-700">
                PPDB
              </a>
            </div>
          </div>
          <div>
            <h4 className="mb-2.5 text-[13px] font-semibold uppercase tracking-wide text-ink">
              Kontak
            </h4>
            <div className="space-y-1.5 text-[13.5px] text-gray-500">
              <p>{settings?.address ?? "[Alamat resmi sekolah]"}</p>
              <p>{settings?.phone ?? "[Nomor telepon/WA]"}</p>
              <p>{settings?.email ?? "[Email sekolah]"}</p>
            </div>
          </div>
        </div>
        <div className="flex flex-wrap justify-between gap-2 border-t border-gray-200 pt-3.5 text-xs text-gray-500">
          <span>
            © {new Date().getFullYear()} {name}. All rights reserved.
          </span>
        </div>
      </div>
    </footer>
  );
}
