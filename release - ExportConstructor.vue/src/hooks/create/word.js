import { ref, reactive } from "vue";

export default function createPDF() {

	const map = new Map();

	function createMap(_function) {
		let newMap = new Map();

		_function(newMap);

		return newMap;
	}

	map
		.set({ id: 'element-1', name: "tags", ru: "Теги", type: "default" }, [
			// { name: "length", type: "number", value: 225 }
		])
		.set({ id: 'element-2', name: "contents", ru: "Оглавление", type: "default" }, [
			{
				name: "smi", ru: "СМИ", type: "number", min: 0, max: 50, value: 0
			},
			{
				name: "soc", ru: "Соцсети", type: "number", min: 0, max: 50, value: 0
			},
			{
				name: "table", ru: "Таблица", type: "checkbox", value: false
			},
		])

		.set({ id: 'element-3', name: "smi", ru: "СМИ", type: "table" }, [
			{
				name: "table", ru: "Таблица", type: "checkbox", value: false
			},
			{
				name: "columns", ru: "Столбцы", type: "columns", value: [
					{ name: "number", ru: "Число", selected: "hide" },
					{ name: "title", ru: "Заголовок", selected: true, showParams: false, params: [
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
								name: "color",
								type: "color",
								value: "#000000",
							},
						]
					},
					{ name: "content", ru: "Краткое содержание", selected: "default" },
					{ name: "date", ru: "Дата", selected: true, showParams: false, params: [
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
								name: "color",
								type: "color",
								value: "#000000",
							},
						] },
					{ name: "resource", ru: "Источник", selected: true, showParams: false, params: [
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
								name: "color",
								type: "color",
								value: "#000000",
							},
						] },
					{ name: "news_link", ru: "URL", selected: true, showParams: false, params: [
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
								name: "color",
								type: "color",
								value: "#000000",
							},
						] },
					{ name: "sentiment", ru: "Оценка новостей", selected: true, showParams: false, params: [
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
								name: "color",
								type: "color",
								value: "#000000",
							},
						] },
					{ name: "category", ru: "Категория", selected: true, showParams: false, params: [
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
								name: "color",
								type: "color",
								value: "#000000",
							},
						] },
				]
			},
			{
				name: "list_rows", ru: "Список строк", type: "columns", value: [
					{ name: "number", ru: "Число", selected: "hide" },
					{ name: "title", ru: "Заголовок", selected: true, showParams: false, params: [
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
								name: "color",
								type: "color",
								value: "#000000",
							},
						]
					},
					{ name: "content", ru: "Краткое содержание", selected: "default" },
					{ name: "date", ru: "Дата", selected: true, showParams: false, params: [
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
								name: "color",
								type: "color",
								value: "#000000",
							},
						] },
					{ name: "resource", ru: "Источник", selected: true, showParams: false, params: [
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
								name: "color",
								type: "color",
								value: "#000000",
							},
						] },
					{ name: "news_link", ru: "URL", selected: true, showParams: false, params: [
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
								name: "color",
								type: "color",
								value: "#000000",
							},
						] },
					{ name: "sentiment", ru: "Оценка новостей", selected: true, showParams: false, params: [
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
								name: "color",
								type: "color",
								value: "#000000",
							},
						] },
					{ name: "category", ru: "Категория", selected: true, showParams: false, params: [
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
								name: "color",
								type: "color",
								value: "#000000",
							},
						] },
				]
			},
			{
				name: "tag_highlight", ru: "Выделение тега", type: "dropdown", value: [
					{ name: "bold", ru: "Жирность", type: "checkbox", value: true },
					{ name: "italic", ru: "Курсив", type: "checkbox", value: false },
					{ name: "underline", ru: "Подчеркнуть", type: "checkbox", value: false },
					{ name: "color", ru: "Цвет текста", type: "color", value: "#000000", show: false },
					{ name: "back_color", ru: "Цвет фона", type: "color", value: "#ffff00", show: false },
				],
			},
			// {
			// 	name: "datetime_format", type: "select", outputIndex: true, value: [
			// 		{ name: "День-Месяц-Год", index: 0, selected: true },
			// 		{ name: "День-Месяц-Год Час:Мин", index: 1, selected: false },
			// 	]
			// },
			{
				name: "order", ru: "Порядок", type: "dropdown", value: [...createMap(newMap => {
					newMap.set({ name: "date", ru: "Дата", selected: false, type: "select", outputIndex: true }, [
						{ name: "По убыванию", index: 0, selected: true },
						{ name: "По возрастанию", index: 1, selected: false }
					])
				})], draggables: [...createMap(newMap => {
					newMap.set({ name: "sentiments", ru: "Тональность", type: "draggable", showResources: true, selected: true }, [
						{ name: "positive", ru: "Позитивные", selected: true, defaultPosition: 0 },
						{ name: "neutral", ru: "Нейтральные", selected: true, defaultPosition: 1 },
						{ name: "negative", ru: "Негативные", selected: true, defaultPosition: 2 },
					])
					newMap.set({ name: "categories", ru: "Категория", type: "draggable", showResources: false, selected: false }, [
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
			{ name: "text_length", ru: "Количество символов", selected: true, min: 70, max: 500, type: "number", value: 400 },
		])
		.set({ id: 'element-4', name: "soc", ru: "Социальные сети", type: "table" }, [
			{
				name: "table", ru: "Таблица", type: "checkbox", value: true
			},
			{
				name: "columns", ru: "Столбцы", type: "columns", value: [
					{ name: "number", ru: "Число", selected: "hide" },
					{ name: "content", ru: "Краткое содержание", selected: "default" },
					{ name: "date", ru: "Дата", selected: true, showParams: false, params: [
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
								name: "color",
								type: "color",
								value: "#000000",
							},
						] },
					{ name: "resource", ru: "Источник", selected: true, showParams: false, params: [
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
								name: "color",
								type: "color",
								value: "#000000",
							},
						] },
					{ name: "news_link", ru: "URL", selected: true, showParams: false, params: [
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
								name: "color",
								type: "color",
								value: "#000000",
							},
						] },
					{ name: "sentiment", ru: "Оценка новостей", selected: true, showParams: false, params: [
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
								name: "color",
								type: "color",
								value: "#000000",
							},
						] },
					{ name: "category", ru: "Категория", selected: true, showParams: false, params: [
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
								name: "color",
								type: "color",
								value: "#000000",
							},
						] },
				]
			},
			{
				name: "list_rows", ru: "Список строк", type: "columns", value: [
					{ name: "number", ru: "Число", selected: "hide" },
					{ name: "content", ru: "Краткое содержание", selected: "default" },
					{ name: "date", ru: "Дата", selected: true, showParams: false, params: [
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
								name: "color",
								type: "color",
								value: "#000000",
							},
						] },
					{ name: "resource", ru: "Источник", selected: true, showParams: false, params: [
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
								name: "color",
								type: "color",
								value: "#000000",
							},
						] },
					{ name: "news_link", ru: "URL", selected: true, showParams: false, params: [
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
								name: "color",
								type: "color",
								value: "#000000",
							},
						] },
					{ name: "sentiment", ru: "Оценка новостей", selected: true, showParams: false, params: [
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
								name: "color",
								type: "color",
								value: "#000000",
							},
						] },
					{ name: "category", ru: "Категория", selected: true, showParams: false, params: [
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
								name: "color",
								type: "color",
								value: "#000000",
							},
						] },
				]
			},
			{
				name: "tag_highlight", ru: "Выделение тега", type: "dropdown", value: [
					{ name: "bold", ru: "Жирность", type: "checkbox", value: true },
					{ name: "italic", ru: "Курсив", type: "checkbox", value: true },
					{ name: "underline", ru: "Подчеркнуть", type: "checkbox", value: true },
					{ name: "color", ru: "Цвет текста", type: "color", value: "#000000", show: false },
					{ name: "back_color", ru: "Цвет фона", type: "color", value: "#ffff00", show: false },
				],
			},
			// {
			// 	name: "datetime_format", type: "select", outputIndex: true, value: [
			// 		{ name: "День-Месяц-Год", index: 0, selected: true },
			// 		{ name: "День-Месяц-Год Час:Мин", index: 1, selected: false },
			// 	]
			// },
			{
				name: "order", ru: "Порядок", type: "dropdown", value: [...createMap(newMap => {
					newMap.set({ name: "date", ru: "Дата", selected: false, type: "select", outputIndex: true }, [
						{ name: "По убыванию", index: 0, selected: true },
						{ name: "По возрастанию", index: 1, selected: false }
					])
				})], draggables: [...createMap(newMap => {
					newMap.set({ name: "sentiments", ru: "Тональность", type: "draggable", showResources: true, selected: true }, [
						{ name: "positive", ru: "Позитивные", selected: true, defaultPosition: 0 },
						{ name: "neutral", ru: "Нейтральные", selected: true, defaultPosition: 1 },
						{ name: "negative", ru: "Негативные", selected: true, defaultPosition: 2 },
					])
					newMap.set({ name: "categories", ru: "Категория", type: "draggable", showResources: false, selected: false }, [
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
			{ name: "text_length", ru: "Количество символов", selected: true, min: 70, max: 500, type: "number", value: 400 },
		])

	return reactive(ref(Object.entries([...map.entries()]).map(el => el[1])));
}