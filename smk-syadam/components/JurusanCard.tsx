import Link from "next/link";

export type Department = {
  slug: string;
  name: string;
  short_description: string | null;
};

export default function JurusanCard({ item, index }: { item: Department; index: number }) {
  return (
    <div className="rounded-md border border-gray-200 bg-white p-[22px]">
      <div className="mb-3.5 flex h-[42px] w-[42px] items-center justify-center rounded-md bg-blue-100 font-serif font-bold text-blue-700">
        J{index + 1}
      </div>
      <h3 className="mb-1.5 text-base">{item.name}</h3>
      <p className="mb-3 text-[13.5px] text-gray-500">
        {item.short_description ?? "Data jurusan akan diperbarui."}
      </p>
      <Link href={`/akademik/jurusan/${item.slug}`} className="text-[13.5px] font-semibold text-blue-700">
        Lihat Detail →
      </Link>
    </div>
  );
}
