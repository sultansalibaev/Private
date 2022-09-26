import { ref, reactive } from "vue";

export default function createPDF() {

	const map = new Map();

	function createMap(_function) {
		let newMap = new Map();

		_function(newMap);

		return newMap;
	}

	map
		.set({ id: 'element-1', name: "tags", type: "default" }, [
			// { name: "length", type: "number", value: 225 }
		])
		.set({ id: 'element-2', name: "category", type: "graph" }, [
			{
				name: "length", type: "number", min: 3, max: 10, value: 3
			},
			{
				name: "number", type: "checkbox", value: true
			},
			{
				name: "percent", type: "checkbox", value: true
			},
		])
		.set({ id: 'element-3', name: "sentiments", type: "graph" }, [
			{
				name: "number", type: "checkbox", value: true
			},
			{
				name: "percent", type: "checkbox", value: false
			},
		])
		.set({ id: 'element-4', name: "resources", type: "graph" }, [
			{ name: "length", type: "number", min: 3, max: 10, value: 5 },
			{ name: "number", type: "checkbox", value: true },
			{ name: "percent", type: "checkbox", value: true },
		])
		.set({ id: 'element-5', name: "dates", type: "graph" }, [
			{
				name: "number", type: "checkbox", value: true
			},
			{
				name: "percent", type: "checkbox", value: false
			},
		])
		.set({ id: 'element-6', name: "smi_table", type: "table" }, [
			{
				name: "columns", type: "columns", value: [
					{ name: "number", selected: "hide" },
					{ name: "title", selected: true },
					{ name: "content", selected: "default" },
					{ name: "date", selected: true },
					{ name: "resource", selected: true },
					{ name: "resource_link", selected: true },
					{ name: "news_link", selected: true },
					{ name: "sentiment", selected: true },
					{ name: "category", selected: true },
				]
			},
			{
				name: "tag_highlight", type: "dropdown", value: [
					{ name: "bold", type: "checkbox", value: true },
					{ name: "tag_color", type: "color", value: "#000000", show: false },
					{ name: "back_color", type: "color", value: "#dcdcdc", show: false },
				],
			},
			{
				name: "order", type: "dropdown", value: [...createMap(newMap => {
					newMap.set({ name: "date", selected: false, type: "select", outputIndex: true }, [
						{ name: "По убыванию", index: 1, selected: true },
						{ name: "По возрастанию", index: 0, selected: false }
					])
				})], draggables: [...createMap(newMap => {
					newMap.set({ name: "sentiments", type: "draggable", showResources: true, selected: true }, [
						{ name: "positive", selected: true, defaultPosition: 0 },
						{ name: "neutral", selected: true, defaultPosition: 1 },
						{ name: "negative", selected: true, defaultPosition: 2 },
					])
					newMap.set({ name: "categories", type: "draggable", showResources: false, selected: false }, [
						{ name: "Государственные источники", selected: true },
						{ name: "Информационные агентства", selected: true },
						{ name: "Региональные источники", selected: true },
						{ name: "Электронные СМИ", selected: true },
						{ name: "Специализированные", selected: true },
						{ name: "Зарубежные источники", selected: true },
						{ name: "Государственные закупки", selected: true },
						{ name: "LiveJournal", selected: true },
						{ name: "Печатные СМИ", selected: true },
						{ name: "Телевидение", selected: true },
						{ name: "Радио", selected: true },
						{ name: "Агрегаторы СМИ", selected: true },
					])
				})]
			},
			{ name: "text_length", selected: true, min: 70, max: 500, type: "number", value: 400 },
		])
		.set({ id: 'element-7', name: "soc_table", type: "table" }, [
			{
				name: "columns", type: "columns", value: [
					{ name: "number", selected: "hide" },
					{ name: "content", selected: "default" },
					{ name: "resource", selected: true },
					{ name: "date", selected: true },
					{ name: "category", selected: true },
					{ name: "resource_link", selected: true },
					{ name: "news_link", selected: true },
					{ name: "sentiment", selected: true },
				]
			},
			{
				name: "tag_highlight", type: "dropdown", value: [
					{ name: "bold", type: "checkbox", value: true },
					{ name: "tag_color", type: "color", value: "#000000", show: false },
					{ name: "back_color", type: "color", value: "#dcdcdc", show: false },
				],
			},
			{
				name: "order", type: "dropdown", value: [...createMap(newMap => {
					newMap.set({ name: "date", selected: false, type: "select", outputIndex: true }, [
						{ name: "По убыванию", index: 1, selected: true },
						{ name: "По возрастанию", index: 0, selected: false }
					])
				})], draggables: [...createMap(newMap => {
					newMap.set({ name: "sentiments", type: "draggable", selected: true }, [
						{ name: "positive", selected: true, defaultPosition: 0 },
						{ name: "neutral", selected: true, defaultPosition: 1 },
						{ name: "negative", selected: true, defaultPosition: 2 },
					])
					newMap.set({ name: "categories", type: "draggable", selected: false }, [
						{ name: "Вконтакте", selected: true },
						{ name: "Facebook", selected: true },
						{ name: "Twitter", selected: true },
						{ name: "Instagram", selected: true },
						{ name: "LinkedIn", selected: true },
						{ name: "Youtube", selected: true },
						{ name: "Одноклассники", selected: true },
						{ name: "Мой_Мир", selected: true },
						{ name: "Telegram", selected: true },
						{ name: "TikTok", selected: true },
					])
				})]
			},
			{ name: "text_length", selected: true, min: 70, max: 500, type: "number", value: 400 },
		])

	return reactive(ref(Object.entries([...map.entries()]).map(el => el[1])));
}