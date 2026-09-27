export default function SectionTitle({
  eyebrow,
  title,
}: {
  eyebrow: string;
  title: string;
}) {
  return (
    <div className="mb-3.5">
      <div className="mb-2 flex items-center gap-2 text-[13px] font-semibold text-accent-green">
        <span className="title-underline h-[2px] w-5 rounded-full bg-accent-green" />
        {eyebrow}
      </div>
      <h2 className="font-serif text-[clamp(24px,3.5vw,32px)] text-blue-900">{title}</h2>
    </div>
  );
}
