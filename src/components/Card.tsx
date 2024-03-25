import type { AnimeData } from "@interfaces/animeResponse"
import { useState } from "preact/hooks"

interface Props {
	show: AnimeData
}

export default function Card({ show }: Props) {
	const [inWatching, setInWatching] = useState(false)
	const [inWatchlist, setInWatchlist] = useState(false)

	const handleWatching = async () => {
		const requestOptions = {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				show: show,
			}),
		}

		const url: string = import.meta.env.DEV
			? "http://localhost:4321/api/show/watching"
			: "https://seritracker.vlorente.dev/api/show/watching"

		const response = await fetch(url, requestOptions)

		setInWatching(true)
		setInWatchlist(false)
	}

	const handleWatchlist = async () => {
		const requestOptions = {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				show: show,
			}),
		}

		const url: string = import.meta.env.DEV
			? "http://localhost:4321/api/show/watchlist"
			: "https://seritracker.vlorente.dev/api/show/watchlist"

		const response = await fetch(url, requestOptions)

		setInWatching(false)
		setInWatchlist(true)
	}

	return (
		// <Toast typeAlert="success" message="Correcto" className="invisible"></Toast>

		<article className="group card h-full w-full bg-gray-200 transition-all hover:scale-105 dark:bg-gray-900">
			<div className="card h-full overflow-hidden">
				<figure className="group-hover:brightness-[20%]">
					<img
						className="w-full object-cover group-hover:hidden"
						src={show.images.webp.image_url}
						alt={show.title}
					/>
				</figure>
				<div className="invisible h-0 w-0 group-hover:visible group-hover:h-full group-hover:w-auto">
					<iframe
						className="aspect-square h-full w-full object-cover"
						src={show.trailer.embed_url}
						title="YouTube video player"
						frameborder="0"
						allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture;"
						referrerpolicy="strict-origin-when-cross-origin"
					></iframe>
				</div>
				{/* <p className="invisible absolute bottom-0 left-0 right-0 px-3 text-white group-hover:visible group-hover:animate-fade-in-down">
					{show.synopsis}
				</p> */}
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
