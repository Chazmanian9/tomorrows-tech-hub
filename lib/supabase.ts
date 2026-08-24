import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Lets the rest of the app fall back gracefully when Supabase env vars
// haven't been set yet (e.g. local preview before the project exists).
export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

// Safe to use in Client Components — only ever uses the public anon key.
export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl as string, supabaseAnonKey as string)
  : null;
