// js/supabase.js
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm'

export const supabase = createClient(
  'https://YOUR_PROJECT_ID.supabase.co',
  'YOUR_PUBLISHABLE_API_KEY'
)