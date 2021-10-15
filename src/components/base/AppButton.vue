<template>
	<button
		:type="type"
		:disabled="loading"
		v-bind="attrs"
		:class="`
	  	${overwriteColor ? '' : 'bg-indigo-500 text-white hover:bg-indigo-600 focus:ring-indigo-500'}
		py-2 
		px-4 
		rounded-md 
		transition 
		capitalize 
		disabled:cursor-default 
		disabled:bg-gray-200 
		disabled:text-gray-500 
		 dark:disabled:bg-gray-700
		 dark:disabled:text-gray-200
		w-full 
		inline-flex 
		justify-center 
		sm:w-auto 
		sm:text-sm 
		text-base 
		font-medium 
		shadow-sm 
		border 
		border-transparent 
		focus:outline-none 
		focus:ring-2 
		focus:ring-offset-2
		`"
	>
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
import { useAttrs } from 'vue';

const props = defineProps({
	title: {
		type: String,
		default: 'Button',
	},
	type: {
		type: String,
		default: 'button',
	},
	loading: {
		type: Boolean,
		default: false,
	},
	overwriteColor: {
		type: Boolean,
		default: false,
	},
});

const attrs = useAttrs();
</script>

<style></style>
