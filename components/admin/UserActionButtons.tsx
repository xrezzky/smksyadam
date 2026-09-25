"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function UserActionButtons({
  id,
  status,
  role,
}: {
  id: string;
  status: string;
  role: string;
}) {
  const router = useRouter();
  const supabase = createClient();
  const [loading, setLoading] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function updateProfile(action: string, payload: Record<string, string>) {
    setLoading(action);
    setError(null);
    const { error } = await supabase.from("profiles").update(payload).eq("id", id);
    setLoading(null);
    if (error) {
      setError("Gagal memperbarui. Coba lagi.");
      return;
    }
    router.refresh();
  }

  return (
    <div>
      <div className="flex flex-wrap gap-2">
        {status !== "approved" && (
          <button
            onClick={() => updateProfile("approve", { status: "approved" })}
            disabled={loading !== null}
            className="rounded-md bg-accent-green px-3 py-1.5 text-xs font-semibold text-white disabled:opacity-60"
          >
            {loading === "approve" ? "..." : "Setujui"}
          </button>
        )}
        {status !== "rejected" && (
          <button
            onClick={() => updateProfile("reject", { status: "rejected" })}
            disabled={loading !== null}
            className="rounded-md bg-red-600 px-3 py-1.5 text-xs font-semibold text-white disabled:opacity-60"
          >
            {loading === "reject" ? "..." : "Tolak"}
          </button>
        )}
        {status === "approved" && role !== "super_admin" && (
          <button
            onClick={() => updateProfile("promote", { role: "super_admin" })}
            disabled={loading !== null}
            className="rounded-md border border-blue-500 px-3 py-1.5 text-xs font-semibold text-blue-700 disabled:opacity-60"
          >
            {loading === "promote" ? "..." : "Jadikan Owner"}
          </button>
        )}
      </div>
      {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
    </div>
  );
}
