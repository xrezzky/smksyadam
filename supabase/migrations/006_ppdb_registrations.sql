-- Form "Daftar Minat Cepat" di halaman PPDB — pelengkap link pendaftaran resmi (bukan pengganti),
-- supaya calon siswa yang belum sempat isi form resmi tetap bisa ditangkap kontaknya.
create table if not exists ppdb_registrations (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  whatsapp text not null,
  school_origin text,
  department_slug text references departments(slug) on delete set null,
  created_at timestamptz not null default now()
);

alter table ppdb_registrations enable row level security;

-- Siapa saja boleh mengirim form (calon siswa belum tentu login)
create policy "ppdb_registrations_public_insert" on ppdb_registrations for insert with check (true);

-- Hanya admin yang boleh melihat/mengelola daftar minat yang masuk
create policy "ppdb_registrations_admin_read" on ppdb_registrations for select using (is_admin());
create policy "ppdb_registrations_admin_manage" on ppdb_registrations for all using (is_admin()) with check (is_admin());
