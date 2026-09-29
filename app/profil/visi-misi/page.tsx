import PublicShell from "@/components/PublicShell";

export default function VisiMisiPage() {
  return (
    <PublicShell>
      <main className="mx-auto max-w-3xl px-5 py-10 md:py-14">
        <h1 className="mb-7 font-serif text-[clamp(24px,4vw,30px)] text-blue-900 dark:text-gray-100">Visi & Misi</h1>

        <section className="mb-9 rounded-md border border-blue-200 bg-blue-100 p-6 dark:border-blue-500/20 dark:bg-blue-500/10">
          <h2 className="mb-2 text-[13px] font-semibold uppercase tracking-wide text-blue-700 dark:text-blue-300">
            Visi
          </h2>
          <p className="font-serif text-xl leading-relaxed text-blue-900 dark:text-gray-100">
            Mencetak lulusan yang disiplin, berakhlak mulia, dan siap kerja.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-[13px] font-semibold uppercase tracking-wide text-accent-green">
            Misi
          </h2>
          <ol className="list-decimal space-y-2 pl-5 text-[15px] text-gray-500 dark:text-gray-400">
            <li>
              Menyelenggarakan pembelajaran kejuruan yang selaras dengan kebutuhan dunia usaha dan
              dunia industri.
            </li>
            <li>
              Membekali peserta didik dengan keahlian teknis pada bidang teknologi, desain,
              perhotelan, dan bisnis agar mampu bersaing secara profesional.
            </li>
            <li>
              Menanamkan kedisiplinan dan membentuk karakter siswa yang berlandaskan akhlakul
              karimah.
            </li>
          </ol>
        </section>
      </main>
    </PublicShell>
  );
}
