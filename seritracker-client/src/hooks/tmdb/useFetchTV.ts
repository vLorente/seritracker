import { useEffect, useState } from "preact/hooks"

export default function useFetchTMDB() {
	const [data, setData] = useState<any>(null)
	const [error, setError] = useState<Error | null>(null)
	const [loading, setLoading] = useState(false)

	const api = import.meta.env.PUBLIC_TMDBAPI

	const queryParams = new URLSearchParams({
		// Añadir query params en caso de ser necesarios
	})

	useEffect(() => {
		const fetchData = async () => {
			await fetch(`${api}/search/tv`)
		}
	})
}
