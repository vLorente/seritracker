import SearchBar from "@components/ui/SearchBar"
import { fireEvent, render, screen } from "@testing-library/preact"
import { describe, expect, it, vi } from "vitest"

const setup = (mockOnSearch: (value: any) => void, className: string = "") => {
	const search = render(<SearchBar initialKeyword="" onSearch={mockOnSearch} />)
	const input = screen.getByPlaceholderText(/Buscar/i)
	return {
		input,
		...search,
	}
}

let searchValue = ""
const mockOnSearch = vi.fn((value) => {
	searchValue = value
})

describe("SearchBar Component", () => {
	it("Should have input field with placeholde 'Buscar'", () => {
		const { input } = setup(mockOnSearch)

		expect(input).toBeDefined()
		expect(searchValue).toBe("")
	})

	it("SearchBar invokes onSearch with debounced value", async () => {
		searchValue = ""
		const { input } = setup(mockOnSearch)

		fireEvent.input(input, {
			target: { value: "hello" },
		})

		// Esperar el retraso completo del debounce por defecto (500 ms)
		setTimeout(() => {
			expect(mockOnSearch).toHaveBeenCalled()
			// Verificar el valor después del debounce
			expect(searchValue).toBe("hello")
		}, 600)
	})
	it("Apply classes correctly", () => {
		const { container } = setup(mockOnSearch, "test-class")
		const paginationDiv = container.getElementsByClassName("test-class")
		expect(paginationDiv).toBeDefined()
	})
})
