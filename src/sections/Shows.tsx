import Card from "@components/Card"
import Loading from "@components/Loading"
import OrderBySelector from "@components/OrderBySelector"
import Pagination from "@components/Pagination"
import SearchBar from "@components/SearchBar"
import SortSwap from "@components/SortSwap"
import useFetchJikan from "@hooks/useFetchJikan"
import { OrderByEnum } from "@interfaces/animeQuery"
import type { AnimeDataCard } from "@interfaces/animeResponse"
import { useState } from "preact/hooks"

export default function Shows() {
	const [orderBy, setOrderBySel] = useState(OrderByEnum.Popularity)
	const [sort, setSort] = useState<"asc" | "desc">("asc")
	const [search, setSearch] = useState<string>("")
	const [page, setPage] = useState<number>(1)
	// TODO Handle Error
	const { data, loading } = useFetchJikan(orderBy, sort, search, page)

	const handleOrderBySelectChange = (selectedValue: OrderByEnum) => {
		setOrderBySel(selectedValue)
		setPage(1)
	}

	const handleOrderBySwapChange = (swapValue: "desc" | "asc") => {
		setSort(swapValue)
		setPage(1)
	}

	const handleSearchChange = (searchValue: string) => {
		setSearch(searchValue)
		setPage(1)
	}

	const handlePage = (pageValue: number) => {
		setPage(pageValue)
	}

	return (
		<section className="max-w-8xl mx-auto px-5 py-20 md:px-20">
			<header className="mb-4 flex flex-col items-end justify-between gap-1 sm:flex-row">
				<SearchBar initialKeyword={search} onSearch={handleSearchChange} />
				<div>
					<label htmlFor="order" className="font-medium">
						Ordenar
					</label>
					<div id="order" className="flex flex-row">
						<OrderBySelector onSelect={handleOrderBySelectChange} />
						<SortSwap
							className="text-lime-600 hover:text-lime-800"
							onSwap={handleOrderBySwapChange}
						/>
					</div>
				</div>
			</header>
			{/* Shows Grid */}
			<body>
				<div className="grid content-start gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
					{data && data.data.map((item: AnimeDataCard) => <Card show={item} />)}
				</div>
				{loading && (
					<div className="flex h-20 items-center justify-center">
						<Loading className="bg-lime-600" />
						<p className="text-lg text-gray-600">Cargando series...</p>
					</div>
				)}
			</body>
			{/* Pagination */}
			<footer className="flex items-center justify-center pt-4">
				{!loading && (
					<Pagination
						page={data?.pagination.current_page || 0}
						hasNext={data?.pagination.has_next_page || false}
						onPageChange={handlePage}
					/>
				)}
			</footer>
		</section>
	)
}
