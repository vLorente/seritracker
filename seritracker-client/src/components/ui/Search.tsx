interface SearchProps {
	className?: string
}

export default function Search({ className }: SearchProps) {
	const combinedClassName = `input input-bordered flex items-center gap-2 border-lime-600 hover:contrast-[110%] ${className}`

	return (
		<label className={combinedClassName}>
			<input
				type="text"
				className="md: input-ghost w-full grow border-none"
				placeholder="Buscar"
			/>
			<kbd className="kbd kbd-sm text-lime-600">Ctrl</kbd>
			<kbd className="kbd kbd-sm text-lime-600">K</kbd>
		</label>
	)
}
