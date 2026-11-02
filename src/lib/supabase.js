import { createClient } from '@supabase/supabase-js'

// Supplied at build time via Vite env vars (see .env.example).
// The literals below are this project's *publishable* key — public by design,
// shared with every visitor's browser — so the app also runs with no env setup.
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL ?? 'https://synieoxljnlnzctwvash.supabase.co'
const SUPABASE_KEY =
  import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY ?? 'sb_publishable_-jutJVT5E3ZPftmWMr515g_K0c8qCFG'

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY)
