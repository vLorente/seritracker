interface Props {
	image: string
	title: string
	description: string
}

export default function Card({ image, title, description }: Props) {
	return (
		<article class="group card bg-gray-200 transition-all duration-300 hover:scale-105 hover:contrast-[105%] dark:bg-gray-900">
			<div class="card">
				<figure class="group-hover:brightness-[20%]">
					<img class="w-full" src={image} alt={title} />
				</figure>
				<p class="invisible absolute bottom-0 left-0 right-0 px-2 text-white group-hover:visible group-hover:animate-fade-in-down">
					{description}
				</p>
			</div>
			<div class="card-body">
				<h2 class="card-title">{title}</h2>
				<div class="card-actions justify-end">
					<button class="btn btn-active">Viendo</button>
					<button class="btn btn-neutral">Pendiente</button>
					<button class="btn btn-success text-gray-300">Vista</button>
				</div>
			</div>

			<style></style>
		</article>
	)
}
