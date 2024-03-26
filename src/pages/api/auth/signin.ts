import { supabase } from "@supabase/supabase"
import type { Provider } from "@supabase/supabase-js"
import type { APIRoute } from "astro"

export const POST: APIRoute = async ({ request, redirect }) => {
	const formData: FormData = await request.formData()
	const provider = formData.get("provider")?.toString()

	const validProviders = ["google", "github"]

	if (!provider) {
		return new Response("OAuth provider are required", { status: 400 })
	}

	if (!validProviders.includes(provider)) {
		return new Response("Provider are not valid", { status: 400 })
	}

	const { data, error } = await supabase.auth.signInWithOAuth({
		provider: provider as Provider,
		options: {
			redirectTo: import.meta.env.DEV
				? "http://localhost:4321/api/auth/callback"
				: "https://seritracker.vlorente.dev/api/auth/callback",
		},
	})

	if (error) {
		return new Response(error.message, { status: 500 })
	}

	return redirect(data.url)
}
