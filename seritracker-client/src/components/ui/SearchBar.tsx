import useDebounce from "@hooks/useDebounce.ts"
import useKey from "@hooks/useKey"
import { useEffect, useRef, useState } from "preact/hooks"

interface SearchBarProps {
	className?: string
	initialKeyword?: string
	onSearch: (search: string) => void
}

export default function SearchBar({
	initialKeyword = "",
	onSearch,
	className = "",
}: SearchBarProps) {
	const [searchValue, setSearchValue] = useState(initialKeyword)
	const debouncedSearch = useDebounce(searchValue)

	const combinedClassName = `input input-bordered flex items-center gap-2 border-lime-600 hover:contrast-[110%] ${className}`

	// Invocamos onSearch con el último valor actualizado de searchValue
	useEffect(() => {
		onSearch(debouncedSearch)
	}, [debouncedSearch])

	const handleOnChange = (event: any) => {
		const value = event.currentTarget.value
		setSearchValue(value)
	}

	// Manejar el evento de teclado # + K para hacer focus en el Input
	const type = "keypress"
	const event = new KeyboardEvent(type, {
		key: "k",
		code: "KeyK",
		ctrlKey: false,
		altKey: false,
		shiftKey: true,
		metaKey: false,
	})

	const inputRef = useRef<HTMLInputElement>(null)

	const handleKeyPress = () => {
		inputRef?.current?.focus()
	}

	useKey(type, event, handleKeyPress)

	return (
		<label className={combinedClassName}>
			<input
				id="searchbar-input"
				ref={inputRef}
				type="search"
				className="md: input-ghost w-full grow border-none"
				placeholder="Buscar"
				value={searchValue}
				onInput={handleOnChange}
			/>
			<kbd className="kbd kbd-sm text-lime-600">Shift</kbd>
			<kbd className="kbd kbd-sm text-lime-600">K</kbd>
		</label>
	)
}
