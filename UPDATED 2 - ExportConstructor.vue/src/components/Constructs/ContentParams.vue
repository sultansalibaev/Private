<template>
    <div class="params">
        <input
            type="text"
            placeholder="Название Шаблона..."
            class="pl-4 w-full"
        />
        <select-params :options="format.options" :selectWidth="format.width" @select-option="selectOption"></select-params>
        <select-params :options="orientation.options" :selectWidth="orientation.width" @select-option="selectOption"></select-params>
        <select-params :options="menu.options" :selectWidth="menu.width" @select-option="selectOption"></select-params>
    </div>
</template>

<script>
import SelectParams from "@/components/Constructs/SelectParams";
import { inject } from '@vue/runtime-core';

export default {
    data() {
        return {
            menu: {
                width: 86.400,
                options: [
                    {
                        name: "Проект",
                        selected: false,
                    },
                    {
                        name: "Шаблон",
                        selected: true,
                    },
                ]
            },
        }
    },
    setup() {
        const format = inject("format");
        const orientation = inject("orientation");
        const selectOption = inject("selectOption");

        return {
            format,
            orientation,
            selectOption,
        }
    },
    components: {
        SelectParams,
    }
};
</script>

<style scoped>

.params > *:not(.params > *:last-child) {
    margin-right: 8px;
}

.params {
    display: flex;
    margin-bottom: 8px;
}
</style>