<template lang="pug">
v-dialog(v-model="isOpen" max-width="300" height="500"  @click:outside="closeDialog")
	v-card()
		//- Заголовок диалога
		v-card-title.pa-0
			v-list-item.px-5( style="width:100%" )
				v-list-item-content.py-5
					v-list-item-title.text-h6 {{ shop.name }}
					v-list-item-subtitle.text-body-2.mt-n2 {{ shop.street }} {{ shop.house }}
				v-list-item-action.mt-n3
					v-icon(@click="closeDialog") $close

		v-divider.mx-5

		v-card-text.px-0
			shop-info-workingdays( v-if="mode=='workingdays'" :shop="shop" )
			shop-info-phones( v-if="mode=='phones'" :shop="shop" )
			shop-info-features( v-if="mode=='features'" :shop="shop" )

</template>

<script lang="ts">

import { defineComponent } from "@nuxtjs/composition-api"
import useLogic from "../../common/logic/shop-info-dialog.logic"

export default defineComponent({

	setup: useLogic

})
</script>
