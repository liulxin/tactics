<template>
	<div class="eq">
		<base-eq class="vertical" :base_eq="base_eq" />
		<base-eq class="horizontal" :base_eq="base_eq" />
		<div class="advance_eq">
			<span v-for="(eq, i) in advance_eq_base" :key="eq.equipmentId" :title="eq.eq_effect">
				<img v-if="eq.src" :class="{ now: cur === i }" :src="eq.src" @click="changeCur(i)" />
			</span>
		</div>
		<div class="desc">
			<p class="name">{{ desc.eq_name }}</p>
			<p class="effect">{{ desc.eq_effect }}</p>
		</div>
	</div>
</template>

<script>
import { tftequipment_list } from '../save.js'
import mapList from '../util/mapList.js'
import BaseEq from './equipage/Base.vue'
export default {
	name: 'eq-com',
	data() {
		return {
			eqList: tftequipment_list,
			cur: 0
		}
	},
	methods: {
		changeCur(i) {
			this.cur = i
		}
	},
	computed: {
		base_eq() {
			return mapList(this.eqList)
				.filter(eq => !eq.eq_formula)
				.map(eq => Object.assign({}, eq, { src: `static/equipage/${eq.equipmentId}.png` }))
		},
		advance_eq() {
			return mapList(this.eqList).filter(eq => eq.eq_formula)
		},
		// 获取显示的高阶装备数组
		advance_eq_base() {
			let base = this.base_eq.map(eq => eq.equipmentId)
			let advance = this.advance_eq
			let advance_arr = []
			base.forEach((verEq, i) => {
				base.forEach((horEq, j) => {
					if (i > j) {
						advance_arr.push([])
					} else {
						advance_arr.push(
							...advance
								.filter(adv => {
									let eq_formula = adv.eq_formula
									return eq_formula === `${verEq},${horEq}` || eq_formula === `${horEq},${verEq}`
								})
								.slice(0, 1)
								.map(eq => Object.assign({}, eq, { src: `static/equipage/${eq.equipmentId}.png` }))
						)
					}
				})
			})
			return advance_arr
		},
		desc() {
			return this.advance_eq_base[this.cur]
		}
	},
	components: {
		BaseEq
	}
}
</script>

<style lang="scss" scoped>
.eq {
	position: relative;
	top: 0;
	left: 0;
	.vertical {
		position: absolute;
		top: 70px;
		left: 0;
		width: 70px;
	}
	.horizontal {
		position: absolute;
		top: 0;
		left: 70px;
		height: 70px;
	}
	.advance_eq {
		position: absolute;
		top: 70px;
		left: 70px;
		width: 630px;
		height: 666px;
		span {
			position: relative;
			top: 0;
			left: 0;
			display: inline-block;
			width: 64px;
			height: 64px;
			margin: 3px;
			img {
				width: 64px;
				height: 64px;
				cursor: pointer;
				border-radius: 4px;
				&.now {
					border: 2px solid #9f6c35;
					box-shadow: 0 0 2px rgb(184, 135, 31);
				}
			}
			.info {
				position: absolute;
				width: auto;
				top: 65px;
				left: 0;
				background: #000;
				color: #fff;
				z-index: 2;
				border: 1px solid #ccc;
				em {
					font-size: 16px;
					color: #fff;
					font-style: normal;
					font-weight: bold;
				}
			}
		}
	}
	.desc {
		position: absolute;
		left: 0;
		top: 750px;
		width: 100%;
		padding-left: 10px;
		.name {
			color: #ffec8c;
			font-size: 18px;
			font-weight: bold;
		}
		.effect {
			color: #ffefd5;
			font-size: 18px;
			line-height: 26px;
		}
	}
}
</style>
