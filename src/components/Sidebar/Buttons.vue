<template>
    <div class="btns">
        <div class="col-xs-12 export p-t-15">
            <button
                class="button btn btn-imas btn-sm f-l"
                @click="postSettings"
            >
                <span>Скачать</span></button
            ><!-- <i class="fa-solid fa-spinner-third"></i> -->
        </div>
        <div class="col-xs-12 export p-t-15">
            <button
                class="button btn btn-imas btn-sm f-l"
                style="background: #ccc"
            >
                <span>Сохранить шаблон</span></button
            ><!-- <i class="fa-solid fa-spinner-third"></i> -->
        </div>
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
            type: Boolean,
            required: true,
        },
    },
    emits: ["update", "loadingSpinner"],
    methods: {
        async loadingSpinner() {
            this.$emit("loadingSpinner");
        },
        async postSettings(ev) {
            let groups = document.querySelectorAll(".Group");

            for (let i = 0; i < groups.length; i++) {
                let group = groups[i];
                if (group.children.length < 2) {
                    group.parentElement.style.border = "2px solid red";
                    group.nextElementSibling.style.display = "inline";
                    return;
                } else {
                    group.parentElement.style.border = "none";
                    group.nextElementSibling.style.display = "none";
                }
            }
            let projectName = document.querySelector("#project-name").value; // Мой Шаблон
            if (projectName) {
                console.log("project-name:", projectName);
            } else {
                projectName = "Мой Шаблон";
                console.log("project-name:", projectName);
            }

            this.loadingSpinner();
            console.log("this.loading:", this.loading);

            if (this.loading == true) {
                return;
            }
            ev.target.setAttribute("disabled", true);

            let request = [];
            let independentCopy = JSON.parse(
                JSON.stringify([...this.elements])
            );
            console.log(independentCopy);
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
                    } else if (element.group.length != undefined) {
                        let newIndex = 0;
                        for (let i2 = 0; i2 < element.group.length; i2++) {
                            this.ungroup(independentCopy, element.group, p);
                            const groupEl = element.group[i2];
                            if (
                                groupEl.options[groupEl.options.length - 1]
                                    .position != undefined
                            ) {
                                index = i;
                                console.log(
                                    "Position is : ",
                                    groupEl.options[groupEl.options.length - 1]
                                        .position,
                                    groupEl.options
                                );
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
                                console.log(
                                    "Position is : ",
                                    groupEl.options[groupEl.options.length - 1]
                                        .position,
                                    groupEl.options
                                );
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
            for (let i = 0; i < request.length; i++) {
                if (request[i].position.indexOf("_") > -1) {
                    let el = request[i];
                    console.log(request[i + 1], request[i]);
                    if (request[i + 1] != undefined) {
                        request[i] = request[i + 1];
                        request[i + 1] = el;
                        i++;
                    }
                }
            }

            i = 0;
            let indexArray = [];
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
            let j = 0;
            let c = 0;
            let groupCount = 0;
            for (let i = 0; i < this.elements.length; i++) {
                // let req = request[p];
                let element = this.elements[i];
                let reverse = request.length - (j + 1);

                if (element.name == "Group") {
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
                                            request[reverse][option.value] =
                                                option.selected;
                                        }
                                    } else if (option.children != undefined) {
                                    console.log('option.children[0].valueRU', option.children[0].valueRU);
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
                    if (element.name == request[reverse].id) {
                        console.log(
                            element.name.substr(3, element.name.length - 3) ==
                                "_table"
                        );
                        if (
                            element.name.substr(3, element.name.length - 3) ==
                            "_table"
                        ) {
                            if (element.options.length != undefined) {
                                for (
                                    let i2 = 0;
                                    i2 < element.options.length;
                                    i2++
                                ) {
                                    let option = element.options[i2];

                                    if (option.value == "title") {
                                    console.log('option.children[0].valueRU', option.children[0].valueRU);
                                        request[reverse][option.value] =
                                            option.children[0].valueRU;
                                    } else if (option.value == "columns") {
                                        request[reverse][option.value] = [];
                                        let hideColumnsCount = 0;
                                        for (
                                            let i3 = 0;
                                            i3 < option.children.length;
                                            i3++
                                        ) {
                                            const child = option.children[i3];
                                            const ch = child.children[0];
                                            if (ch.type == "input") {
                                                console.log('undefined - ch.value', ch.value);
                                                request[reverse][option.value][
                                                    i3
                                                ] = {
                                                    id: child.value,
                                                    position: child.children[1]
                                                        .selected
                                                        ? 0
                                                        : i3 +
                                                          1 -
                                                          hideColumnsCount,
                                                    name: ch.value,
                                                };
                                                if (
                                                    child.children[1].selected
                                                ) {
                                                    hideColumnsCount++;
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
                                                console.log('ch.valueRU', ch.valueRU);
                                                request[reverse][option.value][
                                                    child.value
                                                ] = ch.valueRU;
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
                                            console.log(
                                                i3 + " step:",
                                                child.value,
                                                child.selected
                                            );
                                            if (child.selected) {
                                                request[reverse][option.value] =
                                                    child.value;
                                            }
                                        }
                                    } else if (option.value == "order") {
                                        request[reverse][option.value] = {};
                                        for (
                                            let i3 = 0;
                                            i3 < option.children.length;
                                            i3++
                                        ) {
                                            const child = option.children[i3];
                                            if (child.value != "sentiments") {
                                                for (
                                                    let i4 = 0;
                                                    i4 < child.children.length;
                                                    i4++
                                                ) {
                                                    const ch =
                                                        child.children[i4];
                                                    if (ch.selected) {
                                                console.log('ch.valueRU', ch.valueRU);
                                                        request[reverse][
                                                            option.value
                                                        ][child.value] =
                                                            ch.valueRU;
                                                    }
                                                }
                                            } else {
                                                request[reverse][option.value][
                                                    child.value
                                                ] = [];

                                                if (
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
                                                                i4 + 1
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
                                                                i4 + 1
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
                                                                i4 + 1
                                                            );
                                                        }
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
                                        if (option.children == undefined) {
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
                                                request[reverse][option.value] =
                                                    child.value;
                                            }
                                        }
                                    }
                                } else if (option.children != undefined) {
                                    console.log('option.children[0].valueRU', option.children[0].valueRU);
                                    request[reverse][option.value] =
                                        option.children[0].valueRU;
                                }
                            }
                        }
                    }
                }
            }

            function padTo2Digits(num) {
                return String(num).padStart(2, "0");
            }

            const date = new Date();
            const hoursAndMinutes =
                padTo2Digits(date.getHours()) +
                "-" +
                padTo2Digits(date.getMinutes());

            let formatYmd = (date) => date.toISOString().slice(0, 10);
            let fileName = `Export_iMAS_${formatYmd(
                new Date()
            )}_${hoursAndMinutes}.pdf`;

            var params = {};

            if (window.location.href.match(/.*\?.*/)) {
                let tmp_params = window.location.href
                    .replace(/.*\?/, "")
                    .split("&");
                console.log(tmp_params);
                for (var p = 0; p < tmp_params.length; p++) {
                    var _tmp = tmp_params[p].split("=");

                    params[_tmp[0]] = _tmp[1];
                }
            }

            console.log(params);
            // console.log(arrayKey);
            // console.log(arrayValue);

            request.push({
                id: "template_settings",
                position: "0",
                title: "projectName",
                user_id: 1555,
                an_id: 10500,
                location: params.location,
                s_date: params.s_date,
                f_date: params.f_date,
                s_time: params.s_time,
                f_time: params.f_time,
                format: `${this.additional.format.file}_${this.additional.format.language}`,
                full_text: this.additional.full_text ? 1 : 0,
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
                token: "QogkKiPCBgck",
            });
            // request.push({
            //     id: "template_settings",
            //     position: "0",
            //     title: "projectName",
            //     user_id:                    params.user_id,
            //     an_id:                      params.an_id,
            //     location:                   params.location,
            //     s_date:                     params.s_date,
            //     f_date:                     params.f_date,
            //     s_time:                     params.s_time,
            //     f_time:                     params.f_time,
            //     format:                     `${this.additional.format.file}_${this.additional.format.language}`,
            //     full_text:                  this.additional.full_text ? 1 : 0,
            //     sCountry_id:                params.sCountry_id,
            //     iCategory_id:               params.iCategory_id,
            //     sResource_id:               params.sResource_id,
            //     metrics:                    params.metrics,
            //     order:                      params.order,
            //     sSentiment:                 params.sSentiment,
            //     sLanguage_id:               params.sLanguage_id,
            //     message_type:               params.message_type,
            //     place:                      params.place,
            //     place_id:                   params.place_id,
            //     token:                      params.token,
            // });
            console.log("request", request);
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
                // onDownloadProgress: function () {
                //     this.loadingSpinner();
                // },
            }).then(function (response) {
                if (response.headers["content-type"] == "application/pdf") {
                    let blob = new Blob([response.data], {
                        type: "application/pdf",
                    });
                    let link = document.createElement("a");
                    link.href = window.URL.createObjectURL(blob);
                    link.download = fileName; //Export_iMAS_2022-12-20_15-36.pdf
                    link.click();
                } else if (response.headers["content-type"] == "text/plain") {
                    let blob = new Blob([response.data], {
                        type: "text/plain",
                    });
                    let link = document.createElement("a");
                    link.href = window.URL.createObjectURL(blob);
                    link.download = `Report - ${response.headers["last-modified"]}.txt`;
                    link.click();
                }
                console.log(response.status === 200);
                if (response.status === 200) {
                    // this.loadingSpinner();
                    console.log(
                        ev.target.tagName == "BUTTON",
                        ev.target.tagName,
                        "BUTTON"
                    );
                    if (ev.target.tagName == "BUTTON") {
                        console.log(ev.target.removeAttribute("disabled"));
                        ev.target.click();
                    } else if (ev.target.tagName == "SPAN") {
                        console.log(
                            ev.target.parentElement.removeAttribute("disabled")
                        );
                        ev.target.parentElement.click();
                    }
                }
                console.log(response.status);
            });
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
    },
};
</script>

<style scoped>
.btn {
    width: 100%;
}
</style>