/// <reference path="../.astro/db-types.d.ts" />
/// <reference types="astro/client" />
/// <reference path="../.astro/types.d.ts" />
/// <reference types="vitest" />

interface ImportMetaEnv {
	readonly SUPABASE_URL: string
	readonly SUPABASE_KEY: string
	readonly SUPABASE_REF_ID: string
}

interface ImportMeta {
	readonly env: ImportMeta
}
