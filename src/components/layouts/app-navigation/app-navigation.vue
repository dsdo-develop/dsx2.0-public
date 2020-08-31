<template lang="pug">
v-navigation-drawer(
	v-model="appNavigationStatus"
	class="pl-0 pl-md-4"
	app	floating
	width="280"
	:mini-variant="$vuetify.breakpoint.md"
	mini-variant-width="72"
	:permanent="$vuetify.breakpoint.md"
)
	//- Logo
	template( v-slot:prepend )
		v-list-item.pt-1.pb-4.pb-lg-2.px-2.site-logo.hidden-sm-and-down(
			@click="$router.push('/')"
			:ripple="false"
		)
			v-list-item-avatar.mr-1.mr-lg-3(tile height="36" width="36")
				v-img(alt="logo" :src="require('~/static/logo.svg')" max-width="36")
			v-list-item-content
				v-list-item-title.text-h5 DS-X 2.0

	//- Navigation container
	v-sheet.gradient-to-bottom.pt-4(
		:class="{ 'rounded-t-lg': $vuetify.breakpoint.mdAndUp }"
		height="100%"
	)

		vue-scroll(
			:ops="scrollOptions"
			:style="`height: calc(100% - ${!!userToken ? '236px' : '77px'})`"
		)

			//- Меню
			v-list-item.mt-3.px-3( dark )
				v-list-item-content
					v-list-item-title.text-body-2.text-md-overline.text-lg-body-2(
						style="opacity:.3"
					) {{ $t('SIDEBAR.МЕНЮ') }}
			//- Navigation item
			v-sheet( color="transparent" )
				app-navigation-menu

</template>

<script lang="ts">

import { ref, onMounted, SetupContext, computed, defineComponent } from "@nuxtjs/composition-api"
import { fromContext, ScrollOptions } from '../../../common/lib/proc'

export default defineComponent({

	setup (props, context: SetupContext) {
		const { $store, $vuetify, $eventHub } = fromContext(context)

		const userToken = computed(() => $store.state.userToken)
		const appNavigationStatus = ref($vuetify.breakpoint.mdAndUp)
		$eventHub.$on("AppNavigation_TOGGLE", () => appNavigationStatus.value = !appNavigationStatus.value)

		// Опции для vue-скроллинга
		const scrollOptions = new ScrollOptions()

		return { appNavigationStatus, userToken, scrollOptions }
	}
})
</script>

<style lang="sass" scoped>
.gradient-to-bottom
	background: linear-gradient(to bottom, var(--v-primary-base), var(--v-accent-base))
</style>
