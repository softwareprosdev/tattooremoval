-- ─────────────────────────────────────────────────────────────────────
-- AKASHA LASER STUDIO — Supabase schema
--
-- Run this in the Supabase SQL editor (or via `supabase db push` /
-- mcp Supabase apply_migration) on a fresh project. Designed to
-- support the current consultation + contact flows, and to extend
-- cleanly later into a full CRM/admin (statuses, staff assignment,
-- promotions, etc) without a rewrite.
-- ─────────────────────────────────────────────────────────────────────

create extension if not exists "pgcrypto";

do $$ begin
  create type lead_status as enum (
    'NEW',
    'CONTACTED',
    'CONSULTATION_SCHEDULED',
    'CONSULTATION_COMPLETED',
    'TREATMENT_PLANNED',
    'CONVERTED',
    'LOST'
  );
exception
  when duplicate_object then null;
end $$;

do $$ begin
  create type service_interest as enum (
    'tattoo_removal',
    'pmu_correction',
    'not_sure'
  );
exception
  when duplicate_object then null;
end $$;

create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),

  first_name text not null,
  last_name text not null,
  email text not null,
  phone text not null,

  service service_interest not null,
  location text,
  tattoo_size text,
  tattoo_colors text,
  tattoo_age text,
  previous_treatments text,
  desired_outcome text,
  photo_urls text[] not null default '{}',

  preferred_date text,
  preferred_time text,
  message text,

  status lead_status not null default 'NEW',
  source text not null default 'website',

  utm_source text,
  utm_medium text,
  utm_campaign text,

  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists leads_status_idx on public.leads (status);
create index if not exists leads_created_at_idx on public.leads (created_at desc);
create index if not exists leads_email_idx on public.leads (email);

-- Keep updated_at current on every write.
create or replace function public.set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists leads_set_updated_at on public.leads;
create trigger leads_set_updated_at
  before update on public.leads
  for each row execute function public.set_updated_at();

-- ─────────────────────────────────────────────────────────────────────
-- Row Level Security
--
-- The Next.js API routes write leads using the SERVICE ROLE key, which
-- bypasses RLS entirely — these policies exist as defense-in-depth in
-- case the anon/public key is ever used against this table directly
-- (e.g. a future client-side integration). By default: no anon access
-- at all. Staff/admin tooling should use the service role key or a
-- dedicated authenticated policy once an admin dashboard exists.
-- ─────────────────────────────────────────────────────────────────────

alter table public.leads enable row level security;

-- No policies are created for the anon role — intentional default-deny.
-- When an authenticated admin dashboard is built, add a policy such as:
--
-- create policy "Staff can read leads"
--   on public.leads for select
--   using (auth.role() = 'authenticated');

-- ─────────────────────────────────────────────────────────────────────
-- Storage: private bucket for consultation/contact photo uploads.
-- Photos may depict sensitive body areas — bucket must stay private,
-- served only via short-lived signed URLs created by the service role
-- (see lib/storage/uploads.ts).
-- ─────────────────────────────────────────────────────────────────────

insert into storage.buckets (id, name, public)
values ('lead-photos', 'lead-photos', false)
on conflict (id) do nothing;
