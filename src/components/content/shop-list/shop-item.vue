<template lang="pug">
//- Строка обменника
//- :color="hover ? 'secondary' : ''"
v-hover(v-slot:default="{ hover }")
	v-card.pr-3.pt-3.pt-sm-0(
		@click="$router.push({ name: 'shop', params: { shopId: shop.id } })"
		:color="hover ? 'secondary' : ''"
		tile
		elevation="0"
	)
		v-row.mx-1.align-center(
			style="min-height:67px"
		)
			v-sheet.ml-n1.my-3.rounded(
				width="3"
				:class="shopIsOpen ? 'success' : 'error'"
				:style="openShopStyle"
			)
			v-col.pl-4.py-0( cols="9" sm="4" md="3" style="style")
				div.text-body-2.text-no-wrap(
					style="overflow: hidden; text-overflow: ellipsis;"
				) {{ shop.name }}
				div.text-caption.text--secondary {{ shop.street }} {{ shop.house }}
				div.text-caption.warning--text(v-if="shop.features.wholesale") {{ $t('HOME.ОПТОВЫЕ_ЦЕНЫ') }}

			v-col.px-0.py-0(cols="3" sm="2" md="1")
				v-tooltip(top :color="statusColor(shop.extra.status)")
					template(v-slot:activator="{ on }" )
						div(v-on="on")
							div.text-caption
								v-icon.mr-1(:color="statusColor(shop.extra.status)" size="9") $dot
								span {{ shop.extra.tm }}

							div.text-caption {{ shop.extra.dt }}

					//- Текст всплывающей подсказки
					span(v-if="shop.extra.status == 'live'") {{ $t('HOME.КУРС_АКТУАЛЬНЫЙ') }}
					span(v-if="shop.extra.status == 'actual'") {{ $t('HOME.КУРС_НЕ_ОБНОВЛЯЛСЯ') }}
					span(v-if="shop.extra.status == 'expired'") {{ $t('HOME.КУРС_УСТАРЕЛ') }}

			v-divider.my-4.hidden-xs-only(
				style="margin-left: -1px"
				vertical
			)

			template( v-for="( currency, index ) in cols" )
				v-col.px-2.py-0.text-center(
					:class="colsClasses[index]"
					cols="6" sm="3" lg="2"
				)
					template(v-for="operation in ['buy', 'sell']")

						//- Курс (выгодный)
						div.currency-cell(
							v-if="isBestOffer(currency, operation)"
							:class="operation=='buy' ? 'text-right pr-3' : 'text-left pl-3'"
						)
							v-tooltip(top)
								template(v-slot:activator="{ on }" )
									span.text-body-1.primary--text.text-decoration-underline(
										v-on="on"
									) {{ shop.rates[currency.name][operation] }}
								span {{ $t('HOME.ЛУЧШЕЕ_ПРЕДЛОЖЕНИЕ') }}

						//- Курс (обычный)
						span.currency-cell.text-body-1(
							v-else-if="shop.rates[currency.name] && shop.rates[currency.name][operation]"
							:class="operation=='buy' ? 'text-right pr-3' : 'text-left pl-3'"
						) {{ shop.rates[currency.name][operation] }}

						//- Курс (закрыт)
						span.currency-cell(
							v-else
							:class="operation=='buy' ? 'text-right pr-3' : 'text-left pl-3'"
						)
							v-icon.mx-3.text--disabled( small ) $lock

						//- Разделитель
						span.mx-n1(v-if="operation=='buy'") -

				v-divider.my-4.hidden-xs-only(
					style="margin-left: -1px"
					vertical
				)


			v-col.px-2.py-0( cols="6" sm="3" md="2" )
				ShopActions( :shop="shop" )

		v-divider.mt-3.mt-sm-0

</template>

<script lang="ts">

import useLogic from "../../../common/logic/shop-item.logic"
import { defineComponent, ref } from "@nuxtjs/composition-api"
import { phoneStr, fromContext } from "../../../common/lib/proc"
import { TShopOperation } from "../../../common/types/shops.types"

export default defineComponent({

	props: ["shop", "colsClasses", "cols", "bestRates"],

	setup(props: any, context) {

		// Данные + Логика
		const { isBestOffer, shopIsOpen } = useLogic(props, context)

		// Оформление
		const openShopStyle = {
			alignSelf: "stretch",
			borderWidth: "1px",
			borderStyle: "solid",
			minHeight: "26px",
		}

		// Kласс для статуса
		function statusColor(status: string) {
			return status=="live" ? "success" : status=="actual" ? "warning" : "error"
		}

		return {
			statusColor,
			//Стиль индикатора работы обменника
			openShopStyle,
			// форматирование телефона
			phoneStr,
			// Более выгодный курс
			isBestOffer,
			// Обменник открыт в данный момент?
			shopIsOpen,
			// enum TShopOperation
			TShopOperation,
		}
	}
})

</script>

<style lang="sass" scoped>
.currency-cell
	width: 50%
	display: inline-block
</style>
