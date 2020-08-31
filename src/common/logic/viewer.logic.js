import { computed, ref, onMounted, onBeforeUnmount } from "@nuxtjs/composition-api"
import { fromContext } from "../lib/proc"

export default function (props, context) {

	//require("../forge-extensions/toolbar.extension")
	//require("../forge-extensions/my-awesome.extension")

	// Forge Viewer
	const viewer = ref(null)


	// settings
	const allowOnlyCurrentActivity = ref(false)

	// array for selected elements
	const selectedIds = ref([])

	// array for activity elements
	const activityIds = [ 2171, 3415, 3688  ]

	// svf-documents url

	// Торговый центр OBI
  //const url = "https://dsx.ds.do:81/svf/89cd9c5f-6e73-4f39-8ece-23164929ac54/Resource/3D View/3D/3D.svf"
	// Красноармейская М2 АР
	//const url = "https://dsx.ds.do:81/svf/0cd736f9-a605-423a-90a7-d22c3c53c0bb/Resource/3D View/3D/3D.svf"
	// Красноармейская М2 КЖ
	//const url = "https://dsx.ds.do:81/svf/39cb9722-06df-4bc0-a80e-e03fa8c8608f/Resource/3D View/3D/3D.svf"
	// Тестовая сборка
	const url = "https://dsx.ds.do:81/svf/d9467f4e-fc8b-48ec-8d44-820326b0bbc6/Resource/3D View/3D/3D.svf"

	const options = {
		'document': url,
		'env': 'Local',
		//'accessToken': token.access_token,
		//'api': 'derivativeV2',
	};
		// Events: onNavigationModeChanged
	const onNavigationModeChanged = (event) => {
		console.log("Event: onNavigationModeChanged", event)
	}

	// Events: onSelectionChanged
	const onSelectionChanged = (event) => {
		console.log("Event: onSelectionChanged", event)
		if (selectedIds.value.length === event.dbIdArray.length-1) {
			const newId = event.dbIdArray[0]
			console.log(newId)
			if (activityIds.includes(newId)) {
				console.log("Попытка выделить недоступный элемент")
			}
		}
		selectedIds.value = event.dbIdArray
	}

	const testLayers = () => {
		var root = viewer.value.impl.getLayersRoot()
		console.log("Root Layer", root)
		for (var i = 0; i < root.childCount; i++) {
			var layer = root.children[i];
			console.log("Layer", i, layer)
		}
	}

	function loadDocument (docId) {
		console.log('load document ...', docId)

		Autodesk.Viewing.Document.load(docId,

			function (document) {

				console.log('done', document)
				var geometryItems = [];

				if (geometryItems.length == 0) {
					geometryItems =
						document.search({
								'type': 'geometry',
								'role': '3d'
							},
							true
						);
				}
				if (geometryItems.length > 0) {
					console.log("geometryItems.length", geometryItems.length)
					viewer.value.load(document.getViewablePath(geometryItems[0]));
				}

				//viewer.addEventListener("progress", progressListener);

			},
			function (errorMsg) {
				console.log("Error", errorMsg)
				// var container = document.getElementById('viewer3d');
				// if (container) {
				// 	alert("Load error " + errorMsg);
				// }
			}
		);
	}

	// init Autodesk
	const initAutodesk = () => {
		Autodesk.Viewing.Initializer(options, async () => {

			// viewer.initialize();
			// // Go with the "Riverbank" lighting and background effect
			// viewer.impl.setLightPreset(8);
			// // We have a heavy model, so let's save some work during
			// // navigation
			// viewer.setOptimizeNavigation(true);

			// viewer instance
			viewer.value = new Autodesk.Viewing.Private.GuiViewer3D(
				document.getElementById("forge-viewer"),
				{
					memory: { limit: 1000 },
					startOnInitialize: false,
					//extensions: ['MyAwesomeExtension', 'ToolbarExtension'],
				}
			)
			//
			// start viewer ids: activityIds
			// const code = viewer.value.start(url, { },
			// 	() => {
			// 		alert("viewer started successfully")
			// 		//viewer.value.loadModel(url)
			// 		//viewer.value.showModel()
			// 		//viewer.value.hide(viewer.model.getRootId())
			// 	},
			// 	(err) => { console.log("FAIL", err) }
			// )
			// console.log("start_code: ", code)

			viewer.value.initialize();

			console.log('viewer initialized')



			// await viewer.value.start()
			// console.log('viewer started')

			viewer.value.loadModel(url, { loadAsHidden: false, ids: activityIds },
				async (data, data2) => {
					console.log(data, data2)
					console.log('getGeometryList', data.getGeometryList())
					console.log('getFragmentList', data.getFragmentList())
					//console.log('Model RootId', viewer.value.model.getRootId())
					alert("Model is loaded")
					// viewer.value.hide(viewer.value.model.getRootId())
					// alert("Model is hidden")

					//viewer.value.isolate([999999999])

					//viewer.value.start()

					//viewer.value.model = null

					return false

				},
				(err) => {
					console.log(err)
				}
			)

			//loadDocument(url)

			// Listeners
			viewer.value.addEventListener(Autodesk.Viewing.SELECTION_CHANGED_EVENT, onSelectionChanged)
			viewer.value.addEventListener(Autodesk.Viewing.NAVIGATION_MODE_CHANGED_EVENT, onNavigationModeChanged)
		})
	}

	// destroy Autodesk
	const destroyAutodesk = () => {
		viewer.value.removeEventListener(Autodesk.Viewing.SELECTION_CHANGED_EVENT)
		viewer.value.finish();
		viewer.value = null;
		Autodesk.Viewing.shutdown();
		console.log("cleaned")
	}

	// lockCamera
	const lockCamera = (value) => {
		viewer.value.setNavigationLock(value)
	}

	const savedState = ref(null)
	const saveState = () => { savedState.value = viewer.value.getState() }
	const restoreState = () => viewer.value.restoreState(savedState.value)


	// Покрасить элементы
	const paintElements = (ids, flag) => {
    const redColor = new THREE.Vector4(0, 1, 0, 0.5)
    ids.forEach(id => {
    	viewer.value.setThemingColor(id, flag ? redColor : null, null, true);
    })
  }

  // Сбросить все выделение
  const unselectAll = () => {
		//viewer.value.select(null)
		viewer.value.clearSelection()
  }

  // Выделить данные элементы
  const selectElements = (ids) => {
    viewer.value.select(ids)
	}

	// Скрыть элементы ПОЛНОСТЬЮ
	// const hideElements = (dbIds) => {
	// 	let node = null
	// 	if (Array.isArray(dbIds)) {
	// 		for (var i = 0; i < dbIds.length; i++) {
	// 				const id = dbIds[i];
	// 				node = viewer.value.model.getData().instanceTree.dbIdToNode[id]
	// 				console.log(node)
	// 				viewer.value.impl.visibilityManager.setNodeOff(node, true)
	// 		}
	// 	}	else {
	// 		node = viewer.value.model.getData().instanceTree.dbIdToNode[dbIds];
	// 		viewer.value.impl.visibilityManager.setNodeOff(node, true);
	// 	}
	// }

	// Показать элементы
	// const showElements = (dbIds) => {
	// 	let node = null
	// 	if (Array.isArray(dbIds)) {
	// 		for (var i = 0; i < dbIds.length; i++) {
	// 			const id = dbIds[i];
	// 			node = viewer.value.model.getData().instanceTree.dbIdToNode[id];
	// 			viewer.value.impl.visibilityManager.setNodeOff(node, false);
	// 		}
	// 	} else {
	// 		node = viewer.value.model.getData(). instanceTree.dbIdToNode[dbIds];
	// 		viewer.value.impl.visibilityManager.setNodeOff(node, false);
	// 	}
	// }

	// onMounted
	onMounted(() => {
		initAutodesk()
	})

	// onBeforeUnmount
	onBeforeUnmount(() => {
		destroyAutodesk()
	})

	return {
		selectedIds, activityIds, selectElements, unselectAll, paintElements, lockCamera,
		allowOnlyCurrentActivity, saveState, restoreState, viewer, testLayers,
	}

}
