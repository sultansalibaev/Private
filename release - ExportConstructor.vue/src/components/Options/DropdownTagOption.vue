<template>
    <div
        class="acc"
    >
        <div class="acc__title" @click="$emit('show-options', $event)">
            <span>{{ nextElement?.ru }}</span>
        </div>
        <div class="acc__content">
            <template v-for="element in nextElement.value" :key="element">
                <div
                    class="acc__item"
                    :class="{
                        gray: !element.value,
                    }"
                    @click="element.value = !element.value"
                    v-if="element.type == 'checkbox'"
                >
                    {{ element?.ru }}
                </div>
                <div
                    class="acc__item pos-r p-0"
                    v-else-if="element.type == 'color'"
                >
                    <span
                        class="flex px-2 items-center"
                        @click="element.show = !element.show"
                        >
                            {{ element?.ru }}

                            <i class="fa-solid fa-angle-right w-full flex justify-end pl-1"></i>
                        </span
                    >
                    <div class="pos-a" v-show="element?.show">
                        <div class="acc__item">
                            <input
                                type="color"
                                v-model="element.value"
                                :style="{
                                    height: '22px',
                                    background: 'transparent',
                                }"
                            />
                        </div>
                    </div>
                </div>
            </template>
        </div>
    </div>
</template>

<script>
export default {
    name: "dropdown-tag-option",
    props: {
        nextElement: {
            required: true,
        },
    },
};
</script>

<style>
</style>