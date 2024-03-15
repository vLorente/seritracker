import { useEffect, useRef } from "preact/hooks"

export default function useKey(
	typeEvent: "keydown" | "keyup" | "keypress",
	keyEvent: KeyboardEvent,
	callback: any
) {
	const callbackRef = useRef(callback)

	const compareEvents = (
		current: KeyboardEvent,
		target: KeyboardEvent
	): boolean => {
		const result: boolean[] = []

		result.push(current.code === target.code)
		result.push(current.altKey === target.altKey)
		result.push(current.ctrlKey === target.ctrlKey)
		result.push(current.metaKey === target.metaKey)
		result.push(current.shiftKey === target.shiftKey)

		return result.every((i) => i)
	}

	useEffect(() => {
		callbackRef.current = callback
	})

	useEffect(() => {
		const handle = (event: KeyboardEvent) => {
			if (compareEvents(event, keyEvent)) {
				callbackRef.current(event)
			}
		}

		document.addEventListener(typeEvent, handle)

		return () => document.removeEventListener(typeEvent, handle)
	}, [keyEvent])
}
