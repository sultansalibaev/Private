<template>
    <div class="app">
        <div class="content">
            <content-constructs />
            <content-sidebar :pdf="switchFormat()" />
        </div>
    </div>
</template>

<script>
import ContentConstructs from "@/components/Constructs/ContentConstructs";
import ContentSidebar from "@/components/Sidebar/ContentSidebar";
import createSelect from "@/hooks/create/select";
import createReport from "@/hooks/create/report";
import { toggleElement } from "@/hooks/toggleElement";
import { toggleGroup } from "@/hooks/toggleGroup";
import { provide, reactive, ref } from "vue";

export default {
    name: "App",
    components: {
        ContentConstructs,
        ContentSidebar,
    },
    setup() {
        let report_copy = reactive(ref({
            word: [],
            pdf: [],
            excel: [],
            powerpoint: [],
        }))
        let { format, orientation } = createSelect();





        function switchFormat() {
            return createReport()[selectedFormat()].value
        }
        function selectedFormat() {
            return format.value.options.find(option => option.selected).value;
        }

        function selectOption(optionName) {
            format.value.options.forEach((opt) => {
                opt.selected = opt.name == optionName;
            });

            console.log(format.value);
        }


        let { addElement, removeElement } = toggleElement();
        let { addGroup, removeGroup } = toggleGroup();



        provide("report_copy", report_copy);
        provide("selectedFormat", selectedFormat);

        provide("addElement", addElement);
        provide("addGroup", addGroup);

        provide("removeElement", removeElement);
        provide("removeGroup", removeGroup);

        provide("format", format);
        provide("orientation", orientation);


        provide("selectOption", selectOption);


        return {
            switchFormat
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
