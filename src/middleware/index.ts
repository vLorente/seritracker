import { supabase } from "@supabase/supabase"
import { defineMiddleware, sequence } from "astro:middleware"
import micromatch from "micromatch"

const protectedRoutes = ["/watchlist(|/)", "/watching(|/)", "/finished(|/)"]
const redirectRoutes = ["/signin(|/)"]
// const proptectedAPIRoutes = ["/api/profile(|/)"]

const auth = defineMiddleware(
	async ({ locals, url, cookies, redirect }, next) => {
		if (micromatch.isMatch(url.pathname, protectedRoutes)) {
			const accessToken = cookies.get("sb-access-token")
			const refreshToken = cookies.get("sb-refresh-token")

			if (!accessToken || !refreshToken) {
				return redirect("/signin")
			}

			const { data, error } = await supabase.auth.setSession({
				refresh_token: refreshToken.value,
				access_token: accessToken.value,
			})

			if (error) {
				cookies.delete("sb-access-token", {
					path: "/",
				})
				cookies.delete("sb-refresh-token", {
					path: "/",
				})
				return redirect("/signin")
			}

			cookies.set("sb-access-token", data?.session?.access_token!, {
				sameSite: "strict",
				path: "/",
				secure: true,
			})
			cookies.set("sb-refresh-token", data?.session?.refresh_token!, {
				sameSite: "strict",
				path: "/",
				secure: true,
			})
		}

		if (micromatch.isMatch(url.pathname, redirectRoutes)) {
			const accessToken = cookies.get("sb-access-token")
			const refreshToken = cookies.get("sb-refresh-token")

			if (accessToken && refreshToken) {
				return redirect("/dashboard")
			}
		}

		// if (micromatch.isMatch(url.pathname, proptectedAPIRoutes)) {
		// 	const accessToken = cookies.get("sb-access-token")
		// 	const refreshToken = cookies.get("sb-refresh-token")

		// 	// Check for tokens
		// 	if (!accessToken || !refreshToken) {
		// 		return new Response(
		// 			JSON.stringify({
		// 				error: "Unauthorized",
		// 			}),
		// 			{ status: 401 }
		// 		)
		// 	}

		// 	// Verify the tokens
		// 	const { error } = await supabase.auth.setSession({
		// 		access_token: accessToken.value,
		// 		refresh_token: refreshToken.value,
		// 	})

		// 	if (error) {
		// 		return new Response(
		// 			JSON.stringify({
		// 				error: "Unauthorized",
		// 			}),
		// 			{ status: 401 }
		// 		)
		// 	}
		// }

		return next()
	}
)

// const corsMiddleware = defineMiddleware(async ({ request }, next) => {
// 	if (request.method === "OPTIONS") {
// 		let headers = new Headers()
// 		headers.append("Access-Control-Allow-Origin", "*")
// 		headers.append("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT")
// 		headers.append(
// 			"Access-Control-Allow-Headers",
// 			"Origin, X-Requested-With, Content-Type, Accept"
// 		)
// 		return new Response(null, { headers })
// 	}

// 	const response = await next()

// 	const headers = new Headers(response.headers)
// 	headers.append("Access-Control-Allow-Origin", "*")
// 	headers.append("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT")
// 	headers.append(
// 		"Access-Control-Allow-Headers",
// 		"Origin, X-Requested-With, Content-Type, Accept"
// 	)

// 	return new Response(response.body, {
// 		...response,
// 		headers: headers,
// 	})
// })

export const onRequest = sequence(auth)
