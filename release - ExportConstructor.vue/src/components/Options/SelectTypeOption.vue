<template>
    <div
        class="acc ref_content"
    >
        <div class="acc__title" @click="$emit('show-options', $event)">
            <span>{{ nextElement.ru }}</span>
        </div>
        <div class="acc__content">
            <div
                class="acc__item pos-r"
                v-for="[key, value] in nextElement.value"
                :key="key"
                :class="{
                    gray: !key.selected,
                }"
                @click="$emit('update-select', nextElement.value, key.name)"
            >
                <span class="flex items-center">
                    {{ key.ru }}
                    <i class="fa-solid fa-angle-right w-full flex justify-end pl-1"></i>
                </span>
                <div class="pos-a" v-if="key.selected">
                    <div
                        v-for="[_key, _value] in Object.entries(value)"
                        :key="_key"
                        class="acc__item flex justify-start items-center"
                        :class="{
                            gray: !_value,
                        }"
                        @click="value[_key] = !_value"
                    >
                        <span class="w-full text-left mr-1">{{ keyNames[_key] }}</span>

                        <input
                            type="checkbox"
                            @change="$emit('update-check', _value, $event.target.value)"
                            :checked="_value"
                            :value="_value"
                            :style="{
                                // transform: 'translate(3px, 3px)',
                            }"
                        />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "select-type-option",
    data() {
        return {
            keyNames: {
                data_labels: "Метрики данных",
                labels: "Метрики",
            }
        }
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