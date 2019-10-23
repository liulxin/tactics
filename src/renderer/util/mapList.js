export default function mapList(data) {
	const list = []
	// 默认 0 - 10 排序
	Object.keys(data).forEach(key => {
		list.push(data[key])
	})
	return list
}
