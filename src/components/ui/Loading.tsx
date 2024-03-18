export default function Loading({ className }: { className?: string }) {
	const combinedClassName = `loading loading-spinner loading-lg text-success ${className || ""}`

	return <span className={combinedClassName}></span>
}
