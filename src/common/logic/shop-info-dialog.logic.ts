import { SetupContext, Ref, ref, computed } from '@nuxtjs/composition-api'
import { fromContext } from '../lib/proc'
import { TShop } from '../types/shops.types'

enum TMode {
	WORKINGDAYS="workingDays",
	FEATURES="featues",
	PHONES="phones",
}

export default function (props: any, context: SetupContext) {

	const { $i18n, $eventHub } = fromContext(context)

	// Данные
	const isOpen = ref(false)
	const shop = ref({} as TShop)
	const mode = ref("" as TMode)

	// eventHub
	$eventHub.$on("ShopFeaturesDialog_SHOW", (s: TShop, m: TMode) => {
		mode.value = m
		shop.value = s
		isOpen.value = true
	})

	// Закрыть диалог
	function closeDialog () {
		isOpen.value = false
	}

	return {
		isOpen, closeDialog, shop, mode,
	}
}
