import Link from "next/link";

export type NewsItem = {
  slug: string;
  title: string;
  excerpt: string | null;
  thumbnail_url: string | null;
  published_at: string | null;
  category_name?: string | null;
};

export default function NewsCard({ item }: { item: NewsItem }) {
  const date = item.published_at
    ? new Date(item.published_at).toLocaleDateString("id-ID", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : null;

  return (
    <Link
      href={`/berita/${item.slug}`}
      className="block overflow-hidden rounded-md border border-gray-200 transition hover:border-blue-500"
    >
      <div className="flex aspect-video items-center justify-center border-b border-gray-200 bg-gray-50 text-xs text-gray-500">
        {item.thumbnail_url ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={item.thumbnail_url} alt={item.title} className="h-full w-full object-cover" />
        ) : (
          "Thumbnail berita"
        )}
      </div>
      <div className="p-4">
        {item.category_name && (
          <div className="mb-1.5 text-[11.5px] font-semibold text-accent-green">
            {item.category_name}
          </div>
        )}
        <h3 className="mb-1.5 text-[15.5px] font-medium leading-snug text-ink">{item.title}</h3>
        {date && <div className="mb-2 text-xs text-gray-500">{date}</div>}
        {item.excerpt && <p className="text-[14px] leading-relaxed text-gray-500">{item.excerpt}</p>}
      </div>
    </Link>
  );
}
