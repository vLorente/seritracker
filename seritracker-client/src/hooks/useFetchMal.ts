import type { AnimeResponse } from "@interfaces/animeResponse.ts"
import { useEffect, useState } from "preact/hooks"

const api = "https://api.jikan.moe/v4/anime"

export default function useFetchMal() {
	const [data, setData] = useState<AnimeResponse | null>(null)
	const [error, setError] = useState(null)
	const [loading, setLoading] = useState(false)

	useEffect(() => {
		setLoading(true)

		const fetchData = async () => {
			await fetch(api)
				.then((res) => res.json())
				.then((data: AnimeResponse) => {
					setData(data)
				})
				.catch((err) => setError(err))
				.finally(() => setLoading(false))
		}

		fetchData()
	}, [])

	return { data, error, loading }
}
