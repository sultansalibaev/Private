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
			// { name: "length", ru: "Длина", type: "number", value: 225 }
		])
		.set({ id: 'element-2', name: "period", ru: "Период", type: "default" }, [{
			name: "format", ru: "Формат", type: "select", outputIndex: true, value: [
				{ name: "День-Месяц-Год", index: 0, selected: true },
				{ name: "День-Месяц-Год Час:Мин", index: 1, selected: false }
			]
		}])
		.set({ id: 'element-3', name: "count", ru: "Общее количество сообщений", type: "default" }, [])
		.set({ id: 'element-4', name: "message_dynamic", ru: "Динамика сообщений", type: "default" }, [])
		.set({ id: 'element-5', name: "sentiments", ru: "Тональность сообщений", type: "graph" }, [
			{
				name: "type", ru: "Тип", type: "select", value: [...createMap(newMap => {
					newMap.set({ name: "pie", ru: "Пирог", type: "select", selected: true }, { "data_labels": false })
					newMap.set({ name: "bar", ru: "Бар", type: "select", selected: false }, { "data_labels": true, "labels": true })
					newMap.set({ name: "column", ru: "Столбец", type: "select", selected: false }, { "data_labels": true, "labels": true })
				})]
			},
			{
				name: "number", ru: "Число", type: "checkbox", value: true// number: input, object: [], array, boolean
			},
			{
				name: "percent", ru: "Процент", type: "checkbox", value: true
			},
		])
		.set({ id: 'element-6', name: "distribution", ru: "Распределение по СМИ, Соцсети", type: "graph" }, [
			{
				name: "type", ru: "Тип", type: "select", value: [...createMap(newMap => {
					newMap.set({ name: "pie", ru: "Пирог", type: "select", selected: true }, { "data_labels": false })
					newMap.set({ name: "bar", ru: "Бар", type: "select", selected: false }, { "data_labels": true, "labels": true })
					newMap.set({ name: "column", ru: "Столбец", type: "select", selected: false }, { "data_labels": true, "labels": true })
				})]
			},
			{
				name: "number", ru: "Число", type: "checkbox", value: true
			},
			{
				name: "percent", ru: "Процент", type: "checkbox", value: true
			},
		])
		.set({ id: 'element-7', name: "smi_distribution", ru: "Распределение по категориям источников в СМИ", type: "graph" }, [
			{
				name: "length", ru: "Длина", type: "number", min: 3, max: 10, value: 10
			},
			{
				name: "type", ru: "Тип", type: "select", value: [...createMap(newMap => {
					newMap.set({ name: "pie", ru: "Пирог", type: "select", selected: true }, { "data_labels": false })
					newMap.set({ name: "bar", ru: "Бар", type: "select", selected: false }, { "data_labels": true, "labels": true })
					newMap.set({ name: "column", ru: "Столбец", type: "select", selected: false }, { "data_labels": true })
				})]
			},
			{
				name: "number", ru: "Число", type: "checkbox", value: true
			},
			{
				name: "percent", ru: "Процент", type: "checkbox", value: true
			},
		])
		.set({ id: 'element-8', name: "soc_distribution", ru: "Распределение по соцсетям", type: "graph" }, [
			{
				name: "length", ru: "Длина", type: "number", min: 3, max: 10, value: 10
			},
			{
				name: "type", ru: "Тип", type: "select", value: [...createMap(newMap => {
					newMap.set({ name: "pie", ru: "Пирог", type: "select", selected: true }, { "data_labels": false })
					newMap.set({ name: "bar", ru: "Бар", type: "select", selected: false }, { "data_labels": true, "labels": true })
					newMap.set({ name: "column", ru: "Столбец", type: "select", selected: false }, { "data_labels": true })
				})]
			},
			{
				name: "number", ru: "Число", type: "checkbox", value: true
			},
			{
				name: "percent", ru: "Процент", type: "checkbox", value: true
			},
		])
		.set({ id: 'element-9', name: "media_top", ru: "Самые активные источники в СМИ", type: "graph" }, [
			{ name: "length", ru: "Длина", type: "number", min: 3, max: 20, value: 20 },
			{
				name: "type", ru: "Тип", type: "select", value: [...createMap(newMap => {
					newMap.set({ name: "pie", ru: "Пирог", type: "select", selected: false }, { "data_labels": false })
					newMap.set({ name: "bar", ru: "Бар", type: "select", selected: true }, { "data_labels": true, "labels": true })
					newMap.set({ name: "column", ru: "Столбец", type: "select", selected: false }, { "data_labels": true })
				})]
			},
			{ name: "number", ru: "Число", type: "checkbox", value: false },
			{ name: "percent", ru: "Процент", type: "checkbox", value: false },
		])
		.set({ id: 'element-10', name: "soc_top", ru: "Самые активные источники в Соцсетях", type: "graph" }, [
			{ name: "length", ru: "Длина", type: "number", min: 3, max: 20, value: 20 },
			{
				name: "type", ru: "Тип", type: "select", value: [...createMap(newMap => {
					newMap.set({ name: "pie", ru: "Пирог", type: "select", selected: false }, { "data_labels": false })
					newMap.set({ name: "bar", ru: "Бар", type: "select", selected: true }, { "data_labels": true, "labels": true })
					newMap.set({ name: "column", ru: "Столбец", type: "select", selected: false }, { "data_labels": true })
				})]
			},
			{ name: "number", ru: "Число", type: "checkbox", value: false },
			{ name: "percent", ru: "Процент", type: "checkbox", value: false },
		])
		.set({ id: 'element-11', name: "most_popular_soc", ru: "Самые активные источники в соцсети", type: "graph" }, [
			{ name: "length", ru: "Длина", type: "number", min: 3, max: 20, value: 20 },
			{
				name: "type", ru: "Тип", type: "select", value: [...createMap(newMap => {
					newMap.set({ name: "pie", ru: "Пирог", type: "select", selected: false }, { "data_labels": false })
					newMap.set({ name: "bar", ru: "Бар", type: "select", selected: true }, { "data_labels": true, "labels": true })
					newMap.set({ name: "column", ru: "Столбец", type: "select", selected: false }, { "data_labels": true })
				})]
			},
			{ name: "number", ru: "Число", type: "checkbox", value: false },
			{ name: "percent", ru: "Процент", type: "checkbox", value: false },
		])
		.set({ id: 'element-12', name: "top_negative", ru: "Топ негативных источников", type: "graph" }, [
			{ name: "length", ru: "Длина", type: "number", min: 3, max: 20, value: 20 },
			{
				name: "type", ru: "Тип", type: "select", value: [...createMap(newMap => {
					newMap.set({ name: "pie", ru: "Пирог", type: "select", selected: false }, { "data_labels": false })
					newMap.set({ name: "bar", ru: "Бар", type: "select", selected: true }, { "data_labels": true, "labels": true })
					newMap.set({ name: "column", ru: "Столбец", type: "select", selected: false }, { "data_labels": true })
				})]
			},
			{ name: "number", ru: "Число", type: "checkbox", value: false },
			{ name: "percent", ru: "Процент", type: "checkbox", value: false },
		])
		.set({ id: 'element-13', name: "world_map", ru: "Активность источников по регионам", type: "map" }, [
			{ name: "length", ru: "Длина", type: "number", min: 0, max: 44, value: 44 },
			{ name: "number", ru: "Число", type: "checkbox", value: true },
			{ name: "percent", ru: "Процент", type: "checkbox", value: true },
		])
		.set({ id: 'element-14', name: "kaz_map", ru: "Активность источников по РК", type: "map" }, [
			{ name: "length", ru: "Длина", type: "number", min: 0, max: 44, value: 44 },
			{ name: "number", ru: "Число", type: "checkbox", value: true },
			{ name: "percent", ru: "Процент", type: "checkbox", value: true },
		])
		.set({ id: 'element-15', name: "smi_table", ru: "СМИ", type: "table" }, [
			{
				name: "columns", ru: "Столбцы", type: "columns", value: [
					{ name: "number", ru: "Число", selected: "hide" },
					{ name: "title", ru: "Заголовок", selected: true },
					{ name: "content", ru: "Краткое содержание", selected: "default" },
					{ name: "date", ru: "Дата", selected: true },
					{ name: "category", ru: "Категория", selected: true },
					{ name: "resource", ru: "Источник", selected: true },
					{ name: "news_link", ru: "URL", selected: true },
					{ name: "sentiment", ru: "Оценка", selected: true },
				]
			},
			{
				name: "tag_highlight", ru: "Выделение тега", type: "dropdown", value: [
					{ name: "bold", ru: "Жирность", type: "checkbox", value: true },
					{ name: "tag_color", ru: "Цвет текста", type: "color", value: "#000000", show: false },
					{ name: "back_color", ru: "Цвет фона", type: "color", value: "#ffff00", show: false },
				],
			},
			{
				name: "datetime_format", ru: "Формат даты и времени", type: "select", outputIndex: true, value: [
					{ name: "День-Месяц-Год", index: 0, selected: true },
					{ name: "День-Месяц-Год Час:Мин", index: 1, selected: false },
				]
			},
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
					newMap.set({ name: "categories", ru: "Категории", type: "draggable", showResources: false, selected: false }, [
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
		.set({ id: 'element-16', name: "soc_table", ru: "Социальные сети", type: "table" }, [
			{
				name: "columns", ru: "Столбцы", type: "columns", value: [
					{ name: "number", ru: "Число", selected: "hide" },
					{ name: "content", ru: "Краткое содержание", selected: "default" },
					{ name: "date", ru: "Дата", selected: true },
					{ name: "resource", ru: "Источник", selected: true },
					{ name: "news_link", ru: "URL", selected: true },
					{ name: "sentiment", ru: "Оценка", selected: true },
				]
			},
			{
				name: "tag_highlight", ru: "Выделение тега", type: "dropdown", value: [
					{ name: "bold", ru: "Жирность", type: "checkbox", value: true },
					{ name: "tag_color", ru: "Цвет текста", type: "color", value: "#000000", show: false },
					{ name: "back_color", ru: "Цвет фона", type: "color", value: "#ffff00", show: false },
				],
			},
			{
				name: "datetime_format", ru: "Формат даты и времени", type: "select", outputIndex: true, value: [
					{ name: "День-Месяц-Год", index: 0, selected: true },
					{ name: "День-Месяц-Год Час:Мин", index: 1, selected: false }
				]
			},
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
					newMap.set({ name: "categories", ru: "Категории", type: "draggable", showResources: false, selected: false }, [
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