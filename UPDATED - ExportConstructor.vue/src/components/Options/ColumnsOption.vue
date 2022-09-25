<template>
    <div class="acc ref_content">
        <div class="acc__title" @click="$emit('show-options', $event)">
            <span>{{ nextElement?.name }}</span>
        </div>
        <div class="acc__content">
            <div class="acc__item pos-r bg-transparent">
                <div class="pos-a flex columns">
                    <vuedraggable :list="nextElement?.value" class="flex" animation="250">
                        <div
                            v-for="element in nextElement?.value"
                            :key="element"
                        >
                            <div
                                v-if="element.selected != 'hide'"
                                class="acc__item mr-1"
                                :class="{
                                    gray: !element.selected,
                                }"
                            >
                                <i
                                    class="fa-solid fa-grip-lines handle"
                                    :style="{
                                        transform: `translate(-3px, 1px) rotate(90deg)`,
                                    }"
                                ></i
                                >{{ element?.name }}
                                <input
                                    type="checkbox"
                                    v-if="element.selected != 'default'"
                                    v-model="element.selected"
                                    :style="{
                                        transform: 'translate(3px, 3px)',
                                    }"
                                />
                            </div> </div
                    ></vuedraggable>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { VueDraggableNext } from "vue-draggable-next";

export default {
    name: "columns-option",
    components: {
        vuedraggable: VueDraggableNext,
    },
    props: {
        nextElement: {
            required: true,
        },
    },
};
</script>

<style>
</style>