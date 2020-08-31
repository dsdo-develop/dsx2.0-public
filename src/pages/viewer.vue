<template lang="pug">
v-container.px-1.px-sm-4.pt-0(fluid)
	v-row
		v-col(cols="7")
			div.fv-container.pl-2
				div#forge-viewer.fv-display
		v-col.pr-8(cols="5")
			h4 Information
			div Элементы по текущей работе: {{ activityIds }}
			div selectedIds: {{ selectedIds }}
			h4 Settings
			v-checkbox(
				v-model="allowOnlyCurrentActivity"
				label="Запретить выбор элементов не из текущей работы"
			)
			h4 Actions
			div
				v-btn(block @click="selectElements(activityIds)") Выбрать элементы по текущей работе
				v-btn(block @click="unselectAll()") Очистить выделение
				v-btn(block @click="paintElements(activityIds, true)") Выделить цветом элементы по текущей работе
				v-btn(block @click="paintElements(activityIds, false)") Убрать цвет
				v-btn(block @click="lockCamera(true)") Заблокировать камеру
				v-btn(block @click="lockCamera(false)") Разблокировать
				v-btn(block @click="saveState()") Сохранить вид
				v-btn(block @click="restoreState()") Восстановить вид
				v-btn(block @click="viewer.hideLines(true)") Скрыть линии
				v-btn(block @click="viewer.hideLines(false)") Показать линии
				//- v-btn(block @click="viewer.hideModel(viewer.model.getModelId())") Скрыть модель
				//- v-btn(block @click="viewer.showModel(viewer.model.getModelId())") Показать модель
				v-btn(block @click="viewer.hide(activityIds)") Скрыть элементы текущей работы
				v-btn(block @click="viewer.show(activityIds)") Показать элементы текущей работы
				v-btn(block @click="viewer.hide(viewer.model.getRootId())") Скрыть модель
				v-btn(block @click="viewer.show(viewer.model.getRootId())") Показать модель
				v-btn(block @click="testLayers()") Test Layers
				//- v-btn(block @click="viewer.show(viewer.model.getRootId())") Показать модель


</template>

<script>

import { defineComponent } from '@nuxtjs/composition-api'
import useLogic from '../common/logic/viewer.logic'

export default defineComponent({

	head: {},
	setup: useLogic

})
</script>

<style scoped>
.fv-container {
  width: 100%;
  height: 100%;
  position: relative;
  border: 1px solid black;
}
.fv-display {
  height: 80vh;
}
.show-env-bg-button {
    background: red;
}
.hide-env-bg-button {
  background: blue;
}
</style>>
