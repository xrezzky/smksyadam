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
    <footer className="border-t border-gray-200 bg-gray-50 pb-6 pt-11">
      <div className="mx-auto max-w-6xl px-5">
        <div className="mb-7 grid grid-cols-1 gap-6 md:grid-cols-[1.3fr_1fr_1fr] md:gap-8">
          <div>
            {settings?.logo_url ? (
              // Logo dianggap sudah memuat nama sekolah — tidak diulang jadi teks
              // eslint-disable-next-line @next/next/no-img-element
              <img src={settings.logo_url} alt={name} className="h-10 w-auto max-w-[200px] object-contain" />
            ) : (
              <div className="flex items-center gap-2.5">
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-700 font-serif text-sm font-bold text-white">
                  SS
                </span>
                <span className="text-sm font-bold">{name.toUpperCase()}</span>
              </div>
            )}
            <p className="mt-2.5 max-w-[34ch] text-[13.5px] text-gray-500">
              Website resmi {name}, Kabupaten Bogor. Pusat informasi akademik, kegiatan, dan
              penerimaan peserta didik baru.
            </p>
          </div>
          <div>
            <h4 className="mb-3 text-[13.5px] font-semibold">Navigasi</h4>
            <a href="/profil/tentang" className="mb-2 block text-[13.5px] text-gray-500">Profil Sekolah</a>
            <a href="/akademik/jurusan" className="mb-2 block text-[13.5px] text-gray-500">Akademik</a>
            <a href="/berita" className="mb-2 block text-[13.5px] text-gray-500">Berita</a>
            <a href="/ppdb" className="mb-2 block text-[13.5px] text-gray-500">PPDB</a>
          </div>
          <div>
            <h4 className="mb-3 text-[13.5px] font-semibold">Kontak</h4>
            <p className="mb-2 text-[13.5px] text-gray-500">
              {settings?.address ?? "[Alamat resmi sekolah]"}
            </p>
            <p className="mb-2 text-[13.5px] text-gray-500">
              {settings?.phone ?? "[Nomor telepon/WA]"}
            </p>
            <p className="mb-2 text-[13.5px] text-gray-500">
              {settings?.email ?? "[Email sekolah]"}
            </p>
          </div>
        </div>
        <div className="flex flex-wrap justify-between gap-2 border-t border-gray-200 pt-4 text-xs text-gray-500">
          <span>© {new Date().getFullYear()} {name}. All rights reserved.</span>
        </div>
      </div>
    </footer>
  );
}
