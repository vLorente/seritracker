import Card from "@components/ui/Card.tsx"
import Loading from "@components/ui/Loading.tsx"
import OrderBySelector from "@components/ui/OrderBySelector.tsx"
import SortSwap from "@components/ui/SortSwap.tsx"
import useFetchJikan from "@hooks/useFetchJikan.ts"
import { OrderByEnum } from "@interfaces/animeQuery.ts"
import { useState } from "preact/hooks"

export default function Shows() {
	const [orderBy, setOrderBySel] = useState(OrderByEnum.Title)
	const [sort, setSort] = useState<"asc" | "desc">("desc")
	const { data, error, loading } = useFetchJikan(orderBy, sort)

	const handleOrderBySelectChange = (selectedValue: OrderByEnum) => {
		setOrderBySel(selectedValue)
	}

	const handleOrderBySwapChange = (swapValue: "desc" | "asc") => {
		setSort(swapValue)
	}

	return (
		<section className="max-w-8xl mx-auto px-5 py-20 md:px-20">
			<div className="mb-4 gap-1">
				<p className="font-medium">Ordenar</p>
				<div className="flex flex-row">
					<OrderBySelector onSelect={handleOrderBySelectChange} />
					<SortSwap
						className="text-lime-600 hover:text-lime-800"
						onSwap={handleOrderBySwapChange}
					/>
				</div>
			</div>
			<div className="grid content-start gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
				{data &&
					data.data.map(({ title, synopsis, images }) => (
						<Card
							title={title}
							description={synopsis}
							image={images.webp.large_image_url}
						/>
					))}
			</div>
			{loading && (
				<div className="flex h-20 items-center justify-center">
					<Loading className="bg-lime-600" />
					<p className="text-lg text-gray-600">Cargando series...</p>
				</div>
			)}
		</section>
	)
}
