<template lang="pug">
v-app

	app-navigation
	app-header

	v-main
		nuxt(keep-alive :keep-alive-props="{ include: ['index'], max: 5 }")

		notifications( v-if="false" )

	dialogs

</template>

<script lang="ts">

import { defineComponent } from "@nuxtjs/composition-api"

export default defineComponent({
})
</script>
