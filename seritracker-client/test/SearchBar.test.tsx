import SearchBar from "@components/ui/SearchBar"
import { fireEvent, render, screen } from "@testing-library/preact"
import { expect, test, vi } from "vitest"

const setup = (mockOnSearch: (value: any) => void) => {
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

test("Should have input field with placeholde 'Buscar'", () => {
	const { input } = setup(mockOnSearch)

	expect(input).toBeDefined()
	expect(searchValue).toBe("")
})

test("SearchBar invokes onSearch with debounced value", async () => {
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
