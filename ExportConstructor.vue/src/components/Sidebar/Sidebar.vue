<template>
	<div class="_sidebar">
		<Menu :additional="additional" :newElements="newElements" :elements="elements"></Menu>
		<!-- <Buttons :elements="elements"></Buttons> -->
		<Buttons :additional="additional" :elements="newElements" :loading="loading" :error="error"></Buttons>
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
            type: Object,
            required: true,
        },
        error: {
            type: Object,
            required: true,
        },
	},
    emits: ["update"],
}
</script>

<style scoped>
._sidebar {
	background-color: #f3f3f4;
	padding: 24px 10px;
	width: 240px;
}
</style>