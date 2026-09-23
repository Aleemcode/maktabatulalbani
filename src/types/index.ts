export interface Book {
  id: string;
  slug: string;
  title: string;
  arabic_title?: string;
  author: string;
  publisher?: string;
  translator?: string;
  price: number;
  discount_price?: number;
  category_id: string;
  cover_image: string;
  description: string;
  table_of_contents?: string[];
  pages?: number;
  binding?: 'Hardcover' | 'Paperback' | 'Leather' | 'Box Set' | 'Softcover';
  language: 'Arabic' | 'English' | 'Bilingual' | 'Yoruba' | 'Hausa';
  isbn?: string;
  in_stock: boolean;
  featured: boolean;
  created_at: string;
  updated_at: string;
}

export interface Category {
  id: string;
  slug: string;
  name: string;
  arabic_name?: string;
  description?: string;
  icon?: string;
  order: number;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  cover_image?: string;
  published: boolean;
  read_time: string;
  tags: string[];
  featured_book_ids?: string[];
  created_at: string;
  updated_at: string;
}

export interface StoreSettings {
  store_name: string;
  tagline: string;
  whatsapp_number: string; // e.g. "2348012345678"
  whatsapp_default_message: string;
  currency_symbol: string; // "₦" or "$"
  currency_code: string; // "NGN" or "USD"
  announcement_banner?: string;
  about_text?: string;
  address?: string;
  instagram_handle?: string;
  email?: string;
}

export interface CartItem {
  book: Book;
  quantity: number;
}
