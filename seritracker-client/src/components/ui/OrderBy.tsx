import { OrderByEnum } from "@interfaces/animeQuery.ts"
import { useState } from "preact/hooks"

interface OrderByProps {
	onSelect: (selectedValue: OrderByEnum) => void
}

const OrderBy: preact.FunctionalComponent<OrderByProps> = ({ onSelect }) => {
	const [selectedValue, setSelectedValue] = useState<OrderByEnum>(
		OrderByEnum.Title
	)

	const handleChange = (event: preact.JSX.TargetedEvent<HTMLSelectElement>) => {
		const value = event.currentTarget.value as OrderByEnum
		setSelectedValue(value)
		onSelect(value)
	}

	return (
		<select value={selectedValue} onChange={handleChange}>
			{Object.values(OrderByEnum).map((value) => (
				<option key={value} value={value}>
					{value}
				</option>
			))}
		</select>
	)
}

export default OrderBy
