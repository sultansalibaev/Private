<template>
	<construct-button @click="removeElement" class="remove-element">
		Удалить
	</construct-button>
</template>

<script>
export default {
	name: "remove-element",
	props: {
		element: {
			type: Object,
			required: true
		}
	},
	methods: {
		removeElement() {
			this.$emit('remove', this.element);
		},
	}
}
</script>

<style scoped>

.remove-element {
	background-color: rgb(241, 94, 94);
}
</style>