<template lang="pug">
v-expansion-panels(accordion mandatory flat)
	v-subheader.mt-5.mb-2.px-5.text-subtitle-2.primary--text(style="flex: 1 1; height: 25px") Контакты
	v-expansion-panel( v-for="phone in shop.phones" :key="item" )
		v-expansion-panel-header.py-2(
			style="min-height: 42px"
		)
			template(	v-if="phone.whatsapp && phone.telegram"	)
				custom-icon.ml-n6( name="telegram" size="24" )
				custom-icon.ml-n12( name="whatsapp" size="24" )
			template( v-else )
				custom-icon.ml-n4(v-if="phone.whatsapp" name="whatsapp" size="24")
				custom-icon.ml-n4(v-if="phone.telegram" name="telegram" size="24")
				custom-icon.ml-n4(v-if="!phone.telegram && !phone.whatsapp" name="call" size="24")
			span.text-subtitle-2 {{ phoneStr(phone.phone) }}
		v-expansion-panel-content
			v-row.justify-center
				//- mobile
				v-col.px-1( cols="4"	)
					v-btn(
						:href="'tel:'+phoneStr(phone.phone)"
						large block color="primary"
					)
						div.text-center
							custom-icon( name="call" size="24" )
							div.text-overline.white--text Телефон
				//- whatsapp
				v-col.px-1( cols="4" v-if="phone.whatsapp" )
					v-btn(
						:href="'https://wa.me/'+phone.phone" target="_blank"
						large block color="primary"
					)
						div.text-center
							custom-icon( name="whatsapp" size="24" )
							div.text-overline.white--text Whatsapp
				//- telegram
				v-col.px-1( cols="4" v-if="phone.telegram"	)
					v-btn(
						:href="'https://t.me/'+phone.telegram_name" target="_blank"
						large block color="primary"
					)
						div.text-center
							custom-icon( name="telegram" size="24" )
							div.text-overline.white--text Telegram

</template>

<script lang="ts">
import { defineComponent, SetupContext } from "@nuxtjs/composition-api"
import { phoneStr } from "../../../common/lib/proc"

export default defineComponent ({
	props: ['shop'],
	setup (props: any, context: SetupContext) {

		return {
			phoneStr
		}
	}
})
</script>

<style lang="sass" scoped>
.v-expansion-panel--active
	background-color: var(--v-secondary-base) !important
	border-top: 1px solid var(--v-secondary-darken1) !important
	border-bottom: 1px solid var(--v-secondary-darken1) !important
</style>
