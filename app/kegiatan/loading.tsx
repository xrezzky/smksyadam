import Skeleton from "@/components/Skeleton";

export default function LoadingKegiatan() {
  return (
    <main className="mx-auto max-w-6xl px-5 py-10 md:py-14">
      <div className="mb-7 flex items-baseline justify-between">
        <Skeleton className="h-8 w-44" />
        <Skeleton className="h-4 w-28" />
      </div>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <Skeleton key={i} className="aspect-square w-full" />
        ))}
      </div>
    </main>
  );
}
