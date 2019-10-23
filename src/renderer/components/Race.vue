<template>
	<race-job :isRace="true" key="race" />
</template>

<script>
import RaceJob from './race/RaceJob.vue'
export default {
	name: 'race_com',
	components: {
		RaceJob
	}
}
</script>

<style lang="scss" scoped></style>
