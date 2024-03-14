import useDebounce from "@hooks/useDebounce"
import { renderHook } from "@testing-library/preact"
import { expect, test } from "vitest"

test("Use Debounce delay 1000 milis", () => {
	const { result, rerender } = renderHook(() => useDebounce("hello", 1000))

	expect(result.current).toBe("hello")

	// Si necesitas probar el debounce, puedes hacerlo de la siguiente manera:
	// Cambiar el valor después de un retraso menor al debounce
	setTimeout(() => {
		rerender(() => useDebounce("world", 1000))
	}, 500)

	// Asegurarse de que el valor no haya cambiado inmediatamente
	expect(result.current).toBe("hello")

	// Esperar el retraso completo del debounce
	setTimeout(() => {
		// Verificar que el valor haya cambiado después del debounce
		expect(result.current).toBe("world")
	}, 1000)
})
