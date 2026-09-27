import Skeleton from "@/components/Skeleton";

export default function LoadingAgenda() {
  return (
    <main className="mx-auto max-w-3xl px-5 py-10 md:py-14">
      <Skeleton className="mb-7 h-8 w-44" />
      <div className="space-y-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="flex gap-4 rounded-md border border-gray-200 p-4">
            <Skeleton className="h-14 w-14 flex-shrink-0" />
            <div className="flex-1 space-y-2">
              <Skeleton className="h-4 w-2/3" />
              <Skeleton className="h-3 w-1/3" />
              <Skeleton className="h-3 w-full" />
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
