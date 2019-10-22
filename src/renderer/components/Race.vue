<template>
	<race-job :jobli="race" :cur="cur" :curHero="curHero" :curJob="curJob" :curHeroList="curHeroList" @change-cur="changeCur" key="race"/>
</template>

<script>
import { tftrace_list, tftheroesdata_list } from '../save.js'
import { race } from '../util/racejob.js'
import mapList from '../util/mapList.js'
import RaceJob from './race/RaceJob.vue'
export default {
	name: 'race_com',
	data() {
		return {
			jobList_: tftrace_list,
			heroList: tftheroesdata_list,
			cur: 0,
			curHero: 0,
			race
		}
	},
	methods: {
		changeCur(i) {
			this.cur = i
			this.curHero = 0
		}
	},
	computed: {
		jobList() {
			return mapList(this.jobList_)
		},
		curJob() {
			return this.jobList[this.cur]
		},
		curHeroList() {
			let id = this.cur + 1
			let heroList = this.heroList
			let arr = []
			for (let i in heroList) {
				if (heroList[i].race === id) {
					arr.push(heroList[i])
				}
			}
			return arr.map(hero => Object.assign({}, hero, { src: `static/hero/${hero.heroId}.png` }))
		}
	},
	components: {
		RaceJob
	}
}
</script>

<style lang="scss" scoped></style>
