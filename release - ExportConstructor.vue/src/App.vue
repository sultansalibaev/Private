<template>
    <div class="app">
        <div class="content">
            <content-constructs :checkbox="checkbox" />
            <content-sidebar :pdf="switchFormat()" />
        </div>
    </div>
</template>

<script>
import ContentConstructs from "@/components/Constructs/ContentConstructs";
import ContentSidebar from "@/components/Sidebar/ContentSidebar";

import createSelect from "@/hooks/create/select";
import createReport from "@/hooks/create/report";

import toggleElement from "@/hooks/toggle/element";
import toggleGroup from "@/hooks/toggle/group";
import toggleProject from "@/hooks/toggle/project";

import { provide, reactive, ref } from "vue";
import axios from "axios";

export default {
    name: "App",
    components: {
        ContentConstructs,
        ContentSidebar,
    },
    data() {
        return {
        }
    },
    setup() {

        let loading = reactive(ref(false));
        let report_copy = reactive(ref({
            word: [],
            pdf: [],
            excel: [],
            powerpoint: [],
        }))
        let select = createSelect();

        let checkbox = reactive(ref({
                content: true,
                full_page_title: true,
                merge_cells: true,
            }));


        function toggleLoading() {
            return function () {
                loading.value = !loading.value;
            }
        }


        function updateCheckbox(name, value) {
            console.log(checkbox.value, name, value);
            checkbox.value[name] = value;
        }



        function switchFormat() {
            return JSON.parse(JSON.stringify(createReport()[selectedFormat()].value))
        }
        function selectedFormat() {
            return select.format.value.options.find(option => option.selected)?.value;
        }
        function selectedOrientation() {
            return select.orientation.value.options.find(option => option.selected)?.value;
        }
        function selectedMenu() {
            return select.menu.value.options.find(option => option.selected)?.value;
        }

        function selectOption(selectName, optionName) {
            select[selectName].value.options.forEach((opt) => {
                opt.selected = opt.name == optionName;
            });
        }


        let { addElement, removeElement } = toggleElement();
        let { addGroup, removeGroup } = toggleGroup();
        let { addProject, removeProject } = toggleProject();



        provide("report_copy", report_copy);
        provide("selectedFormat", selectedFormat);
        provide("selectedOrientation", selectedOrientation);
        provide("selectedMenu", selectedMenu);
        provide("checkbox", checkbox);
        provide("updateCheckbox", updateCheckbox);

        provide("addElement", addElement);
        provide("addGroup", addGroup);
        provide("addProject", addProject);

        provide("removeElement", removeElement);
        provide("removeGroup", removeGroup);
        provide("removeProject", removeProject);

        provide("format", select.format);
        provide("orientation", select.orientation);
        provide("menu", select.menu);


        provide("selectOption", selectOption);


        provide("loading", loading);
        provide("toggleLoading", toggleLoading);


        return {
            switchFormat,
            report_copy,
            selectOption,
            selectedFormat,
        }

    },
    methods: {
        getRequest() {
            var params = {};

            if (window.location.href.match(/.*\?.*/)) {
                let tmp_params = window.location.href
                    .replace(/.*\?/, "")
                    .split("&");
                for (var p = 0; p < tmp_params.length; p++) {
                    var _tmp = tmp_params[p].split("=");

                    params[_tmp[0]] = _tmp[1];
                }
            }
            return params;
        },
        getJSON(_json) {
            let json = _json.split("\\").join("").slice(2, -5);

            let jsonArr = [];
            let openingKeyOrder = false;
            let newObjCount = 0;
            let subArrCount = 0;
            let subObjCount = 0;
            let newObj1 = {};
            let newObj2 = {};
            let key = "";
            let value = "";
            let openingKey = "";
            for (let i = 0; i < json.length; i++) {
                const el = json[i];
                switch (el) {
                    case "{":
                        newObjCount++;

                        break;
                    case "}":
                        newObjCount--;
                        if (subArrCount > 0) {
                            newObj1[openingKey].push(newObj2);
                            newObj2 = {};
                        } else if (subObjCount > 0) {
                            subObjCount = 0;
                            openingKeyOrder = false;
                        } else if (
                            subArrCount == 0 &&
                            subObjCount == 0 &&
                            newObjCount == 0
                        ) {
                            jsonArr.push(newObj1);
                            newObj1 = {};
                        }

                        break;
                    case ")":
                        if (subArrCount > 0 && json[i - 1] == "}") {
                            subArrCount = 0;
                        }

                        break;
                    case ":":
                        if (json[i + 2] == "(" && json[i + 3] == "{") {
                            subArrCount++;

                            let iKey = i;
                            while (iKey >= 0) {
                                const keyChar = json[iKey - 2];
                                if (keyChar != '"') {
                                    key += keyChar;
                                    iKey--;
                                } else {
                                    iKey = -1;
                                }
                            }
                            openingKey = this.reverseArr(key);
                            newObj1[openingKey] = [];
                            key = "";
                            value = "";
                        } else if (json[i + 1] == "{") {
                            subObjCount++;

                            let iKey = i;
                            while (iKey >= 0) {
                                const keyChar = json[iKey - 2];
                                if (keyChar != '"') {
                                    key += keyChar;
                                    iKey--;
                                } else {
                                    iKey = -1;
                                }
                            }
                            openingKey = this.reverseArr(key);
                            if (openingKey == "order") {
                                openingKeyOrder = true;
                                console.log("openingKeyOrder = true;");
                            }
                            newObj1[openingKey] = {};
                            key = "";
                            value = "";
                        } else {
                            if (subArrCount > 0) {
                                let iKey = i;
                                while (iKey >= 0) {
                                    const keyChar = json[iKey - 2];
                                    if (keyChar != '"') {
                                        key += keyChar;
                                        iKey--;
                                    } else {
                                        iKey = -1;
                                    }
                                }
                                let iValue = i;
                                while (iValue < json.length) {
                                    const valueChar = json[iValue + 2];
                                    if (valueChar != '"') {
                                        value += valueChar;
                                        iValue++;
                                    } else {
                                        iValue = json.length;
                                    }
                                }
                                newObj2[this.reverseArr(key)] =
                                    this.parseValue(value);
                                key = "";
                                value = "";
                            } else if (subObjCount > 0) {
                                let iKey = i;
                                while (iKey >= 0) {
                                    const keyChar = json[iKey - 2];
                                    if (keyChar != '"') {
                                        key += keyChar;
                                        iKey--;
                                    } else {
                                        iKey = -1;
                                    }
                                }
                                let iValue = i;
                                while (iValue < json.length) {
                                    const valueChar = json[iValue + 2];
                                    if (valueChar != '"') {
                                        value += valueChar;
                                        iValue++;
                                    } else {
                                        iValue = json.length;
                                    }
                                }
                                if (value.indexOf("(") != -1) {
                                    console.log("what");
                                    value = "";
                                    let iValue = i;
                                    while (iValue < json.length) {
                                        const valueChar = json[iValue + 2];
                                        if (valueChar != ")") {
                                            value += valueChar;
                                            iValue++;
                                        } else {
                                            value += valueChar;
                                            iValue = json.length;
                                        }
                                    }
                                    if (
                                        openingKeyOrder &&
                                        value[0] == "(" &&
                                        value[value.length - 1] == ")"
                                    ) {
                                        if (
                                            this.reverseArr(key) == "sentiments"
                                        ) {
                                            let valueArr = value
                                                .slice(1, -1)
                                                .split(",");
                                            let newValueArr = [];
                                            for (
                                                let i2 = 0;
                                                i2 < valueArr.length;
                                                i2++
                                            ) {
                                                const el = valueArr[i2];

                                                newValueArr.push(parseInt(el));
                                            }
                                            value = newValueArr;
                                        } else {
                                            value = value
                                                .slice(2, -2)
                                                .split('"')
                                                .join("")
                                                .split(",");
                                        }
                                    }
                                }
                                newObj1[openingKey][this.reverseArr(key)] =
                                    this.parseValue(value);
                                key = "";
                                value = "";
                            } else {
                                let iKey = i;
                                while (iKey >= 0) {
                                    const keyChar = json[iKey - 2];
                                    if (keyChar != '"') {
                                        key += keyChar;
                                        iKey--;
                                    } else {
                                        iKey = -1;
                                    }
                                }
                                let iValue = i;
                                while (iValue < json.length) {
                                    const valueChar = json[iValue + 2];
                                    if (valueChar != '"') {
                                        value += valueChar;
                                        iValue++;
                                    } else {
                                        iValue = json.length;
                                    }
                                }
                                newObj1[this.reverseArr(key)] =
                                    this.parseValue(value);
                                key = "";
                                value = "";
                            }
                        }
                        break;
                    default:
                        break;
                }
            }
            console.log("jsonArr", jsonArr);
            return jsonArr;
        },

        parseValue(value) {
            if (value == "false") {
                return false;
            } else if (value == "true") {
                return true;
            } else if (Number(value) + "" != "NaN") {
                return Number(value);
            } else {
                return value;
            }
        },

        reverseArr(key) {
            let newKey = "";
            for (let i = key.length - 1; i >= 0; i--) {
                const char = key[i];
                newKey += char;
            }
            return newKey;
        },
        switchLang(lang) {
            switch (lang) {
                case "ru":
                    return "rus";
                case "en":
                    return "eng";
                case "kz":
                    return "kaz";
            }
        },
        createElement(report, el) {
            for (let i = 0; i < this.switchFormat().length; i++) {
                const element = this.switchFormat()[i];
                if (element[0].name == el.id) {
                    let independentCopy = JSON.parse(JSON.stringify(element));

                    if (independentCopy[1]) {
                        let elKeys = Object.keys(el);
                        let values = independentCopy[1];
                        values.forEach(value => {
                            let elType = value.type;

                            elKeys.forEach(elKey => {
                                if ((elType == "checkbox" || elType == "number") && elKey == value.name) {
                                    if (value.name == "text_length") value.selected = el[elKey] == 0 ? false : true;
                                    value.value = el[elKey];
                                }
                                else if ((elType == "select" && value.name == "type") && elKey == value.name) {
                                    value.value.forEach(val => {
                                        val[0].selected = val[0].name == el[elKey];
                                        Object.keys(val[1]).forEach(valueName => {
                                            val[1].valueName = el[valueName];
                                        });
                                    });
                                }
                                else if ((elType == "select" && value.outputIndex) && elKey == value.name) {
                                    value.value.forEach(val => {
                                        val.selected = val.index == el[elKey];
                                    });
                                }
                                else if (elType == "columns" && elKey == value.name) {

                                    let myDraggables = [...value.value];
                                    let array = el[elKey];
                                    let newArray = [];
                                    array.forEach(arrayEl => {
                                        myDraggables.forEach(myDraggable => {
                                            if (myDraggable.name == arrayEl.id) {
                                                newArray.push(myDraggable);
                                            }
                                        });
                                    });
                                    value.value = newArray;
                                    value.value.forEach((column, index) => {
                                        if (column.name != "number" && column.name != "content") {
                                            column.selected = el[elKey][index].position != 0;
                                            if (column.params) {
                                                console.log(column.params);
                                                column.params.forEach(columnParam => {
                                                    let paramType = columnParam.type == "checkbox" ? "selected" : "value";
                                                    columnParam[paramType] == el[elKey][index][columnParam.name];
                                                });
                                            }
                                        }
                                    });
                                }
                                else if ((elType == "dropdown" || value.name == "tag_highlight") && elKey == value.name) {
                                    value.value.forEach(val => {
                                        val.value = el[elKey][val.name]
                                    });
                                }
                                else if ((elType == "dropdown" || value.name == "order") && elKey == value.name) {
                                    value.value.forEach(val => {
                                        val[1].forEach(selectData => {
                                            selectData.selected = selectData.index == el[elKey][val[0].name]
                                        });
                                    });
                                    value.draggables.forEach(draggable => {
                                        let myDraggables = [...draggable[1]];
                                        let array = el[elKey][draggable[0].name];
                                        let newArray = [];
                                        array.forEach(arrayEl => {
                                            myDraggables.forEach(myDraggable => {
                                                if (myDraggable.name == arrayEl) {
                                                    newArray.push(myDraggable);
                                                }
                                                else {
                                                    myDraggable.selected = false;
                                                    newArray.push(myDraggable);
                                                }
                                            });
                                        });
                                        draggable[1] = newArray;
                                        draggable[1].forEach(selectData => {
                                            let array = el[elKey][draggable[0].name];
                                            array.forEach(arrayEl => {
                                                selectData.selected = selectData.name == arrayEl;
                                            });
                                        });
                                    });
                                }
                            });
                        });
                    }

                    report.push(independentCopy);
                }
            }
        },
    },
    mounted() {
        let params = this.getRequest();
        if (params.constructorId != null) {
            axios
                .get(
                    `https://cabinet322.imas.kz/ru/reports/getreport?id=${params.constructorId}&token=${params.token}`
                )
                .then((res) => {
                    let _json = res.data.projects[0].json;
                    let _format = res.data.projects[0].format;
                    const formats = {
                        word: "WORD",
                        pdf: "PDF",
                        excel: "Excel",
                        powerpoint: "PowerPoint",
                    };
                    this.selectOption("format", formats[_format]);



                    console.log('_json', _json);

                    let request = this.getJSON(_json);
                    console.log(request);
                    console.log(this.switchFormat());
                    for (let i = 0; i < request.length; i++) {
                        let el = request[i];

                        if (el.id == "template_settings") {
                            el.user_id = params.user_id;
                            el.an_id = params.an_id;
                            el.location = params.location;
                            el.s_date = params.s_date;
                            el.f_date = params.f_date;
                            el.s_time = params.s_time;
                            el.f_time = params.f_time;
                            el.sCountry_id = params.sCountry_id;
                            el.iCategory_id = params.iCategory_id;
                            el.sResource_id = params.sResource_id;
                            el.metrics = params.metrics;
                            el.order = params.order;
                            el.sSentiment = params.sSentiment;
                            el.sLanguage_id = params.sLanguage_id;
                            el.message_type = params.message_type;
                            el.place = params.place;
                            el.place_id = params.place_id;
                            el.token = params.token;
                            el.format =
                                el.format.split("_")[0] + "_" + this.switchLang(params.lang);
                        } else {
                            if (_format == "powerpoint") {
                                this.report_copy[this.selectedFormat()].push([
                                    { id: `group-${el.position}`, name: "GROUP", projectId: el.projectId, projectName: el.projectName, error: "Не менее одного элемента в проекте." },
                                    {
                                        elements: [],
                                    },
                                ])
                                let groupElements = this.report_copy[this.selectedFormat()][i][1].elements;
                                el.elements.forEach(element => {
                                    this.createElement(groupElements, element);
                                });
                            }
                            else {
                                this.createElement(this.report_copy[this.selectedFormat()], el);
                            }
                        }
                    }
                    console.log(this.report_copy[this.selectedFormat()]);
                });
        }
    }
};
</script>

<style>
.app {
    background: #f3f3f4;
}

body {
    background: #f3f3f4;
}

.content {
    display: flex;
    margin: 24px;
    height: 100%;
}
</style>
