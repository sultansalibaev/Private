<template>
    <div class="acc">
        <div
            class="acc__title"
            @click="$emit('update-checkbox', nextElement, !nextElement.value)"
        >
            <span
                :class="{
                    gray: !nextElement.value,
                }"
                >{{ nextElement?.name }}</span
            >
        </div>
        <div class="acc__content"></div>
    </div>
</template>

<script>
export default {
    name: "checkbox-option",
    props: {
        nextElement: {
            required: true,
        },
    },
};
</script>

<style>
</style>