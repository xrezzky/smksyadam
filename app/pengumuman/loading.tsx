import Skeleton from "@/components/Skeleton";

export default function LoadingPengumuman() {
  return (
    <main className="mx-auto max-w-3xl px-5 py-10 md:py-14">
      <Skeleton className="mb-7 h-8 w-44" />
      <div className="space-y-5">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="rounded-md border border-gray-200 p-5">
            <Skeleton className="mb-2 h-4 w-2/3" />
            <Skeleton className="mb-3 h-3 w-24" />
            <Skeleton className="h-3 w-full" />
            <Skeleton className="mt-2 h-3 w-5/6" />
          </div>
        ))}
      </div>
    </main>
  );
}
