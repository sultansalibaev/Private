<template>
    <div class="sidebar-buttons w-full flex flex-col">
        <button @click="downloadReport">Скачать</button>
        <button>Сохранить шаблон</button>
    </div>
</template>

<script>
import exportFile from "@/hooks/exportFile";
import { inject } from "vue";
import axios from "axios";

export default {
    props: {
        pdf: {
            required: true
        }
    },
	setup() {
		const pdf_copy = inject('pdf_copy')
		const downloadReport = exportFile(pdf_copy, axios)

		return {
			downloadReport,
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