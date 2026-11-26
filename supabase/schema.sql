-- Jalankan SQL ini sekali di Supabase Dashboard -> SQL Editor -> New query -> Run.
-- Membuat tabel kuota user (3x gratis per akun Google) + fungsi atomik untuk potong/refund kuota.

create table if not exists public.user_credits (
  user_id uuid primary key references auth.users (id) on delete cascade,
  email text,
  full_name text,
  credits_remaining integer not null default 3 check (credits_remaining >= 0),
  total_generated integer not null default 0 check (total_generated >= 0),
  is_unlimited boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.user_credits enable row level security;

-- User hanya boleh melihat kuotanya sendiri. Tidak ada izin INSERT/UPDATE/DELETE dari client.
drop policy if exists "Users can read own credits" on public.user_credits;
create policy "Users can read own credits"
  on public.user_credits
  for select
  to authenticated
  using (auth.uid() = user_id);

-- Otomatis buat baris kuota (3x gratis) setiap kali ada user baru daftar via Google.
create or replace function public.handle_new_user_credits()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.user_credits (user_id, email, full_name, credits_remaining)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data ->> 'full_name', new.raw_user_meta_data ->> 'name'),
    3
  )
  on conflict (user_id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created_credits on auth.users;
create trigger on_auth_user_created_credits
  after insert on auth.users
  for each row execute function public.handle_new_user_credits();

-- Backfill user lama jika sebelumnya sudah ada user di auth.users.
insert into public.user_credits (user_id, email, full_name, credits_remaining)
select
  u.id,
  u.email,
  coalesce(u.raw_user_meta_data ->> 'full_name', u.raw_user_meta_data ->> 'name'),
  3
from auth.users u
on conflict (user_id) do nothing;

-- Pastikan baris kuota tersedia dan kembalikan saldo saat ini.
create or replace function public.ensure_user_credits(
  p_user_id uuid,
  p_email text default null,
  p_full_name text default null
)
returns table (
  credits_remaining integer,
  total_generated integer,
  is_unlimited boolean
)
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.user_credits (user_id, email, full_name, credits_remaining)
  values (p_user_id, p_email, p_full_name, 3)
  on conflict (user_id) do update
    set email = coalesce(excluded.email, public.user_credits.email),
        full_name = coalesce(excluded.full_name, public.user_credits.full_name);

  return query
  select uc.credits_remaining, uc.total_generated, uc.is_unlimited
  from public.user_credits uc
  where uc.user_id = p_user_id;
end;
$$;

-- Potong 1 kuota secara atomik (aman dari double-click / multi-tab).
create or replace function public.consume_generation_credit(
  p_user_id uuid,
  p_email text default null,
  p_full_name text default null
)
returns table (
  allowed boolean,
  credits_remaining integer,
  is_unlimited boolean
)
language plpgsql
security definer
set search_path = public
as $$
declare
  v_remaining integer;
  v_unlimited boolean;
begin
  insert into public.user_credits (user_id, email, full_name, credits_remaining)
  values (p_user_id, p_email, p_full_name, 3)
  on conflict (user_id) do nothing;

  -- Akun unlimited (mis. admin/owner) tidak mengurangi saldo.
  update public.user_credits uc
  set total_generated = uc.total_generated + 1,
      updated_at = now()
  where uc.user_id = p_user_id
    and uc.is_unlimited = true
  returning uc.credits_remaining, uc.is_unlimited
  into v_remaining, v_unlimited;

  if found then
    return query select true, v_remaining, v_unlimited;
    return;
  end if;

  -- User biasa: potong 1 hanya jika saldo > 0.
  update public.user_credits uc
  set credits_remaining = uc.credits_remaining - 1,
      total_generated = uc.total_generated + 1,
      updated_at = now()
  where uc.user_id = p_user_id
    and uc.credits_remaining > 0
  returning uc.credits_remaining, uc.is_unlimited
  into v_remaining, v_unlimited;

  if found then
    return query select true, v_remaining, v_unlimited;
    return;
  end if;

  select uc.credits_remaining, uc.is_unlimited
  into v_remaining, v_unlimited
  from public.user_credits uc
  where uc.user_id = p_user_id;

  return query select false, coalesce(v_remaining, 0), coalesce(v_unlimited, false);
end;
$$;

-- Kembalikan 1 kuota bila panggilan AI gagal / timeout.
create or replace function public.refund_generation_credit(p_user_id uuid)
returns integer
language plpgsql
security definer
set search_path = public
as $$
declare
  v_remaining integer;
begin
  update public.user_credits uc
  set credits_remaining = uc.credits_remaining + 1,
      total_generated = greatest(uc.total_generated - 1, 0),
      updated_at = now()
  where uc.user_id = p_user_id
    and uc.is_unlimited = false
  returning uc.credits_remaining
  into v_remaining;

  if found then
    return v_remaining;
  end if;

  select uc.credits_remaining into v_remaining
  from public.user_credits uc
  where uc.user_id = p_user_id;

  return coalesce(v_remaining, 0);
end;
$$;

-- Kunci fungsi RPC agar hanya boleh dipanggil dari server (service_role), bukan dari browser.
revoke all on function public.ensure_user_credits(uuid, text, text) from public, anon, authenticated;
grant execute on function public.ensure_user_credits(uuid, text, text) to service_role;

revoke all on function public.consume_generation_credit(uuid, text, text) from public, anon, authenticated;
grant execute on function public.consume_generation_credit(uuid, text, text) to service_role;

revoke all on function public.refund_generation_credit(uuid) from public, anon, authenticated;
grant execute on function public.refund_generation_credit(uuid) to service_role;

-- TIP ADMIN: Untuk membuat akunmu sendiri unlimited, jalankan query ini setelah kamu login sekali:
-- update public.user_credits set is_unlimited = true where email = 'emailkamu@gmail.com';
