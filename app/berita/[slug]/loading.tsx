import Skeleton from "@/components/Skeleton";

export default function LoadingBeritaDetail() {
  return (
    <main className="mx-auto max-w-3xl px-5 py-10 md:py-14">
      <Skeleton className="mb-5 h-4 w-28" />
      <Skeleton className="mb-2 h-3 w-20" />
      <Skeleton className="mb-2 h-8 w-full max-w-md" />
      <Skeleton className="mb-6 h-3 w-32" />
      <Skeleton className="mb-7 aspect-video w-full" />
      <div className="space-y-3">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-2/3" />
      </div>
    </main>
  );
}
