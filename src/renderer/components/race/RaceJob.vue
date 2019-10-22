<template>
	<div class="">
		<ul class="job_ul">
			<li v-for="(item, i) in jobli" :key="i" :class="{ active: cur === i }" @click="changeCur(i)">
				{{ item }}
			</li>
		</ul>
		<div class="intro">
			<p class="tip">职业介绍：</p>
			<p class="int">{{ curJob.introduce }}</p>
		</div>
		<div class="intro">
			<p class="tip">英雄数量：</p>
			<p class="int" v-for="level in curJob.level" :key="level.name">{{ level.name }}:{{ level.describe }}</p>
		</div>
		<div class="intro heros">
			<p class="tip">相关英雄：</p>
			<div class="int clearfix" v-for="(hero, i) in curHeroList" :key="hero.heroId" @click="curHero = i">
				<img :src="hero.src" alt="" />
			</div>
			<div class="heroInfo">
				<div class="name">{{ curHeroList[curHero].hero_name }}</div>
				<div class="tips">
					<span>职业：{{ job[curHeroList[curHero].job - 1] }}</span>
					<span>种族：{{ race[curHeroList[curHero].race - 1] }}</span>
					<span>价格：{{ curHeroList[curHero].price }}</span>
				</div>
				<div class="des">{{ curHeroList[curHero].skill_name }}：{{ curHeroList[curHero].skill_introduce }}</div>
			</div>
		</div>
	</div>
</template>

<script>
import { job, race } from '../../util/racejob.js'
export default {
	data() {
		return {
			job,
			race
		}
	},
	props: {
		curJob: Object,
		curHeroList: Array,
		cur: Number,
		curHero: Number,
		jobli: Array
	},
	methods: {
		changeCur(i) {
			this.$emit('change-cur', i)
		}
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
