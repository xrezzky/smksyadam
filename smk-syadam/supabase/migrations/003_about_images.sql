-- ==========================================================
-- MIGRATION 003 — FOTO SECTION "TENTANG" (terpisah dari hero banner)
-- Mendukung lebih dari 1 foto untuk carousel di homepage.
-- ==========================================================

create table if not exists about_images (
  id uuid primary key default uuid_generate_v4(),
  image_url text not null,
  caption text,
  display_order int not null default 0,
  created_at timestamptz not null default now()
);

alter table about_images enable row level security;

create policy "about_images_public_read" on about_images for select using (true);
create policy "about_images_admin_all" on about_images for all using (is_admin()) with check (is_admin());
