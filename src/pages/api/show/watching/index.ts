import { COOKIES } from "@consts/cookies"
import type { AnimeData } from "@interfaces/animeResponse"
import type { instertBody } from "@interfaces/watching"
import { supabase } from "@supabase/supabase"
import type { APIRoute } from "astro"

export const POST: APIRoute = async ({ request, cookies }) => {
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

export const GET: APIRoute = async ({ request, cookies }) => {
	// Leer los datos del cuerpo de la solicitud
	const userId = cookies.get(COOKIES.USERID)?.value

	if (!userId) {
		return new Response("User ID not found", { status: 400 })
	}

	const { data: watching, error } = await supabase
		.from("watching")
		.select("show")
		.eq("user_id", userId)

	if (error) {
		return new Response(error.message, { status: 500 })
	}

	const watchingList: AnimeData[] = watching?.map((item) => item.show) || []

	return new Response(JSON.stringify(watchingList))
}
