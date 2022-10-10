<template>
    <div class="sidebar-buttons w-full flex flex-col">
        <button :disabled="loading" @click="downloadReport()">Скачать</button>
        <button :disabled="loading" @click="saveTemplate()">Сохранить шаблон</button>
    </div>
</template>

<script>
import saveTemplate from "@/hooks/saveTemplate";
import { downloadReport } from "@/hooks/downloadReport";
import { loading } from "@/hooks/loading";
import { selectedFormat } from "@/hooks/create/select";

export default {
    props: {
        pdf: {
            required: true
        }
    },
    setup() {

        return {
            downloadReport,
            saveTemplate,
            selectedFormat,
            loading,
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