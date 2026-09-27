import Link from "next/link";

export type Department = {
  slug: string;
  name: string;
  short_description: string | null;
};

export default function JurusanCard({ item, index }: { item: Department; index: number }) {
  return (
    <div className="flex h-full flex-col rounded-md border border-gray-200 bg-white p-5 transition-shadow hover:shadow-sm sm:p-[22px]">
      <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-md bg-blue-100 font-serif font-bold text-blue-700">
        J{index + 1}
      </div>
      <h3 className="mb-1.5 text-base font-semibold text-ink">{item.name}</h3>
      <p className="mb-3 text-[14px] leading-relaxed text-gray-500">
        {item.short_description ?? "Data jurusan akan diperbarui."}
      </p>
      <Link
        href={`/akademik/jurusan/${item.slug}`}
        className="mt-auto pt-1 text-[13.5px] font-semibold text-blue-700"
      >
        Lihat Detail →
      </Link>
    </div>
  );
}
