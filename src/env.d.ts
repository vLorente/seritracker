/// <reference path="../.astro/db-types.d.ts" />
/// <reference types="astro/client" />
/// <reference path="../.astro/types.d.ts" />
/// <reference types="vitest" />

interface ImportMetaEnv {
	readonly SUPABASE_URL: string
	readonly SUPABASE_KEY: string
}

interface ImportMeta {
	readonly env: ImportMeta
}
