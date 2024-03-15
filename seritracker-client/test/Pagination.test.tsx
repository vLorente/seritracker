import Pagination from "@components/ui/Pagination"
import { fireEvent, render } from "@testing-library/preact"
import { describe, expect, it, vi } from "vitest"

let page = 1
const mockOnPageChange = vi.fn((value) => {
	console.log(`mock fun -> ${page} -> ${value}`)
	page = value
})

const setup = (
	hasNext: boolean,
	page: number,
	onPageChange: (value: number) => void,
	className?: string
) => {
	const pagination = render(
		<Pagination
			onPageChange={onPageChange}
			hasNext={hasNext}
			page={page}
			className={className}
		/>
	)

	const previousButton = pagination.getByText("«")
	const nextPageButton = pagination.getByText("»")
	const labelPage = pagination.getByText(/Página/i)

	return {
		labelPage,
		previousButton,
		nextPageButton,
		...pagination,
	}
}

describe("Pagination component", () => {
	it("Render correctly", () => {
		const { previousButton, nextPageButton, labelPage } = setup(
			true,
			1,
			mockOnPageChange
		)
		expect(previousButton).toBeInTheDocument()
		expect(nextPageButton).toBeInTheDocument()
		expect(labelPage).toBeInTheDocument()
	})

	it("Handle click event correctly", () => {
		const { previousButton, nextPageButton, getByText } = setup(
			true,
			1,
			mockOnPageChange
		)
		page = 1

		fireEvent.click(nextPageButton)
		expect(page).toBe(2)
		expect(getByText("Página 2")).toBeInTheDocument()

		fireEvent.click(previousButton)
		expect(page).toBe(1)
		expect(getByText("Página 1")).toBeInTheDocument()
	})

	it("Disables next button when hasNext is false", () => {
		const onPageChange = vi.fn()
		const { nextPageButton } = setup(false, 1, mockOnPageChange)

		expect(nextPageButton).toHaveClass("btn-disabled")
	})

	it("Disables previous button when its in first page", () => {
		const onPageChange = vi.fn()
		const { previousButton } = setup(true, 1, mockOnPageChange)

		expect(previousButton).toHaveClass("btn-disabled")
	})
})
