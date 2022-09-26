<template>
    <div class="sidebar-buttons w-full flex flex-col">
        <button @click="downloadReport2(createRequest2(report_copy[selectedFormat()], selectedFormat()), selectedFormat())">Скачать</button>
        <button @click="saveTemplate2(createRequest2(report_copy[selectedFormat()], selectedFormat()), selectedFormat())">Сохранить шаблон</button>
    </div>
</template>

<script>
import saveTemplate from "@/hooks/saveTemplate";
import { downloadReport } from "@/hooks/downloadReport";
import createRequest from "@/hooks/create/request";
import { inject } from "vue";
import axios from "axios";

export default {
    props: {
        pdf: {
            required: true
        }
    },
    setup() {
        const report_copy = inject('report_copy')
        const selectedFormat = inject('selectedFormat')
        const downloadReport2 = downloadReport(axios)
        const createRequest2 = createRequest()
        const saveTemplate2 = saveTemplate(axios)

        // console.log(downloadReport);

        return {
            downloadReport2,
            createRequest2,
            saveTemplate2,
            report_copy,
            selectedFormat,
        }
    }
}
</script>

<style>
.sidebar-buttons button {
    background: #495f73;
    font-size: 12px;
    color: white;
    border-radius: 3px;
    margin: 15px 15px 0px 15px;
    padding: 5px;
}
</style>