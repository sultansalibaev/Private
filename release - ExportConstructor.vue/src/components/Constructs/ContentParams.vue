<template>
    <div class="params">
        <input
            type="text"
            placeholder="Название Шаблона..."
            class="pl-4 w-full"
            id="constructor-name"
            v-show="selectedMenu() == 'template'"
        />
        <input
            type="text"
            placeholder="Имя проекта..."
            class="pl-4 w-full"
            id="project-name"
            v-show="selectedMenu() == 'project'"
        />
        <my-checkbox v-show="selectedMenu() == 'project' && selectedFormat() == 'excel'" :param="'merge_cells'">
            Объединить ячейки
        </my-checkbox>
        <my-checkbox v-show="selectedMenu() == 'project' && selectedFormat() == 'powerpoint'" :param="'content'">
            Оглавление
        </my-checkbox>
        <my-checkbox v-show="selectedMenu() == 'project' && selectedFormat() == 'word'" :param="'full_page_title'">
            Титульник
        </my-checkbox>
        <select-params
            v-show="selectedMenu() == 'template'"
            :options="format.options"
            :selectWidth="format.width"
            @select-option="selectOption"
        >
        </select-params>
        <select-params
            v-show="selectedMenu() == 'project' && selectedFormat() == 'word'"
            :options="orientation.options"
            :arrayName="'orientation'"
            :selectWidth="orientation.width"
            @select-option="selectOption"
        >
        </select-params>
        <select-params
            :options="menu.options"
            :arrayName="'menu'"
            :selectWidth="menu.width"
            @select-option="selectOption"
        >
        </select-params>
    </div>
</template>

<script>
import SelectParams from "@/components/Constructs/SelectParams";
import MyCheckbox from "@/components/Constructs/MyCheckbox";
import { inject } from '@vue/runtime-core';

export default {
    setup() {
        const format = inject("format");
        const orientation = inject("orientation");
        const menu = inject("menu");
        const selectOption = inject("selectOption");
        const selectedMenu = inject("selectedMenu");
        const selectedFormat = inject("selectedFormat");



        return {
            format,
            orientation,
            menu,
            selectOption,
            selectedMenu,
            selectedFormat,
        }
    },
    components: {
        SelectParams,
        MyCheckbox,
    },
    computed: {
    }
};
</script>

<style scoped>
.params>*:not(.params > *:last-child) {
    margin-right: 8px;
}

.params {
    display: flex;
    margin-bottom: 8px;
}
</style>