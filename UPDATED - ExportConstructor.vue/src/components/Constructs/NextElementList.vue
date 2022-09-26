<template>
    <div class="acc2__content flex w-0">
        <template v-for="nextElement in nextElements" :key="nextElement">
            <number-option
                :nextElement="nextElement"
                @update-number="updateNumber"
                @update-length="updateLenght"
                @show-options="$emit('show-options', $event)"
                v-if="nextElement?.type == 'number'"
            ></number-option>

            <checkbox-option
                :nextElement="nextElement"
                @update-checkbox="updateCheckbox"
                v-else-if="nextElement?.type == 'checkbox'"
            ></checkbox-option>

            <select-index-option
                :nextElement="nextElement"
                @update-select="select"
                @show-options="$emit('show-options', $event)"
                v-else-if="nextElement?.type == 'select' && nextElement?.outputIndex"
            ></select-index-option>

            <select-type-option
                :nextElement="nextElement"
                @update-select="select"
                @update-check="check"
                @show-options="$emit('show-options', $event)"
                v-else-if="nextElement?.type == 'select' && nextElement?.name == 'type'"
            ></select-type-option>

            <columns-option
                :nextElement="nextElement"
                @show-options="$emit('show-options', $event)"
                @show-column-options="select"
                v-else-if="nextElement?.type == 'columns'"
                :table="selectedFormat() == 'word' ? nextElements[0].value : true"
            ></columns-option>

            <dropdown-tag-option
                :nextElement="nextElement"
                @show-options="$emit('show-options', $event)"
                v-else-if="
                    nextElement?.name == 'tag_highlight' &&
                    nextElement?.type == 'dropdown'
                "
            ></dropdown-tag-option>

            <dropdown-order-option
                :nextElement="nextElement"
                @update-select="select"
                @show-options="$emit('show-options', $event)"
                v-else-if="nextElement?.name == 'order' && nextElement?.type == 'dropdown'"
            ></dropdown-order-option>
        </template>

        <slot></slot>
    </div>
</template>

<script>
import NumberOption from "@/components/Options/NumberOption";
import CheckboxOption from "@/components/Options/CheckboxOption";
import SelectIndexOption from "@/components/Options/SelectIndexOption";
import SelectTypeOption from "@/components/Options/SelectTypeOption";
import ColumnsOption from "@/components/Options/ColumnsOption";
import DropdownTagOption from "@/components/Options/DropdownTagOption";
import DropdownOrderOption from "@/components/Options/DropdownOrderOption";
import { inject } from "vue";

export default {
    components: {
        NumberOption,
        CheckboxOption,
        SelectIndexOption,
        SelectTypeOption,
        ColumnsOption,
        DropdownTagOption,
        DropdownOrderOption,
    },
    props: {
        nextElements: {
            required: false,
        },
    },
    methods: {
        select(elementOption, keyName, isSelect = false, value = "selected") {
            elementOption.forEach((el) => {
                if (isSelect) {
                    el[value] = el.name == keyName;
                } else {
                    el[0][value] = el[0].name == keyName;
                }
            });
        },
        updateCheckbox(nextElement, isCheck) {
            nextElement.value = isCheck;
        },
        updateNumber(nextElement, number) {
            nextElement.value = number;
        },
        check(checkbox, check) {
            checkbox = !this.stringToBoolean(check);
        },
        updateLenght(nextElement, selectedLength) {
            nextElement.selected = !this.stringToBoolean(selectedLength);
        },
        stringToBoolean(string) {
            if (string === "true") return true;
            else if (string === "false") return false;
        },
    },
    mounted() {
        let table_titles = document.querySelectorAll(".table-element");
        table_titles.forEach((table_title) => {
            let columns = table_title.nextElementSibling.querySelectorAll(
                ".pos-a.flex.columns"
            );
            columns.forEach(column => {
                let plusDistance = 0;
                if (this.selectedFormat() == "word") plusDistance = 35;
                column.style.left = `${-(table_title.clientWidth + plusDistance)}px`;
            });
        });
    },
    setup() {
        const selectedFormat = inject("selectedFormat");

        return {
            selectedFormat,
        };
    },
};
</script>

<style>
</style>