import { createClient } from "@supabase/supabase-js";

// Safe fallbacks matching user provided credentials
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || "https://ukfwmioymiuxctigfpwd.supabase.co";
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || "sb_publishable_-5aZCjbOLH3HzVnDOXXxFw_LLgzsBGT";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
