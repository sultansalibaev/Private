<template>
    <div class="acc2">
        <div
            class="acc2__title"
            :class="{
                'table-element': keyObject.type == 'table',
            }"
        >
            <i
                class="fa-solid fa-grip-lines handle"
                style="background: rgb(53, 126, 189)"
            ></i>
            <span :class="keyObject.type != 'table' ? keyObject.type : ''" :data-name="keyObject.name">{{ keyObject.ru }}</span>
            <i
                @click="toggleNextElementList"
                class="fa-solid fa-angle-right"
                style="background: rgb(53, 126, 189)"
            ></i>
        </div>
        <next-element-list
            :nextElements="value"
            @show-options="toggleNextElementOptions"
        >
            <div class="acc">
                <div class="acc__title-copy" @click="removeElement(keyObject.name, keyObject.id)">
                    <span class="remove-element">Удалить</span>
                </div>
            </div>
        </next-element-list>
    </div>
</template>

<script>
import NextElementList from "@/components/Constructs/NextElementList";
import slideToggleElementSettings from "@/hooks/slideToggleElementSettings";
import { removeElement } from "@/hooks/toggle/element";
import { selectedFormat } from "@/hooks/create/select";

export default {
    components: {
        NextElementList,
    },
    props: {
        keyObject: {
            required: true,
        },
        value: {
            required: true,
        },
    },
    setup() {

        const { toggleNextElementList, toggleNextElementOptions } =
            slideToggleElementSettings;

        return {
            selectedFormat,
            removeElement,
            toggleNextElementList,
            toggleNextElementOptions,
        };
    },
};
</script>

<style>
</style>