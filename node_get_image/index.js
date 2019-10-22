const request = require('request')
const fs = require('fs')
const path = require('path')

const quipmentUrl = 'https://lol.qq.com/act/AutoCMS/publish/LOLAct/TFTequipment/TFTequipment.js'
const jobUrl = 'https://lol.qq.com/act/AutoCMS/publish/LOLAct/TFTjob/TFTjob.js'
const raceUrl = 'https://lol.qq.com/act/AutoCMS/publish/LOLAct/TFTrace/TFTrace.js'
const heroUrl = 'https://lol.qq.com/act/AutoCMS/publish/LOLAct/TFTHeroesData/TFTHeroesData.js'

const quipmentImgUrl = 'https://game.gtimg.cn/images/lol/tft/items/'
const heroImgUrl = 'https://game.gtimg.cn/images/lol/tft/cham-icons/'

const window = {}

const getList = url => {
	return new Promise((resolve, reject) => {
		request({
			url: url
		}).on('response', res => {
			let chunks = []
			res.on('data', function(chunk) {
				chunks = chunks.concat(chunk)
			})
			res.on('end', function() {
				let buf = Buffer.concat(chunks)
				// eslint-disable-next-line no-eval
				eval(buf.toString())
				resolve()
			})
		})
	})
}

Promise.all([getList(quipmentUrl), getList(jobUrl), getList(raceUrl), getList(heroUrl)]).then(res => {
	// 文件存储
	fs.writeFileSync(path.resolve(__dirname, '../src/renderer/save.js'), '')
	Object.keys(window).forEach(key => {
		SaveData(window[key], key)
	})
})

function SaveData(data, key) {
	let _data = `export let ${key.toLowerCase()} = ${JSON.stringify(data)};`
	// 存储图片
	// 装备 //game.gtimg.cn/images/lol/tft/items/1043.png
	// 英雄 //game.gtimg.cn/images/lol/tft/cham-icons/164.png
	Object.keys(data).forEach(key => {
		const item = data[key]
		if (item.equipmentId) {
			request(`${quipmentImgUrl}${item.equipmentId}.png`).pipe(fs.createWriteStream(path.resolve(__dirname, `../static/equipage/${item.equipmentId}.png`)))
		}
		if (item.heroId) {
			request(`${heroImgUrl}${item.heroId}.png`).pipe(fs.createWriteStream(path.resolve(__dirname, `../static/hero/${item.heroId}.png`)))
		}
	})

	// 存储数据
	fs.appendFile(path.resolve(__dirname, '../src/renderer/save.js'), _data)
}
