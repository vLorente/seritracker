import { MediaTypeEnum, OrderByEnum, Rating } from "@interfaces/animeQuery"
import type { AnimeResponse } from "@interfaces/animeResponse.ts"
import { useEffect, useState } from "preact/hooks"

export default function useFetchJikan(
	orderBy: OrderByEnum = OrderByEnum.Popularity,
	sort: "asc" | "desc",
	search: string
) {
	const api = "https://api.jikan.moe/v4/anime"
	const [data, setData] = useState<AnimeResponse | null>(null)
	const [error, setError] = useState<Error | null>(null)
	const [loading, setLoading] = useState(false)

	const defaultMediaTypes = [
		MediaTypeEnum.TV,
		// MediaTypeEnum.Movie,
		// MediaTypeEnum.ONA,
		// MediaTypeEnum.OVA,
		// MediaTypeEnum.Special,
	]

	const defaultRatings = [
		Rating.AllAges,
		Rating.PG,
		Rating.PG13,
		Rating.R17,
		// Rating.Nudity,
	]

	const queryParams = new URLSearchParams({
		order_by: orderBy,
		sort: sort,
		q: search,
	})

	defaultMediaTypes.forEach((item) => {
		queryParams.append("type", item)
	})

	// defaultRatings.forEach((item) => {
	// 	queryParams.append("rating", item)
	// })

	const url = `${api}?${queryParams.toString()}`

	const fetchData = async () => {
		await fetch(url)
			.then((res) => res.json())
			.then((data: AnimeResponse) => {
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
	}, [orderBy, sort, search])

	return { data, error, loading }
}
