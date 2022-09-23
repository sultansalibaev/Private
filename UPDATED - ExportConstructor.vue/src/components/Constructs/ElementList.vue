<template>
    <vuedraggable
        group="todosapp"
        class="accs h-full"
        :list="pdf_copy"
        :move="checkMove"
        animation="250"
        handle=".handle"
    >
        <div v-for="[key, value] of pdf_copy" :key="key.id">
            <div class="group" v-if="key.name === 'GROUP'">
                <div class="group__title group-bg flex items-center">
                    <span class="w-full cursor-pointer handle">Группа</span>
                    <button class="remove-element" @click="removeGroup(key.id)">
                        Разгруппировать
                    </button>
                </div>

                <vuedraggable
                    group="todosapp"
                    class="group__body group-bg"
                    :list="value.elements"
                    :move="checkMoveFromGroup"
                    @dragleave="dragLeave"
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
                event.from.classList.contains("accs") &&
                event.to.classList.contains("group__body")
            ) {
                let group = event.to;
                console.log(event.dragged.querySelector(".acc2 .acc2__title span").classList.contains("graph"));
                if (event.dragged.querySelector(".acc2 .acc2__title span").classList.contains("graph"))
                    return group.children.length < 2;
                else return false;
            }
        },
        checkMoveFromGroup(event) {
            if (
                event.from.classList.contains("group__body") &&
                event.to.classList.contains("group__body")
            ) {
                let group = event.to;
                return group.children.length < 2;
            }
        },
    },
    setup() {
        const pdf_copy = inject("pdf_copy");
        const removeGroup = inject("removeGroup");
        // watch(pdf_copy.value, () => {
        //     console.log("Nice", pdf_copy.value);
        // });

        return {
            pdf_copy,
            removeGroup,
        };
    },
};
</script>

<style>
</style>