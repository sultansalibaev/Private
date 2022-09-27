
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

// function getConstructorName() {
//     let projectName = document.querySelector(
//         ".box .constructor-name"
//     ).value; // Мой Шаблон;
//     if (projectName != "") {
//         return projectName; // Мой Шаблон;
//     } else {
//         return "Мой Конструктор";
//     }
// }

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
function getPostArrValue(value) {
    if (value != undefined) {
        return `(${JSON.stringify(value).slice(1, -1)})`;
    } else {
        return value;
    }
}

function getConstructorName() {
    let projectName = document.querySelector("#constructor-name").value;
    return projectName != ""
        ? projectName
        : "Мой Конструктор";
}

export default function saveTemplateJSON(axios, toggleLoading) {
    return function (request, formatFile) {
        /**
         * https://export.imas.kz/export-reports?user_id=2128&an_id=7000&location=2&s_date=2022-05-09&f_date=2022-06-08&s_time=00:00&f_time=23:59&format=word_format_4&full_text=1&sCountry_id=0&iCategory_id=all&sResource_id=all&metrics=0&order=&sSentiment=&sLanguage_id=all&message_type=all&place=0&place_id=0&token=3_LfBcsSXRi6
         */
        /**
         * https://constructor.parameters.tk/constructor
         */
        var _params = getRequest();
        var projectName = getConstructorName();
        var lang = getRequestLang();
        let postRequest = JSON.parse(JSON.stringify([...request]));
        postRequest.forEach((el) => {
            let elKeys = Object.keys(el);
            elKeys.forEach((elKey) => {
                if (typeof el[elKey] == "boolean") {
                    el[elKey] = "" + el[elKey];
                } else if (typeof el[elKey] == "number") {
                    el[elKey] = "" + el[elKey];
                } else if (elKey === "columns" || elKey === "list_rows" || elKey === "elements") {
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
                if (elKey === "columns" || elKey === "list_rows" || elKey === "elements") {
                    el[elKey] = getPostArrValue(el[elKey]);
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
                            el[elKey][orderKey] = getPostArrValue(
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
        toggleLoading();
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
            })
            .then(function () {
                toggleLoading();
            })
            .catch(function (res) {
                console.log("error", res);
                toggleLoading();
            });
    }

}