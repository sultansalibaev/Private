<template>
    <div class="btns">
        <div class="col-xs-12 export p-t-15">
            <button
                class="button btn btn-imas btn-sm f-l post-btn"
                @click="downloadConstructFile"
            >
                <span>Скачать</span>
            </button>
            <!-- <i class="fa-solid fa-spinner-third"></i> -->
        </div>
        <div class="col-xs-12 export p-t-15">
            <button
                class="button btn btn-imas btn-sm f-l post-btn"
                @click="saveTemplate"
            >
                <span>Сохранить шаблон</span>
            </button>
        </div>
        <!-- <div class="col-xs-12 export p-t-15">
            <button
                class="button btn btn-imas btn-sm f-l post-btn"
                @click="getJSON"
            >
                <span>getTemplates</span>
            </button>
        </div> -->
    </div>
    <!-- project-name -->
</template>

<script>
import axios from "axios";
export default {
    name: "Buttons",
    props: {
        elements: {
            type: Array,
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
        error: {
            type: Object,
            required: true,
        },
    },
    emits: ["update"],
    methods: {
        async loadingSpinner() {
            if (this.loading.is == false) {
                this.loading.is = true;
            } else {
                this.loading.is = false;
            }
        },
        hasGroupError() {
            let groups = document.querySelectorAll(".Group");

            let errCount = 0;

            for (let i = 0; i < groups.length; i++) {
                let group = groups[i];
                if (this.additional.format.file == "powerpoint") {
                    if (group.children.length == 0) {
                        group.parentElement.classList.add("groupErr");
                        group.nextElementSibling.style.display = "inline";
                        errCount++;
                    }
                } else if (
                    group.children.length < 2 ||
                    group.children.length > 2
                ) {
                    group.parentElement.classList.add("groupErr");
                    group.nextElementSibling.style.display = "inline";
                    errCount++;
                } else {
                    group.parentElement.classList.remove("groupErr");
                    group.nextElementSibling.style.display = "none";
                }
            }
            if (errCount > 0) {
                return true;
            }
        },
        getProjectName() {
            let projectName =
                document.querySelector(".box .project-name").value; // Мой Шаблон;
            if (projectName != "") {
                return projectName; // Мой Шаблон;
            } else {
                return "Мой Шаблон";
            }
        },
        getConstructorName() {
            let projectName = document.querySelector(
                ".box .constructor-name"
            ).value; // Мой Шаблон;
            if (projectName != "") {
                return projectName; // Мой Шаблон;
            } else {
                return "Мой Конструктор";
            }
        },
        createRequest() {
            let isPP = this.additional.format.file == "powerpoint";
            let request = [];
            let ppRequest = [];
            let independentCopy = JSON.parse(
                JSON.stringify([...this.elements])
            );
            let i = 0;
            let index = 0;
            for (let p = independentCopy.length - 1; p >= 0; p--) {
                index++;
                let element = independentCopy[p];
                if (independentCopy.length != undefined) {
                    if (element.name != "Group") {
                        request.push({
                            id: element.name,
                            position: i + 1 + "",
                        });
                        index++;
                    } else if (
                        this.additional.format.file == "powerpoint" &&
                        element.name == "Group"
                    ) {
                        request = [];
                        for (let i2 = element.group.length - 1; i2 >= 0; i2--) {
                            const groupEl = element.group[i2];

                            request.push({
                                id: groupEl.name,
                                position: i2 + 1 + "",
                            });
                            index++;
                        }
                        ppRequest.push({
                            elements: request,
                        });
                    } else if (
                        element.group.length != undefined &&
                        this.additional.format.file != "powerpoint"
                    ) {
                        let newIndex = 0;
                        for (let i2 = 0; i2 < element.group.length; i2++) {
                            this.ungroup(independentCopy, element.group, p);
                            const groupEl = element.group[i2];
                            if (
                                groupEl.options[groupEl.options.length - 1]
                                    .position != undefined
                            ) {
                                index = i;
                                request.push({
                                    id: groupEl.name,
                                    position:
                                        index +
                                        1 +
                                        "_" +
                                        groupEl.options[
                                            groupEl.options.length - 1
                                        ].position,
                                });
                            } else {
                                index = i;
                                ++newIndex;
                                request.push({
                                    id: groupEl.name,
                                    position: index + 1 + "_" + newIndex,
                                });
                            }
                        }
                    }
                }
                if (i < independentCopy.length) {
                    i++;
                }
            }
            if (!isPP) {
                for (let i = 0; i < request.length; i++) {
                    if (request[i].position.indexOf("_") > -1) {
                        let el = request[i];
                        if (request[i + 1] != undefined) {
                            request[i] = request[i + 1];
                            request[i + 1] = el;
                            i++;
                        }
                    }
                }
            }

            i = 0;
            let indexArray = [];
            if (!isPP) {
                for (let p = request.length - 1; p >= 0; p--) {
                    if (request[i].position.indexOf("_") > -1) {
                        indexArray.push(
                            this.elements.length +
                                1 -
                                request[i].position.split("_")[0] +
                                "_" +
                                request[i].position.split("_")[1]
                        );
                        request[i].position = request[i].position;
                    } else {
                        indexArray.push(
                            this.elements.length + 1 - request[i].position
                        );
                    }
                    if (i < independentCopy.length) {
                        i++;
                    }
                }
                for (let i = 0; i < request.length; i++) {
                    const req = request[i];

                    req.position = indexArray[i] + "";
                }
            }
            let j = 0;
            let c = 0;
            let groupCount = 0;
            let ppi = ppRequest.length - 1;
            for (let i = 0; i < this.elements.length; i++) {
                // let req = request[p];
                let element = this.elements[i];
                let reverse = request.length - (j + 1);

                if (isPP) {
                    ppRequest[ppi].projectId = "" + element.projectId;
                    ppRequest[ppi].projectName = "" + element.projectName;
                    ppRequest[ppi].position = i + 1 + "";
                    ppRequest[ppi].color = element.color + "";
                }

                if (isPP) {
                    j = 0;
                    c = 0;
                    for (let i2 = 0; i2 < element.group.length; i2++) {
                        const groupEl = element.group[i2];
                        reverse = ppRequest[ppi].elements.length - (j + 1);

                        j = i2 + 1;
                        if (c > 0) {
                            j = i2 + 1 + c;
                            reverse = ppRequest[ppi].elements.length - j;
                        }
                        console.log(
                            groupEl.name,
                            ppRequest[ppi].elements[reverse].id
                        );
                        if (
                            groupEl.name == ppRequest[ppi].elements[reverse].id
                        ) {
                            if (groupEl.type == "table") {
                                if (groupEl.options.length != undefined) {
                                    for (
                                        let i2 = 0;
                                        i2 < groupEl.options.length;
                                        i2++
                                    ) {
                                        let option = groupEl.options[i2],
                                            tableSelected = true;
                                        if (
                                            groupEl.options[0].value == "table"
                                        ) {
                                            tableSelected =
                                                groupEl.options[0].selected;
                                        }

                                        if (option.value == "title") {
                                            ppRequest[ppi].elements[reverse][
                                                option.value
                                            ] = option.children[0].valueRU;
                                        } else if (
                                            option.value == "text_length"
                                        ) {
                                            let textLengthValue =
                                                option.children[0].valueRU;
                                            textLengthValue =
                                                textLengthValue > 500
                                                    ? 500
                                                    : textLengthValue;
                                            textLengthValue =
                                                textLengthValue < 1
                                                    ? 1
                                                    : textLengthValue;
                                            ppRequest[ppi].elements[reverse][
                                                option.value
                                            ] = option.selected
                                                ? textLengthValue
                                                : 0;
                                        } else if (
                                            (option.value == "columns" &&
                                                tableSelected) ||
                                            (option.value == "list_rows" &&
                                                !tableSelected)
                                        ) {
                                            ppRequest[ppi].elements[reverse][
                                                option.value
                                            ] = [];
                                            let hideColumnsCount = 0;
                                            for (
                                                let i3 = 0;
                                                i3 < option.children.length;
                                                i3++
                                            ) {
                                                const child =
                                                    option.children[i3];
                                                ppRequest[ppi].elements[
                                                    reverse
                                                ][option.value][i3] = {
                                                    id: child.value,
                                                    position: !child.selected
                                                        ? 0
                                                        : i3 +
                                                          1 -
                                                          hideColumnsCount,
                                                };
                                                if (!child.selected) {
                                                    hideColumnsCount++;
                                                }

                                                for (
                                                    let i4 = 0;
                                                    i4 < child.children.length;
                                                    i4++
                                                ) {
                                                    const ch =
                                                        child.children[i4];
                                                    if (ch.type == "input") {
                                                        ppRequest[ppi].elements[
                                                            reverse
                                                        ][option.value][i3][
                                                            "name"
                                                        ] = ch.valueRU;
                                                    } else if (
                                                        ch.type == "color"
                                                    ) {
                                                        ppRequest[ppi].elements[
                                                            reverse
                                                        ][option.value][i3][
                                                            "color"
                                                        ] =
                                                            ch.valueRU.split(
                                                                "#"
                                                            )[1];
                                                    } else if (
                                                        ch.type == "checkbox"
                                                    ) {
                                                        ppRequest[ppi].elements[
                                                            reverse
                                                        ][option.value][i3][
                                                            ch.value
                                                        ] = ch.selected;
                                                    }
                                                }
                                            }
                                        } else if (
                                            option.value == "tag_highlight"
                                        ) {
                                            ppRequest[ppi].elements[reverse][
                                                option.value
                                            ] = {};
                                            for (
                                                let i3 = 0;
                                                i3 < option.children.length;
                                                i3++
                                            ) {
                                                const child =
                                                    option.children[i3];
                                                if (child.type == "checkbox") {
                                                    ppRequest[ppi].elements[
                                                        reverse
                                                    ][option.value][
                                                        child.value
                                                    ] = child.selected;
                                                } else if (
                                                    child.type == "parent"
                                                ) {
                                                    const ch =
                                                        child.children[0];
                                                    console.log(ch.valueRU);
                                                    ppRequest[ppi].elements[
                                                        reverse
                                                    ][option.value][
                                                        child.value
                                                    ] =
                                                        groupEl.name == "smi" ||
                                                        groupEl.name == "soc"
                                                            ? ch.valueRU.split(
                                                                  "#"
                                                              )[1]
                                                            : ch.valueRU;
                                                }
                                            }
                                        } else if (
                                            option.value == "datetime_format"
                                        ) {
                                            for (
                                                let i3 = 0;
                                                i3 < option.children.length;
                                                i3++
                                            ) {
                                                const child =
                                                    option.children[i3];
                                                if (child.selected) {
                                                    ppRequest[ppi].elements[
                                                        reverse
                                                    ][option.value] =
                                                        child.value;
                                                }
                                            }
                                        } else if (option.value == "order") {
                                            ppRequest[ppi].elements[reverse][
                                                option.value
                                            ] = {};
                                            ppRequest[ppi].elements[reverse][
                                                option.value
                                            ]["predominantly"] = 0;
                                            for (
                                                let i3 = 0;
                                                i3 < option.children.length;
                                                i3++
                                            ) {
                                                const child =
                                                    option.children[i3];
                                                if (
                                                    child.value == "sentiments"
                                                ) {
                                                    ppRequest[ppi].elements[
                                                        reverse
                                                    ][option.value][
                                                        "predominantly"
                                                    ] = 1;
                                                    ppRequest[ppi].elements[
                                                        reverse
                                                    ][option.value][
                                                        child.value
                                                    ] = [];

                                                    if (!child.selected) {
                                                        ppRequest[ppi].elements[
                                                            reverse
                                                        ][option.value][
                                                            child.value
                                                        ] = 0;
                                                    } else if (
                                                        child.children[0]
                                                            .type == "draggable"
                                                    ) {
                                                        for (
                                                            let i4 = 0;
                                                            i4 <
                                                            child.children
                                                                .length;
                                                            i4++
                                                        ) {
                                                            const ch =
                                                                child.children[
                                                                    i4
                                                                ];
                                                            if (
                                                                ch.value ==
                                                                "positive"
                                                            ) {
                                                                ppRequest[
                                                                    ppi
                                                                ].elements[
                                                                    reverse
                                                                ][option.value][
                                                                    child.value
                                                                ].push(
                                                                    ch.selected
                                                                        ? i4 + 1
                                                                        : 0
                                                                );
                                                            }
                                                        }
                                                        for (
                                                            let i4 = 0;
                                                            i4 <
                                                            child.children
                                                                .length;
                                                            i4++
                                                        ) {
                                                            const ch =
                                                                child.children[
                                                                    i4
                                                                ];
                                                            if (
                                                                ch.value ==
                                                                "neutral"
                                                            ) {
                                                                ppRequest[
                                                                    ppi
                                                                ].elements[
                                                                    reverse
                                                                ][option.value][
                                                                    child.value
                                                                ].push(
                                                                    ch.selected
                                                                        ? i4 + 1
                                                                        : 0
                                                                );
                                                            }
                                                        }
                                                        for (
                                                            let i4 = 0;
                                                            i4 <
                                                            child.children
                                                                .length;
                                                            i4++
                                                        ) {
                                                            const ch =
                                                                child.children[
                                                                    i4
                                                                ];
                                                            if (
                                                                ch.value ==
                                                                "negative"
                                                            ) {
                                                                ppRequest[
                                                                    ppi
                                                                ].elements[
                                                                    reverse
                                                                ][option.value][
                                                                    child.value
                                                                ].push(
                                                                    ch.selected
                                                                        ? i4 + 1
                                                                        : 0
                                                                );
                                                            }
                                                        }
                                                    }
                                                } else if (
                                                    child.value == "categories"
                                                ) {
                                                    ppRequest[ppi].elements[
                                                        reverse
                                                    ][option.value][
                                                        "predominantly"
                                                    ] = 0;
                                                    ppRequest[ppi].elements[
                                                        reverse
                                                    ][option.value][
                                                        child.value
                                                    ] = [];

                                                    if (!child.selected) {
                                                        ppRequest[ppi].elements[
                                                            reverse
                                                        ][option.value][
                                                            child.value
                                                        ] = 0;
                                                    } else if (
                                                        child.children[0]
                                                            .type == "draggable"
                                                    ) {
                                                        for (
                                                            let i4 = 0;
                                                            i4 <
                                                            child.children
                                                                .length;
                                                            i4++
                                                        ) {
                                                            const ch =
                                                                child.children[
                                                                    i4
                                                                ];
                                                            if (ch.selected)
                                                                ppRequest[
                                                                    ppi
                                                                ].elements[
                                                                    reverse
                                                                ][option.value][
                                                                    child.value
                                                                ].push(
                                                                    ch.value
                                                                );
                                                        }
                                                    }
                                                } else {
                                                    for (
                                                        let i4 = 0;
                                                        i4 <
                                                        child.children.length;
                                                        i4++
                                                    ) {
                                                        const ch =
                                                            child.children[i4];
                                                        if (ch.selected) {
                                                            ppRequest[
                                                                ppi
                                                            ].elements[reverse][
                                                                option.value
                                                            ][child.value] =
                                                                ch.value;
                                                        }
                                                    }
                                                }
                                            }
                                        } else if (option.type == "checkbox") {
                                            ppRequest[ppi].elements[reverse][
                                                option.value
                                            ] = option.selected;
                                        } else if (option.type == "select") {
                                            ppRequest[ppi].elements[reverse][
                                                option.value
                                            ] = option.selected;
                                        } else if (
                                            option.value != "columns" &&
                                            option.value != "list_rows"
                                        ) {
                                            if (option.type == "hide") {
                                                let output = option.children[0]
                                                    .value
                                                    ? option.children[0].value
                                                    : option.children[0]
                                                          .valueRU;
                                                let number = 0;
                                                if (
                                                    option.value == "font_name"
                                                ) {
                                                    output = option.children[0]
                                                        .valueRU
                                                        ? option.children[0]
                                                              .valueRU
                                                        : option.children[0]
                                                              .value;
                                                    number = output;
                                                } else {
                                                    output = option.children[0]
                                                        .valueRU
                                                        ? option.children[0]
                                                              .valueRU
                                                        : option.children[0]
                                                              .value;
                                                    number = parseInt(output);
                                                }
                                                ppRequest[ppi].elements[
                                                    reverse
                                                ][option.value] = number;
                                            }
                                        }
                                    }
                                }
                            } else if (groupEl.options.length != undefined) {
                                for (
                                    let i2 = 0;
                                    i2 < groupEl.options.length;
                                    i2++
                                ) {
                                    let option = groupEl.options[i2];

                                    if (option.type != undefined) {
                                        if (option.type == "checkbox") {
                                            ppRequest[ppi].elements[reverse][
                                                option.value
                                            ] = option.selected;
                                        } else if (option.type == "select") {
                                            if (option.value == "type") {
                                                for (
                                                    let i3 = 0;
                                                    i3 < option.children.length;
                                                    i3++
                                                ) {
                                                    const child =
                                                        option.children[i3];
                                                    if (child.selected) {
                                                        ppRequest[ppi].elements[
                                                            reverse
                                                        ][option.value] =
                                                            child.value;
                                                        for (
                                                            let i4 = 0;
                                                            i4 <
                                                            child.children
                                                                .length;
                                                            i4++
                                                        ) {
                                                            const ch =
                                                                child.children[
                                                                    i4
                                                                ];
                                                            if (ch.selected) {
                                                                ppRequest[
                                                                    ppi
                                                                ].elements[
                                                                    reverse
                                                                ][ch.value] =
                                                                    ch.selected;
                                                            }
                                                        }
                                                    }
                                                }
                                            } else if (
                                                option.children == undefined
                                            ) {
                                                ppRequest[ppi].elements[
                                                    reverse
                                                ][option.value] =
                                                    option.selected;
                                            } else {
                                                for (
                                                    let i3 = 0;
                                                    i3 < option.children.length;
                                                    i3++
                                                ) {
                                                    const child =
                                                        option.children[i3];
                                                    if (child.valueRU) {
                                                        if (
                                                            typeof child.valueRU ==
                                                            "number"
                                                        ) {
                                                            ppRequest[
                                                                ppi
                                                            ].elements[reverse][
                                                                option.value
                                                            ] = parseInt(
                                                                child.valueRU
                                                            );
                                                        } else {
                                                            ppRequest[
                                                                ppi
                                                            ].elements[reverse][
                                                                option.value
                                                            ] =
                                                                option.value ==
                                                                "format"
                                                                    ? child.value
                                                                    : child.valueRU;
                                                        }
                                                    } else {
                                                        ppRequest[ppi].elements[
                                                            reverse
                                                        ][option.value] =
                                                            child.value;
                                                    }
                                                }
                                            }
                                        }
                                    } else if (option.children != undefined) {
                                        ppRequest[ppi].elements[reverse][
                                            option.value
                                        ] = option.children[0].valueRU;
                                    }
                                }
                            }
                        }
                    }
                } else if (element.name == "Group") {
                    groupCount++;
                    for (let i2 = 0; i2 < element.group.length; i2++) {
                        const groupEl = element.group[i2];
                        reverse =
                            request.length -
                            (i + i2 + (parseInt(groupCount) - 1) + 1);
                        if (groupEl.name == request[reverse].id) {
                            if (groupEl.options.length != undefined) {
                                for (
                                    let i2 = 0;
                                    i2 < groupEl.options.length;
                                    i2++
                                ) {
                                    let option = groupEl.options[i2];

                                    if (option.type != undefined) {
                                        if (option.type == "checkbox") {
                                            request[reverse][option.value] =
                                                option.selected;
                                        } else if (option.type == "select") {
                                            if (option.value == "type") {
                                                for (
                                                    let i3 = 0;
                                                    i3 < option.children.length;
                                                    i3++
                                                ) {
                                                    const child =
                                                        option.children[i3];
                                                    if (child.selected) {
                                                        request[reverse][
                                                            option.value
                                                        ] = child.value;
                                                        for (
                                                            let i4 = 0;
                                                            i4 <
                                                            child.children
                                                                .length;
                                                            i4++
                                                        ) {
                                                            const ch =
                                                                child.children[
                                                                    i4
                                                                ];
                                                            if (ch.selected) {
                                                                request[
                                                                    reverse
                                                                ][ch.value] =
                                                                    ch.selected;
                                                            }
                                                        }
                                                    }
                                                }
                                            } else if (
                                                option.children == undefined
                                            ) {
                                                request[reverse][option.value] =
                                                    option.selected;
                                            }
                                        }
                                    } else if (option.children != undefined) {
                                        request[reverse][option.value] =
                                            option.children[0].valueRU;
                                    }
                                }
                            }
                        }
                    }
                    c = c + (element.group.length - 1);
                } else {
                    j = i + 1;
                    if (c > 0) {
                        j = i + 1 + c;
                        reverse = request.length - j;
                    }
                    console.log(
                        element.name == request[reverse].id,
                        element.name,
                        request[reverse].id
                    );
                    if (element.name == request[reverse].id) {
                        if (element.type == "table") {
                            if (element.options.length != undefined) {
                                for (
                                    let i2 = 0;
                                    i2 < element.options.length;
                                    i2++
                                ) {
                                    let option = element.options[i2],
                                        tableSelected = true;
                                    if (element.options[0].value == "table") {
                                        tableSelected =
                                            element.options[0].selected;
                                    }

                                    if (option.value == "title") {
                                        request[reverse][option.value] =
                                            option.children[0].valueRU;
                                    } else if (option.value == "text_length") {
                                        let textLengthValue =
                                            option.children[0].valueRU;
                                        textLengthValue =
                                            textLengthValue > 500
                                                ? 500
                                                : textLengthValue;
                                        textLengthValue =
                                            textLengthValue < 1
                                                ? 1
                                                : textLengthValue;
                                        request[reverse][option.value] =
                                            option.selected
                                                ? textLengthValue
                                                : 0;
                                    } else if (
                                        (option.value == "columns" &&
                                            tableSelected) ||
                                        (option.value == "list_rows" &&
                                            !tableSelected)
                                    ) {
                                        request[reverse][option.value] = [];
                                        let hideColumnsCount = 0;
                                        for (
                                            let i3 = 0;
                                            i3 < option.children.length;
                                            i3++
                                        ) {
                                            const child = option.children[i3];
                                            request[reverse][option.value][i3] =
                                                {
                                                    id: child.value,
                                                    position: !child.selected
                                                        ? 0
                                                        : i3 +
                                                          1 -
                                                          hideColumnsCount,
                                                };
                                            if (!child.selected) {
                                                hideColumnsCount++;
                                            }

                                            for (
                                                let i4 = 0;
                                                i4 < child.children.length;
                                                i4++
                                            ) {
                                                const ch = child.children[i4];
                                                if (ch.type == "input") {
                                                    request[reverse][
                                                        option.value
                                                    ][i3]["name"] = ch.valueRU;
                                                } else if (ch.type == "color") {
                                                    request[reverse][
                                                        option.value
                                                    ][i3]["color"] =
                                                        ch.valueRU.split(
                                                            "#"
                                                        )[1];
                                                } else if (
                                                    ch.type == "checkbox"
                                                ) {
                                                    request[reverse][
                                                        option.value
                                                    ][i3][ch.value] =
                                                        ch.selected;
                                                }
                                            }
                                        }
                                    } else if (
                                        option.value == "tag_highlight"
                                    ) {
                                        request[reverse][option.value] = {};
                                        for (
                                            let i3 = 0;
                                            i3 < option.children.length;
                                            i3++
                                        ) {
                                            const child = option.children[i3];
                                            if (child.type == "checkbox") {
                                                request[reverse][option.value][
                                                    child.value
                                                ] = child.selected;
                                            } else if (child.type == "parent") {
                                                const ch = child.children[0];
                                                console.log(ch.valueRU);
                                                request[reverse][option.value][
                                                    child.value
                                                ] =
                                                    element.name == "smi" ||
                                                    element.name == "soc"
                                                        ? ch.valueRU.split(
                                                              "#"
                                                          )[1]
                                                        : ch.valueRU;
                                            }
                                        }
                                    } else if (
                                        option.value == "datetime_format"
                                    ) {
                                        for (
                                            let i3 = 0;
                                            i3 < option.children.length;
                                            i3++
                                        ) {
                                            const child = option.children[i3];
                                            if (child.selected) {
                                                request[reverse][option.value] =
                                                    child.value;
                                            }
                                        }
                                    } else if (option.value == "order") {
                                        request[reverse][option.value] = {};
                                        request[reverse][option.value][
                                            "predominantly"
                                        ] = 0;
                                        for (
                                            let i3 = 0;
                                            i3 < option.children.length;
                                            i3++
                                        ) {
                                            const child = option.children[i3];
                                            if (child.value == "sentiments") {
                                                request[reverse][option.value][
                                                    "predominantly"
                                                ] = 1;
                                                request[reverse][option.value][
                                                    child.value
                                                ] = [];

                                                if (!child.selected) {
                                                    request[reverse][
                                                        option.value
                                                    ][child.value] = 0;
                                                } else if (
                                                    child.children[0].type ==
                                                    "draggable"
                                                ) {
                                                    for (
                                                        let i4 = 0;
                                                        i4 <
                                                        child.children.length;
                                                        i4++
                                                    ) {
                                                        const ch =
                                                            child.children[i4];
                                                        if (
                                                            ch.value ==
                                                            "positive"
                                                        ) {
                                                            request[reverse][
                                                                option.value
                                                            ][child.value].push(
                                                                ch.selected
                                                                    ? i4 + 1
                                                                    : 0
                                                            );
                                                        }
                                                    }
                                                    for (
                                                        let i4 = 0;
                                                        i4 <
                                                        child.children.length;
                                                        i4++
                                                    ) {
                                                        const ch =
                                                            child.children[i4];
                                                        if (
                                                            ch.value ==
                                                            "neutral"
                                                        ) {
                                                            request[reverse][
                                                                option.value
                                                            ][child.value].push(
                                                                ch.selected
                                                                    ? i4 + 1
                                                                    : 0
                                                            );
                                                        }
                                                    }
                                                    for (
                                                        let i4 = 0;
                                                        i4 <
                                                        child.children.length;
                                                        i4++
                                                    ) {
                                                        const ch =
                                                            child.children[i4];
                                                        if (
                                                            ch.value ==
                                                            "negative"
                                                        ) {
                                                            request[reverse][
                                                                option.value
                                                            ][child.value].push(
                                                                ch.selected
                                                                    ? i4 + 1
                                                                    : 0
                                                            );
                                                        }
                                                    }
                                                }
                                            } else if (
                                                child.value == "categories"
                                            ) {
                                                request[reverse][option.value][
                                                    "predominantly"
                                                ] = 0;
                                                request[reverse][option.value][
                                                    child.value
                                                ] = [];

                                                if (!child.selected) {
                                                    request[reverse][
                                                        option.value
                                                    ][child.value] = 0;
                                                } else if (
                                                    child.children[0].type ==
                                                    "draggable"
                                                ) {
                                                    for (
                                                        let i4 = 0;
                                                        i4 <
                                                        child.children.length;
                                                        i4++
                                                    ) {
                                                        const ch =
                                                            child.children[i4];
                                                        if (ch.selected)
                                                            request[reverse][
                                                                option.value
                                                            ][child.value].push(
                                                                ch.value
                                                            );
                                                    }
                                                }
                                            } else {
                                                for (
                                                    let i4 = 0;
                                                    i4 < child.children.length;
                                                    i4++
                                                ) {
                                                    const ch =
                                                        child.children[i4];
                                                    if (ch.selected) {
                                                        request[reverse][
                                                            option.value
                                                        ][child.value] =
                                                            ch.value;
                                                    }
                                                }
                                            }
                                        }
                                    } else if (option.type == "checkbox") {
                                        request[reverse][option.value] =
                                            option.selected;
                                    } else if (option.type == "select") {
                                        request[reverse][option.value] =
                                            option.selected;
                                    } else if (
                                        option.value != "columns" &&
                                        option.value != "list_rows"
                                    ) {
                                        if (option.type == "hide") {
                                            let output = option.children[0]
                                                .value
                                                ? option.children[0].value
                                                : option.children[0].valueRU;
                                            let number = 0;
                                            if (option.value == "font_name") {
                                                output = option.children[0]
                                                    .valueRU
                                                    ? option.children[0].valueRU
                                                    : option.children[0].value;
                                                number = output;
                                            } else {
                                                output = option.children[0]
                                                    .valueRU
                                                    ? option.children[0].valueRU
                                                    : option.children[0].value;
                                                number = parseInt(output);
                                            }
                                            request[reverse][option.value] =
                                                number;
                                        }
                                    }
                                }
                            }
                        } else if (element.options.length != undefined) {
                            for (
                                let i2 = 0;
                                i2 < element.options.length;
                                i2++
                            ) {
                                let option = element.options[i2];

                                if (option.type != undefined) {
                                    if (option.type == "checkbox") {
                                        request[reverse][option.value] =
                                            option.selected;
                                    } else if (option.type == "select") {
                                        if (option.value == "type") {
                                            for (
                                                let i3 = 0;
                                                i3 < option.children.length;
                                                i3++
                                            ) {
                                                const child =
                                                    option.children[i3];
                                                if (child.selected) {
                                                    request[reverse][
                                                        option.value
                                                    ] = child.value;
                                                    for (
                                                        let i4 = 0;
                                                        i4 <
                                                        child.children.length;
                                                        i4++
                                                    ) {
                                                        const ch =
                                                            child.children[i4];
                                                        if (ch.selected) {
                                                            request[reverse][
                                                                ch.value
                                                            ] = ch.selected;
                                                        }
                                                    }
                                                }
                                            }
                                        } else if (
                                            option.children == undefined
                                        ) {
                                            request[reverse][option.value] =
                                                option.selected;
                                        } else {
                                            for (
                                                let i3 = 0;
                                                i3 < option.children.length;
                                                i3++
                                            ) {
                                                const child =
                                                    option.children[i3];
                                                if (child.valueRU) {
                                                    if (
                                                        typeof child.valueRU ==
                                                        "number"
                                                    ) {
                                                        request[reverse][
                                                            option.value
                                                        ] = parseInt(
                                                            child.valueRU
                                                        );
                                                    } else {
                                                        request[reverse][
                                                            option.value
                                                        ] =
                                                            option.value ==
                                                            "format"
                                                                ? child.value
                                                                : child.valueRU;
                                                    }
                                                } else {
                                                    request[reverse][
                                                        option.value
                                                    ] = child.value;
                                                }
                                            }
                                        }
                                    }
                                } else if (option.children != undefined) {
                                    request[reverse][option.value] =
                                        option.children[0].valueRU;
                                }
                            }
                        }
                    }
                }
                if (ppi >= 0) ppi--;
            }
            return !isPP ? request : ppRequest;
        },
        postSettings(ev) {
            let isPP = this.additional.format.file == "powerpoint";
            if (this.hasGroupError()) {
                return false;
            }

            let request = this.createRequest();

            if (this.hasEmptyProjectInput() && isPP) {
                return false;
            }

            let projectName = this.getProjectName();

            this.loadingSpinner();

            if (ev.target.classList.contains("hasError")) {
                this.error.is = true;
            }
            if (this.loading.is == false) {
                return false;
            }
            ev.target.setAttribute("disabled", true);

            var params = this.getRequest();

            request.push({
                user_id: params.user_id,
                an_id: params.an_id,
                location: params.location,
                s_date: params.s_date,
                f_date: params.f_date,
                s_time: params.s_time,
                f_time: params.f_time,
                sCountry_id: params.sCountry_id,
                iCategory_id: params.iCategory_id,
                sResource_id: params.sResource_id,
                metrics: params.metrics,
                order: params.order,
                sSentiment: params.sSentiment,
                sLanguage_id: params.sLanguage_id,
                message_type: params.message_type,
                place: params.place,
                place_id: params.place_id,
                token: params.token,
                id: "template_settings",
                orientation: this.additional.orientation,
                font_size: 10,
                font_name: "Arial",
                full_page_title: this.additional.full_page_title,
                position: "0",
                merge_cells: this.additional.merge_cells,
                content: this.additional.content,
                title: projectName,
                format: `${
                    this.additional.format.file
                }_${this.getRequestLang()}`,
                // full_text: this.additional.full_text,
            });
            return request;
        },
        hasEmptyProjectInput() {
            let hasEmptyProjectInput = false;
            let projectInputs = document.querySelectorAll(
                ".new-list .project-input"
            );
            for (let i2 = 0; i2 < projectInputs.length; i2++) {
                let projectInput = projectInputs[i2];

                if (projectInput.value == "") {
                    hasEmptyProjectInput = true;
                    projectInput.style.border = "2px red solid";
                } else {
                    projectInput.style.border = "none";
                }
            }
            return hasEmptyProjectInput;
        },
        async ungroup(elements, groupElements, i) {
            let arr = elements,
                end = i,
                x = groupElements.length;

            if (x == 0) {
                arr.splice(end, 1);
            } else if (x == 1) {
            } else {
                x = x - 1;
                for (let i = arr.length - 1; i > end; i--) {
                    arr[i + x] = arr[i];
                }
            }

            for (let i2 = 0; i2 < groupElements.length; i2++) {
                const groupItem = groupElements[i2];

                groupItem.options[groupItem.options.length] = {
                    position: "" + (i2 + 1),
                };

                elements[i + i2] = groupItem;
            }
        },
        async downloadConstructFile(ev) {
            let request = this.postSettings(ev);
            if (request === false) {
                return;
            }

            let fileName = `Export_iMAS_${this.formatYmd(new Date())}`;
            let fileNamepdf = `${fileName}.pdf`,
                fileNamexlsx = `${fileName}.xlsx`,
                fileNamedocx = `${fileName}.docx`,
                fileNamepptx = `${fileName}.pptx`;

            let formatFile = this.additional.format.file;

            /**
             * https://export.imas.kz/export-reports?user_id=2128&an_id=7000&location=2&s_date=2022-05-09&f_date=2022-06-08&s_time=00:00&f_time=23:59&format=word_format_4&full_text=1&sCountry_id=0&iCategory_id=all&sResource_id=all&metrics=0&order=&sSentiment=&sLanguage_id=all&message_type=all&place=0&place_id=0&token=3_LfBcsSXRi6
             */
            /**
             * https://constructor.parameters.tk/constructor
             */
            console.log("request", request);
            axios({
                method: "post",
                url: "https://export.imas.kz/constructor", // https://export.imas.kz/test
                responseType: "arraybuffer",
                data: request,
            })
                .then(function (response) {
                    if (formatFile == "pdf") {
                        let blob = new Blob([response.data], {
                            type: response.headers["content-type"],
                        });
                        let link = document.createElement("a");
                        link.href = window.URL.createObjectURL(blob);
                        link.download = fileNamepdf; //Export_iMAS_2022-12-20_15-36.pdf
                        link.click();
                    } else if (formatFile == "excel") {
                        let blob = new Blob([response.data], {
                            type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
                        });
                        let link = document.createElement("a");
                        link.href = window.URL.createObjectURL(blob);
                        link.download = fileNamexlsx; //Export_iMAS_2022-12-20_15-36.xlsx
                        link.click();
                    } else if (formatFile == "word") {
                        let blob = new Blob([response.data], {
                            type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
                        });
                        let link = document.createElement("a");
                        link.href = window.URL.createObjectURL(blob);
                        link.download = fileNamedocx; //Export_iMAS_2022-12-20_15-36.docx
                        link.click();
                    } else if (formatFile == "powerpoint") {
                        let blob = new Blob([response.data], {
                            type: "application/vnd.openxmlformats-officedocument.presentationml.presentation",
                        });
                        let link = document.createElement("a");
                        link.href = window.URL.createObjectURL(blob);
                        link.download = fileNamepptx; //Export_iMAS_2022-12-20_15-36.pptx
                        link.click();
                    } else if (
                        response.headers["content-type"] == "text/plain"
                    ) {
                        let blob = new Blob([response.data], {
                            type: "text/plain",
                        });
                        let link = document.createElement("a");
                        link.href = window.URL.createObjectURL(blob);
                        link.download = `Report - ${response.headers["last-modified"]}.txt`;
                        link.click();
                    }
                    ev.target.parentElement.click();
                })
                .catch(function (res) {
                    if (res.response.status !== 200) {
                        ev.target.parentElement.classList.add("hasError");
                        let errMessages = document.querySelectorAll(
                            ".model-error .model__title div span"
                        );
                        errMessages[0].innerHTML = `Error: ${res.response.status}`;
                        errMessages[1].innerHTML = res.message;
                    }
                    ev.target.parentElement.click();
                });
        },
        async saveTemplate(ev) {
            let request = this.postSettings(ev);
            if (request === false) {
                return;
            }

            this.saveTemplateJSON(request, ev);
        },
        parsePostRequest(postRequest) {
            postRequest.forEach((el) => {
                let elKeys = Object.keys(el);
                elKeys.forEach((elKey) => {
                    if (typeof el[elKey] == "boolean") {
                        el[elKey] = "" + el[elKey];
                    } else if (typeof el[elKey] == "number") {
                        el[elKey] = "" + el[elKey];
                    } else if (elKey === "columns" || elKey === "list_rows") {
                        for (let i2 = 0; i2 < el[elKey].length; i2++) {
                            const arrEl = el[elKey][i2];

                            let objectKeys = Object.keys(arrEl);
                            for (let i = 0; i < objectKeys.length; i++) {
                                const objectKey = objectKeys[i];

                                if (typeof arrEl[objectKey] == "boolean") {
                                    arrEl[objectKey] = "" + arrEl[objectKey];
                                } else if (
                                    typeof arrEl[objectKey] == "number"
                                ) {
                                    if (objectKey == "position")
                                        console.log(
                                            objectKey,
                                            arrEl[objectKey]
                                        );
                                    arrEl[objectKey] = "" + arrEl[objectKey];
                                    if (objectKey == "position")
                                        console.log(
                                            objectKey,
                                            arrEl[objectKey]
                                        );
                                }
                            }
                        }
                    } else if (typeof el[elKey] == "object") {
                        let objectKeys = Object.keys(el[elKey]);
                        for (let i = 0; i < objectKeys.length; i++) {
                            const objectKey = objectKeys[i];

                            if (typeof el[elKey][objectKey] == "boolean") {
                                el[elKey][objectKey] =
                                    "" + el[elKey][objectKey];
                            } else if (
                                typeof el[elKey][objectKey] == "number"
                            ) {
                                // if (objectKey == 'position') console.log(objectKey, el[elKey][objectKey]);
                                el[elKey][objectKey] =
                                    "" + el[elKey][objectKey];
                            }
                        }
                    }
                });
                elKeys.forEach((elKey) => {
                    if (elKey === "columns" || elKey === "list_rows") {
                        el[elKey] = this.getPostArrValue(el[elKey]);
                    } else if (elKey === "order") {
                        let orderKeys = Object.keys(el[elKey]);
                        for (let i = 0; i < orderKeys.length; i++) {
                            const orderKey = orderKeys[i];
                            let orderKeyVal = JSON.stringify(
                                el[elKey][orderKey]
                            );

                            if (
                                orderKeyVal.indexOf("[") != -1 &&
                                orderKeyVal.indexOf("]") != -1
                            ) {
                                el[elKey][orderKey] = this.getPostArrValue(
                                    el[elKey][orderKey]
                                );
                            } else if (
                                typeof el[elKey][orderKey] == "boolean"
                            ) {
                                el[elKey][orderKey] = "" + el[elKey][orderKey];
                            } else if (typeof el[elKey][orderKey] == "number") {
                                el[elKey][orderKey] = "" + el[elKey][orderKey];
                            }
                        }
                    }
                });
            });

            return postRequest;
        },
        saveTemplateJSON(request, ev) {
            let formatFile = this.additional.format.file;
            /**
             * https://export.imas.kz/export-reports?user_id=2128&an_id=7000&location=2&s_date=2022-05-09&f_date=2022-06-08&s_time=00:00&f_time=23:59&format=word_format_4&full_text=1&sCountry_id=0&iCategory_id=all&sResource_id=all&metrics=0&order=&sSentiment=&sLanguage_id=all&message_type=all&place=0&place_id=0&token=3_LfBcsSXRi6
             */
            /**
             * https://constructor.parameters.tk/constructor
             */
            var _params = this.getRequest();
            var projectName = this.getConstructorName();
            var lang = this.getRequestLang();
            let postRequest = JSON.parse(JSON.stringify([...request]));

            console.log("postRequest2", postRequest);
            if (this.additional.format.file == "powerpoint") {
                postRequest.forEach((_el) => {
                    _el?.elements?.forEach((el) => {
                        let elKeys = Object.keys(el);
                        elKeys.forEach((elKey) => {
                            if (typeof el[elKey] == "boolean") {
                                el[elKey] = "" + el[elKey];
                            } else if (typeof el[elKey] == "number") {
                                el[elKey] = "" + el[elKey];
                            }
                        });
                    });
                    console.log("postRequest3", postRequest);
                    _el.elements = this.getPostArrValue(_el.elements);
                });
            } else {
                postRequest = this.parsePostRequest(postRequest);
            }
            console.log("postRequest", postRequest);
            console.log(
                "JSON.stringify(postRequest)",
                JSON.stringify(postRequest)
            );
            let reqPath = "addreport";
            let reqData = {
                name: projectName,
                format: formatFile,
                lang: lang,
                token: _params.token,
                json: JSON.stringify(postRequest),
            };
            if (_params.constructorId) {
                reqPath = "updatereport";
                reqData = {
                    id: _params.constructorId,
                    user_id: _params.user_id,
                    name: projectName,
                    format: formatFile,
                    lang: lang,
                    token: _params.token,
                    json: JSON.stringify(postRequest),
                };
            }
            axios({
                method: "post",
                url: `https://cabinet322.imas.kz/ru/reports/${reqPath}`, // https://export.imas.kz/test
                data: reqData,
                headers: {
                    "Content-Type":
                        "application/x-www-form-urlencoded; charset=utf-8",
                },
            })
                .then((response) => {
                    console.log(
                        "saveTemplate status:",
                        response.status,
                        response
                    );
                    ev.target.parentElement.click();
                })
                .catch(function (res) {
                    console.log("error", res);
                    if (res.response.status !== 200) {
                        ev.target.parentElement.classList.add("hasError");
                        let errMessages = document.querySelectorAll(
                            ".model-error .model__title div span"
                        );
                        errMessages[0].innerHTML = `Error: ${res.response.status}`;
                        errMessages[1].innerHTML = res.message;
                    }
                    ev.target.parentElement.click();
                });
        },
        getPostArrValue(value) {
            if (value != undefined) {
                return `(${JSON.stringify(value).slice(1, -1)})`;
            } else {
                return value;
            }
        },
        async getTemplates(ev) {
            var params = this.getRequest();
            let request = this.postSettings(ev);
            if (request === false) {
                return;
            }

            axios
                .get(
                    `https://rest.imas.kz/reports/getallreports?token=${params.token}`
                )
                .then((response) => {
                    let newArr = this.getJSON(response.data[88].json);
                    console.log("newArr", newArr);
                    let request = newArr;

                    let fileName = `Export_iMAS_${this.formatYmd(new Date())}`;
                    let fileNamepdf = `${fileName}.pdf`,
                        fileNamexlsx = `${fileName}.xlsx`,
                        fileNamedocx = `${fileName}.docx`,
                        fileNamepptx = `${fileName}.pptx`;

                    /**
                     * https://export.imas.kz/export-reports?user_id=2128&an_id=7000&location=2&s_date=2022-05-09&f_date=2022-06-08&s_time=00:00&f_time=23:59&format=word_format_4&full_text=1&sCountry_id=0&iCategory_id=all&sResource_id=all&metrics=0&order=&sSentiment=&sLanguage_id=all&message_type=all&place=0&place_id=0&token=3_LfBcsSXRi6
                     */
                    /**
                     * https://constructor.parameters.tk/constructor
                     */
                    axios({
                        method: "post",
                        url: "https://export.imas.kz/constructor", // https://export.imas.kz/test
                        responseType: "arraybuffer",
                        data: request,
                    })
                        .then(function (response) {
                            if (formatFile == "pdf") {
                                let blob = new Blob([response.data], {
                                    type: response.headers["content-type"],
                                });
                                let link = document.createElement("a");
                                link.href = window.URL.createObjectURL(blob);
                                link.download = fileNamepdf; //Export_iMAS_2022-12-20_15-36.pdf
                                link.click();
                            } else if (formatFile == "excel") {
                                let blob = new Blob([response.data], {
                                    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
                                });
                                let link = document.createElement("a");
                                link.href = window.URL.createObjectURL(blob);
                                link.download = fileNamexlsx; //Export_iMAS_2022-12-20_15-36.xlsx
                                link.click();
                            } else if (formatFile == "word") {
                                let blob = new Blob([response.data], {
                                    type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
                                });
                                let link = document.createElement("a");
                                link.href = window.URL.createObjectURL(blob);
                                link.download = fileNamedocx; //Export_iMAS_2022-12-20_15-36.docx
                                link.click();
                            } else if (formatFile == "powerpoint") {
                                let blob = new Blob([response.data], {
                                    type: "application/vnd.openxmlformats-officedocument.presentationml.presentation",
                                });
                                let link = document.createElement("a");
                                link.href = window.URL.createObjectURL(blob);
                                link.download = fileNamepptx; //Export_iMAS_2022-12-20_15-36.pptx
                                link.click();
                            } else if (
                                response.headers["content-type"] == "text/plain"
                            ) {
                                let blob = new Blob([response.data], {
                                    type: "text/plain",
                                });
                                let link = document.createElement("a");
                                link.href = window.URL.createObjectURL(blob);
                                link.download = `Report - ${response.headers["last-modified"]}.txt`;
                                link.click();
                            }
                            ev.target.parentElement.click();
                        })
                        .catch(function (res) {
                            if (res.response.status !== 200) {
                                ev.target.parentElement.classList.add(
                                    "hasError"
                                );
                                let errMessages = document.querySelectorAll(
                                    ".model-error .model__title div span"
                                );
                                errMessages[0].innerHTML = `Error: ${res.response.status}`;
                                errMessages[1].innerHTML = res.message;
                            }
                            ev.target.parentElement.click();
                        });
                })
                .catch(function (err) {
                    console.log(err);
                });
        },
        getJSON(_json = "") {
            _json =
                '{"{\\"id\\":\\"soc_table\\",\\"position\\":\\"15\\",\\"title\\":\\"Social network\\",\\"columns\\":\\"({\\\\\\"id\\\\\\":\\\\\\"number\\\\\\",\\\\\\"position\\\\\\":\\\\\\"1\\\\\\",\\\\\\"name\\\\\\":\\\\\\"№\\\\\\"},{\\\\\\"id\\\\\\":\\\\\\"content\\\\\\",\\\\\\"position\\\\\\":\\\\\\"2\\\\\\",\\\\\\"name\\\\\\":\\\\\\"Summary\\\\\\"},{\\\\\\"id\\\\\\":\\\\\\"date\\\\\\",\\\\\\"position\\\\\\":\\\\\\"3\\\\\\",\\\\\\"name\\\\\\":\\\\\\"Date\\\\\\"},{\\\\\\"id\\\\\\":\\\\\\"resource\\\\\\",\\\\\\"position\\\\\\":\\\\\\"4\\\\\\",\\\\\\"name\\\\\\":\\\\\\"Name\\\\\\"},{\\\\\\"id\\\\\\":\\\\\\"news_link\\\\\\",\\\\\\"position\\\\\\":\\\\\\"5\\\\\\",\\\\\\"name\\\\\\":\\\\\\"URL\\\\\\"},{\\\\\\"id\\\\\\":\\\\\\"sentiment\\\\\\",\\\\\\"position\\\\\\":\\\\\\"6\\\\\\",\\\\\\"name\\\\\\":\\\\\\"Tone\\\\\\"})\\",\\"tag_highlight\\":{\\"bold\\":\\"true\\",\\"tag_color\\":\\"#ab1b3d\\",\\"back_color\\":\\"#2cd134\\"},\\"datetime_format\\":\\"0\\",\\"order\\":{\\"date\\":\\"1\\",\\"resource\\":\\"0\\",\\"sentiments\\":\\"(0,0,0)\\",\\"socials\\":\\"(\\\\\\"Вконтакте\\\\\\",\\\\\\"Facebook\\\\\\",\\\\\\"Twitter\\\\\\",\\\\\\"Instagram\\\\\\",\\\\\\"LinkedIn\\\\\\",\\\\\\"Youtube\\\\\\",\\\\\\"Одноклассники\\\\\\",\\\\\\"Мой_Мир\\\\\\",\\\\\\"Telegram\\\\\\",\\\\\\"TikTok\\\\\\")\\"},\\"font_name\\":\\"Arial\\",\\"font_size\\":\\"8\\",\\"text_length\\":\\"0\\"},{\\"id\\":\\"smi_table\\",\\"position\\":\\"14\\",\\"title\\":\\"Media\\",\\"columns\\":\\"({\\\\\\"id\\\\\\":\\\\\\"number\\\\\\",\\\\\\"position\\\\\\":\\\\\\"1\\\\\\",\\\\\\"name\\\\\\":\\\\\\"№\\\\\\"},{\\\\\\"id\\\\\\":\\\\\\"title\\\\\\",\\\\\\"position\\\\\\":\\\\\\"2\\\\\\",\\\\\\"name\\\\\\":\\\\\\"Title\\\\\\"},{\\\\\\"id\\\\\\":\\\\\\"content\\\\\\",\\\\\\"position\\\\\\":\\\\\\"3\\\\\\",\\\\\\"name\\\\\\":\\\\\\"Summary\\\\\\"},{\\\\\\"id\\\\\\":\\\\\\"date\\\\\\",\\\\\\"position\\\\\\":\\\\\\"4\\\\\\",\\\\\\"name\\\\\\":\\\\\\"Date\\\\\\"},{\\\\\\"id\\\\\\":\\\\\\"category\\\\\\",\\\\\\"position\\\\\\":\\\\\\"5\\\\\\",\\\\\\"name\\\\\\":\\\\\\"Category\\\\\\"},{\\\\\\"id\\\\\\":\\\\\\"resource\\\\\\",\\\\\\"position\\\\\\":\\\\\\"6\\\\\\",\\\\\\"name\\\\\\":\\\\\\"Name\\\\\\"},{\\\\\\"id\\\\\\":\\\\\\"news_link\\\\\\",\\\\\\"position\\\\\\":\\\\\\"7\\\\\\",\\\\\\"name\\\\\\":\\\\\\"URL\\\\\\"},{\\\\\\"id\\\\\\":\\\\\\"sentiment\\\\\\",\\\\\\"position\\\\\\":\\\\\\"8\\\\\\",\\\\\\"name\\\\\\":\\\\\\"Tone\\\\\\"})\\",\\"tag_highlight\\":{\\"bold\\":\\"true\\",\\"tag_color\\":\\"#0709a3\\",\\"back_color\\":\\"#a7b50b\\"},\\"datetime_format\\":\\"0\\",\\"order\\":{\\"date\\":\\"1\\",\\"resource\\":\\"0\\",\\"sentiments\\":\\"(3,1,2)\\",\\"categories\\":\\"(\\\\\\"Государственные источники\\\\\\",\\\\\\"Информационные агентства\\\\\\",\\\\\\"Региональные источники\\\\\\",\\\\\\"Электронные СМИ\\\\\\",\\\\\\"Специализированные\\\\\\",\\\\\\"Зарубежные источники\\\\\\",\\\\\\"Государственные закупки\\\\\\",\\\\\\"LiveJournal\\\\\\",\\\\\\"Печатные СМИ\\\\\\",\\\\\\"Телевидение\\\\\\",\\\\\\"Радио\\\\\\",\\\\\\"Агрегаторы СМИ\\\\\\")\\"},\\"font_name\\":\\"Arial\\",\\"font_size\\":\\"8\\",\\"text_length\\":\\"0\\"},{\\"id\\":\\"kaz_map\\",\\"position\\":\\"13\\",\\"title\\":\\"Source coverage by Kazakhstan regions\\",\\"length\\":\\"10\\",\\"number\\":\\"true\\",\\"percent\\":\\"false\\"},{\\"id\\":\\"world_map\\",\\"position\\":\\"12\\",\\"title\\":\\"Source coverage by region\\",\\"length\\":\\"44\\",\\"number\\":\\"true\\",\\"percent\\":\\"true\\"},{\\"id\\":\\"most_popular_soc\\",\\"position\\":\\"11\\",\\"title\\":\\" - top sources\\",\\"length\\":\\"20\\",\\"type\\":\\"bar\\",\\"data_labels\\":\\"true\\",\\"labels\\":\\"true\\",\\"number\\":\\"true\\",\\"percent\\":\\"false\\"},{\\"id\\":\\"soc_top\\",\\"position\\":\\"10\\",\\"title\\":\\"Social media - top sources\\",\\"length\\":\\"20\\",\\"type\\":\\"bar\\",\\"data_labels\\":\\"true\\",\\"labels\\":\\"true\\",\\"number\\":\\"true\\",\\"percent\\":\\"false\\"},{\\"id\\":\\"media_top\\",\\"position\\":\\"9\\",\\"title\\":\\"Mass media - top sources\\",\\"length\\":\\"20\\",\\"type\\":\\"pie\\",\\"data_labels\\":\\"true\\",\\"number\\":\\"true\\",\\"percent\\":\\"false\\"},{\\"id\\":\\"soc_distribution\\",\\"position\\":\\"8\\",\\"title\\":\\"Range of social networks\\",\\"length\\":\\"10\\",\\"type\\":\\"pie\\",\\"data_labels\\":\\"true\\",\\"number\\":\\"true\\",\\"percent\\":\\"true\\"},{\\"id\\":\\"smi_distribution\\",\\"position\\":\\"7\\",\\"title\\":\\"Range of media\\",\\"length\\":\\"10\\",\\"type\\":\\"pie\\",\\"data_labels\\":\\"true\\",\\"number\\":\\"true\\",\\"percent\\":\\"true\\"},{\\"id\\":\\"distribution\\",\\"position\\":\\"6\\",\\"title\\":\\"Breakdown by media,\\\\nSocial Networks\\",\\"type\\":\\"pie\\",\\"data_labels\\":\\"true\\",\\"number\\":\\"true\\",\\"percent\\":\\"true\\"},{\\"id\\":\\"sentiments\\",\\"position\\":\\"5\\",\\"title\\":\\"Tonality of the publication\\",\\"type\\":\\"pie\\",\\"data_labels\\":\\"true\\",\\"number\\":\\"true\\",\\"percent\\":\\"true\\"},{\\"id\\":\\"message_dynamic\\",\\"position\\":\\"4\\",\\"title\\":\\"Number of mentions\\"},{\\"id\\":\\"count\\",\\"position\\":\\"3\\",\\"title\\":\\"Number of media publications\\"},{\\"id\\":\\"period\\",\\"position\\":\\"2\\",\\"format\\":\\"Год-Месяц-День Час:Мин\\"},{\\"id\\":\\"tags\\",\\"position\\":\\"1\\",\\"length\\":\\"225\\"},{\\"user_id\\":\\"1648\\",\\"an_id\\":\\"10947\\",\\"location\\":\\"2\\",\\"s_date\\":\\"2022-08-06\\",\\"f_date\\":\\"2022-09-05\\",\\"s_time\\":\\"00:00\\",\\"f_time\\":\\"23:59\\",\\"sCountry_id\\":\\"0\\",\\"iCategory_id\\":\\"all\\",\\"sResource_id\\":\\"all\\",\\"metrics\\":\\"0\\",\\"order\\":\\"\\",\\"sSentiment\\":\\"\\",\\"sLanguage_id\\":\\"all\\",\\"message_type\\":\\"all\\",\\"place\\":\\"0\\",\\"place_id\\":\\"0\\",\\"token\\":\\"s0f9p0b1_-v_\\",\\"id\\":\\"template_settings\\",\\"orientation\\":\\"landscape\\",\\"font_size\\":\\"10\\",\\"font_name\\":\\"Arial\\",\\"full_page_title\\":\\"true\\",\\"position\\":\\"0\\",\\"merge_cells\\":\\"true\\",\\"title\\":\\"Мой Шаблон\\",\\"format\\":\\"pdf_eng\\",\\"full_text\\":\\"0\\"}":""}';
            let json = _json.split("\\").join("").slice(2, -5);
            console.log("json", json);

            let jsonArr = [];
            let openingKeyOrder = false;
            let newObjCount = 0;
            let subArrCount = 0;
            let subObjCount = 0;
            let newObj1 = {};
            let newObj2 = {};
            let key = "";
            let value = "";
            function setOpeningKey(value) {
                openingKey = value;
            }
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
        formatYmd(_date) {
            function padTo2Digits(num) {
                return String(num).padStart(2, "0");
            }

            const date = new Date();
            const hoursAndMinutes =
                padTo2Digits(date.getHours()) +
                "-" +
                padTo2Digits(date.getMinutes());

            return `${_date.toISOString().slice(0, 10)}_${hoursAndMinutes}`;
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
    },
};
</script>

<style scoped>
.btn {
    width: 100%;
}
.post-btn {
    padding: 0;
    display: flex;
}
.post-btn span {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>