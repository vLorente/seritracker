import { COOKIES } from "@consts/cookies"
import { supabase } from "@supabase/supabase"
import type { APIRoute } from "astro"

export const GET: APIRoute = async ({ cookies, redirect }) => {
	const { error } = await supabase.auth.signOut()
	cookies.delete(COOKIES.SB_ACCESS_TOKEN, { path: "/" })
	cookies.delete(COOKIES.SB_REFRESH_TOKEN, { path: "/" })
	cookies.delete(COOKIES.USER, { path: "/" })
	cookies.delete(COOKIES.USERID, { path: "/" })
	return redirect("/")
}
