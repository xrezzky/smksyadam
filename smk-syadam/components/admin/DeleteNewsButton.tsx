"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function DeleteNewsButton({ id }: { id: string }) {
  const router = useRouter();
  const supabase = createClient();
  const [confirming, setConfirming] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleDelete() {
    setLoading(true);
    const { error } = await supabase.from("news").delete().eq("id", id);
    setLoading(false);
    if (!error) {
      router.refresh();
    }
    setConfirming(false);
  }

  if (confirming) {
    return (
      <span className="flex items-center gap-2">
        <button
          onClick={handleDelete}
          disabled={loading}
          className="font-semibold text-red-600"
        >
          {loading ? "Menghapus..." : "Yakin, hapus"}
        </button>
        <button onClick={() => setConfirming(false)} className="text-gray-500">
          Batal
        </button>
      </span>
    );
  }

  return (
    <button onClick={() => setConfirming(true)} className="font-semibold text-red-600">
      Hapus
    </button>
  );
}
