/// <reference path="../.astro/db-types.d.ts" />
/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

interface ImportMetaEnv {
	readonly SECRET_TMDB_APIKEY: string
	readonly PUBLIC_TMDBAPI: string
}

interface ImportMeta {
	readonly env: ImportMetaEnv
}
