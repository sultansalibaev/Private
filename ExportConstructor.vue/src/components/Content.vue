<template>
    <Constructs
        :elements="elements"
        :elementLanguageList="switchCase()"
        :loading="loading"
        :bluring="bluring"
        :error="error"
        :defaultPDFValues="defaultPDFValues"
        :additional="additional"
        :oldElements="oldElements"
    />
    <Sidebar
        :elements="switchCase()"
        :newElements="elements"
        :loading="loading"
        :error="error"
        :additional="additional"
    />
</template>

<script>
import Constructs from "@/components/Constructs/Constructs.vue";
import Sidebar from "@/components/Sidebar/Sidebar.vue";
import axios from "axios";

export default {
    name: "Content",

    components: {
        Constructs,
        Sidebar,
    },
    props: {
        oldElements: {
            type: Array,
            required: true,
        },
        powerpointElementList: {
            type: Array,
            required: true,
        },
        wordElementList: {
            type: Array,
            required: true,
        },
        excelElementList: {
            type: Array,
            required: true,
        },
        pdfElementList: {
            type: Array,
            required: true,
        },
        elements: {
            type: Array,
            required: true,
        },
        error: {
            type: Object,
            required: true,
        },
        bluring: {
            type: Object,
            required: true,
        },
        defaultPDFValues: {
            type: Object,
            required: true,
        },
        additional: {
            type: Object,
            required: true,
        },
        loading: {
            type: Object,
            required: true,
        },
    },
    emits: ["update"],
    methods: {
        switchCase() {
            switch (this.additional.format.file) {
                case "pdf":
                    return this.pdfElementList;
                case "excel":
                    return this.excelElementList;
                case "word":
                    return this.wordElementList;
                case "powerpoint":
                    return this.powerpointElementList;
                default:
                    break;
            }
        },
        getRequestLang() {
            var params = {};

            if (window.location.href.match(/.*\?.*/)) {
                let tmp_params = window.location.href
                    .replace(/\?.*/, "")
                    .split("//")
                    .join("")
                    .split("/");
                for (var p = 0; p < tmp_params.length; p++) {
                    var _tmp = tmp_params[p].split("=");

                    params[_tmp[0]] = _tmp[1];
                }
            }
            let lang = Object.keys(params)[1];
            return this.switchLang(lang);
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
        deepClone(arr) {
            return arr.map((item) =>
                Array.isArray(item) ? deepClone(item) : item
            );

            const independentCopy = JSON.parse(JSON.stringify(user));
        },

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

        createElement(el) {
            for (let i = 0; i < this.switchCase().length; i++) {
                const element = this.switchCase()[i];
                if (element.name == el.id) {
                    let independentCopy = JSON.parse(JSON.stringify(element));

                    let elKeys = Object.keys(el);
                    elKeys.forEach(elKey => {
                        if (elKey != 'id' && elKey != 'position') {
                            if (Array.isArray(el[elKey])) {
                                if (independentCopy.type == 'table') {
                                    for (let i2 = 0; i2 < independentCopy.options.length; i2++) {
                                        let option = independentCopy.options[i2];

                                        if (option.type == 'hide') { }
                                        else if (option.value == elKey) {
                                            if (option.value == "columns" || option.value == "list_rows") {

                                            let optionChildren = JSON.parse(JSON.stringify(option.children));
                                            option.children = [];
                                            for (let i4 = 0; i4 < el[elKey].length; i4++) {
                                                let requestChild = el[elKey][i4];
                                                for (let i3 = 0; i3 < optionChildren.length; i3++) {
                                                    let child = optionChildren[i3];

                                                    if (child.value == requestChild.id) {
                                                        if (requestChild.position == 0) {
                                                            child.selected = false;
                                                        }
                                                        else {
                                                            child.selected = true;
                                                        }
                                                        option.children.push(child);
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                        else if (typeof el[elKey] == 'object') {
                            for (let i2 = 0; i2 < independentCopy.options.length; i2++) {
                                let option = independentCopy.options[i2];
                                if (option.value == elKey) {
                                    if (option.value == "tag_highlight") {
                                        let children = option.children;
                                        for (let i2 = 0; i2 < children.length; i2++) {
                                            let child = children[i2];

                                            if (child.type == "checkbox") {
                                                child.selected = el[elKey][child.value];
                                            }
                                            else if (child.children && child.children[0].type == "color") {
                                                child.children[0].value = el[elKey][child.value];
                                                child.children[0].valueRU = el[elKey][child.value];
                                            }
                                        }
                                    }
                                    else if (option.value == "order") {
                                        let children = option.children;
                                        for (let i2 = 0; i2 < children.length; i2++) {
                                            let child = children[i2];

                                            if (child.value == 'date') {
                                                for (let i3 = 0; i3 < child.children.length; i3++) {
                                                    let ch = child.children[i3];

                                                    if (ch.value == el[elKey][child.value]) {
                                                        ch.selected = true;
                                                    }
                                                    else {
                                                        ch.selected = false;
                                                    }
                                                }
                                            }
                                            else if (child.value == 'sentiments') {
                                                if (el[elKey][child.value] == 0) {
                                                    child.selected = false;
                                                }
                                                else {
                                                    child.selected = true;
                                                    let tempEl = {};

                                                    for (let i4 = 0; i4 < el[elKey][child.value].length; i4++) {
                                                        let requestChild = el[elKey][child.value][i4];
                                                        let ch = child.children[i4];

                                                        if (requestChild == 0) {
                                                            ch.selected = false;
                                                        } else {
                                                            requestChild -= 1;
                                                            tempEl = child.children[requestChild];
                                                            child.children[requestChild] = ch;
                                                            child.children[i4] = tempEl;
                                                        }
                                                    }
                                                }

                                            }
                                            else if (child.value == 'categories') {
                                                if (el[elKey][child.value] == 0) {
                                                    child.selected = false;
                                                }
                                                else {
                                                    child.selected = true;
                                                    let tempEl = {};
                                                    for (let i5 = 0; i5 < child.children.length; i5++) {
                                                        let ch2 = child.children[i5];
                                                        ch2.selected = false;
                                                    }
                                                    for (let i4 = 0; i4 < el[elKey][child.value].length; i4++) {
                                                        let requestChild = el[elKey][child.value][i4];
                                                        for (let i3 = 0; i3 < child.children.length; i3++) {
                                                            let ch = child.children[i3];

                                                            if (ch.value == requestChild) {
                                                                ch.selected = true;

                                                                tempEl = child.children[i4];
                                                                child.children[i4] = ch;
                                                                child.children[i3] = tempEl;
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                        else {
                                for (let i2 = 0; i2 < independentCopy.options.length; i2++) {
                                    let option = independentCopy.options[i2];

                                    if (option.type == 'hide') { }
                                    else if (option.value == elKey) {
                                        if (option.children && option.children[0].type == 'input') {
                                            option.children[0].valueRU = el[elKey];
                                        }
                                        else if (option.type == 'select') {
                                            if (option.value == 'type') {
                                                for (let i3 = 0; i3 < option.children.length; i3++) {
                                                    let child = option.children[i3];
                                                    if (child.value == el['type']) {
                                                        child.selected = true;
                                                        for (let i3 = 0; i3 < child.children.length; i3++) {
                                                            let ch = child.children[i3];

                                                            if (ch.value == 'data_labels') {
                                                                ch.selected = typeof el['data_labels'] == 'boolean' ? el['data_labels'] : false;
                                                            }
                                                            else if (ch.value == 'labels') {
                                                                ch.selected = typeof el['labels'] == 'boolean' ? el['labels'] : false;
                                                            }
                                                        }
                                                    }
                                                    else {
                                                        child.selected = false;
                                                    }
                                                }
                                            }
                                            else {
                                                if (option.value == 'datetime_format') {
                                                    for (let i3 = 0; i3 < option.children.length; i3++) {
                                                        let child = option.children[i3];

                                                        if (child.value == el[option.value]) {
                                                            child.selected = true;
                                                        }
                                                        else {
                                                            child.selected = false;
                                                        }
                                                    }
                                                }
                                                else {
                                                    for (let i3 = 0; i3 < option.children.length; i3++) {
                                                        let child = option.children[i3];

                                                        if (child.valueRU == el[elKey]) {
                                                            child.selected = true;
                                                        }
                                                        else {
                                                            child.selected = false;
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                        else if (option.type == 'checkbox') {
                                            option.selected = el[elKey];
                                        }
                                    }
                                }
                            }
                        }
                    });

                    this.elements.push(independentCopy);
                    console.log(this.elements);
                }
            }
        },
    },
    mounted() {
        for (let index = 0; index < this.pdfElementList.length; index++) {
            const element = this.pdfElementList[index];
            if (element.options[0].value == "title") {
                element.options[0].children[0].valueRU =
                    this.defaultPDFValues[element.name].title[
                        this.getRequestLang()
                    ];
            }

            if (element.type == "table") {
                let columns = element.options[1];
                for (let i = 0; i < columns.children.length; i++) {
                    const column = columns.children[i];
                    if (
                        this.defaultPDFValues[element.name].columns[
                            column.value
                        ]
                    ) {
                        column.valueRU = column.children[0].valueRU =
                            this.defaultPDFValues[element.name].columns[
                                column.value
                            ][this.getRequestLang()];
                    }
                }
            }
        }

        let params = this.getRequest();
        if (params.constructorId != null) {
            axios
                .get(
                    `https://cabinet322.imas.kz/ru/reports/getreport?id=${params.constructorId}&token=${params.token}`
                )
                .then((res) => {
                    console.log(res);
                    let _json = res.data.projects[0].json;
                    let _format = res.data.projects[0].format;
                    this.additional.format.file = _format;



                    let newArr = this.getJSON(_json);
                    let request = newArr;
                    for (let i = request.length - 1; i >= 0; i--) {
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
                        }
                        console.log(el);
                        this.createElement(el);
                    }
                });
        }
    },
};
</script>

<style scoped>
</style>