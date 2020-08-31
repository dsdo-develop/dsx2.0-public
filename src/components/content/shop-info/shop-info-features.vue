<template lang="pug">
v-list
	v-subheader.mt-3.px-5.text-subtitle-2.primary--text(style="flex: 1 1; height: 25px") Особенности

	//- Особености - Золотые слитки
	v-list-item.mb-2(v-if="shop.features.gold || true" dense )
		v-list-item-icon.pl-1.mr-4
			v-icon( color="success" ) $goldBar
		v-list-item-content
			v-list-item-title.text-body-2 {{ $t('HOME.ЗОЛОТО') }}

	//- Особености - Вооруженная охрана
	v-list-item.mb-2(v-if="shop.features.guard || true" dense )
		v-list-item-icon.pl-1.mr-4
			v-icon( color="success" ) $shield
		v-list-item-content
			v-list-item-title.text-body-2 {{ $t('HOME.ОХРАНА') }}

	//- Особености - Вооруженная охрана
	v-list-item(v-if="shop.features.wholesale || true" dense )
		v-list-item-icon.pl-1.mr-4
			v-icon( color="success" ) $wholesale
		v-list-item-content
			v-list-item-title.text-body-2 {{ $t('HOME.ОПТ') }}

</template>

<script>
import { defineComponent } from "@nuxtjs/composition-api"

export default defineComponent ({
	props: ['shop']
})
</script>

<style lang="sass">

</style>
