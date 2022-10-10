import { reactive, ref } from "vue";

export let checkbox = reactive(ref({
    content: true,
    full_page_title: true,
    merge_cells: false,
}));


export function updateCheckbox(name, value) {
checkbox.value[name] = value;
}