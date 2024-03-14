import useFetchJikan from "@hooks/useFetchJikan"
import { OrderByEnum } from "@interfaces/animeQuery"
import { renderHook } from "@testing-library/preact"
import { expect, test } from "vitest"

test("useFetchJikan fetches data correctly", async () => {
	const { result } = renderHook(() =>
		useFetchJikan(OrderByEnum.Rank, "asc", "naruto", 1)
	)

	// Esperar un breve período de tiempo antes de evaluar el resultado
	await new Promise((resolve) => setTimeout(resolve, 1000))

	expect(result.current.loading).toBe(false)
	expect(result.current.error).toBe(null)
	expect(result.current.data).not.toBe(null)
	expect(result.current.data).toHaveProperty("data")
	expect(result.current.data!.data.length).toBeGreaterThan(0)
})
