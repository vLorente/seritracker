import { useEffect, useRef, useState } from "preact/hooks"

export default function useDebounce<T>(value: T, delay: number = 500): T {
	const [debouncedValue, setDebouncedValue] = useState<T>(value)
	const debounceRef = useRef<NodeJS.Timeout>()

	useEffect(() => {
		debounceRef.current = setTimeout(() => setDebouncedValue(value), delay)

		return () => {
			clearTimeout(debounceRef.current)
		}
	}, [value, delay])

	return debouncedValue
}
