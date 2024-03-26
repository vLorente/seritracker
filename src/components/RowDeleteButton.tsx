import { deleteFinished } from "@utils/crud/finished"
import { deleteWatching } from "@utils/crud/watching"
import { deleteWatchlist } from "@utils/crud/watchlist"
import { removeElement } from "@utils/removeElement"

interface Props {
	from: "watching" | "watchlist" | "finished"
	showId: number
}
export default function RowDeleteButton({ from, showId }: Props) {
	const id = `show-row-${showId}`
	const handleOnClick = async () => {
		let response: Response
		switch (from) {
			case "watchlist":
				response = await deleteWatchlist(showId)
				if (response.ok) {
					removeElement(id)
				}
				break
			case "watching":
				response = await deleteWatching(showId)
				if (response.ok) {
					removeElement(id)
				}
				break
			case "finished":
				response = await deleteFinished(showId)
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
			name="delete"
			type="submit"
			value={showId}
			className="btn btn-ghost w-1/2 bg-red-600 bg-opacity-80 text-white dark:bg-opacity-10"
			onClick={handleOnClick}
		>
			ELIMINAR
		</button>
	)
}
