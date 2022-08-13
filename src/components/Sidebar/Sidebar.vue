<template>
	<div class="_sidebar">
		<Menu :newElements="newElements" :elements="elements"></Menu>
		<!-- <Buttons :elements="elements"></Buttons> -->
		<Buttons :additional="additional" :elements="newElements" @loadingSpinner="loadingSpinner" :loading="loading"></Buttons>
	</div>
</template>

<script>
import Menu from "@/components/Sidebar/Menu.vue";
import Buttons from "@/components/Sidebar/Buttons.vue";

export default {
	name: 'Sidebar',
	components: {
		Menu,
		Buttons
	},
	props: {
		additional: {
			type: Object,
			required: true,
		},
		elements: {
			type: Array,
			required: true,
		},
		newElements: {
			type: Array,
			required: true,
		},
        loading: {
            type: Boolean,
            required: true,
        },
	},
    emits: ["update", 'loadingSpinner'],
	methods: {
        loadingSpinner() {
            this.$emit('loadingSpinner');
        },
	}
}
</script>

<style scoped>
._sidebar {
	background-color: #f3f3f4;
	padding: 24px 10px;
	width: 240px;
}
</style>