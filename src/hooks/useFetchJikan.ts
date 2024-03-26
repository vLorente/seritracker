import { MediaTypeEnum, OrderByEnum } from "@interfaces/animeQuery"
import type { AnimeData, AnimeResponse } from "@interfaces/animeResponse"
import loginCheck from "@utils/loginCheck"
import { useEffect, useState } from "preact/hooks"

export default function useFetchJikan(
	orderBy: OrderByEnum = OrderByEnum.Popularity,
	sort: "asc" | "desc",
	search: string,
	page: number
) {
	const api = "https://api.jikan.moe/v4/anime"
	const [data, setData] = useState<AnimeResponse | null>(null)
	const [error, setError] = useState<Error | null>(null)
	const [loading, setLoading] = useState(false)
	const logged = loginCheck()

	const defaultMediaTypes = [MediaTypeEnum.TV]

	const queryParams = new URLSearchParams({
		order_by: orderBy,
		sort: sort,
		q: search,
		page: page.toString(),
	})

	defaultMediaTypes.forEach((item) => {
		queryParams.append("type", item)
	})

	const url = `${api}?${queryParams.toString()}`

	const requestOptions = {
		method: "GET",
		headers: { "Content-Type": "application/json" },
	}

	const urlWatchlist: string = import.meta.env.DEV
		? "http://localhost:4321/api/show/watchlist"
		: "https://seritracker.vlorente.dev/api/show/watchlist"

	const urlWatching: string = import.meta.env.DEV
		? "http://localhost:4321/api/show/watching"
		: "https://seritracker.vlorente.dev/api/show/watching"

	const fetchData = async () => {
		await fetch(url)
			.then((res) => res.json())
			.then(async (data: AnimeResponse) => {
				if (logged) {
					const resWatchlist = await fetch(urlWatchlist, requestOptions)
					const resWatching = await fetch(urlWatching, requestOptions)
					const watching: AnimeData[] = await resWatching.json()
					const watchingIds = watching.map((item) => item.mal_id)

					const watchlist: AnimeData[] = await resWatchlist.json()
					const watchlistIds = watchlist.map((item) => item.mal_id)
					if (logged && data) {
						data.data.forEach((item) => {
							item.watching = watchingIds.includes(item.mal_id)
							item.watchlist = watchlistIds.includes(item.mal_id)
						})
					}
				}
				setData(data)
			})
			.catch((err) => {
				setError(err)
				setLoading(false)
			})
			.finally(() => setLoading(false))
	}

	useEffect(() => {
		setLoading(true)
		fetchData()
	}, [orderBy, sort, search, page])

	return { data, error, loading }
}
