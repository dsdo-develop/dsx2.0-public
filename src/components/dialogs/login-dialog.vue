<template lang="pug">
v-dialog(
	v-model="isOpen" max-width="400" persistent
	:fullscreen="$vuetify.breakpoint.xsOnly")

	//- Карточка диалога
	v-card(height="536" v-if="isOpen")

		//- Заголовок диалога
		v-card-title.pt-4.px-4
			v-icon.ml-auto( @click="isOpen=false" ) $close

		//- Содержимое диалога
		v-card-text
			v-img.mx-auto( alt="logo" :src="require('~/static/logo.svg')" max-width="96" )
			div.text-h6.text-center.text-primary.mt-n1(
				style="letter-spacing: 0.1em!important; margin-bottom: 36px;"
			) Exchange

			//- Телефон (логин)
			div.phone-label__input.mx-2
				div.phone-label__label {{ phoneLabel }}
				v-text-field.text-body-1(
					v-model="phone"
					onfocus="this.value=this.value;"
					type="tel"
					autofocus
					:error-messages="phoneError"
					:label="$t('USER.ТЕЛЕФОН')"
					v-mask="phoneMask"
					placeholder=" "
				)
					template(v-slot:prepend)
						v-icon.primary--text.mt-n4(size="24") mdi-account

			//- Пароль
			v-text-field.text-body-1.mx-2(
				v-model="password"
				:error-messages="passwordError"
				:type="showPassword ? 'text' : 'password'"
				tabindex="2"
				:label="$t('USER.ПАРОЛЬ')"
				placeholder=" "
			)
				template(v-slot:prepend)
					v-icon.primary--text.mt-n4.mr-1(size="22") mdi-lock
				template(v-slot:append)
					v-icon(
						size="17"
						tabindex="-1"
						@click='showPassword = !showPassword'
					) {{ showPassword ? 'mdi-eye' : 'mdi-eye-off' }}

			//- Забыли пароли
			div.px-3.text-caption.text-right
				a.text-decoration-underline(
					@click.prevent="forgotPassword"
				).primary--text {{ $t('USER.ЗАБЫЛ_ПАРОЛЬ') }}

			//- Сообщение об ошибке
			div.py-2.px-3.text-caption.error--text(
				style="min-height: 48px"
			) {{ error }}

			//- Авторизироваться
			v-btn.text-subtitle-2.gradient-to-right.mb-4(
				@click="submit"
				style="text-transform: none"
				:loading="loading"
				block
				dark
				large
			) {{ $t('DIALOG.ВОЙТИ') }}

			//- Регистрация
			v-btn.text-body-2(
				@click="signupUser"
				style="text-transform: none"
				:loading="loading"
				block
				color="primary"
				outlined
			) {{ $t('USER.РЕГИСТРАЦИЯ') }}

</template>

<script lang="ts">

import { defineComponent } from "@nuxtjs/composition-api"
import useLogic from "../../common/logic/login-dialog.logic"

export default defineComponent({

	setup: useLogic

})

</script>

<style lang="sass">
// .phone-label__input .v-input input
// 	max-height: 38px
// 	padding: 8px 4px 8px

.gradient-to-right
	background: linear-gradient(to right, var(--v-primary-base), var(--v-accent-base))
</style>
