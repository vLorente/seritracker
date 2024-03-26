export function removeElementById(id: string) {
	const element = document.getElementById(id)
	element?.remove()
}
