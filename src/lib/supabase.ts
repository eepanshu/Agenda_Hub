
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://gzxhcbthetsbgtjujxri.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd6eGhjYnRoZXRzYmd0anVqeHJpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA3NDA3NTIsImV4cCI6MjA2NjMxNjc1Mn0.Yy03MRkzMRSKt9_TGdCqD_xlKTtKY8NCO99cnG3x8sY'

if (!supabaseUrl) {
  throw new Error('Missing VITE_SUPABASE_URL environment variable. Please configure your Supabase project URL.')
}

if (!supabaseAnonKey) {
  throw new Error('Missing VITE_SUPABASE_ANON_KEY environment variable. Please configure your Supabase anonymous key.')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
