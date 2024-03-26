import type { AnimeData } from "@interfaces/animeResponse"

export async function insertWatchlist(show: AnimeData): Promise<Response> {
	const requestOptions = {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({
			show: show,
		}),
	}

	const url: string = import.meta.env.DEV
		? "http://localhost:4321/api/show/watchlist"
		: "https://seritracker.vlorente.dev/api/show/watchlist"

	return await fetch(url, requestOptions)
}

export async function deleteWatchlist(showId: number): Promise<Response> {
	const requestOptions = {
		method: "DELETE",
		headers: { "Content-Type": "application/json" },
	}

	const url: string = import.meta.env.DEV
		? "http://localhost:4321/api/show/watchlist?delete=" + showId
		: "https://seritracker.vlorente.dev/api/show/watchlist?delete=" + showId

	return await fetch(url, requestOptions)
}
