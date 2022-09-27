<template>
    <div class="acc ref_content">
        <div class="acc__title" @click="$emit('show-options', $event)">
            <span>{{ nextElement?.ru }}</span>
        </div>
        <div class="acc__content">
            <template v-for="[key, arr] in nextElement.value" :key="key">
                <div class="acc__item pos-r p-0" v-if="key.type == 'select'">
                    <span class="flex justify-center" @click="key.selected = !key.selected">
                        {{ key.ru }}
                        <i class="
                                fa-solid fa-angle-right
                                absolute
                                right-1.5
                                top-1
                            "></i>
                    </span>

                    <div class="pos-a" v-if="key.selected">
                        <div v-for="el in arr" :key="el" class="acc__item" :class="{
                            gray: !el.selected,
                        }" @click="$emit('update-select', arr, el.name, true)">
                            {{ el.ru }}
                        </div>
                    </div>
                </div>
            </template>

            <vuedraggable :list="nextElement.draggables" animation="250">
                <template v-for="[key, arr] in nextElement.draggables" :key="key.name">
                    <div class="acc__item pos-r p-0 on-hover" v-if="key.type == 'draggable'">
                        <span class="flex justify-center items-center h-full px-2" :class="{
                            gray: !key.selected,
                        }" @click="key.showResources = !key.showResources">
                            <i class="fa-solid fa-grip-lines -translate-x-1"></i>
                            {{ key.ru }}
                            <input type="checkbox" v-model="key.selected" :style="{
                                'margin-top': '-1px',
                                'margin-left': '5px',
                            }" @click="key.selected = !key.selected" />
                        </span>

                        <div class="pos-a" v-if="key.selected && key.showResources">
                            <vuedraggable :list="arr" animation="250">
                                <div v-for="el in arr" :key="el" class="
                                        acc__item
                                        flex
                                        justify-between
                                        items-center
                                        h-full
                                    " :class="{
                                        gray: !el.selected,
                                    }" @click="el.selected = !el.selected">
                                    <i class="
                                            fa-solid fa-grip-lines
                                            -translate-x-1
                                        "></i>
                                    {{ el.ru ?? el.name }}
                                    <input type="checkbox" v-model="el.selected" :style="{
                                        transform: 'translate(3px, -2px)',
                                    }" />
                                </div>
                            </vuedraggable>
                        </div>
                    </div>
                </template>
            </vuedraggable>
        </div>
    </div>
</template>

<script>
import { VueDraggableNext } from "vue-draggable-next";

export default {
    name: "dropdown-order-option",
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