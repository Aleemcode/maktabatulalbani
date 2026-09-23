-- Schema for Maktabah Imam Albani (BothLife)

-- 1. Categories Table
create table if not exists categories (
  id text primary key,
  slug text not null unique,
  name text not null,
  arabic_name text,
  description text,
  icon text,
  "order" int default 0
);

-- 2. Books Table
create table if not exists books (
  id text primary key,
  slug text not null unique,
  title text not null,
  arabic_title text,
  author text not null,
  publisher text,
  translator text,
  price numeric not null,
  discount_price numeric,
  category_id text references categories(id) on delete set null,
  cover_image text,
  description text not null,
  pages int,
  binding text,
  language text default 'English',
  isbn text,
  in_stock boolean default true,
  featured boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 3. Blog Posts Table
create table if not exists blog_posts (
  id text primary key,
  slug text not null unique,
  title text not null,
  excerpt text not null,
  content text not null,
  author text not null,
  cover_image text,
  published boolean default true,
  read_time text default '5 min read',
  tags text[] default array[]::text[],
  featured_book_ids text[] default array[]::text[],
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 4. Store Settings Table
create table if not exists store_settings (
  id int primary key default 1,
  store_name text not null,
  tagline text,
  whatsapp_number text not null,
  whatsapp_default_message text,
  currency_symbol text default '₦',
  currency_code text default 'NGN',
  announcement_banner text,
  about_text text,
  address text,
  instagram_handle text,
  email text
);

-- Row Level Security (RLS) policies
alter table categories enable row level security;
alter table books enable row level security;
alter table blog_posts enable row level security;
alter table store_settings enable row level security;

-- Public can read all published books, categories, and posts
create policy "Allow public read-only access on categories" on categories for select using (true);
create policy "Allow public read-only access on books" on books for select using (true);
create policy "Allow public read-only access on blog_posts" on blog_posts for select using (published = true);
create policy "Allow public read-only access on store_settings" on store_settings for select using (true);
