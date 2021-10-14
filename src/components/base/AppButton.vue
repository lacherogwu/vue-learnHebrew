<template>
	<button :type="submit ? 'submit' : ''" :disabled="loading" class="bg-indigo-500 text-white py-2 px-4 rounded hover:bg-indigo-400 transition capitalize disabled:cursor-default disabled:bg-gray-200 disabled:text-gray-500">
		<span v-if="!loading">
			{{ title }}
		</span>
		<span v-else>
			<FontAwesomeIcon icon="circle-notch" spin size="lg" />
		</span>
	</button>
</template>

<script>
export default {
	name: 'AppButton',
};
</script>

<script setup>
const props = defineProps({
	title: {
		type: String,
		default: 'Button',
	},
	submit: {
		type: Boolean,
		default: false,
	},
	loading: {
		type: Boolean,
		default: false,
	},
});
</script>

<style></style>
