import { db, User, Watching, Watchlist } from "astro:db"

const item_58179 = {
	mal_id: 58179,
	url: "https://myanimelist.net/anime/58179/Tokimeki_ni_Shinda_Koibito_yo",
	images: {
		jpg: {
			image_url: "https://cdn.myanimelist.net/images/anime/1920/141503.jpg",
			small_image_url: "https://cdn.myanimelist.net/images/anime/1920/141503t.jpg",
			large_image_url: "https://cdn.myanimelist.net/images/anime/1920/141503l.jpg",
		},
		webp: {
			image_url: "https://cdn.myanimelist.net/images/anime/1920/141503.webp",
			small_image_url:
				"https://cdn.myanimelist.net/images/anime/1920/141503t.webp",
			large_image_url:
				"https://cdn.myanimelist.net/images/anime/1920/141503l.webp",
		},
	},
	trailer: {
		youtube_id: null,
		url: null,
		embed_url: null,
		images: {
			image_url: null,
			small_image_url: null,
			medium_image_url: null,
			large_image_url: null,
			maximum_image_url: null,
		},
	},
	approved: true,
	titles: [
		{
			type: "Default",
			title: "Tokimeki ni Shinda Koibito yo",
		},
		{
			type: "Japanese",
			title: "ときめきに死んだ恋人よ",
		},
	],
	title: "Tokimeki ni Shinda Koibito yo",
	title_english: null,
	title_japanese: "ときめきに死んだ恋人よ",
	title_synonyms: [],
	type: "TV Special",
	source: "Original",
	episodes: 1,
	status: "Finished Airing",
	airing: false,
	aired: {
		from: "2013-01-02T00:00:00+00:00",
		to: null,
		prop: {
			from: {
				day: 2,
				month: 1,
				year: 2013,
			},
			to: {
				day: null,
				month: null,
				year: null,
			},
		},
		string: "Jan 2, 2013",
	},
	duration: "1 min",
	rating: "G - All Ages",
	score: null,
	scored_by: null,
	rank: 13807,
	popularity: 26438,
	members: 34,
	favorites: 0,
	synopsis: "Animation by Ryo Hirano created for the NHK TECHNE program.",
	background: null,
	season: null,
	year: null,
	broadcast: {
		day: null,
		time: null,
		timezone: null,
		string: null,
	},
	producers: [
		{
			mal_id: 111,
			type: "anime",
			name: "NHK",
			url: "https://myanimelist.net/anime/producer/111/NHK",
		},
	],
	licensors: [],
	studios: [],
	genres: [
		{
			mal_id: 37,
			type: "anime",
			name: "Supernatural",
			url: "https://myanimelist.net/anime/genre/37/Supernatural",
		},
	],
	explicit_genres: [],
	themes: [],
	demographics: [],
}

const item_58178 = {
	mal_id: 58178,
	url: "https://myanimelist.net/anime/58178/Krasue",
	images: {
		jpg: {
			image_url: "https://cdn.myanimelist.net/images/anime/1834/141601.jpg",
			small_image_url: "https://cdn.myanimelist.net/images/anime/1834/141601t.jpg",
			large_image_url: "https://cdn.myanimelist.net/images/anime/1834/141601l.jpg",
		},
		webp: {
			image_url: "https://cdn.myanimelist.net/images/anime/1834/141601.webp",
			small_image_url:
				"https://cdn.myanimelist.net/images/anime/1834/141601t.webp",
			large_image_url:
				"https://cdn.myanimelist.net/images/anime/1834/141601l.webp",
		},
	},
	trailer: {
		youtube_id: null,
		url: null,
		embed_url: null,
		images: {
			image_url: null,
			small_image_url: null,
			medium_image_url: null,
			large_image_url: null,
			maximum_image_url: null,
		},
	},
	approved: true,
	titles: [
		{
			type: "Default",
			title: "Krasue",
		},
		{
			type: "Japanese",
			title: "ガスー",
		},
	],
	title: "Krasue",
	title_english: null,
	title_japanese: "ガスー",
	title_synonyms: [],
	type: "Movie",
	source: "Original",
	episodes: 1,
	status: "Finished Airing",
	airing: false,
	aired: {
		from: "2021-01-01T00:00:00+00:00",
		to: null,
		prop: {
			from: {
				day: 1,
				month: 1,
				year: 2021,
			},
			to: {
				day: null,
				month: null,
				year: null,
			},
		},
		string: "2021",
	},
	duration: "12 min",
	rating: "R - 17+ (violence & profanity)",
	score: null,
	scored_by: null,
	rank: 18241,
	popularity: 26436,
	members: 34,
	favorites: 0,
	synopsis: "In a town of South-East Asia, at ",
	background: null,
	season: null,
	year: null,
	broadcast: {
		day: null,
		time: null,
		timezone: null,
		string: null,
	},
	producers: [],
	licensors: [],
	studios: [],
	genres: [
		{
			mal_id: 1,
			type: "anime",
			name: "Action",
			url: "https://myanimelist.net/anime/genre/1/Action",
		},
		{
			mal_id: 14,
			type: "anime",
			name: "Horror",
			url: "https://myanimelist.net/anime/genre/14/Horror",
		},
	],
	explicit_genres: [],
	themes: [],
	demographics: [],
}

// https://astro.build/db/seed
export default async function seed() {
	await db.insert(User).values([{ id: 1, name: "Valentín Lorente" }])
	await db
		.insert(Watchlist)
		.values([{ userId: 1, malId: 58179, malItem: item_58179 }])
	await db
		.insert(Watching)
		.values([{ userId: 1, malId: 58178, malItem: item_58178 }])
}
