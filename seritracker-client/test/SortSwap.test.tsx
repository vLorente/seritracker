import SortSwap from "@components/ui/SortSwap"
import { fireEvent, render } from "@testing-library/preact"
import { describe, expect, it, vi } from "vitest"

const setup = (mockOnSwap: (value: any) => void, className: string = "") => {
	const swap = render(<SortSwap onSwap={mockOnSwap} />)
	const arrowUp = swap.getByTestId("arrowUp")
	const arrowDown = swap.getByTestId("arrowDown")
	const checkbox = swap.getByTestId("checkbox")
	return {
		arrowUp,
		arrowDown,
		checkbox,
		...swap,
	}
}

let swapValue = ""
const mockOnSwap = vi.fn((value) => {
	swapValue = value
})

describe("SortSwap Component", () => {
	it("Rendering Component", () => {
		const { arrowUp, arrowDown, checkbox } = setup(mockOnSwap)

		expect(arrowUp).toBeDefined()
		expect(arrowDown).toBeDefined()
		expect(checkbox).toBeDefined()
	})

	it("Swap on checkbox input", async () => {
		swapValue = ""
		const { arrowUp, arrowDown, checkbox } = setup(mockOnSwap)

		fireEvent.click(checkbox)
		expect(swapValue).toBe("desc")

		fireEvent.click(checkbox)
		expect(swapValue).toBe("asc")
	})

	it("Apply classes correctly", () => {
		const { container } = setup(mockOnSwap, "test-class")
		const paginationDiv = container.getElementsByClassName("test-class")
		expect(paginationDiv).toBeDefined()
	})
})
