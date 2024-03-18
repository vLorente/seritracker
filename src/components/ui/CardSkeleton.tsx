import Loading from "@components/ui/Loading"

export default function Card() {
	return (
		<article className="group card bg-gray-200 transition-all duration-300 hover:scale-105 hover:contrast-[105%] lg:w-full 2xl:h-full dark:bg-gray-900">
			<div className="card overflow-hidden text-clip">
				<figure className="group-hover:brightness-[20%]">
					<div className="skeleton h-80 w-full"></div>
				</figure>
				<Loading />
				<p className="invisible absolute bottom-0 left-0 right-0 px-3 text-white group-hover:visible group-hover:animate-fade-in-down">
					<div className="card-title skeleton h-4 w-full"></div>
				</p>
			</div>
			<div className="card-body justify-end">
				<div className="card-title skeleton h-4 w-full"></div>
				<div className="card-actions join-horizontal justify-end">
					{/* <button className="btn bg-lime-600 text-gray-300 hover:bg-lime-800">
						Viendo
					</button>
					<button className="btn btn-neutral">Pendiente</button> */}
					{/* <button className="btn bg-lime-600 text-gray-300">Vista</button> */}
				</div>
			</div>
		</article>
	)
}
