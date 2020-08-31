<template lang="pug">
v-list.py-0(
	dark
)
	template( v-for="item in menuItems" )
		v-list-item.navigation-menu(
			:to="item.to"
		)
			v-list-item-icon.mr-4.mr-md-0.mr-lg-4.my-3
				v-icon {{ item.icon }}
			v-list-item-content
				v-list-item-title.text-body-2 {{ item.title }}

</template>

<script>
export default {

	setup (props, { root: { $options: { i18n } } }) {

		//- Список пунктов меню
		const menuItems = [
			{
				title: "Forge Viewer",
				to: "/viewer",
				icon: "$shopLists"
			},
			{
				title: "Пункт меню",
				to: "/",
				icon: "$ratesDynamics"
			},
			{
				title: "Пункт меню",
				to: "/",
				icon: "$ratesArchive"
			},
			{
				title: "Пункт меню",
				to: "/",
				icon: "$calculator"
			},
			{
				title: "Пункт меню",
				to: "/",
				icon: "$shopsMap"
			},
			{
				title: "Пункт меню",
				to: "/",
				icon: "$info"
			},
		]

		return { menuItems, }
	},
}
</script>

<style lang="sass">
.theme--dark.navigation-menu.v-list-item:not(.v-list-item--active):not(.v-list-item--disabled)
	color: rgba(255,255,255,.6)!important
.theme--dark.navigation-menu.v-list-item--active:hover::before,
.theme--dark.navigation-menu.v-list-item--active::before
	opacity: 0.1
.navigation-menu.v-list-item--active
	border-left: 2px solid var(--v-success-base)
	padding-left: 14px !important
</style>
