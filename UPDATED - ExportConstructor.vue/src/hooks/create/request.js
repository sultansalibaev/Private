Number.prototype.limitation = function (min, max) {
    if (isNaN(this)) return min;
    else if (this < min) return min;
    else if (this > max) return max;
    else return this;
}
function requestNumber(request, option, index) {
    if (option.type === "number") {
        let numberValue = parseInt(option.value)
        numberValue = numberValue.limitation(option.min, option.max);
        if (option.name == "text_length") numberValue = 0;
        request[index][option.name] = numberValue;
    }
}
function requestSelectIndex(request, option, index) {
    if (option.type === "select" && option.outputIndex) {
        option.value.forEach(optionValue => {
            if (optionValue.selected)
                request[index][option.name] = optionValue.index;
        });
    }
}
function requestSelectType(request, option, index) {
    if (option.type === "select" && option.name === "type") {
        option.value.forEach(optionMap => {
            if (optionMap[0].selected) {
                request[index][option.name] = optionMap[0].name;
            }
            Object.keys(optionMap[1]).forEach(key => {
                request[index][key] = optionMap[1][key];
            });
        });
    }
}
function requestCheckbox(request, option, index) {
    if (option.type === "checkbox") {
        request[index][option.name] = option.value;
    }
}
function requestColumns(request, option, index) {
    if (option.type === "columns") {
        request[index][option.name] = [];
        option.value.forEach((column, id) => {
            let position = id + 1;
            if (!column.selected) position = 0;
            request[index][option.name].push({
                id: column.name,
                position: position,
            });
            console.log('true true');
            if (column.params) {
                column.params.forEach(param => {
                    if (param.type == 'checkbox') {
                        request[index][option.name][id][param.name] = param.selected;
                    }
                    else if (param.type == 'color') {
                        request[index][option.name][id]['color'] = param.value.split('#')[1];
                    }
                });
            }
        });
    }
}
function requestDropdownTag(request, option, index) {
    if (option.type === "dropdown" && option.name === "tag_highlight") {
        request[index][option.name] = {};
        option.value.forEach(optionValue => {
            request[index][option.name][optionValue.name] = optionValue.type == 'color' ? optionValue.value.split('#')[1] : optionValue.value;
        });
    }
}
function requestDropdownOrder(request, option, index) {
    if (option.type === "dropdown" && option.name === "order") {
        request[index][option.name] = {};
        option.value.forEach(optionValue => {
            if (optionValue[0].type === "select" && optionValue[0].outputIndex) {
                optionValue[1].forEach(optionSelect => {
                    if (optionSelect.selected)
                        request[index][option.name][optionValue[0].name] = optionSelect.index;
                });
            }
        });
        switch (option.draggables[0][0].name) {
            case "sentiments":
                request[index][option.name]["predominantly"] = 0;
                break;
            case "categories":
                request[index][option.name]["predominantly"] = 1;
                break;
            default:
                break;
        }
        option.draggables.forEach(optionDraggable => {
            request[index][option.name][optionDraggable[0].name] = [];
            if (optionDraggable[0].selected) {
                if (optionDraggable[0].name === "sentiments") {
                    optionDraggable[1].forEach((sentiment, id) => {
                        let _id = id + 1;
                        if (!sentiment.selected) _id = 0
                        request[index][option.name][optionDraggable[0].name].splice(sentiment.defaultPosition, 0, _id);
                    });
                }
                else if (optionDraggable[0].name === "categories") {
                    optionDraggable[1].forEach(category => {
                        if (category.selected)
                            request[index][option.name][optionDraggable[0].name].push(category.name);
                    });
                }
            }
            else {
                request[index][option.name][optionDraggable[0].name] = 0;
            }
        });
    }
}
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

