<template>
    <vuedraggable
        group="todosapp"
        class="accs"
        :list="report_copy[selectedFormat()]"
        :move="checkMove"
        animation="250"
        handle=".handle"
    >
        <div v-for="[key, value] of report_copy[selectedFormat()]" :key="key.id">
            <div class="group" v-if="key.name === 'GROUP'">
                <div class="group__title group-bg flex items-center" v-if="selectedFormat() != 'powerpoint'">
                    <span class="w-full cursor-pointer handle">Группа</span>
                    <button class="remove-element" @click="removeGroup(report_copy[selectedFormat()], key.id)">
                        Разгруппировать
                    </button>
                </div>
                <div class="group__title group-bg flex items-center" v-else>
                    <span class="w-full cursor-pointer handle">
                        <label :for="'project-'+key.id" style="color:#eaeaea">
                            Проект:
                            <input type="text" v-model="key.projectName" class="group-input" style="width: 300px;">
                        </label>
                        <label :for="'number-'+key.id" style="color:#eaeaea">
                            его номер:
                            <input type="number" v-model="key.projectId" class="group-input" style="width: 70px;">
                        </label>
                    </span>
                    <button class="remove-element" @click="removeProject(report_copy[selectedFormat()], key.id)">
                        Удалить
                    </button>
                </div>

                <vuedraggable
                    group="todosapp"
                    class="group__body group-bg pos-r"
                    :class="key.id"
                    :list="value.elements"
                    :move="checkMoveFromGroup"
                    animation="250"
                    handle=".handle"
                >
                    <template
                        v-for="[key, value] of value.elements"
                        :key="key.id"
                    >
                        <element-item
                            :keyObject="key"
                            :value="value"
                        ></element-item>
                    </template>
                    <div class="absolute hidden left-3 bottom-1.5 text-red-500 text-sm">{{ key.error }}</div>
                </vuedraggable>
            </div>

            <element-item :keyObject="key" :value="value" v-else></element-item>
        </div>
    </vuedraggable>
</template>

<script>
import ElementItem from "@/components/Constructs/ElementItem";
import { VueDraggableNext } from "vue-draggable-next";
import {
    inject,
    // watch,
} from "vue";

export default {
    components: {
        ElementItem,
        vuedraggable: VueDraggableNext,
    },
    methods: {
        checkMove(event) {
            if (
                event.dragged.firstChild.classList.contains("group") &&
                event.to.classList.contains("group__body")
            ) {
                return false;
            }
            else if (
                event.from.classList.contains("accs") &&
                event.to.classList.contains("group__body") &&
                this.selectedFormat() != "powerpoint"
            ) {
                let group = event.to;
                group.querySelector(`.absolute`).classList.remove('hidden');
                console.log(event.dragged.querySelector(".acc2 .acc2__title span").classList.contains("graph"));
                if (event.dragged.querySelector(".acc2 .acc2__title span").classList.contains("graph"))
                    return group.children.length < 2;
                else return false;
            }
        },
        checkMoveFromGroup(event) {
            if (
                event.from.classList.contains("group__body") &&
                event.to.classList.contains("group__body") &&
                this.selectedFormat() != "powerpoint"
            ) {
                let group = event.to;
                return group.children.length < 2;
            }
        },
    },
    setup() {
        const selectedFormat = inject("selectedFormat");
        const report_copy = inject("report_copy");
        const removeGroup = inject("removeGroup");
        const removeProject = inject("removeProject");
        // watch(report_copy.value, () => {
        //     console.log("Nice", report_copy.value);
        // });

        return {
            selectedFormat,
            report_copy,
            removeGroup,
            removeProject,
        };
    },
};
</script>

<style>
.group-input {
    background: #54728f;
    border-radius: 3px;
    margin: 0 4px;
    padding-left: 6px;
}
</style>