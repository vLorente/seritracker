interface PaginationProps {
	className?: string
	page: number
	hasNext: boolean
	onPageChange: (page: number) => void
}

export default function Pagination({
	className,
	page,
	hasNext,
	onPageChange,
}: PaginationProps) {
	const combinedClassName = `join ${className}`
	const previousButtonClassName =
		page <= 1 ? "btn join-item btn-disabled" : "btn join-item"
	const nextButtonClassName = hasNext
		? "btn join-item"
		: "btn join-item btn-disabled"

	const handleNext = (e: any) => {
		onPageChange(page + 1)
	}

	const handlePrevious = (e: any) => {
		onPageChange(page - 1)
	}

	return (
		<div className={combinedClassName}>
			<button onClick={handlePrevious} className={previousButtonClassName}>
				«
			</button>
			<label className="btn btn-disabled join-item">Página {page}</label>
			<button onClick={handleNext} className={nextButtonClassName}>
				»
			</button>
		</div>
	)
}
