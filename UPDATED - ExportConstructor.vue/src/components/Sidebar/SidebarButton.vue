<template>
    <div class="sidebar-buttons w-full flex flex-col">
        <button @click="downloadReport2">Скачать</button>
        <button>Сохранить шаблон</button>
    </div>
</template>

<script>
import { downloadReport } from "@/hooks/downloadReport";
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
		const downloadReport2 = downloadReport(report_copy.value[selectedFormat], axios)

        // console.log(downloadReport);

		return {
			downloadReport2,
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