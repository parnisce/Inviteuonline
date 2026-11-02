-- ============================================================
-- InviteU · profiles
-- Run once in Supabase Studio → SQL Editor → New query → Run.
-- Re-running is safe: everything below is drop-then-create or
-- conflict-guarded, so it never duplicates rows or policies.
-- ============================================================

-- 1) The table ------------------------------------------------
create table if not exists public.profiles (
  id         uuid primary key references auth.users (id) on delete cascade,
  full_name  text        not null default '',
  email      text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

drop policy if exists "profiles_select_own" on public.profiles;
create policy "profiles_select_own"
  on public.profiles
  for select
  using (auth.uid() = id);

drop policy if exists "profiles_update_own" on public.profiles;
create policy "profiles_update_own"
  on public.profiles
  for update
  using (auth.uid() = id)
  with check (auth.uid() = id);

-- 2) Auto-create a profile at signup -------------------------
-- Pulls the name the Register form saved into user_metadata
-- (signUp options: { data: { full_name } }) plus the email.
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  insert into public.profiles (id, full_name, email)
  values (
    new.id,
    coalesce(new.raw_user_meta_data ->> 'full_name', ''),
    coalesce(new.email, '')
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- 3) Keep updated_at honest ----------------------------------
create or replace function public.handle_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists set_updated_at on public.profiles;
create trigger set_updated_at
  before update on public.profiles
  for each row execute function public.handle_updated_at();

-- 4) Backfill anyone who signed up before this ran -----------
insert into public.profiles (id, full_name, email)
select u.id,
       coalesce(u.raw_user_meta_data ->> 'full_name', ''),
       coalesce(u.email, '')
from auth.users u
on conflict (id) do nothing;

-- 5) Sanity check --------------------------------------------
-- Should list your users (including the unconfirmed QA account).
select id, full_name, email, created_at
from public.profiles
order by created_at desc
limit 10;
