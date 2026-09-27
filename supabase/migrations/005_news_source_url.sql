-- ==========================================================
-- MIGRATION 005 — SUMBER BERITA
-- Menambah kolom link sumber berita (opsional), tampil di halaman detail.
-- ==========================================================

alter table news add column if not exists source_url text;
