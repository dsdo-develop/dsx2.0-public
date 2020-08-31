<template lang="pug">
div(
	v-if="!!userToken"
)
	v-list-item.mt-n2.px-2(dark)
		v-list-item-avatar.mr-5.mr-md-0.mr-lg-5
			v-icon(size="36") $profile
		v-list-item-content
			v-list-item-title.text-subtitle-2 ИП "Лидер валют"
			v-list-item-subtitle.text-caption баланс: 25600 тенге

	div.rounded.mx-1.mt-2(
		style="background-color: rgba(245, 246, 250, .1)"
	)
		v-list.py-0(dense dark)
			//- link DASHBOARD
			v-list-item.px-3(@click="$router.push('/dashboard')")
				v-list-item-icon.mr-2.mr-md-0.mr-lg-2
					v-icon $dashboard
				v-list-item-title.text-caption Личный кабинет

			v-divider.white.mx-3(style="opacity: .3")

			//- link BALANCE
			v-list-item.px-3(@click="")
				v-list-item-icon.mr-2.mr-md-0.mr-lg-2
					v-icon $wallet
				v-list-item-title.text-caption Пополнить баланс

			v-divider.white.mx-3(style="opacity: .3")

			//- link LOGOUT
			v-list-item.px-3(@click="$store.dispatch('logoffUser')")
				v-list-item-icon.mr-2.mr-md-0.mr-lg-2
					v-icon $logout
				v-list-item-title.text-caption Выход

div.px-4.px-md-2.px-lg-4(v-else)
	v-btn.text-uppercase.text-button(
		@click="$eventHub.$emit('LoginDialog_SHOW')"
		rounded color="success" elevation="0"
		:block="!$vuetify.breakpoint.mdOnly"
		:large="!$vuetify.breakpoint.mdOnly"
		:fab="$vuetify.breakpoint.mdOnly"
		:small="$vuetify.breakpoint.mdOnly"
		min-width="36"
	)
		v-icon.rounded-circle.ml-n6.ml-md-0.ml-lg-n3.mr-2.mr-md-0.mr-lg-2.pa-1(
			style="background: rgba(255,255,255,.2)"
			size="26"
		) mdi-plus
		span.pr-8.hidden-md-only Добавить курс

</template>

<script lang="ts">

import { SetupContext, computed, defineComponent } from "@nuxtjs/composition-api"
import { fromContext } from '../../../common/lib/proc'

export default defineComponent({
	setup (props, context: SetupContext) {
		const { $store } = fromContext(context)

		const userToken = computed(() => $store.state.userToken)

		return { userToken, }
	}
})
</script>

<style lang="sass">

</style>
