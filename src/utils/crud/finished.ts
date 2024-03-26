import type { AnimeData } from "@interfaces/animeResponse"

export async function insertFinished(show: AnimeData): Promise<Response> {
	const requestOptions = {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({
			show: show,
		}),
	}

	const url: string = import.meta.env.DEV
		? "http://localhost:4321/api/show/finished"
		: "https://seritracker.vlorente.dev/api/show/finished"

	return await fetch(url, requestOptions)
}

export async function deleteFinished(showId: number): Promise<Response> {
	const requestOptions = {
		method: "DELETE",
		headers: { "Content-Type": "application/json" },
	}

	const url: string = import.meta.env.DEV
		? "http://localhost:4321/api/show/finished?delete=" + showId
		: "https://seritracker.vlorente.dev/api/show/finished?delete=" + showId

	return await fetch(url, requestOptions)
}
