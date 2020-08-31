<template lang="pug">
v-app-bar(
	app
	elevation="0"
)
	//- Гамбургер
	v-app-bar-nav-icon.hidden-md-and-up.ml-sm-1.mt-1.primary--text( @click="$eventHub.$emit('AppNavigation_TOGGLE')" )

	v-spacer.hidden-sm-and-up
	v-sheet.hidden-sm-and-up(width="140" color="transparent" )
		v-list-item.px-0.site-logo(
			@click="$router.push('/')"
			:ripple="false"
		)
			v-list-item-avatar.mr-0(tile height="24" width="24")
				v-img(alt="logo" :src="require('~/static/logo.svg')" max-width="24")
			v-list-item-content
				v-list-item-title.text-subtitle-1 LOGO

	v-spacer

	div.pr-sm-3.pr-md-6.pt-1.d-flex.align-center
		v-btn(
			@click=""
			fab x-small icon
		)
			v-icon(
				size="16"
			)  $search

		template( v-if="$vuetify.breakpoint.smAndUp" )
			v-divider.my-2.ml-1( vertical )

			v-menu( offset-y )
				//- Кнопка переключения языков
				template( v-slot:activator="{ on }" )
					v-btn.text-subtitle-1(
						v-on="on"
						small
						text
						width="60"
					)
						span RU
						v-icon.mx-0( small ) $dropdown

				//- Список доступных языков
				v-list
					v-list-item(
						v-for="lang in languages"
						:key="lang.locale"
						@click="setLanguage(lang)"
						dense
					)
						v-list-item-content
							v-list-item-title.text-subtitle-1 {{ lang.title }}

			v-divider.my-2.mr-1( vertical )

			v-btn(
				@click="toggleNightMode"
				fab x-small icon
			)
				v-icon(
					:class="nightMode ? 'warning--text':''"
					size="16"
				)  {{ nightMode ? '$sun' : '$moon' }}

		template( v-else )
			v-menu( offset-y :close-on-content-click="false" nudge-bottom="10" )
				//- Кнопка переключения языков
				template( v-slot:activator="{ on }" )
					v-btn.text-subtitle-1(
						v-on="on"
						icon small
						color="primary"
					)
						v-icon mdi-dots-vertical
				v-card
					v-expansion-panels(accordion flat tile)
						v-expansion-panel.lang-change
							v-expansion-panel-header.px-4.pt-4.pb-2.text-subtitle-1.primary--text(
								hide-actions
								style="min-height: 50px"
							) RU
							v-expansion-panel-content
								v-btn.px-3.mb-1.text-subtitle-1.text--disabled(
									@click=""
									text
									min-width="56"
								) EN
								v-btn.px-3.text-subtitle-1.text--disabled(
									@click=""
									text
									min-width="56"
								) KZ

					v-divider.mx-4
					v-btn.mx-3.my-3(
						@click="toggleNightMode"
						fab x-small icon
					)
						v-icon(
							:class="nightMode ? 'warning--text':''"
							size="16"
						)  {{ nightMode ? '$sun' : '$moon' }}




</template>

<script lang="ts">

import { ref, computed, SetupContext } from "@nuxtjs/composition-api"
import { fromContext } from '../../../common/lib/proc'

export default {

	setup (props: any, context: SetupContext) {

		const { $i18n, $store, $vuetify } = fromContext(context)
		const userToken = computed(() => $store.state.userToken)

		// night mode
		const nightMode = ref($vuetify.theme.dark)
		function toggleNightMode() {
			nightMode.value = !nightMode.value
			$vuetify.theme.dark = nightMode.value
			localStorage.nightMode = nightMode.value
		}

		// Lang
		const languages = [
			{ title: "RU", locale: "ru_RU", flag: "" },
			{ title: "EN", locale: "en_US", flag: "" },
			{ title: "KZ", locale: "kz_KZ", flag: "" },
		]

		function setLanguage (lang: any) {
			// preloader ......
			localStorage.locale = lang.locale
			window.location.reload()
		}

		return {
			userToken,

			//night mode
			nightMode, toggleNightMode,

			//lang
			languages, setLanguage
		}
	}
}
</script>

<style lang="sass">
.lang-change .v-expansion-panel-content__wrap
	padding: 0 0 6px
	width: 56px
</style>
