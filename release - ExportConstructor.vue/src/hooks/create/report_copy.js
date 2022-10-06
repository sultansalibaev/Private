import { reactive, ref } from "vue";
import { selectedFormat } from "./select";

export let report_copy = reactive(ref({
    word: [],
    pdf: [],
    excel: [],
    powerpoint: [],
}))

export function getReportCopy() {
    return report_copy.value[selectedFormat()];
}