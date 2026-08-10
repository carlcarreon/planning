create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  username text not null unique,
  email text not null unique,
  full_name text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, username, email, full_name)
  values (
    new.id,
    lower(btrim(coalesce(nullif(new.raw_user_meta_data->>'username', ''), split_part(coalesce(new.email, ''), '@', 1)))),
    lower(btrim(new.email)),
    nullif(btrim(coalesce(new.raw_user_meta_data->>'full_name', '')), '')
  )
  on conflict (id) do update
    set username = excluded.username,
        email = excluded.email,
        full_name = excluded.full_name,
        updated_at = now();

  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

create or replace function public.find_email_by_username(lookup_username text)
returns text
language sql
security definer
set search_path = public
as $$
  select p.email
  from public.profiles p
  where lower(p.username) = lower(btrim(lookup_username))
  limit 1;
$$;

grant execute on function public.find_email_by_username(text) to anon, authenticated;

grant usage on schema public to anon, authenticated;

grant select, insert, update on public.profiles to authenticated;

drop policy if exists "Users can view their own profile" on public.profiles;
drop policy if exists "Users can insert their own profile" on public.profiles;
drop policy if exists "Users can update their own profile" on public.profiles;

create policy "Users can view their own profile"
  on public.profiles
  for select
  to authenticated
  using (auth.uid() = id);

create policy "Users can insert their own profile"
  on public.profiles
  for insert
  to authenticated
  with check (auth.uid() = id);

create policy "Users can update their own profile"
  on public.profiles
  for update
  to authenticated
  using (auth.uid() = id)
  with check (auth.uid() = id);
