-- ==========================================================
-- SKEMA DATABASE — WEBSITE SMK SYADAM BOJONGGEDE
-- Jalankan file ini di Supabase SQL Editor (satu kali, saat setup)
-- ==========================================================

-- ---------- EXTENSIONS ----------
create extension if not exists "uuid-ossp";

-- ---------- PROFILES (role admin, terhubung ke auth.users) ----------
create table if not exists profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  email text,
  role text not null default 'admin' check (role in ('admin', 'super_admin', 'editor')),
  status text not null default 'pending' check (status in ('pending', 'approved', 'rejected')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ---------- CATEGORIES (dipakai bersama oleh berita & pengumuman) ----------
create table if not exists categories (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  slug text not null unique,
  type text not null check (type in ('news', 'announcement')),
  created_at timestamptz not null default now()
);

-- ---------- NEWS (Berita) ----------
create table if not exists news (
  id uuid primary key default uuid_generate_v4(),
  title text not null,
  slug text not null unique,
  excerpt text,
  content text not null,
  thumbnail_url text,
  category_id uuid references categories(id) on delete set null,
  author_id uuid references profiles(id) on delete set null,
  is_published boolean not null default false,
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index if not exists idx_news_published on news (is_published, published_at desc);

-- ---------- ANNOUNCEMENTS (Pengumuman) ----------
create table if not exists announcements (
  id uuid primary key default uuid_generate_v4(),
  title text not null,
  content text not null,
  category_id uuid references categories(id) on delete set null,
  is_published boolean not null default false,
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ---------- EVENTS (Agenda) ----------
create table if not exists events (
  id uuid primary key default uuid_generate_v4(),
  title text not null,
  description text,
  location text,
  start_at timestamptz not null,
  end_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ---------- TEACHERS (Guru & Tenaga Kependidikan) ----------
create table if not exists teachers (
  id uuid primary key default uuid_generate_v4(),
  full_name text not null,
  position text not null,
  subject_area text,
  photo_url text,
  bio text,
  display_order int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ---------- DEPARTMENTS (Kompetensi Keahlian / Jurusan) ----------
create table if not exists departments (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  slug text not null unique,
  icon_url text,
  photo_url text,
  short_description text,
  full_description text,
  display_order int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ---------- ACHIEVEMENTS (Prestasi) ----------
create table if not exists achievements (
  id uuid primary key default uuid_generate_v4(),
  title text not null,
  student_or_team text,
  level text, -- kabupaten / provinsi / nasional / internasional
  year int,
  photo_url text,
  description text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ---------- GALLERY CATEGORIES ----------
create table if not exists gallery_categories (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  slug text not null unique
);

-- ---------- GALLERY ----------
create table if not exists gallery (
  id uuid primary key default uuid_generate_v4(),
  image_url text not null,
  caption text,
  category_id uuid references gallery_categories(id) on delete set null,
  created_at timestamptz not null default now()
);

-- ---------- PPDB (Penerimaan Peserta Didik Baru — konten singleton) ----------
create table if not exists ppdb (
  id int primary key default 1,
  description text,
  requirements text,
  schedule text,
  registration_link text,
  contact_info text,
  updated_at timestamptz not null default now(),
  constraint ppdb_singleton check (id = 1)
);

-- ---------- SCHOOL SETTINGS (Pengaturan situs — singleton) ----------
create table if not exists school_settings (
  id int primary key default 1,
  school_name text not null default 'SMK Syadam Bojonggede',
  tagline text,
  logo_url text,
  hero_image_url text,
  address text,
  phone text,
  whatsapp text,
  email text,
  google_maps_url text,
  footer_text text,
  seo_description text,
  updated_at timestamptz not null default now(),
  constraint school_settings_singleton check (id = 1)
);

-- ---------- ABOUT IMAGES (foto section "Tentang" di homepage — terpisah dari hero) ----------
create table if not exists about_images (
  id uuid primary key default uuid_generate_v4(),
  image_url text not null,
  caption text,
  display_order int not null default 0,
  created_at timestamptz not null default now()
);

-- ---------- SOCIAL LINKS ----------
create table if not exists social_links (
  id uuid primary key default uuid_generate_v4(),
  platform text not null check (platform in ('instagram', 'facebook', 'youtube', 'tiktok')),
  url text not null
);

-- Baris default untuk tabel singleton
insert into school_settings (id, school_name) values (1, 'SMK Syadam Bojonggede')
  on conflict (id) do nothing;
insert into ppdb (id) values (1) on conflict (id) do nothing;

-- ==========================================================
-- ROW LEVEL SECURITY
-- Publik hanya boleh membaca konten yang sudah dipublish.
-- Hanya admin (authenticated, ada di tabel profiles) yang boleh menulis.
-- ==========================================================

alter table profiles enable row level security;
alter table categories enable row level security;
alter table news enable row level security;
alter table announcements enable row level security;
alter table events enable row level security;
alter table teachers enable row level security;
alter table departments enable row level security;
alter table achievements enable row level security;
alter table gallery_categories enable row level security;
alter table gallery enable row level security;
alter table ppdb enable row level security;
alter table school_settings enable row level security;
alter table social_links enable row level security;
alter table about_images enable row level security;

-- Helper: cek apakah user login adalah admin berstatus approved
create or replace function is_admin() returns boolean as $$
  select exists (
    select 1 from profiles where id = auth.uid() and status = 'approved'
  );
$$ language sql stable security definer;

-- Helper: cek apakah user login adalah owner (super_admin) berstatus approved
create or replace function is_super_admin() returns boolean as $$
  select exists (
    select 1 from profiles
    where id = auth.uid() and status = 'approved' and role = 'super_admin'
  );
$$ language sql stable security definer;

-- Trigger: setiap ada user baru daftar (auth.users), otomatis buat profil berstatus pending
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

-- Trigger: cegah admin biasa mengubah role/status dirinya sendiri (anti self-approve)
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

-- Profiles: admin hanya bisa lihat/edit datanya sendiri; owner bisa lihat & kelola semua
create policy "profiles_self_select" on profiles for select using (auth.uid() = id);
create policy "profiles_self_update" on profiles for update using (auth.uid() = id);
create policy "profiles_super_admin_select_all" on profiles for select using (is_super_admin());
create policy "profiles_super_admin_update_all" on profiles for update using (is_super_admin());

-- Pola yang sama diulang untuk tiap tabel konten publik:
-- SELECT: semua orang boleh baca yang published (atau semua baris untuk data referensi seperti teachers/departments)
-- ALL (insert/update/delete): hanya admin

create policy "categories_public_read" on categories for select using (true);
create policy "categories_admin_write" on categories for all using (is_admin()) with check (is_admin());

create policy "news_public_read" on news for select using (is_published = true);
create policy "news_admin_all" on news for all using (is_admin()) with check (is_admin());

create policy "announcements_public_read" on announcements for select using (is_published = true);
create policy "announcements_admin_all" on announcements for all using (is_admin()) with check (is_admin());

create policy "events_public_read" on events for select using (true);
create policy "events_admin_all" on events for all using (is_admin()) with check (is_admin());

create policy "teachers_public_read" on teachers for select using (true);
create policy "teachers_admin_all" on teachers for all using (is_admin()) with check (is_admin());

create policy "departments_public_read" on departments for select using (true);
create policy "departments_admin_all" on departments for all using (is_admin()) with check (is_admin());

create policy "achievements_public_read" on achievements for select using (true);
create policy "achievements_admin_all" on achievements for all using (is_admin()) with check (is_admin());

create policy "gallery_categories_public_read" on gallery_categories for select using (true);
create policy "gallery_categories_admin_all" on gallery_categories for all using (is_admin()) with check (is_admin());

create policy "gallery_public_read" on gallery for select using (true);
create policy "gallery_admin_all" on gallery for all using (is_admin()) with check (is_admin());

create policy "ppdb_public_read" on ppdb for select using (true);
create policy "ppdb_admin_all" on ppdb for all using (is_admin()) with check (is_admin());

create policy "settings_public_read" on school_settings for select using (true);
create policy "settings_admin_all" on school_settings for all using (is_admin()) with check (is_admin());

create policy "social_public_read" on social_links for select using (true);
create policy "social_admin_all" on social_links for all using (is_admin()) with check (is_admin());

create policy "about_images_public_read" on about_images for select using (true);
create policy "about_images_admin_all" on about_images for all using (is_admin()) with check (is_admin());

-- ==========================================================
-- Catatan setup admin pertama (owner):
-- 1. Buat user lewat Supabase Auth Dashboard (Authentication > Users > Add user).
--    Trigger di atas otomatis membuat baris profiles dengan role='admin', status='pending'.
-- 2. Jadikan owner dengan update manual:
--    update profiles set role = 'super_admin', status = 'approved' where id = '<uuid-user>';
-- 3. Admin berikutnya bisa daftar sendiri lewat halaman /admin/register,
--    lalu di-approve oleh owner lewat menu "Pengguna" di panel admin.
-- ==========================================================
