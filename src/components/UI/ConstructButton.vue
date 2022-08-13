<template>
	<button
	:style="'background:'+elementColor"
	>
		<slot></slot>
	</button>
</template>

<script>
export default {
	name: 'construct-button',
	props: {
		elementColor: {
			type: String,
			required: true,
		}
	}
}
</script>

<style>

button {
	border: none;
	cursor: pointer;
	font-size: 13px;
	color: white;
	background-color: #3b82ec;
	border-radius: 5px;
	padding: 0 10px;
	height: 30px;
	margin-right: 4px;
}
</style>