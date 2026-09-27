import Skeleton from "@/components/Skeleton";

export default function LoadingBerita() {
  return (
    <main className="mx-auto max-w-6xl px-5 py-10 md:py-14">
      <Skeleton className="mb-7 h-8 w-48" />
      <div className="grid grid-cols-1 gap-[18px] sm:grid-cols-2 md:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="overflow-hidden rounded-md border border-gray-200">
            <Skeleton className="aspect-video w-full rounded-none" />
            <div className="space-y-2 p-4">
              <Skeleton className="h-3 w-16" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-3 w-3/4" />
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
