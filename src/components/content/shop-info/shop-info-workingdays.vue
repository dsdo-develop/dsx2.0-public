<template lang="pug">
v-list.pb-0
	v-subheader.mt-2.mb-3.px-5.text-subtitle-2.primary--text(style="flex: 1 1; height: 25px") График работы

	v-list-item.mb-1.px-0.mx-4.rounded(
		v-for="(day, dayOfWeek) in shop.workingdays" :key="day.day"
		:class="{ 'day-of-week': dayOfWeek==todayDayOfWeek }"
		style="min-height: 30px!important"
		dense
	)
		v-list-item-icon.my-0.mr-3
			v-sheet.text-subtitle-1.rounded.text-center(
				:class="day.active ? 'primary' : 'error'"
				width="40" height="30" dark
			) {{ day.day }}:
		v-list-item-content.py-0
			v-list-item-title.text-body-2(v-if="day.active" )
				span с {{ day.from.slice(0,-2) }}
				sup.text-overline(style="top: -0.4em") {{ day.from.slice(-2) }}
				span.ml-2 до {{ day.till.slice(0,-2) }}
				sup.text-overline(style="top: -0.4em") {{ day.till.slice(-2) }}

			v-list-item-title.text-body-2(v-else) Выходной

</template>

<script lang="ts">
import { defineComponent, SetupContext } from "@nuxtjs/composition-api"

export default defineComponent ({
	props: ['shop'],
	setup (props: any, context: SetupContext) {
		// todayDayOfWeek
		let todayDayOfWeek = (new Date()).getDay() - 1
		if (todayDayOfWeek==-1) todayDayOfWeek = 6
		return { todayDayOfWeek }
	}
})
</script>

<style lang="sass" scoped>
.day-of-week
	background-color: var(--v-secondary-base)
	border: 1px solid var(--v-secondary-darken1)
</style>
