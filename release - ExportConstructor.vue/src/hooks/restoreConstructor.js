
import { selectedFormat, selectOption } from "@/hooks/create/select";
import { updateCheckbox } from "@/hooks/create/checkbox";
import { getReportCopy } from "@/hooks/create/report_copy";
import axios from "axios";
import createReport from "./create/report";


function getRequest() {
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
}
function getJSON(_json) {
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
                    openingKey = reverseArr(key);
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
                    openingKey = reverseArr(key);
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
                        newObj2[reverseArr(key)] =
                            reverseArr(key) === 'color'
                                ? value
                                : parseValue(value);
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
                                    reverseArr(key) == "sentiments"
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
                        newObj1[openingKey][reverseArr(key)] =
                            reverseArr(key) === 'color' || reverseArr(key) === 'back_color'
                                ? value
                                : parseValue(value);
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
                        newObj1[reverseArr(key)] =
                            parseValue(value);
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
}

function parseValue(value) {
    if (value == "false") {
        return false;
    } else if (value == "true") {
        return true;
    } else if (Number(value) + "" != "NaN") {
        return Number(value);
    } else {
        return value;
    }
}

function reverseArr(key) {
    let newKey = "";
    for (let i = key.length - 1; i >= 0; i--) {
        const char = key[i];
        newKey += char;
    }
    return newKey;
}
function switchLang(lang) {
    switch (lang) {
        case "ru":
            return "rus";
        case "en":
            return "eng";
        case "kz":
            return "kaz";
    }
}
function getRequestLang() {
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
    return switchLang(lang);
}
function createElement(report, el, switchFormat) {
    for (let i = 0; i < switchFormat().length; i++) {
        const element = switchFormat()[i];
        if (element[0].name == el.id) {
            let independentCopy = JSON.parse(JSON.stringify(element));

            let fromGroup = false;

            if (typeof el.position === 'string' && el.position.indexOf('_') > -1) {
                fromGroup = true
                let groupId = el.position.split('_')[0];
                if (report.length === 0 || (report && report[report.length - 1] && report[report.length - 1][0].id.split('-')[1] !== groupId)) {
                    report.push([
                        { id: `group-${groupId}`, name: "GROUP", error: "Должно быть два элемента." },
                        {
                            elements: [],
                        },
                    ]);
                }
            }
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
                            console.log(value.value);
                            value.value.forEach((column, index) => {
                                if (column.name != "number" && column.name != "content") {
                                    column.selected = el[elKey][index].position != 0;
                                    if (column.params) {
                                        column.params.forEach(columnParam => {
                                            let paramType = columnParam.type == "checkbox" ? "selected" : "value";
                                            let paramValue = columnParam.type == "checkbox"
                                                ? el[elKey][index][columnParam.name]
                                                : "#" + el[elKey][index][columnParam.name];
                                            columnParam[paramType] = paramValue;
                                        });
                                    }
                                }
                            });
                            console.log(value.value);
                        }
                        else if ((elType == "dropdown" || value.name == "tag_highlight") && elKey == value.name) {
                            value.value.forEach(val => {
                                let dropdownValue = val.name == "back_color" || val.name == "color"
                                    ? "#"+el[elKey][val.name]
                                    : el[elKey][val.name];
                                val.value = dropdownValue
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

            if (fromGroup) {
                report[report.length - 1][1].elements.push(independentCopy);
            }
            else {
                report.push(independentCopy);
            }
        }
    }
}



function switchFormat() {
    return JSON.parse(JSON.stringify(createReport()[selectedFormat()].value))
}
export default function restoreConstructor() {

    let params = getRequest();
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
                selectOption("format", formats[_format]);



                console.log('_json', _json);

                let request = getJSON(_json);
                console.log(request);
                console.log(switchFormat());
                for (let i = 0; i < request.length; i++) {
                    let el = request[i];

                    if (el.id == "template_settings") {
                        Object.assign(el, params)
                        document.querySelector("#project-name").value = el.title;
                        document.querySelector("#constructor-name").value = decodeURI(params.constructorName);
                        el.format = el.format.split("_")[0] + "_" + getRequestLang();

                        const orientation = {
                            portrait: "Портрет",
                            landscape: "Пейзаж",
                        };

                        selectOption("orientation", orientation[el.orientation]);
                        selectOption("menu", "Проект");
                        updateCheckbox("content", stringToBoolean(el.content));
                        updateCheckbox("full_page_title", stringToBoolean(el.full_page_title));
                        updateCheckbox("merge_cells", stringToBoolean(el.merge_cells));
                    }
                    else {
                        if (_format == "powerpoint") {
                            getReportCopy().push([
                                { id: `group-${el.position}`, name: "GROUP", projectId: el.projectId, projectName: el.projectName, error: "Не менее одного элемента в проекте." },
                                {
                                    elements: [],
                                },
                            ])
                            let groupElements = getReportCopy()[i][1].elements;
                            el.elements.forEach(element => {
                                createElement(groupElements, element, switchFormat);
                            });
                        }
                        else {
                            createElement(getReportCopy(), el, switchFormat);
                        }
                    }
                }
                console.log(getReportCopy());
            });
    }
}
const stringToBoolean = string => string === 'true'
    ? true
    : string === 'false'
        ? false
        : string;