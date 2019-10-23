<template>
	<div class="">
		<ul class="job_ul">
			<li v-for="(item, i) in curNmae" :key="i" :class="{ active: cur === i }" @click="changeCur(i)">
				{{ item }}
			</li>
		</ul>
		<div class="intro">
			<p class="tip">职业介绍：</p>
			<p class="int">{{ curData.introduce }}</p>
		</div>
		<div class="intro">
			<p class="tip">英雄数量：</p>
			<p class="int" v-for="level in curData.level" :key="level.name">{{ level.name }}:{{ level.describe }}</p>
		</div>
		<div class="intro heros">
			<p class="tip">相关英雄：</p>
			<div class="int clearfix" v-for="(hero, i) in curHeroList" :key="hero.heroId" @click="curHero = i">
				<img :src="hero.src" alt="" />
			</div>
			<div class="heroInfo">
				<div class="name">{{ curHeroList[curHero].hero_name }}</div>
				<div class="tips">
					<span>职业：{{ jobName[curHeroList[curHero].job - 1] }} {{ jobName[curHeroList[curHero].otherjob - 1] }}</span>
					<span>种族：{{ raceName[curHeroList[curHero].race - 1] }} {{ raceName[curHeroList[curHero].otherrace - 1] }}</span>
					<span>价格：{{ curHeroList[curHero].price }}</span>
				</div>
				<div class="des">{{ curHeroList[curHero].skill_name }}：{{ curHeroList[curHero].skill_introduce }}</div>
			</div>
		</div>
	</div>
</template>

<script>
import { tftjob_list, tftrace_list, tftheroesdata_list } from '../../save.js'
import mapList from '../../util/mapList.js'
export default {
	data() {
		return {
			raceName: [],
			jobName: [],
			cur: 0,
			curHero: 0
		}
	},
	props: {
		isRace: Boolean,
		data: Object
	},
	methods: {
		changeCur(i) {
			this.cur = i
			this.curHero = 0
		}
	},
	computed: {
		curNmae() {
			return this.isRace ? this.raceName : this.jobName
		},
		dataList() {
			let list = this.isRace ? mapList(tftrace_list) : mapList(tftjob_list)
			return list
		},
		curData() {
			return this.dataList[this.cur]
		},
		curHeroList() {
			let id = this.cur + 1
			let heroList = tftheroesdata_list
			let arr = []
			for (let i in heroList) {
				if (this.isRace && (heroList[i].race === id || heroList[i].otherrace === id)) {
					arr.push(heroList[i])
				}
				if (!this.isRace && (heroList[i].job === id || heroList[i].otherjob === id)) {
					arr.push(heroList[i])
				}
			}
			return arr.map(hero => Object.assign({}, hero, { src: `static/hero/${hero.heroId}.png` }))
		}
	},
	created() {
		this.raceName = mapList(tftrace_list).map(item => item.race_name)
		this.jobName = mapList(tftjob_list).map(item => item.job_name)
	}
}
</script>

<style lang="scss" scoped>
.job_ul {
	display: flex;
	justify-content: space-around;
	margin-top: 20px;
	li {
		color: #fff;
		cursor: pointer;
		&.active {
			color: #5ad45a;
		}
	}
}
.intro {
	padding: 10px;
	border: 1px solid #ccc;
	margin-top: 10px;
	.tip {
		color: rgb(240, 226, 226);
		font-size: 18px;
	}
	.int {
		color: rgb(250, 243, 243);
	}
}
.heros {
	color: rgb(250, 243, 243);
	.int {
		margin-right: 1px;
		margin-top: 10px;
		display: inline-block;
		width: 63px;
		height: 63px;
		position: relative;
		cursor: pointer;
		img {
			width: 100%;
		}
	}
	.heroInfo {
		span {
			margin-right: 20px;
		}
	}
}
</style>
