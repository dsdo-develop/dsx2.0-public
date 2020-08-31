<template lang="pug">
div.notification
	notifications-bar()

</template>

<script lang="ts">
import { defineComponent, SetupContext } from "@nuxtjs/composition-api";


export default defineComponent({
	setup (props: any, context: SetupContext) {


		return {}
	}
})
</script>

<style lang="sass" scoped>
.notification
	z-index: 299
	position: absolute
	top: 12px
	right: 0
	margin: 0 8px
	max-width: 500px

</style>
