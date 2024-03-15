import { useState } from "preact/hooks"

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
	const [pageValue, setPage] = useState<number>(page)
	const combinedClassName = `join ${className}`
	const previousButtonClassName =
		page <= 1 ? "btn join-item btn-disabled" : "btn join-item"
	const nextButtonClassName = hasNext
		? "btn join-item"
		: "btn join-item btn-disabled"

	const handleNext = (e: any) => {
		setPage(pageValue + 1)
		onPageChange(pageValue + 1)
	}

	const handlePrevious = (e: any) => {
		setPage(pageValue - 1)
		onPageChange(pageValue - 1)
	}

	return (
		<div className={combinedClassName}>
			<button onClick={handlePrevious} className={previousButtonClassName}>
				«
			</button>
			<label className="btn btn-disabled join-item">Página {pageValue}</label>
			<button onClick={handleNext} className={nextButtonClassName}>
				»
			</button>
		</div>
	)
}
