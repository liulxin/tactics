<template>
	<race-job :isRace="false" key="job" />
</template>

<script>
import RaceJob from './race/RaceJob.vue'
export default {
	name: 'occupation_com',
	components: {
		RaceJob
	}
}
</script>

<style lang="scss" scoped></style>
