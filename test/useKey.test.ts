import useKey from "@hooks/useKey"
import { fireEvent, renderHook } from "@testing-library/preact"
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest"

describe("useKey", () => {
	let mockCallback: any
	let addEventListenerSpy: any
	let removeEventListenerSpy: any

	beforeEach(() => {
		mockCallback = vi.fn()
		addEventListenerSpy = vi.spyOn(document, "addEventListener")
		removeEventListenerSpy = vi.spyOn(document, "removeEventListener")
	})

	afterEach(() => {
		vi.clearAllMocks()
	})

	it("registers keydown event listener", () => {
		renderHook(() =>
			useKey("keydown", new KeyboardEvent("keydown", { key: "a" }), mockCallback)
		)
		expect(addEventListenerSpy).toHaveBeenCalledWith(
			"keydown",
			expect.any(Function)
		)
	})

	it("registers keyup event listener", () => {
		renderHook(() =>
			useKey("keyup", new KeyboardEvent("keyup", { key: "a" }), mockCallback)
		)
		expect(addEventListenerSpy).toHaveBeenCalledWith(
			"keyup",
			expect.any(Function)
		)
	})

	it("registers keypress event listener", () => {
		renderHook(() =>
			useKey("keypress", new KeyboardEvent("keypress", { key: "a" }), mockCallback)
		)
		expect(addEventListenerSpy).toHaveBeenCalledWith(
			"keypress",
			expect.any(Function)
		)
	})

	it("calls callback when key event matches target event", () => {
		const { result } = renderHook(() =>
			useKey("keydown", new KeyboardEvent("keydown", { key: "a" }), mockCallback)
		)
		fireEvent.keyDown(document, { key: "a" })
		expect(mockCallback).toHaveBeenCalledTimes(1)
	})

	it("does not call callback when key event does not match target event", () => {
		const { result } = renderHook(() =>
			useKey("keydown", new KeyboardEvent("keydown", { key: "a" }), mockCallback)
		)
		fireEvent.keyDown(document, { key: "b" })
		expect(mockCallback).not.toHaveBeenCalled()
	})

	it("removes event listener when unmounting", () => {
		const { unmount } = renderHook(() =>
			useKey("keydown", new KeyboardEvent("keydown", { key: "a" }), mockCallback)
		)
		unmount()
		expect(removeEventListenerSpy).toHaveBeenCalledWith(
			"keydown",
			expect.any(Function)
		)
	})
})