function hasGroupError(formatName) {
    let groupBody = document.querySelectorAll(".group__body");
    groupBody.forEach(group => {
        let groupError = group.querySelector(`.absolute`);
        if ((formatName == "powerpoint" && group.children.length != 3) || group.children.length == 1) {
            if (groupError.classList.contains('hidden'))
                groupError.classList.remove('hidden');
            return true;
        }
        else {
            if (!groupError.classList.contains('hidden'))
                groupError.classList.add('hidden');
        }
    });
    return false;
}
function hasProjectError(formatName) {
    let hasErrors = false;
    if (formatName != "powerpoint") return hasErrors;
    let groupTitles = document.querySelectorAll(".group__title");
    groupTitles.forEach(groupTitle => {
        let groupInputs = groupTitle.querySelectorAll("input");
        if (groupInputs) {
            groupInputs.forEach(groupInput => {
                
                if (groupInput.value.length == 0) {
                    groupInput.classList.add("input-error");
                    hasErrors = true;
                }
                else {
                    groupInput.classList.remove("input-error");
                }
            });
        }
    });
    return hasErrors;
}
export default function createRequest() {
    return function (currentReport, formatName) {

        if (hasGroupError(formatName)) return;

        if (hasProjectError(formatName)) return;

        let copyArray = JSON.parse(JSON.stringify(currentReport))
        let request = [];
        let ownIndex = 0;
        copyArray.forEach(([key, value], index) => {
            if (key.name !== "GROUP" && formatName != "powerpoint") {
                request.push({
                    id: key.name,
                    position: index + 1,
                });
                if (value.length) {
                    value.forEach(option => {
                        requestCheckbox(request, option, ownIndex);
                        requestNumber(request, option, ownIndex);
                        requestSelectType(request, option, ownIndex);
                        requestSelectIndex(request, option, ownIndex);
                        requestColumns(request, option, ownIndex);
                        requestDropdownTag(request, option, ownIndex);
                        requestDropdownOrder(request, option, ownIndex);
                    });
                }
                ownIndex++;
            }
            else {
                if (value.elements.length) {
                    if (formatName == "powerpoint") {
                        request.push({
                            position: `${index + 1}`,
                            elements: [],
                            projectName: key.projectName,
                            projectId: key.projectId,
                        });
                        value.elements.forEach(([elementKey, elementValue], elementIndex) => {
                            request[index].elements.push({
                                id: elementKey.name,
                                position: `${elementIndex + 1}`,
                            });
                            if (elementValue.length) {
                                ownIndex++;
                                elementValue.forEach(option => {
                                    requestCheckbox(request[index].elements, option, ownIndex);
                                    requestNumber(request[index].elements, option, ownIndex);
                                    requestSelectType(request[index].elements, option, ownIndex);
                                    requestSelectIndex(request[index].elements, option, ownIndex);
                                    requestColumns(request[index].elements, option, ownIndex);
                                    requestDropdownTag(request[index].elements, option, ownIndex);
                                    requestDropdownOrder(request[index].elements, option, ownIndex);
                                });
                            }
                        });
                    }
                    else {
                        value.elements.forEach(([groupKey, groupValue], groupIndex) => {
                            request.push({
                                id: groupKey.name,
                                position: `${index + 1}_${groupIndex + 1}`,
                            });
                            if (groupValue.length) {
                                groupValue.forEach(option => {
                                    requestCheckbox(request, option, ownIndex);
                                    requestNumber(request, option, ownIndex);
                                    requestSelectType(request, option, ownIndex);
                                    requestSelectIndex(request, option, ownIndex);
                                    requestColumns(request, option, ownIndex);
                                    requestDropdownTag(request, option, ownIndex);
                                    requestDropdownOrder(request, option, ownIndex);
                                });
                                ownIndex++;
                            }
                        });
                    }
                }
                else if (formatName == "powerpoint") return;
            }
        });
        let params = getRequest();

        request.push({
            id: "template_settings",
            orientation: "landscape",
            font_size: 10,
            font_name: "Arial",
            full_page_title: true,
            position: "0",
            merge_cells: true,
            title: 'My Template',
        });
        Object.assign(request[request.length - 1], params);
        request[request.length - 1]["format"] = formatName + "_rus";
        request[request.length - 1]["position"] = 0;
        console.log(request);
        return request;
    };
}