export default function mapList(data) {
	const list = []
	Object.keys(data).forEach(key => {
		list.push(data[key])
	})
	return list
}
