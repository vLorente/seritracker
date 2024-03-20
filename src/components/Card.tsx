import type { AnimeData } from "@interfaces/animeResponse"
import { useState } from "preact/hooks"

interface Props {
	show: AnimeData
}

export default function Card({ show }: Props) {
	const [inWatching, setInWatching] = useState(false)
	const [inWatchlist, setInWatchlist] = useState(false)

	const handleWatching = async () => {
		console.log("Handle Watching")
		// const check = await db
		// 	.select()
		// 	.from(WatchlistDB)
		// 	.where(eq(WatchlistDB.malId, show.mal_id))
		// if (check) {
		// 	db.delete(WatchlistDB).where(eq(WatchlistDB.malId, show.mal_id))
		// }
		// await db.insert(WatchingDB).values({
		// 	userId: 1, // TODO Login user
		// 	malId: show.mal_id,
		// 	malItem: show,
		// })
		setInWatching(true)
		setInWatchlist(false)
	}

	const handleWatchlist = async () => {
		console.log("Handle Watchlist")
		// await db.insert(WatchlistDB).values({
		// 	userId: 1, // TODO Login user
		// 	malId: show.mal_id,
		// 	malItem: show,
		// })
		setInWatching(false)
		setInWatchlist(true)
	}

	return (
		<article className="group card bg-gray-200 transition-all duration-300 hover:scale-105 hover:contrast-[105%] lg:w-full 2xl:h-full dark:bg-gray-900">
			<div className="card overflow-hidden text-clip">
				<figure className="group-hover:brightness-[20%]">
					<img
						className="w-full"
						src={show.images.webp.image_url}
						alt={show.title}
					/>
				</figure>
				<p className="invisible absolute bottom-0 left-0 right-0 px-3 text-white group-hover:visible group-hover:animate-fade-in-down">
					{show.synopsis}
				</p>
			</div>
			<div className="card-body justify-end">
				<h2 className="card-title">{show.title}</h2>
				<div className="card-actions join-horizontal justify-end">
					<button
						onClick={handleWatching}
						className="btn bg-lime-600 text-gray-300 hover:bg-lime-800"
					>
						Viendo
					</button>
					<button onClick={handleWatchlist} className="btn btn-neutral">
						Pendiente
					</button>
				</div>
			</div>
		</article>
	)
}
