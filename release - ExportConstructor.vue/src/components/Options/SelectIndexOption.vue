<template>
    <div
        class="acc ref_content"
    >
        <div class="acc__title" @click="$emit('show-options', $event)">
            <span>{{ nextElement?.ru }}</span>
        </div>
        <div class="acc__content">
            <div
                class="acc__item"
                v-for="element in nextElement?.value"
                :key="element"
                :class="{
                    gray: !element?.selected,
                }"
                @click="$emit('update-select', nextElement.value, element.name, true)"
            >
                {{ element?.name }}
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "select-index-option",
    props: {
        nextElement: {
            required: true,
        },
    },
};
</script>

<style>
</style>