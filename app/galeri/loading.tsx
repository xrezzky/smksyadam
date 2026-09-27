import Skeleton from "@/components/Skeleton";

export default function LoadingGaleri() {
  return (
    <main className="mx-auto max-w-6xl px-5 py-10 md:py-14">
      <Skeleton className="mb-7 h-8 w-32" />
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
        {Array.from({ length: 12 }).map((_, i) => (
          <Skeleton key={i} className="aspect-square w-full" />
        ))}
      </div>
    </main>
  );
}
