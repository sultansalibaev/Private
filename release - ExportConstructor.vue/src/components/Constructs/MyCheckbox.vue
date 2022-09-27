<template>
    <div class="abc-checkbox-circlle flex items-center bg-white"
        style="height: 36px;border-radius: 4px;font-size: 10pt;padding: 0 9px;">
        <input type="checkbox" :id="param" v-model="checkbox[param]" style="margin-top: 0;margin-right: 6px;" />
        <label class="font-normal whitespace-nowrap mb-0" :for="param">
            <slot></slot>
        </label>
    </div>
</template>

<script>
import { inject } from 'vue';

export default {
    setup() {
        const checkbox = inject("checkbox");

        return {
            checkbox,
        }
    },
    props: {
        param: {
            type: String,
            required: true,
        },
    },
};
</script>

<style>

</style>