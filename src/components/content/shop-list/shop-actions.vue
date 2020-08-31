<template lang="pug">
v-sheet.d-flex.justify-center( style="background-color:transparent;" )
	//- Режим работы 24/7 - иконка
	v-btn.px-0.mx-2.orange--text(
		v-if="shop.features['24/7']"
		min-width="36"
		text
	)
		v-icon(size="20") $roundTheClock

	//- Режим работы - кнопка
	v-hover(v-else v-slot:default="{ hover }")
		v-btn.px-0.mx-2(
			@click.stop="shopFeaturesDialog('workingdays')"
			min-width="36"
			text
			:class=" hover ? 'primary' : 'primary--text' "
		)
			v-icon.mr-n1.mb-n1(size="20") $workDays

	v-divider.my-1(vertical)

	//- Телефоны - кнопка
	v-hover(v-slot:default="{ hover }")
		v-btn.px-0.mx-2(
			@click.stop="shopFeaturesDialog('phones')"
			min-width="36"
			text
			:class=" hover ? 'primary' : 'primary--text' "
		)
			v-icon(size="20") $phones

	v-divider.my-1(vertical)

	//- Особености - кнопка
	v-hover(v-slot:default="{ hover }")
		v-btn.px-0.mx-2(
			@click.stop="shopFeaturesDialog('features')"
			min-width="36"
			text
			:class=" hover ? 'primary' : 'primary--text' "
			:disabled="noFeatures"
		)
			v-icon.mr-n1.mb-n1(size="24") $aboutUs

</template>

<script lang="ts">

import { computed, ComputedRef, SetupContext, defineComponent } from '@nuxtjs/composition-api'
import { fromContext } from '../../../common/lib/proc'

export default defineComponent({

	props: [ "shop" ],

	setup (props: any, context: SetupContext) {

		const { $eventHub } = fromContext(context)

		const noFeatures: ComputedRef<boolean>
			= computed(() => (["guard", "gold", "wholesale"]
				.every(feature => !props.shop[feature])))

		function shopFeaturesDialog (mode: string) {
			$eventHub.$emit('ShopFeaturesDialog_SHOW', props.shop, mode)
		}

		return { noFeatures, shopFeaturesDialog }

	}

})
</script>

<style lang="sass">

</style>
