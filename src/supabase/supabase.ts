import { createClient, type SupabaseClientOptions } from "@supabase/supabase-js"

const options: SupabaseClientOptions<"public"> = {
	auth: {
		flowType: "pkce",
		autoRefreshToken: false,
		detectSessionInUrl: false,
		persistSession: true,
	},
}

const supabaseUrl = import.meta.env.SUPABASE_URL
const supabaseKey = import.meta.env.SUPABASE_KEY

export const supabase = createClient(supabaseUrl, supabaseKey, options)
