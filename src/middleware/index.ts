import { COOKIES } from "@consts/cookies.ts"
import { supabase } from "@supabase/supabase"
import { defineMiddleware } from "astro:middleware"
import micromatch from "micromatch"

const protectedRoutes = [
	"/watchlist(|/)",
	"/watching(|/)",
	"/finished(|/)",
	"/profile(|/)",
]
const redirectRoutes = ["/signin(|/)"]
const proptectedAPIRoutes = ["/api/show(|/)"]

export const onRequest = defineMiddleware(
	async ({ locals, url, cookies, redirect }, next) => {
		if (micromatch.isMatch(url.pathname, protectedRoutes)) {
			const accessToken = cookies.get(COOKIES.SB_ACCESS_TOKEN)
			const refreshToken = cookies.get(COOKIES.SB_REFRESH_TOKEN)

			if (!accessToken || !refreshToken) {
				return redirect("/signin")
			}

			const { data, error } = await supabase.auth.setSession({
				refresh_token: refreshToken.value,
				access_token: accessToken.value,
			})

			if (error) {
				cookies.delete(COOKIES.SB_ACCESS_TOKEN, {
					path: "/",
				})
				cookies.delete(COOKIES.SB_REFRESH_TOKEN, {
					path: "/",
				})
				return redirect("/signin")
			}

			cookies.set(COOKIES.SB_ACCESS_TOKEN, data?.session?.access_token!, {
				sameSite: "strict",
				path: "/",
				secure: true,
			})
			cookies.set(COOKIES.SB_REFRESH_TOKEN, data?.session?.refresh_token!, {
				sameSite: "strict",
				path: "/",
				secure: true,
			})
		}

		if (micromatch.isMatch(url.pathname, redirectRoutes)) {
			const accessToken = cookies.get(COOKIES.SB_ACCESS_TOKEN)
			const refreshToken = cookies.get(COOKIES.SB_REFRESH_TOKEN)

			if (accessToken && refreshToken) {
				return redirect("/")
			}
		}

		if (micromatch.isMatch(url.pathname, proptectedAPIRoutes)) {
			const accessToken = cookies.get(COOKIES.SB_ACCESS_TOKEN)
			const refreshToken = cookies.get(COOKIES.SB_REFRESH_TOKEN)

			// Check for tokens
			if (!accessToken || !refreshToken) {
				return new Response(
					JSON.stringify({
						error: "Unauthorized",
					}),
					{ status: 401 }
				)
			}

			// Verify the tokens
			const { error } = await supabase.auth.setSession({
				access_token: accessToken.value,
				refresh_token: refreshToken.value,
			})

			if (error) {
				return new Response(
					JSON.stringify({
						error: "Unauthorized",
					}),
					{ status: 401 }
				)
			}
		}

		return next()
	}
)
