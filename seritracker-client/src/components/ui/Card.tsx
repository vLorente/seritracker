interface Props {
	image: string
	title: string
	description: string
}

export default function Card({ image, title, description }: Props) {
	return (
		<article className="group card bg-gray-200 transition-all duration-300 hover:scale-105 hover:contrast-[105%] lg:w-full 2xl:h-full dark:bg-gray-900">
			<div className="card overflow-hidden text-clip">
				<figure className="group-hover:brightness-[20%]">
					<img className="w-full" src={image} alt={title} />
				</figure>
				<p className="invisible absolute bottom-0 left-0 right-0 px-3 text-white group-hover:visible group-hover:animate-fade-in-down">
					{description}
				</p>
			</div>
			<div className="card-body justify-end">
				<h2 className="card-title">{title}</h2>
				<div className="card-actions join-horizontal justify-end">
					<button className="btn bg-lime-600 text-gray-300 hover:bg-lime-800">
						Viendo
					</button>
					<button className="btn btn-neutral">Pendiente</button>
					{/* <button className="btn bg-lime-600 text-gray-300">Vista</button> */}
				</div>
			</div>

			<style></style>
		</article>
	)
}
