import { watch, onBeforeUpdate, onBeforeUnmount, onUpdated, onBeforeMount, onMounted, ref, computed, SetupContext, ComputedRef, Ref } from '@nuxtjs/composition-api'
import { TShop, TCurrency, TBestRates, TCurrencyColsOptions, TShopOperation, TCurrencyCol } from '../types/shops.types'
import { fromContext } from '../lib/proc'

function compareRates (x: TShop, y: TShop, name: string, op: TShopOperation, Az: boolean): -1|0|1 {
	let value_x = ""
	let value_y = ""
	if (!Az) value_x = value_y = "999999999"
	if (x.rates && x.rates[name] && x.rates[name][op]) value_x = x.rates[name][op]
	if (y.rates && y.rates[name] && y.rates[name][op]) value_y = y.rates[name][op]
	return (value_x > value_y) ? 1 : (value_x===value_y ? 0 : -1)
}

export default function (_: any, context: SetupContext) {

	// Из контекста
	const { $set, $i18n, $v, $vuetify, $store, $eventHub, $nextTick } = fromContext(context)

	const loading: ComputedRef<boolean> = computed(() => $store.state.loading)

	// shops, currencies
	const shops: ComputedRef<Array<TShop>>
		= computed(() => $store.state.shops)
	const currencies: ComputedRef<Array<TCurrency>>
		= computed(() => $store.state.currencies)

	// Информация о лучших предложениях
	const bestRates: ComputedRef<TBestRates>
		= computed(() => {
		// инициализация
		const res: TBestRates = {}
		currencies.value.forEach((c: any) => {
			res[c.name] = { buy_value: "0", sell_value: "99999999" }
		})
		// Проход по всем обменникам
		shops.value.forEach((shop: TShop) => {
			for (let name in shop.rates) {
				if(shop.rates[name].buy && shop.rates[name].buy > res[name].buy_value)
					res[name].buy_value = shop.rates[name].buy
				if(shop.rates[name].sell && shop.rates[name].sell < res[name].sell_value)
					res[name].sell_value = shop.rates[name].sell
			}
		})
		return res
	})

	// Информация по колонкам-валютам
	const colCount =
		$vuetify.breakpoint.xsOnly ? 1 : $vuetify.breakpoint.mdAndDown ? 2 : 3
	const list3 = ["USD", "EUR", "RUB"].map(
		name => ({
			...currencies.value.find(c => c.name===name),
			buyAz: true, sellAz: false
		} as TCurrencyCol)
	)
	const cols: Ref<Array<TCurrencyCol>> = ref(list3)

	// Информация об активной колонке
	const colsOptions: Ref<TCurrencyColsOptions> = ref({
		colIndex: 0,
		operation:  TShopOperation.BUY,
		Az: false,
	})

	// Отсортированные обменники
	const sortedShops = computed(() => {

		const name = cols.value[colsOptions.value.colIndex].name
		const op   = colsOptions.value.operation
		const sortField = (op=="buy") ? "buyAz" : "sellAz"
		const Az   = cols.value[colsOptions.value.colIndex][sortField]

		const fSort = (x: TShop, y: TShop): number => {
			let res = compareRates(x, y, name, op, Az)
			if (res===0)
				res = compareRates(x, y, name, op, !Az)
			if (Az) return -1 * res
			return res
		}
		const arr = shops.value.slice().sort(fSort)
		return arr
	})

	// Метод смены валюты в столбце
	function changeCurrency (colIndex: number, newCurrency: TCurrency): void {
		const oldValue = cols.value[colIndex]
		const otherIndex = cols.value.findIndex((item, index) => (index!=colIndex && item.name==newCurrency.name))
		const newValue: TCurrencyCol =
			otherIndex>=0 ? { ...cols.value[otherIndex] }:
			{ ...newCurrency, buyAz: true, sellAz: false }
		$set(cols.value, colIndex, newValue)
		if (otherIndex>=0) $set(cols.value, otherIndex, { ...oldValue })
		// cols.value = [
		// 	{ name: "EUR", flag: "eu", text: "", digits: 0, buyAz: true, sellAz: false },
		// 	{ name: "USD", flag: "us", text: "", digits: 0, buyAz: true, sellAz: false },
		// 	{ name: "RUB", flag: "ru", text: "", digits: 0, buyAz: true, sellAz: false },
		// ]
	}

	// Сменить валюту в столбце
	function changeCurrency2 (colIndex: number, newCurrency: TCurrency): void {
		const oldName = cols.value[colIndex].name
		const oldFlag = cols.value[colIndex].flag
		cols.value[colIndex].name = newCurrency.name
		cols.value[colIndex].flag = newCurrency.flag
		const otherColIndex = cols.value.findIndex((item, index) => {
			return (index!=colIndex && item.name==newCurrency.name)
		})
		if (otherColIndex==-1) return
		cols.value[otherColIndex].name = oldName
		cols.value[otherColIndex].flag = oldFlag
	}

	// Установка новой сортировки
	function setSorting (index: number, op: TShopOperation) {
		const sortField = (op==TShopOperation.BUY) ? "buyAz" : "sellAz"
		// if (colsOptions.value.colIndex==index && colsOptions.value.operation==op) {
		// 	cols.value[index][sortField] = !cols.value[index][sortField]
		// }
		colsOptions.value.colIndex = index
		colsOptions.value.operation = op
	}

	// debug info
	let ts: any = null
	onBeforeUpdate(() => { console.log(+new Date() + 'onBeforeUpdate' , listCount.value); ts = +new Date() })
	onUpdated(() => {
		const tm = +new Date() - ts
		console.log(+new Date() + `[SHOPLIST] updated (${tm}ms)`)
	})
	onBeforeMount(() => { console.log('onBeforeMount' , listCount.value);ts = +new Date() })
	onMounted(() => {
		const tm = +new Date() - ts
		console.log(`[SHOPLIST] mounted (${tm}ms)`)
	})

	// Delay Rendering
	const listCount = ref($vuetify.breakpoint.name=="xs" ? 5 : 8)
	const benchCount = 2
	function delayRendering () {
		if (loading.value) return
		if (sortedShops.value.length==0) return
		if (listCount.value >= sortedShops.value.length) return
		listCount.value = Math.min(listCount.value + benchCount, sortedShops.value.length)
	}
	const interval = setInterval(delayRendering, 250)
	onBeforeUnmount(() => clearInterval(interval))

	// Если изменился массив shops, то ...
	watch(() => loading.value, (newVal, oldVal) => {
		console.log(+new Date() + 'watch', newVal)
		if (newVal) {
			console.log("загрузка...")
			listCount.value = 0
		}
		if (!newVal) console.log("стоп")
		//listCount.value = 0
	})

	// Нужно ли скрыть хидер?
	const noHeader = ref(false)

	// Свайп на списке
	function shopsSwiped (up: boolean) {
		if ($vuetify.breakpoint.mdAndUp) return
		noHeader.value = up
	}

	// Обе свайп-функции в одном объекте
	const swipeFunctions = {
		up: () => shopsSwiped(true),
		down: () => shopsSwiped(false),
	}

	// Данные + Логика
	return {
		sortedShops, bestRates,
		cols, colsOptions,
		changeCurrency, setSorting,
		listCount, loading, swipeFunctions, noHeader,
	}

}





