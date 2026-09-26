export default function EmptyState({ icon = "📄", message }: { icon?: string; message: string }) {
  return (
    <div className="flex flex-col items-center gap-2 rounded-lg border border-dashed border-gray-200 bg-gray-50 py-8 text-center">
      <span className="text-xl">{icon}</span>
      <p className="text-[14px] text-gray-500">{message}</p>
    </div>
  );
}
