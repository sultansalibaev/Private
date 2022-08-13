<template>
    <Constructs :elements="elements" :loading="loading" :additional="additional" />
    <Sidebar
        :elements="elementList"
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
            additional: {
                format: {
                    file: "pdf",
                    language: "rus",
                },
                full_text: false,
            },
            elementList: [
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
                                    value: 225,
                                    valueRU: 225,
                                    selected: false,
                                },
                            ],
                        },
                    ],
                },
                {
                    type: "default",
                    color: "#16395c",
                    id: "id-2",
                    name: "period",
                    groups: "",
                    nameRU: "Период",
                    options: [
                        {
                            id: "id-2_1",
                            value: "format", // YYYY-MM-DD HH:MM
                            valueRU: "Формат",
                            type: "select",
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
                            selected: true,
                        },
                    ],
                },
                {
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
                            id: "id-6_2",
                            value: "number", // YYYY-MM-DD HH:MM
                            valueRU: "Число",
                            type: "checkbox",
                            selected: true,
                        },
                        {
                            id: "id-6_3",
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
                            id: "id-7_3",
                            value: "number", // YYYY-MM-DD HH:MM
                            valueRU: "Число",
                            type: "checkbox",
                            selected: true,
                        },
                        {
                            id: "id-7_4",
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
                            id: "id-8_3",
                            value: "number", // YYYY-MM-DD HH:MM
                            valueRU: "Число",
                            type: "checkbox",
                            selected: true,
                        },
                        {
                            id: "id-8_4",
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
                            id: "id-11_3",
                            value: "number", // YYYY-MM-DD HH:MM
                            valueRU: "Число",
                            type: "checkbox",
                            selected: true,
                        },
                        {
                            id: "id-11_4",
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
                            id: "id-12_3",
                            value: "number", // YYYY-MM-DD HH:MM
                            valueRU: "Число",
                            type: "checkbox",
                            selected: true,
                        },
                        {
                            id: "id-12_4",
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
                            id: "id-13_3",
                            value: "number", // YYYY-MM-DD HH:MM
                            valueRU: "Число",
                            type: "checkbox",
                            selected: true,
                        },
                        {
                            id: "id-13_4",
                            value: "percent", // YYYY-MM-DD HH:MM
                            valueRU: "Процент",
                            type: "checkbox",
                            selected: false,
                        },
                    ],
                },
                {
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
                            id: "id-9_3",
                            value: "number", // YYYY-MM-DD HH:MM
                            valueRU: "Число",
                            type: "checkbox",
                            selected: true,
                        },
                        {
                            id: "id-9_4",
                            value: "percent", // YYYY-MM-DD HH:MM
                            valueRU: "Процент",
                            type: "checkbox",
                            selected: true,
                        },
                    ],
                },
                {
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
                            id: "id-10_3",
                            value: "number", // YYYY-MM-DD HH:MM
                            valueRU: "Число",
                            type: "checkbox",
                            selected: true,
                        },
                        {
                            id: "id-10_4",
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
                            id: "id-14_2",
                            value: "columns",
                            valueRU: "Столбцы",
                            type: "parent",
                            parentElement: true,
                            children: [
                                {
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
                                            selected: true,
                                            default: true,
                                        },
                                        {
                                            id: "id-14_222",
                                            type: "checkbox",
                                            selected: false,
                                        },
                                    ],
                                },
                                {
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
                                            selected: true,
                                            default: true,
                                        },
                                        {
                                            id: "id-14_222",
                                            type: "checkbox",
                                            selected: false,
                                        },
                                    ],
                                },
                                {
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
                                            selected: true,
                                            default: true,
                                        },
                                        {
                                            id: "id-14_222",
                                            type: "hide",
                                            selected: false,
                                        },
                                    ],
                                },
                                {
                                    id: "id-14_24",
                                    value: "date",
                                    type: "column",
                                    valueRU: "Дата",
                                    parentElement: true,
                                    children: [
                                        {
                                            id: "id-14_241",
                                            type: "input",
                                            value: "Дата",
                                            selected: true,
                                            default: true,
                                        },
                                        {
                                            id: "id-14_222",
                                            type: "checkbox",
                                            selected: false,
                                        },
                                    ],
                                },
                                {
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
                                            selected: true,
                                            default: true,
                                        },
                                        {
                                            id: "id-14_222",
                                            type: "checkbox",
                                            selected: false,
                                        },
                                    ],
                                },
                                {
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
                                            selected: true,
                                            default: true,
                                        },
                                        {
                                            id: "id-14_222",
                                            type: "checkbox",
                                            selected: false,
                                        },
                                    ],
                                },
                                {
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
                                            selected: true,
                                            default: true,
                                        },
                                        {
                                            id: "id-14_222",
                                            type: "checkbox",
                                            selected: false,
                                        },
                                    ],
                                },
                                {
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
                                            selected: true,
                                            default: true,
                                        },
                                        {
                                            id: "id-14_222",
                                            type: "checkbox",
                                            selected: false,
                                        },
                                    ],
                                },
                            ],
                        },
                        {
                            id: "id-14_3",
                            value: "tag_highlight",
                            valueRU: "Выделение тега",
                            type: "select",
                            parentElement: true,
                            children: [
                                {
                                    id: "id-14_31",
                                    value: "bold",
                                    valueRU: "Жирность",
                                    type: "checkbox",
                                    parentElement: false,
                                    selected: true,
                                },
                                {
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
                                            value: 0,
                                            valueRU: "По убыванию",
                                            type: "select",
                                            parentElement: false,
                                            selected: true,
                                        },
                                        {
                                            id: "id-14_512",
                                            value: 1,
                                            valueRU: "По возрастанию",
                                            type: "select",
                                            parentElement: false,
                                            selected: false,
                                        },
                                    ],
                                },
                                {
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
                                            value: 1,
                                            valueRU: "По убыванию",
                                            type: "select",
                                            parentElement: false,
                                            selected: false,
                                        },
                                        {
                                            id: "id-14_523",
                                            value: 2,
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
                            id: "id-15_2",
                            value: "columns",
                            valueRU: "Столбцы",
                            type: "parent",
                            parentElement: true,
                            children: [
                                {
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
                                            selected: true,
                                            default: true,
                                        },
                                        {
                                            id: "id-14_222",
                                            type: "checkbox",
                                            selected: false,
                                        },
                                    ],
                                },
                                {
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
                                            selected: true,
                                            default: true,
                                        },
                                        {
                                            id: "id-14_222",
                                            type: "hide",
                                            selected: false,
                                        },
                                    ],
                                },
                                {
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
                                            selected: true,
                                            default: true,
                                        },
                                        {
                                            id: "id-14_222",
                                            type: "checkbox",
                                            selected: false,
                                        },
                                    ],
                                },
                                {
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
                                            selected: true,
                                            default: true,
                                        },
                                        {
                                            id: "id-14_222",
                                            type: "checkbox",
                                            selected: false,
                                        },
                                    ],
                                },
                                {
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
                                            selected: true,
                                            default: true,
                                        },
                                        {
                                            id: "id-14_222",
                                            type: "checkbox",
                                            selected: false,
                                        },
                                    ],
                                },
                                {
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
                                            selected: true,
                                            default: true,
                                        },
                                        {
                                            id: "id-14_222",
                                            type: "checkbox",
                                            selected: false,
                                        },
                                    ],
                                },
                            ],
                        },
                        {
                            id: "id-15_3",
                            value: "tag_highlight",
                            valueRU: "Выделение тега",
                            type: "select",
                            parentElement: true,
                            children: [
                                {
                                    id: "id-15_31",
                                    value: "bold",
                                    valueRU: "Жирность",
                                    type: "checkbox",
                                    parentElement: false,
                                    selected: true,
                                },
                                {
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
                                            value: 0,
                                            valueRU: "По убыванию",
                                            type: "select",
                                            parentElement: false,
                                            selected: true,
                                        },
                                        {
                                            id: "id-15_512",
                                            value: 1,
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
                                            value: 1,
                                            valueRU: "По убыванию",
                                            type: "select",
                                            parentElement: false,
                                            selected: false,
                                        },
                                        {
                                            id: "id-15_523",
                                            value: 2,
                                            valueRU: "По возрастанию",
                                            type: "select",
                                            parentElement: false,
                                            selected: false,
                                        },
                                    ],
                                },
                                {
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
};
</script>

<style scoped>
</style>