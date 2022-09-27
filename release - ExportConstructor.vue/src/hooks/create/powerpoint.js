import { ref, reactive } from "vue";

export default function createPDF() {

	const map = new Map();

	map
		.set({ id: 'element-1', name: "presentation", ru: "Презентация", type: "project" }, [])
		.set({ id: 'element-2', name: "distribution", ru: "Распределение", type: "project" }, [
			{
				name: "number", ru: "Число", type: "checkbox", value: true// number: input, object: [], array, boolean
			},
			{
				name: "percent", ru: "Процент", type: "checkbox", value: true
			},
		])
		.set({ id: 'element-3', name: "activity_1", ru: "Активность 1", type: "project" }, [
			{
				name: "number", ru: "Число", type: "checkbox", value: true// number: input, object: [], array, boolean
			},
			{
				name: "percent", ru: "Процент", type: "checkbox", value: true
			},
		])
		.set({ id: 'element-4', name: "activity_2", ru: "Активность 2", type: "project" }, [
			{
				name: "number", ru: "Число", type: "checkbox", value: true// number: input, object: [], array, boolean
			},
			{
				name: "percent", ru: "Процент", type: "checkbox", value: true
			},
		])
		.set({ id: 'element-5', name: "activity_3", ru: "Активность 3", type: "project" }, [
			{
				name: "number", ru: "Число", type: "checkbox", value: true// number: input, object: [], array, boolean
			},
			{
				name: "percent", ru: "Процент", type: "checkbox", value: true
			},
		])

	return reactive(ref(Object.entries([...map.entries()]).map(el => el[1])));
}