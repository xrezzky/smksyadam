import type { ReactNode } from "react";
import { FileIcon } from "@/components/icons";

export default function EmptyState({
  icon = <FileIcon className="h-6 w-6" />,
  message,
}: {
  icon?: ReactNode;
  message: string;
}) {
  return (
    <div className="flex flex-col items-center gap-2 rounded-lg border border-dashed border-gray-200 bg-gray-50 py-8 text-center dark:border-gray-700 dark:bg-gray-800/50">
      <span className="text-gray-400 dark:text-gray-500">{icon}</span>
      <p className="text-[14px] text-gray-500 dark:text-gray-400">{message}</p>
    </div>
  );
}
