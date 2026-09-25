-- ==========================================================
-- MIGRATION 002 — SISTEM APPROVAL ADMIN BARU
-- Jalankan di Supabase SQL Editor project yang SUDAH ADA (yang sudah pakai schema.sql awal).
-- Aman dijalankan sekali; tidak menghapus data yang sudah ada.
-- ==========================================================

-- 1. Tambah kolom status & email ke profiles
alter table profiles
  add column if not exists status text not null default 'pending'
  check (status in ('pending', 'approved', 'rejected'));

alter table profiles add column if not exists email text;

-- Isi email untuk akun yang sudah ada, ambil dari auth.users
update profiles p set email = u.email
  from auth.users u where u.id = p.id and p.email is null;

-- Akun yang sudah ada (dibuat manual sebelumnya) otomatis dianggap approved,
-- supaya owner yang sudah login tidak ikut ter-lock oleh perubahan ini.
update profiles set status = 'approved' where status = 'pending';

-- 2. Update fungsi is_admin() supaya hanya admin berstatus approved yang dianggap admin
create or replace function is_admin() returns boolean as $$
  select exists (
    select 1 from profiles where id = auth.uid() and status = 'approved'
  );
$$ language sql stable security definer;

-- 3. Fungsi baru: cek apakah user adalah owner (super_admin) yang sudah approved
create or replace function is_super_admin() returns boolean as $$
  select exists (
    select 1 from profiles
    where id = auth.uid() and status = 'approved' and role = 'super_admin'
  );
$$ language sql stable security definer;

-- 4. Trigger: otomatis buat baris profiles (status pending) tiap kali ada user baru daftar
create or replace function handle_new_admin_signup() returns trigger as $$
begin
  insert into public.profiles (id, full_name, email, role, status)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'full_name', ''),
    new.email,
    'admin',
    'pending'
  )
  on conflict (id) do nothing;
  return new;
end;
$$ language plpgsql security definer;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function handle_new_admin_signup();

-- 5. Trigger: cegah admin biasa mengubah role/status dirinya sendiri (anti self-approve)
create or replace function prevent_role_status_escalation() returns trigger as $$
begin
  if not is_super_admin()
     and (new.role is distinct from old.role or new.status is distinct from old.status) then
    raise exception 'Tidak diizinkan mengubah role atau status. Hubungi owner.';
  end if;
  return new;
end;
$$ language plpgsql security definer;

drop trigger if exists trg_prevent_escalation on profiles;
create trigger trg_prevent_escalation
  before update on profiles
  for each row execute function prevent_role_status_escalation();

-- 6. Policy tambahan: owner (super_admin) bisa lihat & kelola semua akun admin
drop policy if exists "profiles_super_admin_select_all" on profiles;
create policy "profiles_super_admin_select_all" on profiles
  for select using (is_super_admin());

drop policy if exists "profiles_super_admin_update_all" on profiles;
create policy "profiles_super_admin_update_all" on profiles
  for update using (is_super_admin());

-- ==========================================================
-- Setelah menjalankan migration ini:
-- - Akun admin yang sudah ada tetap bisa login seperti biasa (status = approved).
-- - Pastikan minimal satu akun berstatus role = 'super_admin' supaya ada yang bisa approve.
--   Cek/atur lewat SQL:
--     update profiles set role = 'super_admin' where id = 'UID-AKUN-OWNER';
-- - Pendaftar baru lewat halaman /admin/register otomatis masuk sebagai
--   role='admin', status='pending', menunggu di-approve owner di menu "Pengguna".
-- ==========================================================
