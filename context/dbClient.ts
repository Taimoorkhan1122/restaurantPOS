import { createClient } from "@supabase/supabase-js";


const public_key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? ""
const public_url = process.env.NEXT_PUBLIC_SUPABASE_URL ?? ""

export const supabaseClient = createClient(public_url, public_key);
