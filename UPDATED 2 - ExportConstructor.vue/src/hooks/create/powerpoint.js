import { ref, reactive } from "vue";

export default function createPDF() {

	const map = new Map();

	map
		.set({ id: 'element-1', name: "presentation", type: "project" }, [])
		.set({ id: 'element-2', name: "distribution", type: "project" }, [
			{
				name: "number", type: "checkbox", value: true// number: input, object: [], array, boolean
			},
			{
				name: "percent", type: "checkbox", value: true
			},
		])
		.set({ id: 'element-3', name: "activity_1", type: "project" }, [
			{
				name: "number", type: "checkbox", value: true// number: input, object: [], array, boolean
			},
			{
				name: "percent", type: "checkbox", value: true
			},
		])
		.set({ id: 'element-4', name: "activity_2", type: "project" }, [
			{
				name: "number", type: "checkbox", value: true// number: input, object: [], array, boolean
			},
			{
				name: "percent", type: "checkbox", value: true
			},
		])
		.set({ id: 'element-5', name: "activity_3", type: "project" }, [
			{
				name: "number", type: "checkbox", value: true// number: input, object: [], array, boolean
			},
			{
				name: "percent", type: "checkbox", value: true
			},
		])

	return reactive(ref(Object.entries([...map.entries()]).map(el => el[1])));
}