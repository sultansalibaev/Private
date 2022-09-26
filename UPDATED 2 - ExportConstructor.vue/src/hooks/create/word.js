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
		.set({ id: 'element-2', name: "contents", type: "default" }, [
			{
				name: "smi", type: "number", min: 0, max: 50, value: 0
			},
			{
				name: "soc", type: "number", min: 0, max: 50, value: 0
			},
			{
				name: "table", type: "checkbox", value: false
			},
		])

		.set({ id: 'element-3', name: "smi", type: "table" }, [
			{
				name: "table", type: "checkbox", value: false
			},
			{
				name: "columns", type: "columns", value: [
					{ name: "number", selected: "hide" },
					{ name: "title", selected: true, showParams: false, params: [
							{
								name: "bold",
								type: "checkbox",
								selected: false,
							},
							{
								name: "italic",
								type: "checkbox",
								selected: false,
							},
							{
								name: "underline",
								type: "checkbox",
								selected: false,
							},
							{
								type: "color",
								value: "#000000",
							},
						]
					},
					{ name: "content", selected: "default" },
					{ name: "date", selected: true, showParams: false, params: [
							{
								name: "bold",
								type: "checkbox",
								selected: false,
							},
							{
								name: "italic",
								type: "checkbox",
								selected: false,
							},
							{
								name: "underline",
								type: "checkbox",
								selected: false,
							},
							{
								type: "color",
								value: "#000000",
							},
						] },
					{ name: "resource", selected: true, showParams: false, params: [
							{
								name: "bold",
								type: "checkbox",
								selected: false,
							},
							{
								name: "italic",
								type: "checkbox",
								selected: false,
							},
							{
								name: "underline",
								type: "checkbox",
								selected: false,
							},
							{
								type: "color",
								value: "#000000",
							},
						] },
					{ name: "news_link", selected: true, showParams: false, params: [
							{
								name: "bold",
								type: "checkbox",
								selected: false,
							},
							{
								name: "italic",
								type: "checkbox",
								selected: false,
							},
							{
								name: "underline",
								type: "checkbox",
								selected: false,
							},
							{
								type: "color",
								value: "#000000",
							},
						] },
					{ name: "sentiment", selected: true, showParams: false, params: [
							{
								name: "bold",
								type: "checkbox",
								selected: false,
							},
							{
								name: "italic",
								type: "checkbox",
								selected: false,
							},
							{
								name: "underline",
								type: "checkbox",
								selected: false,
							},
							{
								type: "color",
								value: "#000000",
							},
						] },
					{ name: "category", selected: true, showParams: false, params: [
							{
								name: "bold",
								type: "checkbox",
								selected: false,
							},
							{
								name: "italic",
								type: "checkbox",
								selected: false,
							},
							{
								name: "underline",
								type: "checkbox",
								selected: false,
							},
							{
								type: "color",
								value: "#000000",
							},
						] },
				]
			},
			{
				name: "list_rows", type: "columns", value: [
					{ name: "number", selected: "hide" },
					{ name: "title", selected: true, showParams: false, params: [
							{
								name: "bold",
								type: "checkbox",
								selected: false,
							},
							{
								name: "italic",
								type: "checkbox",
								selected: false,
							},
							{
								name: "underline",
								type: "checkbox",
								selected: false,
							},
							{
								type: "color",
								value: "#000000",
							},
						]
					},
					{ name: "content", selected: "default" },
					{ name: "date", selected: true, showParams: false, params: [
							{
								name: "bold",
								type: "checkbox",
								selected: false,
							},
							{
								name: "italic",
								type: "checkbox",
								selected: false,
							},
							{
								name: "underline",
								type: "checkbox",
								selected: false,
							},
							{
								type: "color",
								value: "#000000",
							},
						] },
					{ name: "resource", selected: true, showParams: false, params: [
							{
								name: "bold",
								type: "checkbox",
								selected: false,
							},
							{
								name: "italic",
								type: "checkbox",
								selected: false,
							},
							{
								name: "underline",
								type: "checkbox",
								selected: false,
							},
							{
								type: "color",
								value: "#000000",
							},
						] },
					{ name: "news_link", selected: true, showParams: false, params: [
							{
								name: "bold",
								type: "checkbox",
								selected: false,
							},
							{
								name: "italic",
								type: "checkbox",
								selected: false,
							},
							{
								name: "underline",
								type: "checkbox",
								selected: false,
							},
							{
								type: "color",
								value: "#000000",
							},
						] },
					{ name: "sentiment", selected: true, showParams: false, params: [
							{
								name: "bold",
								type: "checkbox",
								selected: false,
							},
							{
								name: "italic",
								type: "checkbox",
								selected: false,
							},
							{
								name: "underline",
								type: "checkbox",
								selected: false,
							},
							{
								type: "color",
								value: "#000000",
							},
						] },
					{ name: "category", selected: true, showParams: false, params: [
							{
								name: "bold",
								type: "checkbox",
								selected: false,
							},
							{
								name: "italic",
								type: "checkbox",
								selected: false,
							},
							{
								name: "underline",
								type: "checkbox",
								selected: false,
							},
							{
								type: "color",
								value: "#000000",
							},
						] },
				]
			},
			{
				name: "tag_highlight", type: "dropdown", value: [
					{ name: "bold", type: "checkbox", value: true },
					{ name: "italic", type: "checkbox", value: false },
					{ name: "underline", type: "checkbox", value: false },
					{ name: "color", type: "color", value: "#000000", show: false },
					{ name: "back_color", type: "color", value: "#ffff00", show: false },
				],
			},
			// {
			// 	name: "datetime_format", type: "select", outputIndex: true, value: [
			// 		{ name: "День-Месяц-Год", index: 0, selected: true },
			// 		{ name: "День-Месяц-Год Час:Мин", index: 1, selected: false },
			// 	]
			// },
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
		.set({ id: 'element-3', name: "soc", type: "table" }, [
			{
				name: "table", type: "checkbox", value: true
			},
			{
				name: "columns", type: "columns", value: [
					{ name: "number", selected: "hide" },
					{ name: "content", selected: "default" },
					{ name: "date", selected: true, showParams: false, params: [
							{
								name: "bold",
								type: "checkbox",
								selected: false,
							},
							{
								name: "italic",
								type: "checkbox",
								selected: false,
							},
							{
								name: "underline",
								type: "checkbox",
								selected: false,
							},
							{
								type: "color",
								value: "#000000",
							},
						] },
					{ name: "resource", selected: true, showParams: false, params: [
							{
								name: "bold",
								type: "checkbox",
								selected: false,
							},
							{
								name: "italic",
								type: "checkbox",
								selected: false,
							},
							{
								name: "underline",
								type: "checkbox",
								selected: false,
							},
							{
								type: "color",
								value: "#000000",
							},
						] },
					{ name: "news_link", selected: true, showParams: false, params: [
							{
								name: "bold",
								type: "checkbox",
								selected: false,
							},
							{
								name: "italic",
								type: "checkbox",
								selected: false,
							},
							{
								name: "underline",
								type: "checkbox",
								selected: false,
							},
							{
								type: "color",
								value: "#000000",
							},
						] },
					{ name: "sentiment", selected: true, showParams: false, params: [
							{
								name: "bold",
								type: "checkbox",
								selected: false,
							},
							{
								name: "italic",
								type: "checkbox",
								selected: false,
							},
							{
								name: "underline",
								type: "checkbox",
								selected: false,
							},
							{
								type: "color",
								value: "#000000",
							},
						] },
					{ name: "category", selected: true, showParams: false, params: [
							{
								name: "bold",
								type: "checkbox",
								selected: false,
							},
							{
								name: "italic",
								type: "checkbox",
								selected: false,
							},
							{
								name: "underline",
								type: "checkbox",
								selected: false,
							},
							{
								type: "color",
								value: "#000000",
							},
						] },
				]
			},
			{
				name: "list_rows", type: "columns", value: [
					{ name: "number", selected: "hide" },
					{ name: "content", selected: "default" },
					{ name: "date", selected: true, showParams: false, params: [
							{
								name: "bold",
								type: "checkbox",
								selected: false,
							},
							{
								name: "italic",
								type: "checkbox",
								selected: false,
							},
							{
								name: "underline",
								type: "checkbox",
								selected: false,
							},
							{
								type: "color",
								value: "#000000",
							},
						] },
					{ name: "resource", selected: true, showParams: false, params: [
							{
								name: "bold",
								type: "checkbox",
								selected: false,
							},
							{
								name: "italic",
								type: "checkbox",
								selected: false,
							},
							{
								name: "underline",
								type: "checkbox",
								selected: false,
							},
							{
								type: "color",
								value: "#000000",
							},
						] },
					{ name: "news_link", selected: true, showParams: false, params: [
							{
								name: "bold",
								type: "checkbox",
								selected: false,
							},
							{
								name: "italic",
								type: "checkbox",
								selected: false,
							},
							{
								name: "underline",
								type: "checkbox",
								selected: false,
							},
							{
								type: "color",
								value: "#000000",
							},
						] },
					{ name: "sentiment", selected: true, showParams: false, params: [
							{
								name: "bold",
								type: "checkbox",
								selected: false,
							},
							{
								name: "italic",
								type: "checkbox",
								selected: false,
							},
							{
								name: "underline",
								type: "checkbox",
								selected: false,
							},
							{
								type: "color",
								value: "#000000",
							},
						] },
					{ name: "category", selected: true, showParams: false, params: [
							{
								name: "bold",
								type: "checkbox",
								selected: false,
							},
							{
								name: "italic",
								type: "checkbox",
								selected: false,
							},
							{
								name: "underline",
								type: "checkbox",
								selected: false,
							},
							{
								type: "color",
								value: "#000000",
							},
						] },
				]
			},
			{
				name: "tag_highlight", type: "dropdown", value: [
					{ name: "bold", type: "checkbox", value: true },
					{ name: "italic", type: "checkbox", value: true },
					{ name: "underline", type: "checkbox", value: true },
					{ name: "color", type: "color", value: "#000000", show: false },
					{ name: "back_color", type: "color", value: "#ffff00", show: false },
				],
			},
			// {
			// 	name: "datetime_format", type: "select", outputIndex: true, value: [
			// 		{ name: "День-Месяц-Год", index: 0, selected: true },
			// 		{ name: "День-Месяц-Год Час:Мин", index: 1, selected: false },
			// 	]
			// },
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