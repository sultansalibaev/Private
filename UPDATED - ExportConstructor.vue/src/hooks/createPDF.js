import { ref, reactive } from "vue";

export function createPDF() {

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
		.set({ id: 'element-2', name: "period", type: "default"}, [{
			name: "format", type: "select", outputIndex: true, value: [
				{name: "День-Месяц-Год", index: 0, selected: true},
				{name: "День-Месяц-Год Час:Мин", index: 1, selected: false}
			]
		}])
		.set({ id: 'element-3', name: "count", type: "default"}, [])
		.set({ id: 'element-4', name: "message_dynamic", type: "default"}, [])
		.set({ id: 'element-5', name: "sentiments", type: "graph"}, [
			{
				name: "type", type: "select", value: [...createMap(newMap => {
					newMap.set({ name: "pie", type: "select", selected: true }, { "data_labels": false })
					newMap.set({ name: "bar", type: "select", selected: false }, { "data_labels": true, "labels": true })
					newMap.set({ name: "column", type: "select", selected: false }, { "data_labels": true, "labels": true })
				})]
			},
			{
				name: "number", type: "checkbox", value: true// number: input, object: [], array, boolean
			},
			{
				name: "percent", type: "checkbox", value: true
			},
		])
		.set({ id: 'element-6', name: "distribution", type: "graph"}, [
			{
				name: "type", type: "select", value: [...createMap(newMap => {
					newMap.set({ name: "pie", type: "select", selected: true }, { "data_labels": false })
					newMap.set({ name: "bar", type: "select", selected: false }, { "data_labels": true, "labels": true })
					newMap.set({ name: "column", type: "select", selected: false }, { "data_labels": true, "labels": true })
				})]
			},
			{
				name: "number", type: "checkbox", value: true
			},
			{
				name: "percent", type: "checkbox", value: true
			},
		])
		.set({ id: 'element-7', name: "smi_distribution", type: "graph"}, [
			{
				name: "length", type: "number", min: 3, max: 10, value: 10
			},
			{
				name: "type", type: "select", value: [...createMap(newMap => {
					newMap.set({ name: "pie", type: "select", selected: true }, { "data_labels": false })
					newMap.set({ name: "bar", type: "select", selected: false }, { "data_labels": true, "labels": true })
					newMap.set({ name: "column", type: "select", selected: false }, { "data_labels": true, "labels": true })
				})]
			},
			{
				name: "number", type: "checkbox", value: true
			},
			{
				name: "percent", type: "checkbox", value: true
			},
		])
		.set({ id: 'element-8', name: "soc_distribution", type: "graph"}, [
			{
				name: "length", type: "number", min: 3, max: 10, value: 10
			},
			{
				name: "type", type: "select", value: [...createMap(newMap => {
					newMap.set({ name: "pie", type: "select", selected: true }, { "data_labels": false })
					newMap.set({ name: "bar", type: "select", selected: false }, { "data_labels": true, "labels": true })
					newMap.set({ name: "column", type: "select", selected: false }, { "data_labels": true, "labels": true })
				})]
			},
			{
				name: "number", type: "checkbox", value: true
			},
			{
				name: "percent", type: "checkbox", value: true
			},
		])
		.set({ id: 'element-9', name: "media_top", type: "graph"}, [
			{ name: "length", type: "number", min: 3, max: 20, value: 20 },
			{
				name: "type", type: "select", value: [...createMap(newMap => {
					newMap.set({ name: "pie", type: "select", selected: false }, { "data_labels": false })
					newMap.set({ name: "bar", type: "select", selected: true }, { "data_labels": true, "labels": true })
					newMap.set({ name: "column", type: "select", selected: false }, { "data_labels": true, "labels": true })
				})]
			},
			{ name: "number", type: "checkbox", value: false },
			{ name: "percent", type: "checkbox", value: false },
		])
		.set({ id: 'element-10', name: "soc_top", type: "graph"}, [
			{ name: "length", type: "number", min: 3, max: 20, value: 20 },
			{
				name: "type", type: "select", value: [...createMap(newMap => {
					newMap.set({ name: "pie", type: "select", selected: false }, { "data_labels": false })
					newMap.set({ name: "bar", type: "select", selected: true }, { "data_labels": true, "labels": true })
					newMap.set({ name: "column", type: "select", selected: false }, { "data_labels": true, "labels": true })
				})]
			},
			{ name: "number", type: "checkbox", value: false },
			{ name: "percent", type: "checkbox", value: false },
		])
		.set({ id: 'element-11', name: "most_popular_soc", type: "graph"}, [
			{ name: "length", type: "number", min: 3, max: 20, value: 20 },
			{
				name: "type", type: "select", value: [...createMap(newMap => {
					newMap.set({ name: "pie", type: "select", selected: false }, { "data_labels": false })
					newMap.set({ name: "bar", type: "select", selected: true }, { "data_labels": true, "labels": true })
					newMap.set({ name: "column", type: "select", selected: false }, { "data_labels": true, "labels": true })
				})]
			},
			{ name: "number", type: "checkbox", value: false },
			{ name: "percent", type: "checkbox", value: false },
		])
		.set({ id: 'element-12', name: "top_negative", type: "graph"}, [
			{ name: "length", type: "number", min: 3, max: 20, value: 20 },
			{
				name: "type", type: "select", value: [...createMap(newMap => {
					newMap.set({ name: "pie", type: "select", selected: false }, { "data_labels": false })
					newMap.set({ name: "bar", type: "select", selected: true }, { "data_labels": true, "labels": true })
					newMap.set({ name: "column", type: "select", selected: false }, { "data_labels": true, "labels": true })
				})]
			},
			{ name: "number", type: "checkbox", value: false },
			{ name: "percent", type: "checkbox", value: false },
		])
		.set({ id: 'element-13', name: "world_map", type: "map"}, [
			{ name: "length", type: "number", min: 0, max: 44, value: 44 },
			{ name: "number", type: "checkbox", value: true },
			{ name: "percent", type: "checkbox", value: true },
		])
		.set({ id: 'element-14', name: "kaz_map", type: "map"}, [
			{ name: "length", type: "number", min: 0, max: 44, value: 44 },
			{ name: "number", type: "checkbox", value: true },
			{ name: "percent", type: "checkbox", value: true },
		])
		.set({ id: 'element-15', name: "smi_table", type: "table"}, [
			{
				name: "columns", type: "columns", value: [
					{ name: "number", selected: "hide" },
					{ name: "title", selected: true },
					{ name: "content", selected: "default" },
					{ name: "date", selected: true },
					{ name: "category", selected: true },
					{ name: "resource", selected: true },
					{ name: "news_link", selected: true },
					{ name: "sentiment", selected: true },
				]
			},
			{
				name: "tag_highlight", type: "dropdown", value: [
					{ name: "bold", type: "checkbox", value: true},
					{ name: "tag_color", type: "color", value: "#000000", show: false},
					{ name: "back_color", type: "color", value: "#ffff00", show: false},
				],
			},
			{
				name: "datetime_format", type: "select", outputIndex: true, value: [
					{ name: "День-Месяц-Год", index: 0, selected: true },
					{ name: "День-Месяц-Год Час:Мин", index: 1, selected: false },
				]
			},
			{
				name: "order", type: "dropdown", value: [...createMap(newMap => {
					newMap.set({ name: "date", selected: false, type: "select", outputIndex: true }, [
						{ name: "По убыванию", index: 0, selected: true },
						{ name: "По возрастанию", index: 1, selected: false }
					])
				})], draggables: [...createMap(newMap => {
					newMap.set({ name: "sentiments", type: "draggable", selected: true }, [
						{ name: "positive", selected: true, defaultPosition: 0 },
						{ name: "neutral", selected: true, defaultPosition: 1 },
						{ name: "negative", selected: true, defaultPosition: 2 },
					])
					newMap.set({ name: "categories", type: "draggable", selected: false }, [
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
		.set({ id: 'element-16', name: "soc_table", type: "table"}, [
			{
				name: "columns", type: "columns", value: [
					{ name: "number", selected: "hide" },
					{ name: "content", selected: "default" },
					{ name: "date", selected: true },
					{ name: "resource", selected: true },
					{ name: "news_link", selected: true },
					{ name: "sentiment", selected: true },
				]
			},
			{
				name: "tag_highlight", type: "dropdown", value: [
					{ name: "bold", type: "checkbox", value: true },
					{ name: "tag_color", type: "color", value: "#000000", show: false },
					{ name: "back_color", type: "color", value: "#ffff00", show: false },
				],
			},
			{
				name: "datetime_format", type: "select", outputIndex: true, value: [
					{name: "День-Месяц-Год", index: 0, selected: true},
					{name: "День-Месяц-Год Час:Мин", index: 1, selected: false}
				]
			},
			{
				name: "order", type: "dropdown", value: [...createMap(newMap => {
					newMap.set({ name: "date", selected: false, type: "select", outputIndex: true }, [
						{ name: "По убыванию", index: 0, selected: true },
						{ name: "По возрастанию", index: 1, selected: false }
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