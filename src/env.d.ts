/// <reference types="astro/client" />
/// <reference path="../.astro/types.d.ts" />
/// <reference types="vitest" />

import type { User } from "@supabase/supabase-js"

interface ImportMetaEnv {
	readonly SUPABASE_URL: string
	readonly SUPABASE_KEY: string
	readonly SUPABASE_REF_ID: string
}

interface ImportMeta {
	readonly env: ImportMeta
}

declare namespace App {
	interface Locals {
		test: string
		user: User
		userId: string
	}
}
