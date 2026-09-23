import { createClient } from '@supabase/supabase-js';

const supabaseUrl = (import.meta.env.VITE_SUPABASE_URL as string) || '';
const supabaseAnon = (import.meta.env.VITE_SUPABASE_ANON_KEY as string) || '';

export const isSupabaseConfigured =
  !!supabaseUrl &&
  supabaseUrl !== 'YOUR_SUPABASE_URL' &&
  !!supabaseAnon &&
  supabaseAnon !== 'YOUR_SUPABASE_ANON_KEY';

export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnon)
  : null;
