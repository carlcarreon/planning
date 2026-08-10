with normalized_users as (
  select
    u.id,
    lower(
      btrim(
        coalesce(
          nullif(u.raw_user_meta_data->>'username', ''),
          nullif(u.raw_user_meta_data->>'full_name', '')
        )
      )
    ) as username,
    lower(btrim(u.email)) as email,
    nullif(btrim(coalesce(u.raw_user_meta_data->>'full_name', u.raw_user_meta_data->>'username')), '') as full_name,
    coalesce(u.created_at, now()) as created_at
  from auth.users u
),
deduped_users as (
  select distinct on (username)
    id,
    username,
    email,
    full_name,
    created_at
  from normalized_users
  where username is not null and username <> ''
  order by username, created_at, id
)
insert into public.profiles (id, username, email, full_name, created_at, updated_at)
select
  d.id,
  d.username,
  d.email,
  d.full_name,
  d.created_at,
  now()
from deduped_users d
where not exists (
  select 1
  from public.profiles p
  where lower(p.username) = d.username
)
on conflict (id) do update
set username = excluded.username,
    email = excluded.email,
    full_name = excluded.full_name,
    updated_at = now();
