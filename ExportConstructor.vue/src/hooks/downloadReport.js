import axios from "axios";
import { toggleLoading } from "@/hooks/loading";
import createRequest from "@/hooks/create/request";

export const downloadReport = function () {
    let { request, formatName } = createRequest();

    toggleLoading();

    axios({
        method: "post",
        url: "https://export.imas.kz/constructor", // https://export.imas.kz/test
        responseType: "arraybuffer",
        data: request,
    })
        .then(function (response) {
            const formats = {
                word: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
                pdf: response.headers["content-type"],
                excel: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
                powerpoint: 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
            };
            const formatExtension = {
                word: 'docx',
                pdf: 'pdf',
                excel: 'xlsx',
                powerpoint: 'pptx',
            };
            let blob = new Blob([response.data], {
                type: formats[formatName],
            });
            let link = document.createElement("a");
            link.href = window.URL.createObjectURL(blob);
            link.download = `Export_iMAS_${formatYmd(new Date())}.${formatExtension[formatName]}`;// Export_iMAS_2022-12-20_15-36.pdf
            link.click();
        })
        .then(function () {
            toggleLoading();
        })
        .catch(function (res) {
            console.log(res);
            toggleLoading();
        });
}

function formatYmd(_date) {
    function padTo2Digits(num) {
        return String(num).padStart(2, "0");
    }

    const date = new Date();
    const hoursAndMinutes =
        padTo2Digits(date.getHours()) +
        "-" +
        padTo2Digits(date.getMinutes());

    return `${_date.toISOString().slice(0, 10)}_${hoursAndMinutes}`;
}


