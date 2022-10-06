import { reactive, ref } from "vue";

export let loading = reactive(ref(false));

export function toggleLoading() {
    loading.value = !loading.value;
}