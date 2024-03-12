import Card from "@components/ui/Card.tsx"
import useFetchMal from "@hooks/useFetchMal.ts"

export default function Shows() {
	const { data, error, loading } = useFetchMal()

	return (
		<section className="max-w-8xl mx-auto px-5 py-20 md:px-20">
			<div class="grid content-start gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
				{data &&
					data!.data.map(({ title, synopsis, images }) => (
						<Card
							title={title}
							description={synopsis}
							image={images.webp.large_image_url}
						/>
					))}
				{loading && (
					<>
						<div className="flex w-52 flex-col gap-4">
							<div className="skeleton h-32 w-full"></div>
							<div className="skeleton h-4 w-28"></div>
							<div className="skeleton h-4 w-full"></div>
							<div className="skeleton h-4 w-full"></div>
						</div>
					</>
				)}
			</div>
		</section>
	)
}
