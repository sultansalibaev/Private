<template>
    <div class="acc">
        <div class="acc__title" @click="$emit('show-options', $event)">
            <span :class="{
                gray:
                    nextElement.name == 'text_length' &&
                    !nextElement.selected,
            }"
                :style="{
                    'display': 'flex',
                    'align-items': 'center'
                }"
            >
                {{ nextElement?.ru }}

                <input type="checkbox" v-if="nextElement.name == 'text_length'"
                    @change="$emit('update-length', nextElement, $event.target.value)" :value="nextElement.selected"
                    :checked="nextElement.selected" :style="{
                        'margin-top': '-1px',
                        'margin-left': '6px',
                    }" />
            </span>
        </div>
        <div class="acc__content" v-show="
            nextElement.name != 'text_length' ||
            (nextElement.name == 'text_length' && nextElement.selected)
        ">
            <div class="acc__item">
                <input class="acc-number bg-transparent appearance-none" style="width: 50px" :type="nextElement.type"
                    @input="$emit('update-number', nextElement, $event.target.value)" :value="nextElement.value"
                    :min="nextElement.min" :max="nextElement.max" />
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'number-option',
    props: {
        nextElement: {
            required: true
        }
    }
};
</script>

<style>

</style>