import { COOKIES } from "@consts/cookies"
import { supabase } from "@supabase/supabase"
import type { APIRoute } from "astro"

export const GET: APIRoute = async ({ locals, url, cookies, redirect }) => {
	const authCode = url.searchParams.get("code")

	if (!authCode) {
		return new Response("No code provided", { status: 400 })
	}

	const { data, error } = await supabase.auth.exchangeCodeForSession(authCode)

	if (error) {
		return new Response(error.message, { status: 500 })
	}

	const { access_token, refresh_token } = data.session

	cookies.set(COOKIES.USER, data.user, {
		path: "/",
	})
	cookies.set(COOKIES.USERID, data.user.id, {
		path: "/",
	})
	cookies.set(COOKIES.SB_ACCESS_TOKEN, access_token, {
		path: "/",
	})
	cookies.set(COOKIES.SB_REFRESH_TOKEN, refresh_token, {
		path: "/",
	})

	return redirect("/")
}
