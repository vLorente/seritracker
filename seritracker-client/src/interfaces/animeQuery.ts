export enum MediaTypeEnum {
	TV = "tv",
	Movie = "movie",
	OVA = "ova",
	Special = "special",
	ONA = "ona",
	Music = "music",
	CM = "cm",
	PV = "pv",
	TVSpecial = "tv_special",
}

export enum Rating {
	AllAges = "g",
	PG = "pg",
	PG13 = "pg13",
	R17 = "r17",
	Nudity = "r",
	Hentai = "rx",
}

export enum OrderByEnum {
	ID = "mal_id",
	Title = "title",
	StartDate = "start_date",
	EndDate = "end_date",
	Episodes = "episodes",
	Score = "score",
	Rank = "rank",
	Popularity = "popularity",
	Members = "members",
	Favorites = "favorites",
}

export interface AnimeQuery {
	page: number
	limit: number
	q: string
	type: MediaTypeEnum
	rating: Rating
	orderBy: OrderByEnum
	sort: "desc" | "asc"
}
