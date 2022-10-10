<template>
    <div class="app">
        <div class="content">
            <content-constructs :checkbox="checkbox" />
            <content-sidebar :pdf="switchFormat()" />
        </div>
    </div>
</template>

<script>
import ContentConstructs from "@/components/Constructs/ContentConstructs";
import ContentSidebar from "@/components/Sidebar/ContentSidebar";

import createReport from "@/hooks/create/report";
import { selectedFormat } from "@/hooks/create/select";
import { checkbox } from "@/hooks/create/checkbox";
import restoreConstructor from "@/hooks/restoreConstructor";
import { onMounted } from "vue";


export default {
    name: "App",
    components: {
        ContentConstructs,
        ContentSidebar,
    },
    setup() {

        function switchFormat() {
            return JSON.parse(JSON.stringify(createReport()[selectedFormat()].value))
        }

        onMounted(restoreConstructor);

        return {
            switchFormat,
            checkbox,
        }

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

.content {
    display: flex;
    margin: 24px;
    height: 100%;
}
</style>
