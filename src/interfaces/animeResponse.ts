interface Pagination {
	last_visible_page: number
	has_next_page: boolean
	current_page: number
	items: {
		count: number
		total: number
		per_page: number
	}
}

interface ImageUrls {
	image_url: string
	small_image_url: string
	large_image_url: string
}

interface WebpUrls extends ImageUrls {
	webp: ImageUrls
}

interface TrailerImages {
	image_url: string
	small_image_url: string
	medium_image_url: string
	large_image_url: string
	maximum_image_url: string
}

interface Trailer {
	youtube_id: string
	url: string
	embed_url: string
	images: TrailerImages
}

interface Title {
	type: string
	title: string
}

interface AiredDates {
	from: string
	to: string
	prop: {
		from: {
			day: number
			month: number
			year: number
		}
		to: {
			day: number
			month: number
			year: number
		}
	}
	string: string
}

interface Broadcast {
	day: string
	time: string
	timezone: string
	string: string
}

interface Producer {
	mal_id: number
	type: string
	name: string
	url: string
}

interface Licensor extends Producer {}

interface Studio extends Producer {}

interface Genre {
	mal_id: number
	type: string
	name: string
	url: string
}

interface Theme extends Genre {}

export interface AnimeData {
	mal_id: number
	url: string
	images: {
		jpg: ImageUrls
		webp: WebpUrls
	}
	trailer: Trailer
	approved: boolean
	titles: Title[]
	title: string
	title_english: string
	title_japanese: string
	title_synonyms: string[]
	type: string
	source: string
	episodes: number
	status: string
	airing: boolean
	aired: AiredDates
	duration: string
	rating: string
	score: number
	scored_by: number
	rank: number
	popularity: number
	members: number
	favorites: number
	synopsis: string
	background: string
	season: string
	year: number
	broadcast: Broadcast
	producers: Producer[]
	licensors: Licensor[]
	studios: Studio[]
	genres: Genre[]
	explicit_genres: any[] // Se desconoce la estructura exacta
	themes: Theme[]
	demographics: any[] // Se desconoce la estructura exacta
}

export interface AnimeResponse {
	pagination: Pagination
	data: AnimeData[]
}
