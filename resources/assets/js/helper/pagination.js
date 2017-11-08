export default function getLastPage({data, options}) {
	if (data.length < 1) return 0
	if (data.length <= options.items) return 1

	const maxPage = data.length / options.items
	const isInt = maxPage % 1 === 0

	return isInt ? parseInt(maxPage) : parseInt(maxPage) + 1
}