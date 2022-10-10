<template>
    <div class="acc ref_content" v-show="nextElement.name == isTable">
        <div class="acc__title" @click="$emit('show-options', $event)">
            <span>{{ nextElement.ru }}</span>
        </div>
        <div class="acc__content">
            <div class="acc__item pos-r bg-transparent">
                <div class="pos-a flex columns">
                    <vuedraggable :list="nextElement.value" class="flex" animation="250">
                        <div v-for="element in nextElement.value" :key="element">
                            <div v-if="element.selected != 'hide'" class="acc__item mr-1 pos-r" style="min-width: 110px;
                                justify-content: start;
                                display: flex;
                                align-items: center;"
                                :class="{
                                    gray: !element.selected,
                                }"
                                @click="$emit('show-column-options', nextElement.value, element.name, true, 'showParams')"
                            >
                                <span class="w-full text-left">
                                    <i class="fa-solid fa-grip-lines handle mr-1" :style="{
                                        transform: `rotate(90deg)`,
                                    }"></i>{{ element.ru }}
                                </span>
                                <input type="checkbox" class="ml-1" style="margin-top: 1px" v-if="element.selected != 'default'"
                                    v-model="element.selected" />
                                <div class="pos-a pl-0 w-full" style="top:100%;left:0;padding-top: 4px"
                                    v-if="element.selected && element.showParams" @click.stop>
                                    <template v-for="param in element.params" :key="param.name">
                                        <div class="acc__item mb-0.5 flex" v-if="param.type == 'checkbox'" :class="{
                                            gray: !param.selected
                                        }">
                                            <span>{{ paramKeys[param.name] }}</span>
                                            <input type="checkbox" :style="{
                                                'margin-top': 0,
                                                'margin-left': 'auto'
                                            }" v-model="param.selected" />
                                        </div>
                                        <div class="acc__item m-0" v-if="param.type == 'color'">

                                            <input type="color" class="w-full" v-model="param.value" :style="{
                                                height: '22px',
                                                background: 'transparent',
                                            }" />
                                        </div>
                                    </template>
                                </div>
                            </div>
                        </div>
                    </vuedraggable>
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
    data() {
        return {
            paramKeys: {
                bold: "Жирность",
                italic: "Курсив",
                underline: "Подчеркнуть",
            }
        }
    },
    props: {
        nextElement: {
            required: true,
        },
        table: {
            required: true,
        },
    },
    computed: {
        isTable() {
            return this.table ? "columns" : "list_rows";
        }
    }
};
</script>

<style>

</style>