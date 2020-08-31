<template lang="pug">
v-container.px-1.px-sm-4.pt-2(fluid)
	h3 THIS IS HOME PAGE

</template>

<script lang="ts">

import { defineComponent } from '@nuxtjs/composition-api'


export default defineComponent({

	head: {},

})

</script>

<style lang="sass" scoped>

.list-header
	padding-top: 90px
	position: relative
	overflow: hidden

.list-header-no
	padding-top: 0px

.list-content
	height: calc(100vh - 174px) !important
	width: calc(100% + 12px) !important

.list-content-no
	height: calc(100vh - 70px) !important

</style>





