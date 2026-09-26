// Upload unsigned dari browser (dipakai di form admin, mis. upload thumbnail berita).
// Upload preset dibuat di Cloudinary Dashboard > Settings > Upload > Add upload preset,
// mode "Unsigned", supaya API secret tidak pernah perlu dikirim dari client.
export async function uploadToCloudinary(file: File): Promise<string> {
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

  if (!cloudName || !uploadPreset) {
    throw new Error("Konfigurasi Cloudinary belum diisi di environment variables.");
  }

  const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
  if (!allowedTypes.includes(file.type)) {
    throw new Error("Format file tidak didukung. Gunakan JPG, PNG, atau WEBP.");
  }
  const maxSizeBytes = 5 * 1024 * 1024; // 5MB
  if (file.size > maxSizeBytes) {
    throw new Error("Ukuran file maksimal 5MB.");
  }

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", uploadPreset);

  const res = await fetch(
    `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
    { method: "POST", body: formData }
  );

  if (!res.ok) {
    throw new Error("Gagal mengunggah gambar. Coba lagi.");
  }

  const data = await res.json();
  return data.secure_url as string;
}
