-- ==========================================================
-- MIGRATION 004 — EKSTRAKURIKULER
-- Supaya kegiatan ekstrakurikuler bisa diatur dari admin, bukan teks statis.
-- ==========================================================

create table if not exists extracurriculars (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  photo_url text,
  description text,
  display_order int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table extracurriculars enable row level security;

create policy "extracurriculars_public_read" on extracurriculars for select using (true);
create policy "extracurriculars_admin_all" on extracurriculars for all using (is_admin()) with check (is_admin());
