-- Tomorrow's Tech Hub — Supabase schema
-- Run this once in your Supabase project's SQL Editor (Project → SQL Editor → New query).

-- ============ SUBSCRIBERS (email gate signups) ============
create table if not exists subscribers (
  id uuid primary key default gen_random_uuid(),
  email text unique not null,
  created_at timestamptz not null default now()
);

-- ============ Row Level Security ============
alter table subscribers enable row level security;

-- No public read or insert policy is created on purpose: the anon key can't
-- touch this table at all. Inserts happen only through the server-side
-- /api/subscribe route using the service role key, which bypasses RLS.
