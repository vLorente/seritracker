import { COOKIES } from "@consts/cookies"
import type { instertBody } from "@interfaces/watching"
import { supabase } from "@supabase/supabase"
import type { APIRoute } from "astro"

export const POST: APIRoute = async ({ request, cookies, redirect }) => {
	// Leer los datos del cuerpo de la solicitud
	const body: instertBody = await request.json()
	const userId = cookies.get(COOKIES.USERID)?.value

	if (!userId) {
		return new Response("User ID not found", { status: 400 })
	}

	if (!body.show) {
		return new Response("UserId and show is required", { status: 400 })
	}

	const { data, error } = await supabase
		.from("watching")
		.insert([{ user_id: userId, show: body.show, mal_id: body.show.mal_id }])
		.select()

	if (error) {
		return new Response(error.message, { status: 500 })
	}

	return new Response(
		JSON.stringify({
			result: data,
		})
	)
}
