import type { AnimeData } from "@interfaces/animeResponse"
import { insertFinished } from "@utils/crud/finished"
import { insertWatching } from "@utils/crud/watching"
import { insertWatchlist } from "@utils/crud/watchlist"
import { removeElement } from "@utils/removeElement"

interface Props {
	to: "finished" | "watching" | "watchlist"
	show: AnimeData
}
export default function RowUpdateButton({ to, show }: Props) {
	const text = to === "finished" ? "FINALIZAR" : "VIENDO"
	const id = `show-row-${show.mal_id}`

	const handleOnClick = async () => {
		let response: Response
		switch (to) {
			case "watchlist":
				response = await insertWatchlist(show)
				if (response.ok) {
					removeElement(id)
				}
				break
			case "watching":
				response = await insertWatching(show)
				if (response.ok) {
					removeElement(id)
				}
				break
			case "finished":
				response = await insertFinished(show)
				if (response.ok) {
					removeElement(id)
				}
				break
			default:
				break
		}
	}

	return (
		<button
			className="btn btn-ghost w-1/2 bg-lime-600 bg-opacity-10 text-white"
			onClick={handleOnClick}
		>
			{text}
		</button>
	)
}
