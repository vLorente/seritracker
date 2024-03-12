import Card from "@components/ui/Card.tsx"
import Loading from "@components/ui/Loading.tsx"
import OrderBy from "@components/ui/OrderBy.tsx"
import useFetchJikan from "@hooks/useFetchJikan"
import { OrderByEnum } from "@interfaces/animeQuery"
import { useState } from "preact/hooks"

export default function Shows() {
	const [orderBy, setOrderBy] = useState(OrderByEnum.Title)
	const { data, error, loading } = useFetchJikan(orderBy)

	const handleOrderByChange = (selectedValue: OrderByEnum) => {
		setOrderBy(selectedValue)
	}

	return (
		<section className="max-w-8xl mx-auto px-5 py-20 md:px-20">
			<div>
				<OrderBy onSelect={handleOrderByChange} />
			</div>
			<div className="grid content-start gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
				{data &&
					data!.data.map(({ title, synopsis, images }) => (
						<Card
							title={title}
							description={synopsis}
							image={images.webp.large_image_url}
						/>
					))}
			</div>
			{loading && (
				<>
					<Loading className="bg-lime-600" />
				</>
			)}
		</section>
	)
}
