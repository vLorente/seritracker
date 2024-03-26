import { COOKIES } from "@consts/cookies"
import type { APIRoute } from "astro"

export const GET: APIRoute = async ({ cookies }) => {
	const userId = cookies.get(COOKIES.USERID)
	const accessToken = cookies.get(COOKIES.SB_ACCESS_TOKEN)
	const refreshToken = cookies.get(COOKIES.SB_REFRESH_TOKEN)

	const logged = userId && accessToken && refreshToken

	return new Response(JSON.stringify(logged))
}
