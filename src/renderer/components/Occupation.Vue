<template>
	<race-job :jobli="job" :cur="cur" :curHero="curHero" :curJob="curJob" :curHeroList="curHeroList" @change-cur="changeCur" key="job" />
</template>

<script>
import { tftjob_list, tftheroesdata_list } from '../save.js'
import mapList from '../util/mapList.js'
import RaceJob from './race/RaceJob.vue'
import { job } from '../util/racejob.js'
export default {
	name: 'occupation_com',
	data() {
		return {
			jobList_: tftjob_list,
			heroList: tftheroesdata_list,
			cur: 0,
			curHero: 0,
			job
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
				if (heroList[i].job === id) {
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
