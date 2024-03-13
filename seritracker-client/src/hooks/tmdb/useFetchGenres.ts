export default function useFetchGenres() {
	const options = {
		method: "GET",
		headers: {
			accept: "application/json",
			Authorization: `Bearer ${process.env.TMDB_APITOKEN}`,
		},
	}

	fetch("https://api.themoviedb.org/3/genre/tv/list?language=es", options)
		.then((response) => response.json())
		.then((response) => console.log(response))
		.catch((err) => console.error(err))
}
