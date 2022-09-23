<template>
    <div class="app">
        <app-content :pdf="pdf"></app-content>
    </div>
</template>

<script>
import AppContent from "@/components/AppContent.vue";
import { createPDF } from "@/hooks/createPDF";
import { toggleElement } from "@/hooks/toggleElement";
import { toggleGroup } from "@/hooks/toggleGroup";
import { provide, ref } from "vue";

export default {
    name: "App",
    components: {
        AppContent,
    },
    setup() {
        let pdf = createPDF();
        let pdf_copy = ref([]);

        let { addElement, removeElement } = toggleElement(pdf, pdf_copy);
        let { addGroup, removeGroup } = toggleGroup(pdf, pdf_copy);



        provide("pdf_copy", pdf_copy);

        provide("addElement", addElement);
        provide("addGroup", addGroup);

        provide("removeElement", removeElement);
        provide("removeGroup", removeGroup);

        return { pdf };
    },
};
</script>

<style>
.app {
    background: #f3f3f4;
}
body {
    background: #f3f3f4;
}
</style>
