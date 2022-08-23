<template>
    <Constructs
        :elements="elements"
        :elementLanguageList="switchCase()"
        :loading="loading"
        :defaultPDFValues="defaultPDFValues"
        :additional="additional"
    />
    <Sidebar
        :elements="switchCase()"
        @loadingSpinner="loadingSpinner"
        :newElements="elements"
        :loading="loading"
        :additional="additional"
    />
</template>

<script>
import Constructs from "@/components/Constructs/Constructs.vue";
import Sidebar from "@/components/Sidebar/Sidebar.vue";

export default {
    name: "Content",

    components: {
        Constructs,
        Sidebar,
    },
    data() {
        return {
            defaultPDFValues: {
                count: {
                    title: {
                        rus: "Общее количество сообщений",
                        kaz: "Хабарламалардың жалпы саны",
                        eng: "Number of media publications",
                    },
                },
                message_dynamic: {
                    title: {
                        rus: "Динамика сообщений",
                        kaz: "Хабарламалар динамикасы",
                        eng: "Number of mentions",
                    },
                },
                sentiments: {
                    title: {
                        rus: "Тональность сообщений",
                        kaz: "Хабарламалардың жалпы сипаты",
                        eng: "Tonality of the publication",
                    },
                },
                distribution: {
                    title: {
                        rus: "Распределение по СМИ, Соцсети",
                        kaz: "БАҚ, Әлеуметтік желілер\nбойынша бөлу",
                        eng: "Breakdown by media,\nSocial Networks",
                    },
                },
                smi_distribution: {
                    title: {
                        rus: "Распределение по категориям\nисточников в СМИ",
                        kaz: "БАҚ бойынша бөлу",
                        eng: "Range of media",
                    },
                },
                soc_distribution: {
                    title: {
                        rus: "Распределение по соцсетям",
                        kaz: "Әлеуметтік желілер\nбойынша бөлу",
                        eng: "Range of social networks",
                    },
                },
                world_map: {
                    title: {
                        rus: "Активность источников по регионам",
                        kaz: "Мемлекеттер бойынша дереккөздер белсенділігі",
                        eng: "Source coverage by region",
                    },
                },
                kaz_map: {
                    title: {
                        rus: "Активность источников по РК",
                        kaz: "ҚР бойынша дереккөзде белсенділігі",
                        eng: "Source coverage by Kazakhstan regions",
                    },
                },
                media_top: {
                    title: {
                        rus: "Самые активные источники в СМИ",
                        kaz: "БАҚ бойынша ең белсенді дереккөздер",
                        eng: "Mass media - top sources",
                    },
                },
                soc_top: {
                    title: {
                        rus: "Самые активные источники в Соцсетях",
                        kaz: "Әлеуметтік желілер бойынша\nең белсенді дереккөздер",
                        eng: "Social media - top sources",
                    },
                },
                most_popular_soc: {
                    title: {
                        rus: "Самые активные источники в соцсети",
                        kaz: "бойынша ең белсенді дереккөздер",
                        eng: " - top sources",
                    },
                },
                smi_table: {
                    title: {
                        rus: "СМИ",
                        kaz: "БАҚ",
                        eng: "Media",
                    },
                    columns: {
                        title: {
                            rus: "Заголовок",
                            kaz: "Хабарлама тақырыбы",
                            eng: "Title",
                        },
                        content: {
                            rus: "Краткое содержание",
                            kaz: "Қысқаша мазмұны",
                            eng: "Summary",
                        },
                        date: {
                            rus: "Дата",
                            kaz: "Күні",
                            eng: "Date",
                        },
                        category: {
                            rus: "Категория",
                            kaz: "Категориясы",
                            eng: "Category",
                        },
                        resource: {
                            rus: "Источник",
                            kaz: "БАҚ Атауы",
                            eng: "Name",
                        },
                        news_link: {
                            rus: "URL",
                            kaz: "URL",
                            eng: "URL",
                        },
                        sentiment: {
                            rus: "Тональность",
                            kaz: "Реңкілік",
                            eng: "Tone",
                        },
                    },
                },
                soc_table: {
                    title: {
                        rus: "Социальные сети",
                        kaz: "Әлеуметтік желілер",
                        eng: "Social network",
                    },
                    columns: {
                        content: {
                            rus: "Краткое содержание",
                            kaz: "Қысқаша мазмұны",
                            eng: "Summary",
                        },
                        date: {
                            rus: "Дата",
                            kaz: "Күні",
                            eng: "Date",
                        },
                        resource: {
                            rus: "Источник",
                            kaz: "БАҚ Атауы",
                            eng: "Name",
                        },
                        news_link: {
                            rus: "URL",
                            kaz: "URL",
                            eng: "URL",
                        },
                        sentiment: {
                            rus: "Тональность",
                            kaz: "Реңкілік",
                            eng: "Tone",
                        },
                    },
                },
            },
            additional: {
                format: {
                    file: "pdf",
                    language: "rus",
                },
                full_text: false,
                merge_cells: true,
                orientation: 'landscape',
                menu: true,
            },
            wordElementList: [
                {
                    type: "default",
                    color: "#16395c",
                    id: "id-1",
                    name: "tags",
                    groups: "",
                    nameRU: "Теги",
                    options: [
                        {
                            id: "id-1_3",
                            value: "number", // YYYY-MM-DD HH:MM
                            valueRU: "Число",
                            type: "checkbox",
                            selected: true,
                        },
                        {
                            id: "id-1_4",
                            value: "percent", // YYYY-MM-DD HH:MM
                            valueRU: "Процент",
                            type: "checkbox",
                            selected: true,
                        },
                        {
                            id: "id-1_2",
                            value: "length", // YYYY-MM-DD HH:MM
                            valueRU: "Длина",
                            parentElement: true,
                            children: [
                                {
                                    id: "id-1_21",
                                    value: 90,
                                    valueRU: 90,
                                    type: "input",
                                    selected: true,
                                },
                            ],
                        },
                    ],
                },
                {
                    type: "default",
                    color: "#16395c",
                    id: "id-2",
                    name: "contents",
                    groups: "",
                    nameRU: "Контент",
                    options: [
                        {
                            id: "id-2_2",
                            value: "smi", // YYYY-MM-DD HH:MM
                            valueRU: "СМИ",
                            parentElement: true,
                            children: [
                                {
                                    id: "id-2_21",
                                    value: 50,
                                    valueRU: 50,
                                    type: "input",
                                    selected: true,
                                },
                            ],
                        },
                        {
                            id: "id-2_2",
                            value: "soc", // YYYY-MM-DD HH:MM
                            valueRU: "Соцсети",
                            parentElement: true,
                            children: [
                                {
                                    id: "id-2_21",
                                    value: 50,
                                    valueRU: 50,
                                    type: "input",
                                    selected: true,
                                },
                            ],
                        },
                        {
                            id: "id-2_3",
                            value: "table", // YYYY-MM-DD HH:MM
                            valueRU: "Таблица",
                            type: "checkbox",
                            selected: false,
                        },
                    ],
                },
                {
                    type: "table",
                    color: "#6e1369",
                    id: "id-3",
                    name: "smi",
                    groups: "",
                    nameRU: "СМИ",
                    options: [
                        // {
                        //     id: "id-3_1",
                        //     value: "title",
                        //     valueRU: "Заголовок",
                        //     parentElement: true,
                        //     children: [
                        //         {
                        //             id: "id-3_11",
                        //             value: "СМИ",
                        //             valueRU: "СМИ",
                        //             type: "input",
                        //             selected: true,
                        //             default: true,
                        //         },
                        //     ],
                        // },
                        {
                            id: "id-3_1",
                            value: "table", // YYYY-MM-DD HH:MM
                            valueRU: "Таблица",
                            type: "checkbox",
                            selected: false,
                        },
                        {
                            id: "id-3_2",
                            value: "columns",
                            valueRU: "Столбцы",
                            type: "parent",
                            parentElement: true,
                            children: [
                                {
                                    id: "id-3_21",
                                    value: "number",
                                    type: "hide",
                                    valueRU: "Число",
                                    parentElement: true,
                                    children: [
                                        {
                                            id: "id-3_211",
                                            type: "input",
                                            value: "№",
                                            valueRU: "№",
                                            selected: true,
                                            default: true,
                                        },
                                        {
                                            id: "id-3_212",
                                            type: "color",
                                            value: "#fc03c6",
                                            valueRU: "#fc03c6",
                                            color_picker: true,
                                        },
                                        {
                                            id: "id-3_213",
                                            value: "bold", // YYYY-MM-DD HH:MM
                                            valueRU: "Жирность",
                                            type: "checkbox",
                                            selected: false,
                                        },
                                        {
                                            id: "id-3_214",
                                            value: "italic", // YYYY-MM-DD HH:MM
                                            valueRU: "Курсив",
                                            type: "checkbox",
                                            selected: false,
                                        },
                                        {
                                            id: "id-3_215",
                                            value: "underline", // YYYY-MM-DD HH:MM
                                            valueRU: "Подчеркнуть",
                                            type: "checkbox",
                                            selected: false,
                                        },
                                        {
                                            id: "id-3_216",
                                            type: "checkbox",
                                            selected: true,
                                        },
                                    ],
                                },
                                {
                                    id: "id-3_22",
                                    value: "title",
                                    type: "column",
                                    valueRU: "Заголовок",
                                    parentElement: true,
                                    children: [
                                        {
                                            id: "id-3_221",
                                            type: "input",
                                            value: "Заголовок",
                                            valueRU: "Заголовок",
                                            selected: true,
                                            default: true,
                                        },
                                        {
                                            id: "id-3_222",
                                            type: "color",
                                            value: "#fc03c6",
                                            valueRU: "#fc03c6",
                                            color_picker: true,
                                        },
                                        {
                                            id: "id-3_223",
                                            value: "bold", // YYYY-MM-DD HH:MM
                                            valueRU: "Жирность",
                                            type: "checkbox",
                                            selected: false,
                                        },
                                        {
                                            id: "id-3_224",
                                            value: "italic", // YYYY-MM-DD HH:MM
                                            valueRU: "Курсив",
                                            type: "checkbox",
                                            selected: false,
                                        },
                                        {
                                            id: "id-3_225",
                                            value: "underline", // YYYY-MM-DD HH:MM
                                            valueRU: "Подчеркнуть",
                                            type: "checkbox",
                                            selected: false,
                                        },
                                        {
                                            id: "id-3_226",
                                            type: "checkbox",
                                            selected: true,
                                        },
                                    ],
                                },
                                {
                                    id: "id-3_23",
                                    value: "content",
                                    type: "column",
                                    valueRU: "Краткое содержание",
                                    parentElement: true,
                                    children: [
                                        {
                                            id: "id-3_231",
                                            type: "input",
                                            value: "Краткое содержание",
                                            valueRU: "Краткое содержание",
                                            selected: true,
                                            default: true,
                                        },
                                        {
                                            id: "id-3_232",
                                            type: "color",
                                            value: "#fc03c6",
                                            valueRU: "#fc03c6",
                                            color_picker: true,
                                        },
                                        {
                                            id: "id-3_233",
                                            value: "bold", // YYYY-MM-DD HH:MM
                                            valueRU: "Жирность",
                                            type: "checkbox",
                                            selected: false,
                                        },
                                        {
                                            id: "id-3_234",
                                            value: "italic", // YYYY-MM-DD HH:MM
                                            valueRU: "Курсив",
                                            type: "checkbox",
                                            selected: false,
                                        },
                                        {
                                            id: "id-3_235",
                                            value: "underline", // YYYY-MM-DD HH:MM
                                            valueRU: "Подчеркнуть",
                                            type: "checkbox",
                                            selected: false,
                                        },
                                        {
                                            id: "id-3_236",
                                            type: "checkbox",
                                            selected: true,
                                        },
                                    ],
                                },
                                {
                                    id: "id-3_24",
                                    value: "date",
                                    type: "column",
                                    valueRU: "Дата",
                                    parentElement: true,
                                    children: [
                                        {
                                            id: "id-3_241",
                                            type: "input",
                                            value: "Дата",
                                            valueRU: "Дата",
                                            selected: true,
                                            default: true,
                                        },
                                        {
                                            id: "id-3_242",
                                            type: "color",
                                            value: "#fc03c6",
                                            valueRU: "#fc03c6",
                                            color_picker: true,
                                        },
                                        {
                                            id: "id-3_243",
                                            value: "bold", // YYYY-MM-DD HH:MM
                                            valueRU: "Жирность",
                                            type: "checkbox",
                                            selected: false,
                                        },
                                        {
                                            id: "id-3_244",
                                            value: "italic", // YYYY-MM-DD HH:MM
                                            valueRU: "Курсив",
                                            type: "checkbox",
                                            selected: false,
                                        },
                                        {
                                            id: "id-3_245",
                                            value: "underline", // YYYY-MM-DD HH:MM
                                            valueRU: "Подчеркнуть",
                                            type: "checkbox",
                                            selected: false,
                                        },
                                        {
                                            id: "id-3_246",
                                            type: "checkbox",
                                            selected: true,
                                        },
                                    ],
                                },
                                {
                                    id: "id-3_25",
                                    value: "resource",
                                    type: "column",
                                    valueRU: "Источник",
                                    parentElement: true,
                                    children: [
                                        {
                                            id: "id-3_251",
                                            type: "input",
                                            value: "Источник",
                                            valueRU: "Источник",
                                            selected: true,
                                            default: true,
                                        },
                                        {
                                            id: "id-3_252",
                                            type: "color",
                                            value: "#fc03c6",
                                            valueRU: "#fc03c6",
                                            color_picker: true,
                                        },
                                        {
                                            id: "id-3_253",
                                            value: "bold", // YYYY-MM-DD HH:MM
                                            valueRU: "Жирность",
                                            type: "checkbox",
                                            selected: false,
                                        },
                                        {
                                            id: "id-3_254",
                                            value: "italic", // YYYY-MM-DD HH:MM
                                            valueRU: "Курсив",
                                            type: "checkbox",
                                            selected: false,
                                        },
                                        {
                                            id: "id-3_255",
                                            value: "underline", // YYYY-MM-DD HH:MM
                                            valueRU: "Подчеркнуть",
                                            type: "checkbox",
                                            selected: false,
                                        },
                                        {
                                            id: "id-3_256",
                                            type: "checkbox",
                                            selected: true,
                                        },
                                    ],
                                },
                                {
                                    id: "id-3_26",
                                    value: "news_link",
                                    type: "column",
                                    valueRU: "URL",
                                    parentElement: true,
                                    children: [
                                        {
                                            id: "id-3_261",
                                            type: "input",
                                            value: "URL",
                                            valueRU: "URL",
                                            selected: true,
                                            default: true,
                                        },
                                        {
                                            id: "id-3_262",
                                            type: "color",
                                            value: "#fc03c6",
                                            valueRU: "#fc03c6",
                                            color_picker: true,
                                        },
                                        {
                                            id: "id-3_263",
                                            value: "bold", // YYYY-MM-DD HH:MM
                                            valueRU: "Жирность",
                                            type: "checkbox",
                                            selected: false,
                                        },
                                        {
                                            id: "id-3_264",
                                            value: "italic", // YYYY-MM-DD HH:MM
                                            valueRU: "Курсив",
                                            type: "checkbox",
                                            selected: false,
                                        },
                                        {
                                            id: "id-3_265",
                                            value: "underline", // YYYY-MM-DD HH:MM
                                            valueRU: "Подчеркнуть",
                                            type: "checkbox",
                                            selected: false,
                                        },
                                        {
                                            id: "id-3_266",
                                            type: "checkbox",
                                            selected: true,
                                        },
                                    ],
                                },
                                {
                                    id: "id-3_27",
                                    value: "sentiment",
                                    type: "column",
                                    valueRU: "Оценка новостей",
                                    parentElement: true,
                                    children: [
                                        {
                                            id: "id-3_271",
                                            type: "input",
                                            value: "Оценка новостей",
                                            valueRU: "Оценка новостей",
                                            selected: true,
                                            default: true,
                                        },
                                        {
                                            id: "id-3_272",
                                            type: "color",
                                            value: "#fc03c6",
                                            valueRU: "#fc03c6",
                                            color_picker: true,
                                        },
                                        {
                                            id: "id-3_273",
                                            value: "bold", // YYYY-MM-DD HH:MM
                                            valueRU: "Жирность",
                                            type: "checkbox",
                                            selected: false,
                                        },
                                        {
                                            id: "id-3_274",
                                            value: "italic", // YYYY-MM-DD HH:MM
                                            valueRU: "Курсив",
                                            type: "checkbox",
                                            selected: false,
                                        },
                                        {
                                            id: "id-3_275",
                                            value: "underline", // YYYY-MM-DD HH:MM
                                            valueRU: "Подчеркнуть",
                                            type: "checkbox",
                                            selected: false,
                                        },
                                        {
                                            id: "id-3_276",
                                            type: "checkbox",
                                            selected: true,
                                        },
                                    ],
                                },
                                {
                                    id: "id-3_28",
                                    value: "category",
                                    type: "column",
                                    valueRU: "Категория",
                                    parentElement: true,
                                    children: [
                                        {
                                            id: "id-3_281",
                                            type: "input",
                                            value: "Категория",
                                            valueRU: "Категория",
                                            selected: true,
                                            default: true,
                                        },
                                        {
                                            id: "id-3_282",
                                            type: "color",
                                            value: "#fc03c6",
                                            valueRU: "#fc03c6",
                                            color_picker: true,
                                        },
                                        {
                                            id: "id-3_283",
                                            value: "bold", // YYYY-MM-DD HH:MM
                                            valueRU: "Жирность",
                                            type: "checkbox",
                                            selected: false,
                                        },
                                        {
                                            id: "id-3_284",
                                            value: "italic", // YYYY-MM-DD HH:MM
                                            valueRU: "Курсив",
                                            type: "checkbox",
                                            selected: false,
                                        },
                                        {
                                            id: "id-3_285",
                                            value: "underline", // YYYY-MM-DD HH:MM
                                            valueRU: "Подчеркнуть",
                                            type: "checkbox",
                                            selected: false,
                                        },
                                        {
                                            id: "id-3_286",
                                            type: "checkbox",
                                            selected: true,
                                        },
                                    ],
                                },
                            ],
                        },
                        {
                            id: "id-3_3",
                            value: "list_rows",
                            valueRU: "Список строк",
                            type: "parent",
                            parentElement: true,
                            children: [
                                {
                                    id: "id-3_31",
                                    value: "number",
                                    type: "hide",
                                    valueRU: "Число",
                                    parentElement: true,
                                    children: [
                                        {
                                            id: "id-3_311",
                                            type: "input",
                                            value: "№",
                                            valueRU: "№",
                                            selected: true,
                                            default: true,
                                        },
                                        {
                                            id: "id-3_312",
                                            type: "color",
                                            value: "#fc03c6",
                                            valueRU: "#fc03c6",
                                            color_picker: true,
                                        },
                                        {
                                            id: "id-3_313",
                                            value: "bold", // YYYY-MM-DD HH:MM
                                            valueRU: "Жирность",
                                            type: "checkbox",
                                            selected: false,
                                        },
                                        {
                                            id: "id-3_314",
                                            value: "italic", // YYYY-MM-DD HH:MM
                                            valueRU: "Курсив",
                                            type: "checkbox",
                                            selected: false,
                                        },
                                        {
                                            id: "id-3_315",
                                            value: "underline", // YYYY-MM-DD HH:MM
                                            valueRU: "Подчеркнуть",
                                            type: "checkbox",
                                            selected: false,
                                        },
                                        {
                                            id: "id-3_316",
                                            type: "checkbox",
                                            selected: true,
                                        },
                                    ],
                                },
                                {
                                    id: "id-3_32",
                                    value: "title",
                                    type: "column",
                                    valueRU: "Заголовок",
                                    parentElement: true,
                                    children: [
                                        {
                                            id: "id-3_321",
                                            type: "input",
                                            value: "Заголовок",
                                            valueRU: "Заголовок",
                                            selected: true,
                                            default: true,
                                        },
                                        {
                                            id: "id-3_322",
                                            type: "color",
                                            value: "#fc03c6",
                                            valueRU: "#fc03c6",
                                            color_picker: true,
                                        },
                                        {
                                            id: "id-3_323",
                                            value: "bold", // YYYY-MM-DD HH:MM
                                            valueRU: "Жирность",
                                            type: "checkbox",
                                            selected: false,
                                        },
                                        {
                                            id: "id-3_324",
                                            value: "italic", // YYYY-MM-DD HH:MM
                                            valueRU: "Курсив",
                                            type: "checkbox",
                                            selected: false,
                                        },
                                        {
                                            id: "id-3_325",
                                            value: "underline", // YYYY-MM-DD HH:MM
                                            valueRU: "Подчеркнуть",
                                            type: "checkbox",
                                            selected: false,
                                        },
                                        {
                                            id: "id-3_326",
                                            type: "checkbox",
                                            selected: true,
                                        },
                                    ],
                                },
                                {
                                    id: "id-3_33",
                                    value: "content",
                                    type: "column",
                                    valueRU: "Краткое содержание",
                                    parentElement: true,
                                    children: [
                                        {
                                            id: "id-3_331",
                                            type: "input",
                                            value: "Краткое содержание",
                                            valueRU: "Краткое содержание",
                                            selected: true,
                                            default: true,
                                        },
                                        {
                                            id: "id-3_332",
                                            type: "color",
                                            value: '#000000',
                                            valueRU: '#000000',
                                            color_picker: true,
                                        },
                                        {
                                            id: "id-3_333",
                                            value: "bold", // YYYY-MM-DD HH:MM
                                            valueRU: "Жирность",
                                            type: "checkbox",
                                            selected: false,
                                        },
                                        {
                                            id: "id-3_334",
                                            value: "italic", // YYYY-MM-DD HH:MM
                                            valueRU: "Курсив",
                                            type: "checkbox",
                                            selected: false,
                                        },
                                        {
                                            id: "id-3_335",
                                            value: "underline", // YYYY-MM-DD HH:MM
                                            valueRU: "Подчеркнуть",
                                            type: "checkbox",
                                            selected: false,
                                        },
                                        {
                                            id: "id-3_336",
                                            type: "checkbox",
                                            selected: true,
                                        },
                                    ],
                                },
                                {
                                    id: "id-3_34",
                                    value: "date",
                                    type: "column",
                                    valueRU: "Дата",
                                    parentElement: true,
                                    children: [
                                        {
                                            id: "id-3_341",
                                            type: "input",
                                            value: "Дата",
                                            valueRU: "Дата",
                                            selected: true,
                                            default: true,
                                        },
                                        {
                                            id: "id-3_342",
                                            type: "color",
                                            value: "#fc03c6",
                                            valueRU: "#fc03c6",
                                            color_picker: true,
                                        },
                                        {
                                            id: "id-3_343",
                                            value: "bold", // YYYY-MM-DD HH:MM
                                            valueRU: "Жирность",
                                            type: "checkbox",
                                            selected: false,
                                        },
                                        {
                                            id: "id-3_344",
                                            value: "italic", // YYYY-MM-DD HH:MM
                                            valueRU: "Курсив",
                                            type: "checkbox",
                                            selected: false,
                                        },
                                        {
                                            id: "id-3_345",
                                            value: "underline", // YYYY-MM-DD HH:MM
                                            valueRU: "Подчеркнуть",
                                            type: "checkbox",
                                            selected: false,
                                        },
                                        {
                                            id: "id-3_346",
                                            type: "checkbox",
                                            selected: true,
                                        },
                                    ],
                                },
                                {
                                    id: "id-3_35",
                                    value: "resource",
                                    type: "column",
                                    valueRU: "Источник",
                                    parentElement: true,
                                    children: [
                                        {
                                            id: "id-3_351",
                                            type: "input",
                                            value: "Источник",
                                            valueRU: "Источник",
                                            selected: true,
                                            default: true,
                                        },
                                        {
                                            id: "id-3_352",
                                            type: "color",
                                            value: "#fc03c6",
                                            valueRU: "#fc03c6",
                                            color_picker: true,
                                        },
                                        {
                                            id: "id-3_353",
                                            value: "bold", // YYYY-MM-DD HH:MM
                                            valueRU: "Жирность",
                                            type: "checkbox",
                                            selected: false,
                                        },
                                        {
                                            id: "id-3_354",
                                            value: "italic", // YYYY-MM-DD HH:MM
                                            valueRU: "Курсив",
                                            type: "checkbox",
                                            selected: false,
                                        },
                                        {
                                            id: "id-3_355",
                                            value: "underline", // YYYY-MM-DD HH:MM
                                            valueRU: "Подчеркнуть",
                                            type: "checkbox",
                                            selected: false,
                                        },
                                        {
                                            id: "id-3_356",
                                            type: "checkbox",
                                            selected: true,
                                        },
                                    ],
                                },
                                {
                                    id: "id-3_36",
                                    value: "news_link",
                                    type: "column",
                                    valueRU: "URL",
                                    parentElement: true,
                                    children: [
                                        {
                                            id: "id-3_361",
                                            type: "input",
                                            value: "URL",
                                            valueRU: "URL",
                                            selected: true,
                                            default: true,
                                        },
                                        {
                                            id: "id-3_362",
                                            type: "color",
                                            value: "#fc03c6",
                                            valueRU: "#fc03c6",
                                            color_picker: true,
                                        },
                                        {
                                            id: "id-3_363",
                                            value: "bold", // YYYY-MM-DD HH:MM
                                            valueRU: "Жирность",
                                            type: "checkbox",
                                            selected: false,
                                        },
                                        {
                                            id: "id-3_364",
                                            value: "italic", // YYYY-MM-DD HH:MM
                                            valueRU: "Курсив",
                                            type: "checkbox",
                                            selected: false,
                                        },
                                        {
                                            id: "id-3_365",
                                            value: "underline", // YYYY-MM-DD HH:MM
                                            valueRU: "Подчеркнуть",
                                            type: "checkbox",
                                            selected: false,
                                        },
                                        {
                                            id: "id-3_366",
                                            type: "checkbox",
                                            selected: true,
                                        },
                                    ],
                                },
                                {
                                    id: "id-3_37",
                                    value: "sentiment",
                                    type: "column",
                                    valueRU: "Оценка новостей",
                                    parentElement: true,
                                    children: [
                                        {
                                            id: "id-3_371",
                                            type: "input",
                                            value: "Оценка новостей",
                                            valueRU: "Оценка новостей",
                                            selected: true,
                                            default: true,
                                        },
                                        {
                                            id: "id-3_372",
                                            type: "color",
                                            value: '#000000',
                                            valueRU: '#000000',
                                            color_picker: true,
                                        },
                                        {
                                            id: "id-3_373",
                                            value: "bold", // YYYY-MM-DD HH:MM
                                            valueRU: "Жирность",
                                            type: "checkbox",
                                            selected: false,
                                        },
                                        {
                                            id: "id-3_374",
                                            value: "italic", // YYYY-MM-DD HH:MM
                                            valueRU: "Курсив",
                                            type: "checkbox",
                                            selected: false,
                                        },
                                        {
                                            id: "id-3_375",
                                            value: "underline", // YYYY-MM-DD HH:MM
                                            valueRU: "Подчеркнуть",
                                            type: "checkbox",
                                            selected: false,
                                        },
                                        {
                                            id: "id-3_376",
                                            type: "checkbox",
                                            selected: true,
                                        },
                                    ],
                                },
                                {
                                    id: "id-3_38",
                                    value: "category",
                                    type: "column",
                                    valueRU: "Категория",
                                    parentElement: true,
                                    children: [
                                        {
                                            id: "id-3_381",
                                            type: "input",
                                            value: "Категория",
                                            valueRU: "Категория",
                                            selected: true,
                                            default: true,
                                        },
                                        {
                                            id: "id-3_382",
                                            type: "color",
                                            value: "#fc03c6",
                                            valueRU: "#fc03c6",
                                            color_picker: true,
                                        },
                                        {
                                            id: "id-3_383",
                                            value: "bold", // YYYY-MM-DD HH:MM
                                            valueRU: "Жирность",
                                            type: "checkbox",
                                            selected: false,
                                        },
                                        {
                                            id: "id-3_384",
                                            value: "italic", // YYYY-MM-DD HH:MM
                                            valueRU: "Курсив",
                                            type: "checkbox",
                                            selected: false,
                                        },
                                        {
                                            id: "id-3_385",
                                            value: "underline", // YYYY-MM-DD HH:MM
                                            valueRU: "Подчеркнуть",
                                            type: "checkbox",
                                            selected: false,
                                        },
                                        {
                                            id: "id-3_386",
                                            type: "checkbox",
                                            selected: true,
                                        },
                                    ],
                                },
                            ],
                        },
                        {
                            id: "id-3_4",
                            value: "tag_highlight",
                            valueRU: "Выделение тега",
                            type: "select",
                            parentElement: true,
                            children: [
                                {
                                    id: "id-3_41",
                                    value: "bold",
                                    valueRU: "Жирность",
                                    type: "checkbox",
                                    parentElement: false,
                                    selected: true,
                                },
                                {
                                    id: "id-3_42",
                                    value: "italic",
                                    valueRU: "Курсив",
                                    type: "checkbox",
                                    parentElement: false,
                                    selected: false,
                                },
                                {
                                    id: "id-3_43",
                                    value: "underline",
                                    valueRU: "Подчеркнуть",
                                    type: "checkbox",
                                    parentElement: false,
                                    selected: false,
                                },
                                {
                                    id: "id-3_44",
                                    value: "color",
                                    valueRU: "Цвет текста",
                                    type: "parent",
                                    color_picker: true,
                                    parentElement: true,
                                    children: [
                                        {
                                            id: "id-3_441",
                                            type: "color",
                                            value: "#000000",
                                            valueRU: "#000000",
                                            selected: true,
                                            default: true,
                                        },
                                    ],
                                },
                                {
                                    id: "id-3_45",
                                    value: "back_color",
                                    valueRU: "Цвет фона",
                                    type: "parent",
                                    color_picker: true,
                                    parentElement: true,
                                    children: [
                                        {
                                            id: "id-3_451",
                                            type: "color",
                                            value: "#000000",
                                            valueRU: "#000000",
                                            selected: true,
                                            default: true,
                                        },
                                    ],
                                },
                            ],
                        },
                        {
                            id: "id-3_5",
                            value: "datetime_format",
                            valueRU: "Формат даты и времени",
                            type: "hide",
                            parentElement: true,
                            children: [
                                {
                                    id: "id-3_51",
                                    value: "%Y_%m_%d %H:%M",
                                    valueRU: "Год-Месяц-День",
                                    type: "select",
                                    parentElement: false,
                                    selected: true,
                                },
                            ],
                        },
                        {
                            id: "id-3_6",
                            value: "order",
                            valueRU: "Порядок",
                            type: "select",
                            parentElement: true,
                            children: [
                                {
                                    id: "id-3_61",
                                    value: "date",
                                    valueRU: "Дата",
                                    type: "parent",
                                    parentElement: false,
                                    selected: true,
                                    children: [
                                        {
                                            id: "id-3_611",
                                            value: 1,
                                            valueRU: "По убыванию",
                                            type: "select",
                                            parentElement: false,
                                            selected: true,
                                        },
                                        {
                                            id: "id-3_612",
                                            value: 0,
                                            valueRU: "По возрастанию",
                                            type: "select",
                                            parentElement: false,
                                            selected: false,
                                        },
                                    ],
                                },
                                {
                                    id: "id-3_62",
                                    value: "resource",
                                    valueRU: "Ресурсы",
                                    type: "parent",
                                    parentElement: false,
                                    selected: false,
                                    children: [
                                        {
                                            id: "id-3_621",
                                            value: 0,
                                            valueRU: "Выключить",
                                            type: "select",
                                            parentElement: false,
                                            selected: true,
                                        },
                                        {
                                            id: "id-3_622",
                                            value: 2,
                                            valueRU: "По убыванию",
                                            type: "select",
                                            parentElement: false,
                                            selected: false,
                                        },
                                        {
                                            id: "id-3_623",
                                            value: 1,
                                            valueRU: "По возрастанию",
                                            type: "select",
                                            parentElement: false,
                                            selected: false,
                                        },
                                    ],
                                },
                                {
                                    id: "id-3_63",
                                    value: "sentiments",
                                    valueRU: "Оценка",
                                    type: "parent",
                                    parentElement: false,
                                    selected: false,
                                    children: [
                                        {
                                            id: "id-3_632",
                                            value: "neutral",
                                            valueRU: "Нейтральные",
                                            type: "draggable",
                                        },
                                        {
                                            id: "id-3_633",
                                            value: "negative",
                                            valueRU: "Негаитивные",
                                            type: "draggable",
                                        },
                                        {
                                            id: "id-3_631",
                                            value: "positive",
                                            valueRU: "Позитивные",
                                            type: "draggable",
                                        },
                                    ],
                                },
                            ],
                        },
                        {
                            id: "id-3_7",
                            value: "text_length",
                            valueRU: "Количество символов",
                            parentElement: true,
                            children: [
                                {
                                    id: "id-3_71",
                                    value: 0,
                                    valueRU: 0,
                                    type: "input",
                                },
                            ],
                        },
                    ],
                },
                {
                    type: "table",
                    color: "#6e1369",
                    id: "id-4",
                    name: "soc",
                    groups: "",
                    nameRU: "Соцсети!",
                    options: [
                        // {
                        //     id: "id-4_1",
                        //     value: "title",
                        //     valueRU: "Заголовок",
                        //     parentElement: true,
                        //     children: [
                        //         {
                        //             id: "id-4_11",
                        //             value: "Соцсети!",
                        //             valueRU: "Соцсети!",
                        //             type: "input",
                        //             selected: true,
                        //             default: true,
                        //         },
                        //     ],
                        // },
                        {
                            id: "id-4_1",
                            value: "table", // YYYY-MM-DD HH:MM
                            valueRU: "Таблица",
                            type: "checkbox",
                            selected: true,
                        },
                        {
                            id: "id-4_2",
                            value: "columns",
                            valueRU: "Столбцы",
                            type: "parent",
                            parentElement: true,
                            children: [
                                {
                                    id: "id-4_21",
                                    value: "number",
                                    type: "hide",
                                    valueRU: "Число",
                                    parentElement: true,
                                    children: [
                                        {
                                            id: "id-4_211",
                                            type: "input",
                                            value: "№",
                                            valueRU: "№",
                                            selected: true,
                                            default: true,
                                        },
                                        {
                                            id: "id-4_212",
                                            type: "color",
                                            value: "#f5426c",
                                            valueRU: "#f5426c",
                                            color_picker: true,
                                        },
                                        {
                                            id: "id-4_213",
                                            value: "bold", // YYYY-MM-DD HH:MM
                                            valueRU: "Жирность",
                                            type: "checkbox",
                                            selected: false,
                                        },
                                        {
                                            id: "id-4_214",
                                            value: "italic", // YYYY-MM-DD HH:MM
                                            valueRU: "Курсив",
                                            type: "checkbox",
                                            selected: false,
                                        },
                                        {
                                            id: "id-4_215",
                                            value: "underline", // YYYY-MM-DD HH:MM
                                            valueRU: "Подчеркнуть",
                                            type: "checkbox",
                                            selected: false,
                                        },
                                        {
                                            id: "id-4_216",
                                            type: "checkbox",
                                            selected: true,
                                        },
                                    ],
                                },
                                {
                                    id: "id-4_23",
                                    value: "content",
                                    type: "column",
                                    valueRU: "Краткое содержание",
                                    parentElement: true,
                                    children: [
                                        {
                                            id: "id-4_231",
                                            type: "input",
                                            value: "Краткое содержание",
                                            valueRU: "Краткое содержание",
                                            selected: true,
                                            default: true,
                                        },
                                        {
                                            id: "id-4_232",
                                            type: "color",
                                            value: "#f5426c",
                                            valueRU: "#f5426c",
                                            color_picker: true,
                                        },
                                        {
                                            id: "id-4_233",
                                            value: "bold", // YYYY-MM-DD HH:MM
                                            valueRU: "Жирность",
                                            type: "checkbox",
                                            selected: false,
                                        },
                                        {
                                            id: "id-4_234",
                                            value: "italic", // YYYY-MM-DD HH:MM
                                            valueRU: "Курсив",
                                            type: "checkbox",
                                            selected: false,
                                        },
                                        {
                                            id: "id-4_235",
                                            value: "underline", // YYYY-MM-DD HH:MM
                                            valueRU: "Подчеркнуть",
                                            type: "checkbox",
                                            selected: false,
                                        },
                                        {
                                            id: "id-4_236",
                                            type: "checkbox",
                                            selected: true,
                                        },
                                    ],
                                },
                                {
                                    id: "id-4_24",
                                    value: "date",
                                    type: "column",
                                    valueRU: "Дата",
                                    parentElement: true,
                                    children: [
                                        {
                                            id: "id-4_241",
                                            type: "input",
                                            value: "Дата",
                                            valueRU: "Дата",
                                            selected: true,
                                            default: true,
                                        },
                                        {
                                            id: "id-4_242",
                                            type: "color",
                                            value: "#f5426c",
                                            valueRU: "#f5426c",
                                            color_picker: true,
                                        },
                                        {
                                            id: "id-4_243",
                                            value: "bold", // YYYY-MM-DD HH:MM
                                            valueRU: "Жирность",
                                            type: "checkbox",
                                            selected: false,
                                        },
                                        {
                                            id: "id-4_244",
                                            value: "italic", // YYYY-MM-DD HH:MM
                                            valueRU: "Курсив",
                                            type: "checkbox",
                                            selected: false,
                                        },
                                        {
                                            id: "id-4_245",
                                            value: "underline", // YYYY-MM-DD HH:MM
                                            valueRU: "Подчеркнуть",
                                            type: "checkbox",
                                            selected: false,
                                        },
                                        {
                                            id: "id-4_246",
                                            type: "checkbox",
                                            selected: true,
                                        },
                                    ],
                                },
                                {
                                    id: "id-4_25",
                                    value: "resource",
                                    type: "column",
                                    valueRU: "Источник",
                                    parentElement: true,
                                    children: [
                                        {
                                            id: "id-4_251",
                                            type: "input",
                                            value: "Источник",
                                            valueRU: "Источник",
                                            selected: true,
                                            default: true,
                                        },
                                        {
                                            id: "id-4_252",
                                            type: "color",
                                            value: "#f5426c",
                                            valueRU: "#f5426c",
                                            color_picker: true,
                                        },
                                        {
                                            id: "id-4_253",
                                            value: "bold", // YYYY-MM-DD HH:MM
                                            valueRU: "Жирность",
                                            type: "checkbox",
                                            selected: false,
                                        },
                                        {
                                            id: "id-4_254",
                                            value: "italic", // YYYY-MM-DD HH:MM
                                            valueRU: "Курсив",
                                            type: "checkbox",
                                            selected: false,
                                        },
                                        {
                                            id: "id-4_255",
                                            value: "underline", // YYYY-MM-DD HH:MM
                                            valueRU: "Подчеркнуть",
                                            type: "checkbox",
                                            selected: false,
                                        },
                                        {
                                            id: "id-4_256",
                                            type: "checkbox",
                                            selected: true,
                                        },
                                    ],
                                },
                                {
                                    id: "id-4_26",
                                    value: "news_link",
                                    type: "column",
                                    valueRU: "URL",
                                    parentElement: true,
                                    children: [
                                        {
                                            id: "id-4_261",
                                            type: "input",
                                            value: "URL",
                                            valueRU: "URL",
                                            selected: true,
                                            default: true,
                                        },
                                        {
                                            id: "id-4_262",
                                            type: "color",
                                            value: "#f5426c",
                                            valueRU: "#f5426c",
                                            color_picker: true,
                                        },
                                        {
                                            id: "id-4_263",
                                            value: "bold", // YYYY-MM-DD HH:MM
                                            valueRU: "Жирность",
                                            type: "checkbox",
                                            selected: false,
                                        },
                                        {
                                            id: "id-4_264",
                                            value: "italic", // YYYY-MM-DD HH:MM
                                            valueRU: "Курсив",
                                            type: "checkbox",
                                            selected: false,
                                        },
                                        {
                                            id: "id-4_265",
                                            value: "underline", // YYYY-MM-DD HH:MM
                                            valueRU: "Подчеркнуть",
                                            type: "checkbox",
                                            selected: false,
                                        },
                                        {
                                            id: "id-4_266",
                                            type: "checkbox",
                                            selected: true,
                                        },
                                    ],
                                },
                                {
                                    id: "id-4_27",
                                    value: "sentiment",
                                    type: "column",
                                    valueRU: "Оценка новостей",
                                    parentElement: true,
                                    children: [
                                        {
                                            id: "id-4_271",
                                            type: "input",
                                            value: "Оценка новостей",
                                            valueRU: "Оценка новостей",
                                            selected: true,
                                            default: true,
                                        },
                                        {
                                            id: "id-4_272",
                                            type: "color",
                                            value: "#f5426c",
                                            valueRU: "#f5426c",
                                            color_picker: true,
                                        },
                                        {
                                            id: "id-4_273",
                                            value: "bold", // YYYY-MM-DD HH:MM
                                            valueRU: "Жирность",
                                            type: "checkbox",
                                            selected: false,
                                        },
                                        {
                                            id: "id-4_274",
                                            value: "italic", // YYYY-MM-DD HH:MM
                                            valueRU: "Курсив",
                                            type: "checkbox",
                                            selected: false,
                                        },
                                        {
                                            id: "id-4_275",
                                            value: "underline", // YYYY-MM-DD HH:MM
                                            valueRU: "Подчеркнуть",
                                            type: "checkbox",
                                            selected: false,
                                        },
                                        {
                                            id: "id-4_276",
                                            type: "checkbox",
                                            selected: true,
                                        },
                                    ],
                                },
                                {
                                    id: "id-4_28",
                                    value: "category",
                                    type: "column",
                                    valueRU: "Категория",
                                    parentElement: true,
                                    children: [
                                        {
                                            id: "id-4_281",
                                            type: "input",
                                            value: "Категория",
                                            valueRU: "Категория",
                                            selected: true,
                                            default: true,
                                        },
                                        {
                                            id: "id-4_282",
                                            type: "color",
                                            value: "#f5426c",
                                            valueRU: "#f5426c",
                                            color_picker: true,
                                        },
                                        {
                                            id: "id-4_283",
                                            value: "bold", // YYYY-MM-DD HH:MM
                                            valueRU: "Жирность",
                                            type: "checkbox",
                                            selected: false,
                                        },
                                        {
                                            id: "id-4_284",
                                            value: "italic", // YYYY-MM-DD HH:MM
                                            valueRU: "Курсив",
                                            type: "checkbox",
                                            selected: false,
                                        },
                                        {
                                            id: "id-4_285",
                                            value: "underline", // YYYY-MM-DD HH:MM
                                            valueRU: "Подчеркнуть",
                                            type: "checkbox",
                                            selected: false,
                                        },
                                        {
                                            id: "id-4_286",
                                            type: "checkbox",
                                            selected: true,
                                        },
                                    ],
                                },
                            ],
                        },
                        {
                            id: "id-4_3",
                            value: "list_rows",
                            valueRU: "Список строк",
                            type: "parent",
                            parentElement: true,
                            children: [
                                {
                                    id: "id-4_31",
                                    value: "number",
                                    type: "hide",
                                    valueRU: "Число",
                                    parentElement: true,
                                    children: [
                                        {
                                            id: "id-4_311",
                                            type: "input",
                                            value: "№",
                                            valueRU: "№",
                                            selected: true,
                                            default: true,
                                        },
                                        {
                                            id: "id-4_312",
                                            type: "color",
                                            value: "#f5426c",
                                            valueRU: "#f5426c",
                                            color_picker: true,
                                        },
                                        {
                                            id: "id-4_313",
                                            value: "bold", // YYYY-MM-DD HH:MM
                                            valueRU: "Жирность",
                                            type: "checkbox",
                                            selected: false,
                                        },
                                        {
                                            id: "id-4_314",
                                            value: "italic", // YYYY-MM-DD HH:MM
                                            valueRU: "Курсив",
                                            type: "checkbox",
                                            selected: false,
                                        },
                                        {
                                            id: "id-4_315",
                                            value: "underline", // YYYY-MM-DD HH:MM
                                            valueRU: "Подчеркнуть",
                                            type: "checkbox",
                                            selected: false,
                                        },
                                        {
                                            id: "id-4_316",
                                            type: "checkbox",
                                            selected: true,
                                        },
                                    ],
                                },
                                {
                                    id: "id-4_33",
                                    value: "content",
                                    type: "column",
                                    valueRU: "Краткое содержание",
                                    parentElement: true,
                                    children: [
                                        {
                                            id: "id-4_331",
                                            type: "input",
                                            value: "Краткое содержание",
                                            valueRU: "Краткое содержание",
                                            selected: true,
                                            default: true,
                                        },
                                        {
                                            id: "id-4_332",
                                            type: "color",
                                            value: '#00f26c',
                                            valueRU: '#00f26c',
                                            color_picker: true,
                                        },
                                        {
                                            id: "id-4_333",
                                            value: "bold", // YYYY-MM-DD HH:MM
                                            valueRU: "Жирность",
                                            type: "checkbox",
                                            selected: false,
                                        },
                                        {
                                            id: "id-4_334",
                                            value: "italic", // YYYY-MM-DD HH:MM
                                            valueRU: "Курсив",
                                            type: "checkbox",
                                            selected: false,
                                        },
                                        {
                                            id: "id-4_335",
                                            value: "underline", // YYYY-MM-DD HH:MM
                                            valueRU: "Подчеркнуть",
                                            type: "checkbox",
                                            selected: false,
                                        },
                                        {
                                            id: "id-4_336",
                                            type: "checkbox",
                                            selected: true,
                                        },
                                    ],
                                },
                                {
                                    id: "id-4_34",
                                    value: "date",
                                    type: "column",
                                    valueRU: "Дата",
                                    parentElement: true,
                                    children: [
                                        {
                                            id: "id-4_341",
                                            type: "input",
                                            value: "Дата",
                                            valueRU: "Дата",
                                            selected: true,
                                            default: true,
                                        },
                                        {
                                            id: "id-4_342",
                                            type: "color",
                                            value: "#f5426c",
                                            valueRU: "#f5426c",
                                            color_picker: true,
                                        },
                                        {
                                            id: "id-4_343",
                                            value: "bold", // YYYY-MM-DD HH:MM
                                            valueRU: "Жирность",
                                            type: "checkbox",
                                            selected: false,
                                        },
                                        {
                                            id: "id-4_344",
                                            value: "italic", // YYYY-MM-DD HH:MM
                                            valueRU: "Курсив",
                                            type: "checkbox",
                                            selected: false,
                                        },
                                        {
                                            id: "id-4_345",
                                            value: "underline", // YYYY-MM-DD HH:MM
                                            valueRU: "Подчеркнуть",
                                            type: "checkbox",
                                            selected: false,
                                        },
                                        {
                                            id: "id-4_346",
                                            type: "checkbox",
                                            selected: true,
                                        },
                                    ],
                                },
                                {
                                    id: "id-4_35",
                                    value: "resource",
                                    type: "column",
                                    valueRU: "Источник",
                                    parentElement: true,
                                    children: [
                                        {
                                            id: "id-4_351",
                                            type: "input",
                                            value: "Источник",
                                            valueRU: "Источник",
                                            selected: true,
                                            default: true,
                                        },
                                        {
                                            id: "id-4_352",
                                            type: "color",
                                            value: "#f5426c",
                                            valueRU: "#f5426c",
                                            color_picker: true,
                                        },
                                        {
                                            id: "id-4_353",
                                            value: "bold", // YYYY-MM-DD HH:MM
                                            valueRU: "Жирность",
                                            type: "checkbox",
                                            selected: false,
                                        },
                                        {
                                            id: "id-4_354",
                                            value: "italic", // YYYY-MM-DD HH:MM
                                            valueRU: "Курсив",
                                            type: "checkbox",
                                            selected: false,
                                        },
                                        {
                                            id: "id-4_355",
                                            value: "underline", // YYYY-MM-DD HH:MM
                                            valueRU: "Подчеркнуть",
                                            type: "checkbox",
                                            selected: false,
                                        },
                                        {
                                            id: "id-4_356",
                                            type: "checkbox",
                                            selected: true,
                                        },
                                    ],
                                },
                                {
                                    id: "id-4_36",
                                    value: "news_link",
                                    type: "column",
                                    valueRU: "URL",
                                    parentElement: true,
                                    children: [
                                        {
                                            id: "id-4_361",
                                            type: "input",
                                            value: "URL",
                                            valueRU: "URL",
                                            selected: true,
                                            default: true,
                                        },
                                        {
                                            id: "id-4_362",
                                            type: "color",
                                            value: "#000000",
                                            valueRU: "#000000",
                                            color_picker: true,
                                        },
                                        {
                                            id: "id-4_363",
                                            value: "bold", // YYYY-MM-DD HH:MM
                                            valueRU: "Жирность",
                                            type: "checkbox",
                                            selected: false,
                                        },
                                        {
                                            id: "id-4_364",
                                            value: "italic", // YYYY-MM-DD HH:MM
                                            valueRU: "Курсив",
                                            type: "checkbox",
                                            selected: false,
                                        },
                                        {
                                            id: "id-4_365",
                                            value: "underline", // YYYY-MM-DD HH:MM
                                            valueRU: "Подчеркнуть",
                                            type: "checkbox",
                                            selected: false,
                                        },
                                        {
                                            id: "id-4_366",
                                            type: "checkbox",
                                            selected: true,
                                        },
                                    ],
                                },
                                {
                                    id: "id-4_37",
                                    value: "sentiment",
                                    type: "column",
                                    valueRU: "Оценка новостей",
                                    parentElement: true,
                                    children: [
                                        {
                                            id: "id-4_371",
                                            type: "input",
                                            value: "Оценка новостей",
                                            valueRU: "Оценка новостей",
                                            selected: true,
                                            default: true,
                                        },
                                        {
                                            id: "id-4_372",
                                            type: "color",
                                            value: '#00f26c',
                                            valueRU: '#00f26c',
                                            color_picker: true,
                                        },
                                        {
                                            id: "id-4_373",
                                            value: "bold", // YYYY-MM-DD HH:MM
                                            valueRU: "Жирность",
                                            type: "checkbox",
                                            selected: false,
                                        },
                                        {
                                            id: "id-4_374",
                                            value: "italic", // YYYY-MM-DD HH:MM
                                            valueRU: "Курсив",
                                            type: "checkbox",
                                            selected: false,
                                        },
                                        {
                                            id: "id-4_375",
                                            value: "underline", // YYYY-MM-DD HH:MM
                                            valueRU: "Подчеркнуть",
                                            type: "checkbox",
                                            selected: false,
                                        },
                                        {
                                            id: "id-4_376",
                                            type: "checkbox",
                                            selected: true,
                                        },
                                    ],
                                },
                                {
                                    id: "id-4_38",
                                    value: "category",
                                    type: "column",
                                    valueRU: "Категория",
                                    parentElement: true,
                                    children: [
                                        {
                                            id: "id-4_381",
                                            type: "input",
                                            value: "Категория",
                                            valueRU: "Категория",
                                            selected: true,
                                            default: true,
                                        },
                                        {
                                            id: "id-4_382",
                                            type: "color",
                                            value: "#f5426c",
                                            valueRU: "#f5426c",
                                            color_picker: true,
                                        },
                                        {
                                            id: "id-4_383",
                                            value: "bold", // YYYY-MM-DD HH:MM
                                            valueRU: "Жирность",
                                            type: "checkbox",
                                            selected: false,
                                        },
                                        {
                                            id: "id-4_384",
                                            value: "italic", // YYYY-MM-DD HH:MM
                                            valueRU: "Курсив",
                                            type: "checkbox",
                                            selected: false,
                                        },
                                        {
                                            id: "id-4_385",
                                            value: "underline", // YYYY-MM-DD HH:MM
                                            valueRU: "Подчеркнуть",
                                            type: "checkbox",
                                            selected: false,
                                        },
                                        {
                                            id: "id-4_386",
                                            type: "checkbox",
                                            selected: true,
                                        },
                                    ],
                                },
                            ],
                        },
                        {
                            id: "id-4_4",
                            value: "tag_highlight",
                            valueRU: "Выделение тега",
                            type: "select",
                            parentElement: true,
                            children: [
                                {
                                    id: "id-4_41",
                                    value: "bold",
                                    valueRU: "Жирность",
                                    type: "checkbox",
                                    parentElement: false,
                                    selected: true,
                                },
                                {
                                    id: "id-4_42",
                                    value: "italic",
                                    valueRU: "Курсив",
                                    type: "checkbox",
                                    parentElement: false,
                                    selected: true,
                                },
                                {
                                    id: "id-4_43",
                                    value: "underline",
                                    valueRU: "Подчеркнуть",
                                    type: "checkbox",
                                    parentElement: false,
                                    selected: true,
                                },
                                {
                                    id: "id-4_44",
                                    value: "color",
                                    valueRU: "Цвет текста",
                                    type: "parent",
                                    color_picker: true,
                                    parentElement: true,
                                    children: [
                                        {
                                            id: "id-4_441",
                                            type: "color",
                                            value: "#fc03c6",
                                            valueRU: "#fc03c6",
                                            selected: true,
                                            default: true,
                                        },
                                    ],
                                },
                                {
                                    id: "id-4_45",
                                    value: "back_color",
                                    valueRU: "Цвет фона",
                                    type: "parent",
                                    color_picker: true,
                                    parentElement: true,
                                    children: [
                                        {
                                            id: "id-4_451",
                                            type: "color",
                                            value: "#000000",
                                            valueRU: "#000000",
                                            selected: true,
                                            default: true,
                                        },
                                    ],
                                },
                            ],
                        },
                        {
                            id: "id-4_5",
                            value: "datetime_format",
                            valueRU: "Формат даты и времени",
                            type: "hide",
                            parentElement: true,
                            children: [
                                {
                                    id: "id-4_51",
                                    value: "%Y_%m_%d %H:%M",
                                    valueRU: "Год-Месяц-День",
                                    type: "select",
                                    parentElement: false,
                                    selected: true,
                                },
                            ],
                        },
                        {
                            id: "id-4_6",
                            value: "order",
                            valueRU: "Порядок",
                            type: "select",
                            parentElement: true,
                            children: [
                                {
                                    id: "id-4_61",
                                    value: "date",
                                    valueRU: "Дата",
                                    type: "parent",
                                    parentElement: false,
                                    selected: true,
                                    children: [
                                        {
                                            id: "id-4_611",
                                            value: 1,
                                            valueRU: "По убыванию",
                                            type: "select",
                                            parentElement: false,
                                            selected: true,
                                        },
                                        {
                                            id: "id-4_612",
                                            value: 0,
                                            valueRU: "По возрастанию",
                                            type: "select",
                                            parentElement: false,
                                            selected: false,
                                        },
                                    ],
                                },
                                {
                                    id: "id-4_62",
                                    value: "resource",
                                    valueRU: "Ресурсы",
                                    type: "parent",
                                    parentElement: false,
                                    selected: false,
                                    children: [
                                        {
                                            id: "id-4_621",
                                            value: 0,
                                            valueRU: "Выключить",
                                            type: "select",
                                            parentElement: false,
                                            selected: true,
                                        },
                                        {
                                            id: "id-4_622",
                                            value: 2,
                                            valueRU: "По убыванию",
                                            type: "select",
                                            parentElement: false,
                                            selected: false,
                                        },
                                        {
                                            id: "id-4_623",
                                            value: 1,
                                            valueRU: "По возрастанию",
                                            type: "select",
                                            parentElement: false,
                                            selected: false,
                                        },
                                    ],
                                },
                                {
                                    id: "id-4_63",
                                    value: "sentiments",
                                    valueRU: "Оценка",
                                    type: "parent",
                                    parentElement: false,
                                    selected: false,
                                    children: [
                                        {
                                            id: "id-4_632",
                                            value: "neutral",
                                            valueRU: "Нейтральные",
                                            type: "draggable",
                                        },
                                        {
                                            id: "id-4_633",
                                            value: "negative",
                                            valueRU: "Негаитивные",
                                            type: "draggable",
                                        },
                                        {
                                            id: "id-4_631",
                                            value: "positive",
                                            valueRU: "Позитивные",
                                            type: "draggable",
                                        },
                                    ],
                                },
                            ],
                        },
                    ],
                },
            ],
            excelElementList: [
                {
                    type: "default",
                    color: "#16395c",
                    id: "id-1",
                    name: "tags",
                    groups: "",
                    nameRU: "Теги",
                    options: [
                        {
                            id: "id-1_1",
                            value: "length",
                            valueRU: "Длина",
                            parentElement: true,
                            children: [
                                {
                                    id: "id-1_11",
                                    type: "input",
                                    value: 90,
                                    valueRU: 90,
                                    selected: false,
                                },
                            ],
                        },
                    ],
                },
                {
                    type: "grouped",
                    color: "#075e07",
                    id: "id-2",
                    name: "category",
                    groups: "groups",
                    nameRU: "Категория",
                    options: [
                        {
                            id: "id-2_1",
                            value: "length",
                            valueRU: "Длина",
                            parentElement: true,
                            children: [
                                {
                                    id: "id-2_11",
                                    type: "input",
                                    value: 3,
                                    valueRU: 3,
                                },
                            ],
                        },
                        {
                            id: "id-2_2",
                            value: "number", // YYYY-MM-DD HH:MM
                            valueRU: "Число",
                            type: "checkbox",
                            selected: true,
                        },
                        {
                            id: "id-2_3",
                            value: "percent", // YYYY-MM-DD HH:MM
                            valueRU: "Процент",
                            type: "checkbox",
                            selected: true,
                        },
                    ],
                },
                {
                    type: "grouped",
                    color: "#075e07",
                    id: "id-3",
                    name: "sentiments",
                    groups: "groups",
                    nameRU: "Тональность сообщений",
                    options: [
                        // {
                        //     id: "id-3_1",
                        //     value: "length",
                        //     valueRU: "Длина",
                        //     parentElement: true,
                        //     children: [
                        //         {
                        //             id: "id-3_11",
                        //             type: "input",
                        //             value: 0,
                        //             valueRU: 0,
                        //         },
                        //     ],
                        // },
                        {
                            id: "id-3_2",
                            value: "number", // YYYY-MM-DD HH:MM
                            valueRU: "Число",
                            type: "checkbox",
                            selected: true,
                        },
                        {
                            id: "id-3_3",
                            value: "percent", // YYYY-MM-DD HH:MM
                            valueRU: "Процент",
                            type: "checkbox",
                            selected: false,
                        },
                    ],
                },
                {
                    type: "grouped",
                    color: "#075e07",
                    id: "id-4",
                    name: "resources",
                    groups: "groups",
                    nameRU: "Ресурсы",
                    options: [
                        {
                            id: "id-4_1",
                            value: "length",
                            valueRU: "Длина",
                            parentElement: true,
                            children: [
                                {
                                    id: "id-4_11",
                                    type: "input",
                                    value: 5,
                                    valueRU: 5,
                                },
                            ],
                        },
                        {
                            id: "id-4_2",
                            value: "number", // YYYY-MM-DD HH:MM
                            valueRU: "Число",
                            type: "checkbox",
                            selected: true,
                        },
                        {
                            id: "id-4_3",
                            value: "percent", // YYYY-MM-DD HH:MM
                            valueRU: "Процент",
                            type: "checkbox",
                            selected: true,
                        },
                    ],
                },
                {
                    type: "grouped",
                    color: "#075e07",
                    id: "id-5",
                    name: "dates",
                    groups: "groups",
                    nameRU: "Даты",
                    options: [
                        // {
                        //     id: "id-5_1",
                        //     value: "length",
                        //     valueRU: "Длина",
                        //     parentElement: true,
                        //     children: [
                        //         {
                        //             id: "id-5_11",
                        //             type: "input",
                        //             value: 0,
                        //             valueRU: 0,
                        //         },
                        //     ],
                        // },
                        {
                            id: "id-5_2",
                            value: "number", // YYYY-MM-DD HH:MM
                            valueRU: "Число",
                            type: "checkbox",
                            selected: true,
                        },
                        {
                            id: "id-5_3",
                            value: "percent", // YYYY-MM-DD HH:MM
                            valueRU: "Процент",
                            type: "checkbox",
                            selected: false,
                        },
                    ],
                },
                {
                    type: "table",
                    color: "#6e1369",
                    id: "id-6",
                    name: "smi_table",
                    groups: "",
                    nameRU: "СМИ",
                    options: [
                        {
                            id: "id-6_1",
                            value: "title",
                            valueRU: "Заголовок",
                            parentElement: true,
                            children: [
                                {
                                    id: "id-6_11",
                                    value: "СМИ",
                                    valueRU: "СМИ",
                                    type: "input",
                                    selected: true,
                                    default: true,
                                },
                            ],
                        },
                        {
                            id: "id-6_2",
                            value: "columns",
                            valueRU: "Столбцы",
                            type: "parent",
                            parentElement: true,
                            children: [
                                {
                                    id: "id-6_21",
                                    value: "number",
                                    type: "hide",
                                    valueRU: "Число",
                                    parentElement: true,
                                    children: [
                                        {
                                            id: "id-6_211",
                                            type: "input",
                                            value: "№",
                                            valueRU: "№",
                                            selected: true,
                                            default: true,
                                        },
                                        {
                                            id: "id-6_222",
                                            type: "checkbox",
                                            selected: true,
                                        },
                                    ],
                                },
                                {
                                    id: "id-6_22",
                                    value: "title",
                                    type: "column",
                                    valueRU: "Заголовок",
                                    parentElement: true,
                                    children: [
                                        {
                                            id: "id-6_221",
                                            type: "input",
                                            value: "Заголовок",
                                            valueRU: "Заголовок",
                                            selected: true,
                                            default: true,
                                        },
                                        {
                                            id: "id-6_222",
                                            type: "checkbox",
                                            selected: true,
                                        },
                                    ],
                                },
                                {
                                    id: "id-6_23",
                                    value: "content",
                                    type: "column",
                                    valueRU: "Краткое содержание",
                                    parentElement: true,
                                    children: [
                                        {
                                            id: "id-6_231",
                                            type: "input",
                                            value: "Краткое содержание",
                                            valueRU: "Краткое содержание",
                                            selected: true,
                                            default: true,
                                        },
                                        {
                                            id: "id-6_222",
                                            type: "hide",
                                            selected: false,
                                        },
                                    ],
                                },
                                {
                                    id: "id-6_24",
                                    value: "date",
                                    type: "column",
                                    valueRU: "Дата",
                                    parentElement: true,
                                    children: [
                                        {
                                            id: "id-6_241",
                                            type: "input",
                                            value: "Дата",
                                            valueRU: "Дата",
                                            selected: true,
                                            default: true,
                                        },
                                        {
                                            id: "id-6_222",
                                            type: "checkbox",
                                            selected: true,
                                        },
                                    ],
                                },
                                {
                                    id: "id-6_26",
                                    value: "resource",
                                    type: "column",
                                    valueRU: "Источник",
                                    parentElement: true,
                                    children: [
                                        {
                                            id: "id-6_261",
                                            type: "input",
                                            value: "Источник",
                                            valueRU: "Источник",
                                            selected: true,
                                            default: true,
                                        },
                                        {
                                            id: "id-6_222",
                                            type: "checkbox",
                                            selected: true,
                                        },
                                    ],
                                },
                                {
                                    id: "id-6_27",
                                    value: "resource_link",
                                    type: "column",
                                    valueRU: "Источник",
                                    parentElement: true,
                                    children: [
                                        {
                                            id: "id-6_271",
                                            type: "input",
                                            value: "Источник",
                                            valueRU: "Источник",
                                            selected: true,
                                            default: true,
                                        },
                                        {
                                            id: "id-6_222",
                                            type: "checkbox",
                                            selected: true,
                                        },
                                    ],
                                },
                                {
                                    id: "id-6_27",
                                    value: "news_link",
                                    type: "column",
                                    valueRU: "URL",
                                    parentElement: true,
                                    children: [
                                        {
                                            id: "id-6_271",
                                            type: "input",
                                            value: "URL",
                                            valueRU: "URL",
                                            selected: true,
                                            default: true,
                                        },
                                        {
                                            id: "id-6_222",
                                            type: "checkbox",
                                            selected: true,
                                        },
                                    ],
                                },
                                {
                                    id: "id-6_28",
                                    value: "sentiment",
                                    type: "column",
                                    valueRU: "Оценка новостей",
                                    parentElement: true,
                                    children: [
                                        {
                                            id: "id-6_281",
                                            type: "input",
                                            value: "Оценка новостей",
                                            valueRU: "Оценка новостей",
                                            selected: true,
                                            default: true,
                                        },
                                        {
                                            id: "id-6_222",
                                            type: "checkbox",
                                            selected: true,
                                        },
                                    ],
                                },
                                {
                                    id: "id-6_25",
                                    value: "category",
                                    type: "column",
                                    valueRU: "Категория",
                                    parentElement: true,
                                    children: [
                                        {
                                            id: "id-6_251",
                                            type: "input",
                                            value: "Категория",
                                            valueRU: "Категория",
                                            selected: true,
                                            default: true,
                                        },
                                        {
                                            id: "id-6_222",
                                            type: "checkbox",
                                            selected: true,
                                        },
                                    ],
                                },
                            ],
                        },
                        {
                            id: "id-6_3",
                            value: "tag_highlight",
                            valueRU: "Выделение тега",
                            type: "select",
                            parentElement: true,
                            children: [
                                {
                                    id: "id-6_31",
                                    value: "bold",
                                    valueRU: "Жирность",
                                    type: "checkbox",
                                    parentElement: false,
                                    selected: true,
                                },
                                {
                                    id: "id-6_32",
                                    value: "tag_color",
                                    valueRU: "Цвет текста",
                                    type: "parent",
                                    color_picker: true,
                                    parentElement: true,
                                    children: [
                                        {
                                            id: "id-6_321",
                                            type: "color",
                                            value: "#fc03c6",
                                            valueRU: "#fc03c6",
                                            selected: true,
                                            default: true,
                                        },
                                    ],
                                },
                                {
                                    id: "id-6_33",
                                    value: "back_color",
                                    valueRU: "Цвет фона",
                                    type: "parent",
                                    color_picker: true,
                                    parentElement: true,
                                    children: [
                                        {
                                            id: "id-6_331",
                                            type: "color",
                                            value: "#f2f2f2",
                                            valueRU: "#f2f2f2",
                                            selected: true,
                                            default: true,
                                        },
                                    ],
                                },
                            ],
                        },
                        {
                            id: "id-6_4",
                            value: "datetime_format",
                            valueRU: "Формат даты и времени",
                            type: "hide",
                            parentElement: true,
                            children: [
                                {
                                    id: "id-6_41",
                                    value: "%Y_%m_%d %H:%M",
                                    valueRU: "Год-Месяц-День",
                                    type: "select",
                                    parentElement: false,
                                    selected: true,
                                },
                            ],
                        },
                        {
                            id: "id-6_5",
                            value: "order",
                            valueRU: "Порядок",
                            type: "select",
                            parentElement: true,
                            children: [
                                {
                                    id: "id-6_51",
                                    value: "date",
                                    valueRU: "Дата",
                                    type: "parent",
                                    parentElement: false,
                                    selected: true,
                                    children: [
                                        {
                                            id: "id-6_511",
                                            value: 1,
                                            valueRU: "По убыванию",
                                            type: "select",
                                            parentElement: false,
                                            selected: true,
                                        },
                                        {
                                            id: "id-6_512",
                                            value: 0,
                                            valueRU: "По возрастанию",
                                            type: "select",
                                            parentElement: false,
                                            selected: false,
                                        },
                                    ],
                                },
                                {
                                    id: "id-6_52",
                                    value: "resource",
                                    valueRU: "Ресурсы",
                                    type: "parent",
                                    parentElement: false,
                                    selected: false,
                                    children: [
                                        {
                                            id: "id-6_521",
                                            value: 0,
                                            valueRU: "Выключить",
                                            type: "select",
                                            parentElement: false,
                                            selected: true,
                                        },
                                        {
                                            id: "id-6_522",
                                            value: 2,
                                            valueRU: "По убыванию",
                                            type: "select",
                                            parentElement: false,
                                            selected: false,
                                        },
                                        {
                                            id: "id-6_523",
                                            value: 1,
                                            valueRU: "По возрастанию",
                                            type: "select",
                                            parentElement: false,
                                            selected: false,
                                        },
                                    ],
                                },
                                {
                                    id: "id-6_53",
                                    value: "sentiments",
                                    valueRU: "Оценка",
                                    type: "parent",
                                    parentElement: false,
                                    selected: false,
                                    children: [
                                        {
                                            id: "id-6_532",
                                            value: "neutral",
                                            valueRU: "Нейтральные",
                                            type: "draggable",
                                        },
                                        {
                                            id: "id-6_533",
                                            value: "negative",
                                            valueRU: "Негаитивные",
                                            type: "draggable",
                                        },
                                        {
                                            id: "id-6_531",
                                            value: "positive",
                                            valueRU: "Позитивные",
                                            type: "draggable",
                                        },
                                    ],
                                },
                            ],
                        },
                        {
                            id: "id-6_8",
                            value: "text_length",
                            valueRU: "Количество символов",
                            type: "hide",
                            parentElement: true,
                            children: [
                                {
                                    id: "id-6_81",
                                    value: 0,
                                    type: "input",
                                },
                            ],
                        },
                    ],
                },
                {
                    type: "table",
                    color: "#6e1369",
                    id: "id-7",
                    name: "soc_table",
                    groups: "",
                    nameRU: "Социальные сети",
                    options: [
                        {
                            id: "id-7_1",
                            value: "title",
                            valueRU: "Заголовок",
                            parentElement: true,
                            children: [
                                {
                                    id: "id-7_11",
                                    value: "СМИ",
                                    valueRU: "СМИ",
                                    type: "input",
                                    selected: true,
                                    default: true,
                                },
                            ],
                        },
                        {
                            id: "id-7_2",
                            value: "columns",
                            valueRU: "Столбцы",
                            type: "parent",
                            parentElement: true,
                            children: [
                                {
                                    id: "id-7_21",
                                    value: "number",
                                    type: "hide",
                                    valueRU: "Число",
                                    parentElement: true,
                                    children: [
                                        {
                                            id: "id-7_211",
                                            type: "input",
                                            value: "№",
                                            valueRU: "№",
                                            selected: true,
                                            default: true,
                                        },
                                        {
                                            id: "id-7_222",
                                            type: "checkbox",
                                            selected: true,
                                        },
                                    ],
                                },
                                {
                                    id: "id-7_23",
                                    value: "content",
                                    type: "column",
                                    valueRU: "Краткое содержание",
                                    parentElement: true,
                                    children: [
                                        {
                                            id: "id-7_231",
                                            type: "input",
                                            value: "Краткое содержание",
                                            valueRU: "Краткое содержание",
                                            selected: true,
                                            default: true,
                                        },
                                        {
                                            id: "id-7_222",
                                            type: "hide",
                                            selected: false,
                                        },
                                    ],
                                },
                                {
                                    id: "id-7_26",
                                    value: "resource",
                                    type: "column",
                                    valueRU: "Источник",
                                    parentElement: true,
                                    children: [
                                        {
                                            id: "id-7_261",
                                            type: "input",
                                            value: "Источник",
                                            valueRU: "Источник",
                                            selected: true,
                                            default: true,
                                        },
                                        {
                                            id: "id-7_222",
                                            type: "checkbox",
                                            selected: true,
                                        },
                                    ],
                                },
                                {
                                    id: "id-7_24",
                                    value: "date",
                                    type: "column",
                                    valueRU: "Дата",
                                    parentElement: true,
                                    children: [
                                        {
                                            id: "id-7_241",
                                            type: "input",
                                            value: "Дата",
                                            valueRU: "Дата",
                                            selected: true,
                                            default: true,
                                        },
                                        {
                                            id: "id-7_222",
                                            type: "checkbox",
                                            selected: true,
                                        },
                                    ],
                                },
                                {
                                    id: "id-7_25",
                                    value: "category",
                                    type: "column",
                                    valueRU: "Категория",
                                    parentElement: true,
                                    children: [
                                        {
                                            id: "id-7_251",
                                            type: "input",
                                            value: "Категория",
                                            valueRU: "Категория",
                                            selected: true,
                                            default: true,
                                        },
                                        {
                                            id: "id-7_222",
                                            type: "checkbox",
                                            selected: true,
                                        },
                                    ],
                                },
                                {
                                    id: "id-7_27",
                                    value: "resource_link",
                                    type: "column",
                                    valueRU: "Источник",
                                    parentElement: true,
                                    children: [
                                        {
                                            id: "id-7_271",
                                            type: "input",
                                            value: "Источник",
                                            valueRU: "Источник",
                                            selected: true,
                                            default: true,
                                        },
                                        {
                                            id: "id-7_222",
                                            type: "checkbox",
                                            selected: true,
                                        },
                                    ],
                                },
                                {
                                    id: "id-7_27",
                                    value: "news_link",
                                    type: "column",
                                    valueRU: "URL",
                                    parentElement: true,
                                    children: [
                                        {
                                            id: "id-7_271",
                                            type: "input",
                                            value: "URL",
                                            valueRU: "URL",
                                            selected: true,
                                            default: true,
                                        },
                                        {
                                            id: "id-7_222",
                                            type: "checkbox",
                                            selected: true,
                                        },
                                    ],
                                },
                                {
                                    id: "id-7_28",
                                    value: "sentiment",
                                    type: "column",
                                    valueRU: "Оценка новостей",
                                    parentElement: true,
                                    children: [
                                        {
                                            id: "id-7_281",
                                            type: "input",
                                            value: "Оценка новостей",
                                            valueRU: "Оценка новостей",
                                            selected: true,
                                            default: true,
                                        },
                                        {
                                            id: "id-7_222",
                                            type: "checkbox",
                                            selected: true,
                                        },
                                    ],
                                },
                            ],
                        },
                        {
                            id: "id-7_3",
                            value: "tag_highlight",
                            valueRU: "Выделение тега",
                            type: "select",
                            parentElement: true,
                            children: [
                                {
                                    id: "id-7_31",
                                    value: "bold",
                                    valueRU: "Жирность",
                                    type: "checkbox",
                                    parentElement: false,
                                    selected: true,
                                },
                                {
                                    id: "id-7_32",
                                    value: "tag_color",
                                    valueRU: "Цвет текста",
                                    type: "parent",
                                    color_picker: true,
                                    parentElement: true,
                                    children: [
                                        {
                                            id: "id-7_321",
                                            type: "color",
                                            value: "#fc03c6",
                                            valueRU: "#fc03c6",
                                            selected: true,
                                            default: true,
                                        },
                                    ],
                                },
                                {
                                    id: "id-7_33",
                                    value: "back_color",
                                    valueRU: "Цвет фона",
                                    type: "parent",
                                    color_picker: true,
                                    parentElement: true,
                                    children: [
                                        {
                                            id: "id-7_331",
                                            type: "color",
                                            value: "#f2f2f2",
                                            valueRU: "#f2f2f2",
                                            selected: true,
                                            default: true,
                                        },
                                    ],
                                },
                            ],
                        },
                        {
                            id: "id-7_4",
                            value: "datetime_format",
                            valueRU: "Формат даты и времени",
                            type: "hide",
                            parentElement: true,
                            children: [
                                {
                                    id: "id-7_41",
                                    value: "%Y_%m_%d %H:%M",
                                    valueRU: "Год-Месяц-День",
                                    type: "select",
                                    parentElement: false,
                                    selected: true,
                                },
                            ],
                        },
                        {
                            id: "id-7_5",
                            value: "order",
                            valueRU: "Порядок",
                            type: "select",
                            parentElement: true,
                            children: [
                                {
                                    id: "id-7_51",
                                    value: "date",
                                    valueRU: "Дата",
                                    type: "parent",
                                    parentElement: false,
                                    selected: true,
                                    children: [
                                        {
                                            id: "id-7_511",
                                            value: 1,
                                            valueRU: "По убыванию",
                                            type: "select",
                                            parentElement: false,
                                            selected: true,
                                        },
                                        {
                                            id: "id-7_512",
                                            value: 0,
                                            valueRU: "По возрастанию",
                                            type: "select",
                                            parentElement: false,
                                            selected: false,
                                        },
                                    ],
                                },
                                {
                                    id: "id-7_52",
                                    value: "resource",
                                    valueRU: "Ресурсы",
                                    type: "parent",
                                    parentElement: false,
                                    selected: false,
                                    children: [
                                        {
                                            id: "id-7_521",
                                            value: 0,
                                            valueRU: "Выключить",
                                            type: "select",
                                            parentElement: false,
                                            selected: true,
                                        },
                                        {
                                            id: "id-7_522",
                                            value: 2,
                                            valueRU: "По убыванию",
                                            type: "select",
                                            parentElement: false,
                                            selected: false,
                                        },
                                        {
                                            id: "id-7_523",
                                            value: 1,
                                            valueRU: "По возрастанию",
                                            type: "select",
                                            parentElement: false,
                                            selected: false,
                                        },
                                    ],
                                },
                                {
                                    id: "id-7_53",
                                    value: "sentiments",
                                    valueRU: "Оценка",
                                    type: "parent",
                                    parentElement: false,
                                    selected: false,
                                    children: [
                                        {
                                            id: "id-7_532",
                                            value: "neutral",
                                            valueRU: "Нейтральные",
                                            type: "draggable",
                                        },
                                        {
                                            id: "id-7_533",
                                            value: "negative",
                                            valueRU: "Негаитивные",
                                            type: "draggable",
                                        },
                                        {
                                            id: "id-7_531",
                                            value: "positive",
                                            valueRU: "Позитивные",
                                            type: "draggable",
                                        },
                                    ],
                                },
                            ],
                        },
                        {
                            id: "id-7_8",
                            value: "text_length",
                            valueRU: "Количество символов",
                            type: "hide",
                            parentElement: true,
                            children: [
                                {
                                    id: "id-7_81",
                                    value: 0,
                                    type: "input",
                                },
                            ],
                        },
                    ],
                },
            ],
            pdfElementList: [
                {
                    description: 'Ключевые слова проекта',
                    type: "default",
                    color: "#16395c",
                    id: "id-1",
                    name: "tags",
                    groups: "",
                    nameRU: "Теги",
                    options: [
                        {
                            description: "'0' - вывод полного списка тегов (по умолчанию).\nЧисловое значение задает количество ключевых слов в блоке.",
                            id: "id-1_1",
                            value: "length",
                            valueRU: "Длина",
                            parentElement: true,
                            children: [
                                {
                                    id: "id-1_11",
                                    type: "input",
                                    value: 225,
                                    valueRU: 225,
                                    selected: false,
                                },
                            ],
                        },
                    ],
                },
                {
                    description: 'Периода сбора информации',
                    type: "default",
                    color: "#16395c",
                    id: "id-2",
                    name: "period",
                    groups: "",
                    nameRU: "Период",
                    options: [
                        {
                            description: 'Выбрать формат вывода даты',
                            id: "id-2_1",
                            value: "format", // YYYY-MM-DD HH:MM
                            valueRU: "Формат",
                            type: "select",
                            position: "center",
                            parentElement: true,
                            children: [
                                {
                                    id: "id-2_11",
                                    value: 0,
                                    valueRU: "День-Месяц-Год Час:Мин",
                                    type: "select",
                                    selected: true,
                                },
                                {
                                    id: "id-2_12",
                                    value: 1,
                                    valueRU: "Год-Месяц-День Час:Мин",
                                    type: "select",
                                    selected: false,
                                },
                            ],
                        },
                    ],
                },
                {
                    description: "Вывод блока содержащий:\n        'Общее количество сообщений'\n        'Количество нейтральных сообщений'\n        'Количество позитивных сообщений'\n        'Количество негативных сообшений'",
                    type: "default",
                    color: "#16395c",
                    id: "id-3",
                    name: "count",
                    groups: "",
                    nameRU: "Общее количество сообщений",
                    options: [
                        {
                            id: "id-3_1",
                            value: "title",
                            valueRU: "Заголовок",
                            parentElement: true,
                            children: [
                                {
                                    id: "id-3_11",
                                    type: "input",
                                    value: "Total Count",
                                    valueRU: "Общее количество",
                                },
                            ],
                        },
                    ],
                },
                {
                    description: 'Вывод графика распределения публикаций по времени сбора информации.',
                    type: "default",
                    color: "#16395c",
                    id: "id-4",
                    name: "message_dynamic",
                    groups: "",
                    nameRU: "Динамика сообщений",
                    options: [
                        {
                            id: "id-4_1",
                            value: "title",
                            valueRU: "Заголовок",
                            parentElement: true,
                            children: [
                                {
                                    id: "id-4_11",
                                    type: "input",
                                    value: "Message dynamic",
                                    valueRU: "Динамическое сообщение",
                                },
                            ],
                        },
                    ],
                },
                {
                    description: 'Вывод графика распределения публикаций по тональности.',
                    type: "grouped",
                    color: "#075e07",
                    id: "id-5",
                    name: "sentiments",
                    groups: "groups",
                    nameRU: "Тональность сообщений",
                    options: [
                        {
                            id: "id-5_1",
                            value: "title",
                            valueRU: "Заголовок",
                            parentElement: true,
                            children: [
                                {
                                    id: "id-5_11",
                                    type: "input",
                                    value: "Sentiments",
                                    valueRU: "Оценка",
                                },
                            ],
                        },
                        {
                            description: "Вывод в описании количества публикаций в 'цифровом' представлении.",
                            id: "id-5_2",
                            value: "number", // YYYY-MM-DD HH:MM
                            valueRU: "Число",
                            type: "checkbox",
                            selected: true,
                        },
                        {
                            description: "Вывод в описании количества публикаций в 'процентном' представлении.",
                            id: "id-5_3",
                            value: "percent", // YYYY-MM-DD HH:MM
                            valueRU: "Процент",
                            type: "checkbox",
                            selected: true,
                        },
                    ],
                },
                {
                    description: "Вывод графика распределения публикаций по СМИ/Социальным сетям.",
                    type: "grouped",
                    color: "#075e07",
                    id: "id-6",
                    name: "distribution",
                    groups: "groups",
                    nameRU: "Распределение по СМИ, Соцсети",
                    options: [
                        {
                            id: "id-6_1",
                            value: "title",
                            valueRU: "Заголовок",
                            parentElement: true,
                            children: [
                                {
                                    id: "id-6_11",
                                    type: "input",
                                    value: "Distribution",
                                    valueRU: "Распределение",
                                },
                            ],
                        },
                        {
                            description: "Вывод в описании количества публикаций в 'цифровом' представлении.",
                            id: "id-6_2",
                            value: "number", // YYYY-MM-DD HH:MM
                            valueRU: "Число",
                            type: "checkbox",
                            selected: true,
                        },
                        {
                            description: "Вывод в описании количества публикаций в 'процентном' представлении.",
                            id: "id-6_3",
                            value: "percent", // YYYY-MM-DD HH:MM
                            valueRU: "Процент",
                            type: "checkbox",
                            selected: true,
                        },
                    ],
                },
                {
                    description: "Вывод графика распределения публикаций по категориям СМИ.",
                    type: "grouped",
                    color: "#075e07",
                    id: "id-7",
                    name: "smi_distribution",
                    groups: "groups",
                    nameRU: "Распределение по категориям источников в СМИ",
                    options: [
                        {
                            id: "id-7_1",
                            value: "title",
                            valueRU: "Заголовок",
                            parentElement: true,
                            children: [
                                {
                                    id: "id-7_11",
                                    type: "input",
                                    value: "Media distribution",
                                    valueRU: "Распространение СМИ",
                                },
                            ],
                        },
                        {
                            id: "id-7_2",
                            value: "length",
                            valueRU: "Длина",
                            parentElement: true,
                            children: [
                                {
                                    id: "id-7_12",
                                    type: "input",
                                    value: 225,
                                    valueRU: 225,
                                },
                            ],
                        },
                        {
                            description: "Вывод в описании количества публикаций в 'цифровом' представлении.",
                            id: "id-7_3",
                            value: "number", // YYYY-MM-DD HH:MM
                            valueRU: "Число",
                            type: "checkbox",
                            selected: true,
                        },
                        {
                            description: "Вывод в описании количества публикаций в 'процентном' представлении.",
                            id: "id-7_4",
                            value: "percent", // YYYY-MM-DD HH:MM
                            valueRU: "Процент",
                            type: "checkbox",
                            selected: true,
                        },
                    ],
                },
                {
                    description: "Вывод графика распределения публикаций по социальным сетям.",
                    type: "grouped",
                    color: "#075e07",
                    id: "id-8",
                    name: "soc_distribution",
                    groups: "groups",
                    nameRU: "Распределение по соцсетям",
                    options: [
                        {
                            id: "id-8_1",
                            value: "title",
                            valueRU: "Заголовок",
                            parentElement: true,
                            children: [
                                {
                                    id: "id-8_11",
                                    type: "input",
                                    value: "Social networks distribution",
                                    valueRU: "Социальные сети распространения",
                                },
                            ],
                        },
                        {
                            id: "id-8_2",
                            value: "length", // YYYY-MM-DD HH:MM
                            valueRU: "Длина",
                            parentElement: true,
                            children: [
                                {
                                    id: "id-8_21",
                                    value: 10,
                                    valueRU: 10,
                                    type: "input",
                                    selected: true,
                                },
                            ],
                        },
                        {
                            description: "Вывод в описании количества публикаций в 'цифровом' представлении.",
                            id: "id-8_3",
                            value: "number", // YYYY-MM-DD HH:MM
                            valueRU: "Число",
                            type: "checkbox",
                            selected: true,
                        },
                        {
                            description: "Вывод в описании количества публикаций в 'процентном' представлении.",
                            id: "id-8_4",
                            value: "percent", // YYYY-MM-DD HH:MM
                            valueRU: "Процент",
                            type: "checkbox",
                            selected: true,
                        },
                    ],
                },
                {
                    description: "Вывод карты мира, отображающий распределения публикаций по странам.",
                    type: "grouped",
                    color: "#075e07",
                    id: "id-11",
                    name: "media_top",
                    groups: "groups",
                    nameRU: "Самые активные источники в СМИ",
                    options: [
                        {
                            id: "id-11_1",
                            value: "title",
                            valueRU: "Заголовок",
                            parentElement: true,
                            children: [
                                {
                                    id: "id-11_11",
                                    type: "input",
                                    value: "map",
                                    valueRU: "Карта",
                                },
                            ],
                        },
                        // {
                        //     id: "id-11_2",
                        //     value: "length", // YYYY-MM-DD HH:MM
                        //     valueRU: "Длина",
                        //     parentElement: true,
                        //     children: [
                        //         {
                        //             id: "id-11_21",
                        //             value: 22,
                        //             type: "select",
                        //             selected: true,
                        //         },
                        //         {
                        //             id: "id-11_22",
                        //             value: 44,
                        //             type: "select",
                        //             selected: false,
                        //         },
                        //     ],
                        // },
                        {
                            description: "Вывод в описании количества публикаций в 'цифровом' представлении.",
                            id: "id-11_3",
                            value: "number", // YYYY-MM-DD HH:MM
                            valueRU: "Число",
                            type: "checkbox",
                            selected: true,
                        },
                        {
                            description: "Вывод в описании количества публикаций в 'процентном' представлении.",
                            id: "id-11_4",
                            value: "percent", // YYYY-MM-DD HH:MM
                            valueRU: "Процент",
                            type: "checkbox",
                            selected: false,
                        },
                    ],
                },
                {
                    description: "Вывод графика наиболее активных сообществ/пользователей социальных сетей.",
                    type: "grouped",
                    color: "#075e07",
                    id: "id-12",
                    name: "soc_top",
                    groups: "groups",
                    nameRU: "Самые активные источники в Соцсетях",
                    options: [
                        {
                            id: "id-12_1",
                            value: "title",
                            valueRU: "Заголовок",
                            parentElement: true,
                            children: [
                                {
                                    id: "id-12_11",
                                    type: "input",
                                    value: "map",
                                    valueRU: "Карта",
                                },
                            ],
                        },
                        // {
                        //     id: "id-12_2",
                        //     value: "length", // YYYY-MM-DD HH:MM
                        //     valueRU: "Длина",
                        //     parentElement: true,
                        //     children: [
                        //         {
                        //             id: "id-12_21",
                        //             value: 22,
                        //             type: "select",
                        //             selected: true,
                        //         },
                        //         {
                        //             id: "id-12_22",
                        //             value: 44,
                        //             type: "select",
                        //             selected: false,
                        //         },
                        //     ],
                        // },
                        {
                            description: "Вывод в описании количества публикаций в 'цифровом' представлении.",
                            id: "id-12_3",
                            value: "number", // YYYY-MM-DD HH:MM
                            valueRU: "Число",
                            type: "checkbox",
                            selected: true,
                        },
                        {
                            description: "Вывод в описании количества публикаций в 'процентном' представлении.",
                            id: "id-12_4",
                            value: "percent", // YYYY-MM-DD HH:MM
                            valueRU: "Процент",
                            type: "checkbox",
                            selected: false,
                        },
                    ],
                },
                {
                    description: "Вывод графика наиболее активных сообществ/пользователей самой популярной социальной сети в проекте.",
                    type: "grouped",
                    color: "#075e07",
                    id: "id-13",
                    name: "most_popular_soc",
                    groups: "groups",
                    nameRU: "Самые активные источники в соцсети",
                    options: [
                        {
                            id: "id-13_1",
                            value: "title",
                            valueRU: "Заголовок",
                            parentElement: true,
                            children: [
                                {
                                    id: "id-13_11",
                                    type: "input",
                                    value: "map",
                                    valueRU: "Карта",
                                },
                            ],
                        },
                        // {
                        //     id: "id-13_2",
                        //     value: "length", // YYYY-MM-DD HH:MM
                        //     valueRU: "Длина",
                        //     parentElement: true,
                        //     children: [
                        //         {
                        //             id: "id-13_21",
                        //             value: 22,
                        //             type: "select",
                        //             selected: true,
                        //         },
                        //         {
                        //             id: "id-13_22",
                        //             value: 44,
                        //             type: "select",
                        //             selected: false,
                        //         },
                        //     ],
                        // },
                        {
                            description: "Вывод в описании количества публикаций в 'цифровом' представлении.",
                            id: "id-13_3",
                            value: "number", // YYYY-MM-DD HH:MM
                            valueRU: "Число",
                            type: "checkbox",
                            selected: true,
                        },
                        {
                            description: "Вывод в описании количества публикаций в 'процентном' представлении.",
                            id: "id-13_4",
                            value: "percent", // YYYY-MM-DD HH:MM
                            valueRU: "Процент",
                            type: "checkbox",
                            selected: false,
                        },
                    ],
                },
                {
                    description: "Вывод карты мира, отображающий распределения публикаций по странам.",
                    type: "map",
                    color: "#696e12",
                    id: "id-9",
                    name: "world_map",
                    groups: "",
                    nameRU: "Активность источников по регионам",
                    options: [
                        {
                            id: "id-9_1",
                            value: "title",
                            valueRU: "Заголовок",
                            parentElement: true,
                            children: [
                                {
                                    id: "id-9_11",
                                    type: "input",
                                    value: "Distribution by region",
                                    valueRU: "Распределение по регионам",
                                },
                            ],
                        },
                        {
                            description: "'Количество регионов' - задает максимальное количество регионов, отображаемое по картой.",
                            id: "id-9_2",
                            value: "length", // YYYY-MM-DD HH:MM
                            valueRU: "Длина",
                            type: "select",
                            parentElement: true,
                            children: [
                                {
                                    id: "id-9_21",
                                    value: 44,
                                    valueRU: 44,
                                    type: "input",
                                    selected: true,
                                },
                            ],
                        },
                        {
                            description: "Вывод в описании количества публикаций в 'цифровом' представлении.",
                            id: "id-9_3",
                            value: "number", // YYYY-MM-DD HH:MM
                            valueRU: "Число",
                            type: "checkbox",
                            selected: true,
                        },
                        {
                            description: "Вывод в описании количества публикаций в 'процентном' представлении.",
                            id: "id-9_4",
                            value: "percent", // YYYY-MM-DD HH:MM
                            valueRU: "Процент",
                            type: "checkbox",
                            selected: true,
                        },
                    ],
                },
                {
                    description: "Вывод карты Республики Казахстан, отображающий распределение публикаций по областям.",
                    type: "map",
                    color: "#696e12",
                    id: "id-10",
                    name: "kaz_map",
                    groups: "",
                    nameRU: "Активность источников по РК",
                    options: [
                        {
                            id: "id-10_1",
                            value: "title",
                            valueRU: "Заголовок",
                            parentElement: true,
                            children: [
                                {
                                    id: "id-10_11",
                                    type: "input",
                                    value: "Distribution by regions of KZ",
                                    valueRU: "Распределение по регионам РК",
                                },
                            ],
                        },
                        {
                            description: "Количество областей' - задает максимальное количество областей, отображаемое по картой.",
                            id: "id-10_2",
                            value: "length", // YYYY-MM-DD HH:MM
                            valueRU: "Длина",
                            type: "select",
                            parentElement: true,
                            children: [
                                {
                                    id: "id-10_21",
                                    value: 10,
                                    valueRU: 10,
                                    type: "input",
                                    selected: true,
                                },
                            ],
                        },
                        {
                            description: "Вывод в описании количества публикаций в 'цифровом' представлении.",
                            id: "id-10_3",
                            value: "number", // YYYY-MM-DD HH:MM
                            valueRU: "Число",
                            type: "checkbox",
                            selected: true,
                        },
                        {
                            description: "Вывод в описании количества публикаций в 'процентном' представлении.",
                            id: "id-10_4",
                            value: "percent", // YYYY-MM-DD HH:MM
                            valueRU: "Процент",
                            type: "checkbox",
                            selected: false,
                        },
                    ],
                },
                {
                    description: "Вывод таблицы с новостями СМИ.",
                    type: "table",
                    color: "#6e1369",
                    id: "id-14",
                    name: "smi_table",
                    groups: "",
                    nameRU: "СМИ",
                    options: [
                        {
                            id: "id-14_1",
                            value: "title",
                            valueRU: "Заголовок",
                            parentElement: true,
                            children: [
                                {
                                    id: "id-14_11",
                                    value: "СМИ",
                                    valueRU: "СМИ",
                                    type: "input",
                                    selected: true,
                                    default: true,
                                },
                            ],
                        },
                        {
                            description: "'Элементы таблицы' - позволяет выбрать колонки, добавляемые в таблицу, а также их расположение.",
                            id: "id-14_2",
                            value: "columns",
                            valueRU: "Столбцы",
                            type: "parent",
                            parentElement: true,
                            children: [
                                {
                                    description: "Порядковый номер публикации в таблице. Элемент по умолчанию, добавляется автоматически первой колонкой.",
                                    id: "id-14_21",
                                    value: "number",
                                    type: "hide",
                                    valueRU: "Число",
                                    parentElement: true,
                                    children: [
                                        {
                                            id: "id-14_211",
                                            type: "input",
                                            value: "№",
                                            valueRU: "№",
                                            selected: true,
                                            default: true,
                                        },
                                        {
                                            id: "id-14_222",
                                            type: "checkbox",
                                            selected: true,
                                        },
                                    ],
                                },
                                {
                                    description: "Название статьи",
                                    id: "id-14_22",
                                    value: "title",
                                    type: "column",
                                    valueRU: "Заголовок",
                                    parentElement: true,
                                    children: [
                                        {
                                            id: "id-14_221",
                                            type: "input",
                                            value: "Заголовок",
                                            valueRU: "Заголовок",
                                            selected: true,
                                            default: true,
                                        },
                                        {
                                            id: "id-14_222",
                                            type: "checkbox",
                                            selected: true,
                                        },
                                    ],
                                },
                                {
                                    description: "Часть текста публикации размером не более 400 символов.",
                                    id: "id-14_23",
                                    value: "content",
                                    type: "column",
                                    valueRU: "Краткое содержание",
                                    parentElement: true,
                                    children: [
                                        {
                                            id: "id-14_231",
                                            type: "input",
                                            value: "Краткое содержание",
                                            valueRU: "Краткое содержание",
                                            selected: true,
                                            default: true,
                                        },
                                        {
                                            id: "id-14_222",
                                            type: "hide",
                                            selected: true,
                                        },
                                    ],
                                },
                                {
                                    description: "Время публикации.",
                                    id: "id-14_24",
                                    value: "date",
                                    valueRU: "Дата",
                                    type: "column",
                                    parentElement: true,
                                    children: [
                                        {
                                            id: "id-14_241",
                                            type: "input",
                                            value: "Дата",
                                            valueRU: "Дата",
                                            selected: true,
                                            default: true,
                                        },
                                        {
                                            id: "id-14_222",
                                            type: "checkbox",
                                            selected: true,
                                        },
                                    ],
                                },
                                {
                                    description: "Категория источника публикации.",
                                    id: "id-14_25",
                                    value: "category",
                                    type: "column",
                                    valueRU: "Категория",
                                    parentElement: true,
                                    children: [
                                        {
                                            id: "id-14_251",
                                            type: "input",
                                            value: "Категория",
                                            valueRU: "Категория",
                                            selected: true,
                                            default: true,
                                        },
                                        {
                                            id: "id-14_222",
                                            type: "checkbox",
                                            selected: true,
                                        },
                                    ],
                                },
                                {
                                    description: "Источник публикации.",
                                    id: "id-14_26",
                                    value: "resource",
                                    type: "column",
                                    valueRU: "Источник",
                                    parentElement: true,
                                    children: [
                                        {
                                            id: "id-14_261",
                                            type: "input",
                                            value: "Источник",
                                            valueRU: "Источник",
                                            selected: true,
                                            default: true,
                                        },
                                        {
                                            id: "id-14_222",
                                            type: "checkbox",
                                            selected: true,
                                        },
                                    ],
                                },
                                {
                                    description: "Ссылка на новость.",
                                    id: "id-14_27",
                                    value: "news_link",
                                    type: "column",
                                    valueRU: "URL",
                                    parentElement: true,
                                    children: [
                                        {
                                            id: "id-14_271",
                                            type: "input",
                                            value: "URL",
                                            valueRU: "URL",
                                            selected: true,
                                            default: true,
                                        },
                                        {
                                            id: "id-14_222",
                                            type: "checkbox",
                                            selected: true,
                                        },
                                    ],
                                },
                                {
                                    description: "Тональность, определенная автоматизированной системой. Погрешность системы составляет от 10 до 30 процентов.",
                                    id: "id-14_28",
                                    value: "sentiment",
                                    type: "column",
                                    valueRU: "Оценка",
                                    parentElement: true,
                                    children: [
                                        {
                                            id: "id-14_281",
                                            type: "input",
                                            value: "Оценка новостей",
                                            valueRU: "Оценка новостей",
                                            selected: true,
                                            default: true,
                                        },
                                        {
                                            id: "id-14_222",
                                            type: "checkbox",
                                            selected: true,
                                        },
                                    ],
                                },
                            ],
                        },
                        {
                            description: "Параметры для выбора выделения ключевого слова в колонке 'Краткое содержание'.",
                            id: "id-14_3",
                            value: "tag_highlight",
                            valueRU: "Выделение тега",
                            type: "select",
                            parentElement: true,
                            children: [
                                {
                                    description: "Выделить жирным",
                                    id: "id-14_31",
                                    value: "bold",
                                    valueRU: "Жирность",
                                    type: "checkbox",
                                    parentElement: false,
                                    selected: true,
                                },
                                {
                                    description: "Цвет ключевого слова",
                                    id: "id-14_32",
                                    value: "tag_color",
                                    valueRU: "Цвет текста",
                                    type: "parent",
                                    color_picker: true,
                                    parentElement: true,
                                    children: [
                                        {
                                            id: "id-14_321",
                                            type: "color",
                                            value: "#0709a3",
                                            valueRU: "#0709a3",
                                            selected: true,
                                            default: true,
                                        },
                                    ],
                                },
                                {
                                    description: "Цвет фона ключевого слова",
                                    id: "id-14_33",
                                    value: "back_color",
                                    valueRU: "Цвет фона",
                                    type: "parent",
                                    color_picker: true,
                                    parentElement: true,
                                    children: [
                                        {
                                            id: "id-14_331",
                                            type: "color",
                                            value: "#a7b50b",
                                            valueRU: "#a7b50b",
                                            selected: true,
                                            default: true,
                                        },
                                    ],
                                },
                            ],
                        },
                        {
                            description: "Выбор формата вывода даты и времени публикации статьи в колонке 'Дата'.",
                            id: "id-14_4",
                            value: "datetime_format",
                            valueRU: "Формат даты и времени",
                            type: "select",
                            parentElement: true,
                            children: [
                                {
                                    id: "id-14_41",
                                    value: 0,
                                    valueRU: "Год-Месяц-День",
                                    type: "select",
                                    parentElement: false,
                                    selected: true,
                                },
                                {
                                    id: "id-14_42",
                                    value: 1,
                                    valueRU: "Год-Месяц-День Час:Мин",
                                    type: "select",
                                    parentElement: false,
                                    selected: false,
                                },
                            ],
                        },
                        {
                            description: "Выбор порядка сортировки публикаций в таблице.",
                            id: "id-14_5",
                            value: "order",
                            valueRU: "Порядок",
                            type: "select",
                            parentElement: true,
                            children: [
                                {
                                    id: "id-14_51",
                                    value: "date",
                                    valueRU: "Дата",
                                    type: "parent",
                                    parentElement: false,
                                    selected: true,
                                    children: [
                                        {
                                            id: "id-14_511",
                                            value: 1,
                                            valueRU: "По убыванию",
                                            type: "select",
                                            parentElement: false,
                                            selected: true,
                                        },
                                        {
                                            id: "id-14_512",
                                            value: 0,
                                            valueRU: "По возрастанию",
                                            type: "select",
                                            parentElement: false,
                                            selected: false,
                                        },
                                    ],
                                },
                                {
                                    description: "Выбор очередности следования публикаций в зависимости от определенной тональности.",
                                    id: "id-14_52",
                                    value: "resource",
                                    valueRU: "Ресурсы",
                                    type: "parent",
                                    parentElement: false,
                                    selected: false,
                                    children: [
                                        {
                                            id: "id-14_521",
                                            value: 0,
                                            valueRU: "Выключить",
                                            type: "select",
                                            parentElement: false,
                                            selected: true,
                                        },
                                        {
                                            id: "id-14_522",
                                            value: 2,
                                            valueRU: "По убыванию",
                                            type: "select",
                                            parentElement: false,
                                            selected: false,
                                        },
                                        {
                                            id: "id-14_523",
                                            value: 1,
                                            valueRU: "По возрастанию",
                                            type: "select",
                                            parentElement: false,
                                            selected: false,
                                        },
                                    ],
                                },
                                {
                                    id: "id-14_53",
                                    value: "sentiments",
                                    valueRU: "Оценка",
                                    type: "parent",
                                    parentElement: false,
                                    selected: false,
                                    children: [
                                        {
                                            id: "id-14_532",
                                            value: "neutral",
                                            valueRU: "Нейтральные",
                                            type: "draggable",
                                        },
                                        {
                                            id: "id-14_533",
                                            value: "negative",
                                            valueRU: "Негаитивные",
                                            type: "draggable",
                                        },
                                        {
                                            id: "id-14_531",
                                            value: "positive",
                                            valueRU: "Позитивные",
                                            type: "draggable",
                                        },
                                    ],
                                },
                            ],
                        },
                        {
                            id: "id-14_6",
                            value: "font_name",
                            valueRU: "Шрифт",
                            type: "hide",
                            parentElement: true,
                            children: [
                                {
                                    id: "id-14_61",
                                    value: "Arial",
                                    type: "input",
                                },
                            ],
                        },
                        {
                            id: "id-14_7",
                            value: "font_size",
                            valueRU: "Размер шрифта",
                            type: "hide",
                            parentElement: true,
                            children: [
                                {
                                    id: "id-14_71",
                                    value: 8,
                                    type: "input",
                                },
                            ],
                        },
                        {
                            id: "id-14_8",
                            value: "text_length",
                            valueRU: "Количество символов",
                            type: "hide",
                            parentElement: true,
                            children: [
                                {
                                    id: "id-14_81",
                                    value: 0,
                                    type: "input",
                                },
                            ],
                        },
                    ],
                },
                {
                    description: "Вывод таблицы с постами социальных сетей",
                    type: "table",
                    color: "#6e1369",
                    id: "id-15",
                    name: "soc_table",
                    groups: "",
                    nameRU: "Социальные сети",
                    options: [
                        {
                            id: "id-15_1",
                            value: "title",
                            valueRU: "Заголовок",
                            parentElement: true,
                            children: [
                                {
                                    id: "id-15_11",
                                    value: "Соцсети!",
                                    valueRU: "Соцсети!",
                                    type: "input",
                                    selected: true,
                                    default: true,
                                },
                            ],
                        },
                        {
                            description: "Позволяет выбрать колонки, добавляемые в таблицу, а также их расположение.",
                            id: "id-15_2",
                            value: "columns",
                            valueRU: "Столбцы",
                            type: "parent",
                            parentElement: true,
                            children: [
                                {
                                    description: "Порядковый номер публикации в таблице. Элемент по умолчанию, добавляется автоматически первой колонкой.",
                                    id: "id-15_21",
                                    value: "number",
                                    type: "hide",
                                    valueRU: "Число",
                                    parentElement: true,
                                    children: [
                                        {
                                            id: "id-15_211",
                                            type: "input",
                                            value: "№",
                                            valueRU: "№",
                                            selected: true,
                                            default: true,
                                        },
                                        {
                                            id: "id-14_222",
                                            type: "checkbox",
                                            selected: true,
                                        },
                                    ],
                                },
                                {
                                    description: "Часть текста публикации размером не более 400 символов.",
                                    id: "id-15_23",
                                    value: "content",
                                    type: "column",
                                    valueRU: "Краткое содержание",
                                    parentElement: true,
                                    children: [
                                        {
                                            id: "id-15_231",
                                            type: "input",
                                            value: "Краткое содержание",
                                            valueRU: "Краткое содержание",
                                            selected: true,
                                            default: true,
                                        },
                                        {
                                            id: "id-14_222",
                                            type: "hide",
                                            selected: true,
                                        },
                                    ],
                                },
                                {
                                    description: "Время публикации.",
                                    id: "id-15_24",
                                    value: "date",
                                    type: "column",
                                    valueRU: "Дата",
                                    parentElement: true,
                                    children: [
                                        {
                                            id: "id-15_241",
                                            type: "input",
                                            value: "Дата",
                                            valueRU: "Дата",
                                            selected: true,
                                            default: true,
                                        },
                                        {
                                            id: "id-14_222",
                                            type: "checkbox",
                                            selected: true,
                                        },
                                    ],
                                },
                                {
                                    description: "Сообщество/Пользователь социальной сети.",
                                    id: "id-15_26",
                                    value: "resource",
                                    type: "column",
                                    valueRU: "Источник",
                                    parentElement: true,
                                    children: [
                                        {
                                            id: "id-15_261",
                                            type: "input",
                                            value: "Источник",
                                            valueRU: "Источник",
                                            selected: true,
                                            default: true,
                                        },
                                        {
                                            id: "id-14_222",
                                            type: "checkbox",
                                            selected: true,
                                        },
                                    ],
                                },
                                {
                                    description: "Ссылка на новость.",
                                    id: "id-15_27",
                                    value: "news_link",
                                    type: "column",
                                    valueRU: "URL",
                                    parentElement: true,
                                    children: [
                                        {
                                            id: "id-15_271",
                                            type: "input",
                                            value: "URL",
                                            valueRU: "URL",
                                            selected: true,
                                            default: true,
                                        },
                                        {
                                            id: "id-14_222",
                                            type: "checkbox",
                                            selected: true,
                                        },
                                    ],
                                },
                                {
                                    description: "Тональность, определенная автоматизированной системой. Погрешность системы составляет от 10 до 30 процентов.",
                                    id: "id-15_28",
                                    value: "sentiment",
                                    type: "column",
                                    valueRU: "Оценка",
                                    parentElement: true,
                                    children: [
                                        {
                                            id: "id-15_281",
                                            type: "input",
                                            value: "Оценка новостей",
                                            valueRU: "Оценка новостей",
                                            selected: true,
                                            default: true,
                                        },
                                        {
                                            id: "id-14_222",
                                            type: "checkbox",
                                            selected: true,
                                        },
                                    ],
                                },
                            ],
                        },
                        {
                            description: "Параметры для выбора выделения ключевого слова в колонке 'Краткое содержание'.",
                            id: "id-15_3",
                            value: "tag_highlight",
                            valueRU: "Выделение тега",
                            type: "select",
                            parentElement: true,
                            children: [
                                {
                                    description: "Выделить жирным",
                                    id: "id-15_31",
                                    value: "bold",
                                    valueRU: "Жирность",
                                    type: "checkbox",
                                    parentElement: false,
                                    selected: true,
                                },
                                {
                                    description: "Цвет ключевого слова",
                                    id: "id-15_32",
                                    value: "tag_color",
                                    valueRU: "Цвет текста",
                                    type: "parent",
                                    color_picker: true,
                                    parentElement: true,
                                    children: [
                                        {
                                            id: "id-15_321",
                                            type: "color",
                                            value: "#ab1b3d",
                                            valueRU: "#ab1b3d",
                                            selected: true,
                                            default: true,
                                        },
                                    ],
                                },
                                {
                                    description: "Цвет фона ключевого слова",
                                    id: "id-15_33",
                                    value: "back_color",
                                    valueRU: "Цвет фона",
                                    type: "parent",
                                    color_picker: true,
                                    parentElement: true,
                                    children: [
                                        {
                                            id: "id-15_331",
                                            type: "color",
                                            value: "#2cd134",
                                            valueRU: "#2cd134",
                                            selected: true,
                                            default: true,
                                        },
                                    ],
                                },
                            ],
                        },
                        {
                            description: "Выбор формата вывода даты и времени публикации статьи в колонке 'Дата'.",
                            id: "id-15_4",
                            value: "datetime_format",
                            valueRU: "Формат даты и времени",
                            type: "select",
                            parentElement: true,
                            children: [
                                {
                                    id: "id-15_41",
                                    value: 0,
                                    valueRU: "Год-Месяц-День",
                                    type: "select",
                                    parentElement: false,
                                    selected: true,
                                },
                                {
                                    id: "id-15_42",
                                    value: 1,
                                    valueRU: "Год-Месяц-День Час:Мин",
                                    type: "select",
                                    parentElement: false,
                                    selected: false,
                                },
                            ],
                        },
                        {
                            description: "Выбор порядка сортировки публикаций в таблице.",
                            id: "id-15_5",
                            value: "order",
                            valueRU: "Порядок",
                            type: "select",
                            parentElement: true,
                            children: [
                                {
                                    id: "id-15_51",
                                    value: "date",
                                    valueRU: "Дата",
                                    type: "parent",
                                    parentElement: false,
                                    selected: true,
                                    children: [
                                        {
                                            id: "id-15_511",
                                            value: 1,
                                            valueRU: "По убыванию",
                                            type: "select",
                                            parentElement: false,
                                            selected: true,
                                        },
                                        {
                                            id: "id-15_512",
                                            value: 0,
                                            valueRU: "По возрастанию",
                                            type: "select",
                                            parentElement: false,
                                            selected: false,
                                        },
                                    ],
                                },
                                {
                                    id: "id-15_52",
                                    value: "resource",
                                    valueRU: "Ресурсы",
                                    type: "parent",
                                    parentElement: false,
                                    selected: false,
                                    children: [
                                        {
                                            id: "id-15_521",
                                            value: 0,
                                            valueRU: "Выключить",
                                            type: "select",
                                            parentElement: false,
                                            selected: true,
                                        },
                                        {
                                            id: "id-15_522",
                                            value: 2,
                                            valueRU: "По убыванию",
                                            type: "select",
                                            parentElement: false,
                                            selected: false,
                                        },
                                        {
                                            id: "id-15_523",
                                            value: 1,
                                            valueRU: "По возрастанию",
                                            type: "select",
                                            parentElement: false,
                                            selected: false,
                                        },
                                    ],
                                },
                                {
                                    description: "Выбор очередности следования публикаций в зависимости от определенной тональности.",
                                    id: "id-15_53",
                                    value: "sentiments",
                                    valueRU: "Оценка",
                                    type: "parent",
                                    parentElement: false,
                                    selected: false,
                                    children: [
                                        {
                                            id: "id-15_532",
                                            value: "neutral",
                                            valueRU: "Нейтральные",
                                            type: "draggable",
                                        },
                                        {
                                            id: "id-15_533",
                                            value: "negative",
                                            valueRU: "Негаитивные",
                                            type: "draggable",
                                        },
                                        {
                                            id: "id-15_531",
                                            value: "positive",
                                            valueRU: "Позитивные",
                                            type: "draggable",
                                        },
                                    ],
                                },
                            ],
                        },
                        {
                            id: "id-15_6",
                            value: "font_name",
                            valueRU: "Шрифт",
                            type: "hide",
                            parentElement: true,
                            children: [
                                {
                                    id: "id-15_61",
                                    value: "Arial",
                                    type: "input",
                                },
                            ],
                        },
                        {
                            id: "id-15_7",
                            value: "font_size",
                            valueRU: "Размер шрифта",
                            type: "hide",
                            parentElement: true,
                            children: [
                                {
                                    id: "id-15_71",
                                    value: 8,
                                    type: "input",
                                },
                            ],
                        },
                        {
                            id: "id-15_8",
                            value: "text_length",
                            valueRU: "Количество символов",
                            type: "hide",
                            parentElement: true,
                            children: [
                                {
                                    id: "id-15_81",
                                    value: 0,
                                    type: "input",
                                },
                            ],
                        },
                    ],
                },
            ],
            elements: [],
            loading: false,
        };
    },
    emits: ["update", "loadingSpinner"],
    methods: {
        switchCase() {
            switch (this.additional.format.file) {
                case "pdf":
                    return this.pdfElementList;
                case "excel":
                    return this.excelElementList;
                case "word":
                    return this.wordElementList;
                default:
                    break;
            }
        },
        loadingSpinner() {
            try {
                if (this.loading == false) {
                    this.loading = true;
                    return true;
                } else {
                    this.loading = false;
                    return false;
                }
                // console.log('this.loading:', this.loading);
            } catch (error) {
                this.loading = false;
                console.log("this.loading:");
                console.log("this.loading:", this.loading);
                console.log(error);
            }
        },
        deepClone(arr) {
            return arr.map((item) =>
                Array.isArray(item) ? deepClone(item) : item
            );

            const independentCopy = JSON.parse(JSON.stringify(user));
        },
    },
    mounted() {
        for (let index = 0; index < this.pdfElementList.length; index++) {
            const element = this.pdfElementList[index];
            if (element.options[0].value == "title") {
                element.options[0].children[0].valueRU =
                    this.defaultPDFValues[element.name].title[
                        this.additional.format.language
                    ];
            }

            if (element.type == "table") {
                let columns = element.options[1];
                for (let i = 0; i < columns.children.length; i++) {
                    const column = columns.children[i];
                    if (this.defaultPDFValues[element.name].columns[
                            column.value
                        ]) {

                    column.valueRU = column.children[0].valueRU =
                        this.defaultPDFValues[element.name].columns[
                            column.value
                        ][this.additional.format.language];
                    }
                }
            }
        }
    },
};
</script>

<style scoped>
</style>