import Loading from "@components/Loading"
import Success from "@icons/Success"
import type { AnimeDataCard } from "@interfaces/animeResponse"
import { insertWatching } from "@utils/crud/watching"
import { insertWatchlist } from "@utils/crud/watchlist"
import loginCheck from "@utils/loginCheck"
import { useState } from "preact/hooks"

interface Props {
	show: AnimeDataCard
}

export default function Card({ show }: Props) {
	const [isWatching, setIsWatching] = useState(show.watching)
	const [isWatchlist, setIsWatchlist] = useState(show.watchlist)
	const [loading, setLoading] = useState(false)
	const logged = loginCheck()

	const handleResponse = async (response: Response) => {
		if (!response.ok && response.status === 500) {
			const text = await response.text()
			if (text.includes("duplicate key")) {
				console.log(text)
			}
		}
	}

	const handleWatching = async () => {
		setLoading(true)

		const response = await insertWatching(show)

		handleResponse(response)
		setIsWatching(true)
		setIsWatchlist(false)
		setLoading(false)
	}

	const handleWatchlist = async () => {
		setLoading(true)

		const response = await insertWatchlist(show)

		handleResponse(response)
		setIsWatchlist(true)
		setIsWatching(false)
		setLoading(false)
	}

	return (
		<>
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
							allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture;"
							referrerpolicy="strict-origin-when-cross-origin"
						></iframe>
					</div>
				</div>

				<div className="card-body justify-end">
					<h2 className="card-title">{show.title}</h2>
					{logged && (
						<>
							<div className="card-actions join-horizontal justify-end">
								{!loading ? (
									<>
										<button
											onClick={handleWatching}
											className="btn bg-lime-600 text-gray-300 hover:bg-lime-800"
											disabled={isWatching}
										>
											{isWatching && <Success />}
											Viendo
										</button>
										<button
											onClick={handleWatchlist}
											className="btn btn-neutral"
											disabled={isWatchlist}
										>
											{isWatchlist && <Success />}
											Pendiente
										</button>
									</>
								) : (
									<Loading></Loading>
								)}
							</div>
						</>
					)}
				</div>
			</article>
		</>
	)
}
