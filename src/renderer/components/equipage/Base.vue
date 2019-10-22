<template>
	<div>
		<span v-for="eq in base_eq" :key="eq.equipmentId">
			<img :src="eq.src" />
		</span>
	</div>
</template>

<script>
export default {
	name: 'eq_base_com',
	props: {
		base_eq: Array
	}
}
</script>

<style lang="scss" scoped>
span {
	display: inline-block;
	width: 64px;
	height: 64px;
	border-radius: 50%;
	overflow: hidden;
  font-size: 0;
  margin: 3px;
  text-align: center;
  line-height: 64px;
  img {
    width: 100%;
    height: 100%;
  }
}
</style>
