import { OrderByEnum } from "@interfaces/animeQuery"
import type { AnimeResponse } from "@interfaces/animeResponse.ts"
import { useEffect, useState } from "preact/hooks"

const api = "https://api.jikan.moe/v4/anime"

export default function useFetchJikan(
	orderBy: OrderByEnum = OrderByEnum.Popularity
) {
	const [data, setData] = useState<AnimeResponse | null>(null)
	const [error, setError] = useState<Error | null>(null)
	const [loading, setLoading] = useState(false)

	const queryParams = new URLSearchParams({
		order_by: orderBy,
	})

	const url = `${api}?${queryParams.toString()}`

	const fetchData = async () => {
		await fetch(url)
			.then((res) => res.json())
			.then((data: AnimeResponse) => {
				setData(data)
			})
			.catch((err) => setError(err))
			.finally(() => setLoading(false))
	}

	useEffect(() => {
		setLoading(true)
		fetchData()
	}, [orderBy])

	return { data, error, loading }
}
