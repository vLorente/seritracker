interface SortSwapProps {
	onSwap: (sortValue: "asc" | "desc") => void
	className?: string
}

export default function SortSwap({ onSwap, className }: SortSwapProps) {
	const combinedClasName = `swap swap-rotate rounded-3xl ${className}`

	const handleToggle = (e: any) => {
		if (e.target.checked) {
			onSwap("desc")
		} else {
			onSwap("asc")
		}
	}

	return (
		<label className={combinedClasName}>
			{/* this hidden checkbox controls the state */}
			<input
				data-testid="checkbox"
				onClick={handleToggle}
				className="hidden"
				type="checkbox"
			/>

			{/* arrow down */}
			<svg
				data-testid="arrowDown"
				xmlns="http://www.w3.org/2000/svg"
				className="swap-on h-10 w-10 fill-current"
				viewBox="0 0 512 512"
				alt="Descendente"
			>
				<path
					fill="none"
					stroke="currentColor"
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="48"
					d="m112 268 144 144 144-144M256 392V100"
				/>
			</svg>

			{/* arrow up */}
			<svg
				data-testid="arrowUp"
				xmlns="http://www.w3.org/2000/svg"
				className="swap-off h-10 w-10 fill-current"
				viewBox="0 0 512 512"
				alt="Ascendente"
			>
				<path
					fill="none"
					stroke="currentColor"
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="48"
					d="M112 244l144-144 144 144M256 120v292"
				/>
			</svg>
		</label>
	)
}
