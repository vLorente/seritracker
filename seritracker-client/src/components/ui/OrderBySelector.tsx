import { OrderByEnum } from "@interfaces/animeQuery.ts"
import { useState } from "preact/hooks"

interface OrderByProps {
	onSelect: (selectedValue: OrderByEnum) => void
	className?: string
}

export default function OrderBySelector({ onSelect, className }: OrderByProps) {
	const [selectedValue, setSelectedValue] = useState<OrderByEnum>(
		OrderByEnum.Popularity
	)

	const selectItems = Object.keys(OrderByEnum).map((key) => {
		const value = OrderByEnum[key as keyof typeof OrderByEnum]
		return { value: value, key: key }
	})

	const combinedClassName = `select border-lime-600 w-full max-w-xs hover:contrast-[110%] ${className || ""}`

	const handleChange = (event: preact.JSX.TargetedEvent<HTMLSelectElement>) => {
		const value = event.currentTarget.value as OrderByEnum
		setSelectedValue(value)
		onSelect(value)
	}

	return (
		<select
			className={combinedClassName}
			value={selectedValue}
			onChange={handleChange}
		>
			<option disabled selected>
				Ordenar por
			</option>
			{selectItems.map(({ key, value }) => (
				<option key={key} value={value}>
					{key}
				</option>
			))}
		</select>
	)
}
