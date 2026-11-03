-- ==============================================================================
-- ECOSORT - SUPABASE DATABASE SCHEMA
-- Hướng dẫn:
-- 1. Đăng nhập vào https://supabase.com/dashboard
-- 2. Chọn dự án của bạn (goyxzrmauveaxofwntne)
-- 3. Vào mục "SQL Editor" ở menu bên trái
-- 4. Bấm "New Query", dán toàn bộ nội dung script này vào và bấm "Run" (▶)
-- ==============================================================================

-- 1. BẢNG PROFILES (Lưu hồ sơ người dùng, điểm XP, cấp độ, chuỗi ngày)
create table if not exists public.profiles (
  id uuid references auth.users on delete cascade primary key,
  email text,
  name text default 'Chiến Binh Xanh',
  avatar text default '🌱',
  points integer default 0,
  level integer default 0,
  daily_streak integer default 1,
  last_active_date date default current_date,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 2. BẢNG CLASSIFICATION_HISTORY (Lưu lịch sử từng lần phân loại rác)
create table if not exists public.classification_history (
  id text primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  item_id text not null,
  item_name text not null,
  category text not null,
  bin_color text not null,
  points_earned integer default 5,
  timestamp bigint,
  note text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 3. BẬT ROW LEVEL SECURITY (RLS - Bảo mật chỉ cho phép mỗi người truy cập dữ liệu của chính mình)
alter table public.profiles enable row level security;
alter table public.classification_history enable row level security;

-- Policies cho bảng profiles
drop policy if exists "Users can view their own profile" on public.profiles;
create policy "Users can view their own profile"
  on public.profiles for select
  using (auth.uid() = id);

drop policy if exists "Users can insert their own profile" on public.profiles;
create policy "Users can insert their own profile"
  on public.profiles for insert
  with check (auth.uid() = id);

drop policy if exists "Users can update their own profile" on public.profiles;
create policy "Users can update their own profile"
  on public.profiles for update
  using (auth.uid() = id);

-- Policies cho bảng classification_history
drop policy if exists "Users can view their own history" on public.classification_history;
create policy "Users can view their own history"
  on public.classification_history for select
  using (auth.uid() = user_id);

drop policy if exists "Users can insert their own history" on public.classification_history;
create policy "Users can insert their own history"
  on public.classification_history for insert
  with check (auth.uid() = user_id);

drop policy if exists "Users can delete their own history" on public.classification_history;
create policy "Users can delete their own history"
  on public.classification_history for delete
  using (auth.uid() = user_id);

-- 4. TRIGGER TỰ ĐỘNG TẠO PROFILE KHI CÓ USER MỚI ĐĂNG KÝ
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email, name, avatar, points, level)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data->>'full_name', split_part(new.email, '@', 1), 'Chiến Binh Xanh'),
    '🌱',
    10,
    1
  )
  on conflict (id) do nothing;
  return new;
end;
$$ language plpgsql security definer;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- 5. TẠO PROFILE CHO CÁC TÀI KHOẢN ĐÃ ĐĂNG KÝ TRƯỚC ĐÓ (NẾU CÓ)
insert into public.profiles (id, email, name, avatar, points, level)
select
  id,
  email,
  coalesce(raw_user_meta_data->>'full_name', split_part(email, '@', 1), 'Chiến Binh Xanh'),
  '🌱',
  10,
  1
from auth.users
on conflict (id) do nothing;

