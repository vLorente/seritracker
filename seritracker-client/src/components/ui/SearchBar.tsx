import useDebounce from "@hooks/useDebounce.ts"
import { useEffect, useState } from "preact/hooks"

interface SearchBarProps {
	className?: string
	onSearch: (search: string) => void
}

export default function SearchBar({ className, onSearch }: SearchBarProps) {
	const [searchValue, setSearchValue] = useState("")
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

	return (
		<label className={combinedClassName}>
			<input
				type="text"
				className="md: input-ghost w-full grow border-none"
				placeholder="Buscar"
				value={searchValue}
				onInput={handleOnChange}
			/>
			<kbd className="kbd kbd-sm text-lime-600">Ctrl</kbd>
			<kbd className="kbd kbd-sm text-lime-600">K</kbd>
		</label>
	)
}
