<template>
	<div class="flex relative">
		<span v-if="required" class="text-sm text-red-600 absolute top-4 left-3">*</span>
		<input
			v-if="element === 'input'"
			:id="_.camelCase(name)"
			v-model="inputValue"
			:required="required"
			:type="type"
			class="shadow border rounded w-full py-4 px-6 text-gray-700 leading-tight focus:outline-none focus:shadow-outline dark:bg-gray-700 dark:border-gray-500 dark:text-gray-300"
			:placeholder="name"
		/>

		<textarea
			v-if="element === 'textarea'"
			:id="_.camelCase(name)"
			v-model="inputValue"
			:required="required"
			cols="30"
			rows="10"
			class="shadow border rounded w-full py-4 px-6 text-gray-700 leading-tight focus:outline-none focus:shadow-outline dark:bg-gray-700 dark:border-gray-500 dark:text-gray-300"
			:placeholder="name"
		></textarea>

		<select
			v-if="element === 'select'"
			:id="_.camelCase(name)"
			v-model="inputValue"
			:required="required"
			class="shadow border rounded w-full py-4 px-6 leading-tight text-gray-700 focus:outline-none focus:shadow-outline dark:bg-gray-700 dark:border-gray-500 dark:text-gray-300"
		>
			<option value disabled selected hidden class="text-gray-700 dark:text-gray-300">{{ name }}</option>

			<option v-for="(item, index) in items" :key="index">
				{{ item }}
			</option>
		</select>
	</div>
</template>

<script>
export default {
	name: 'InputField',
};
</script>

<script setup>
import { defineProps, computed, defineEmits } from 'vue';
import _ from 'lodash';

const emit = defineEmits(['update:modelValue']);
const props = defineProps({
	modelValue: {
		type: String,
		default: '',
	},
	element: {
		type: String,
		default: 'input',
	},
	required: {
		type: Boolean,
		default: false,
	},
	type: {
		type: String,
		default: 'text',
	},
	name: {
		type: String,
		default: '',
	},
	items: {
		type: Array,
		default: () => [],
	},
});

const inputValue = computed({
	get() {
		return props.modelValue;
	},
	set(val) {
		emit('update:modelValue', val);
	},
});
</script>
<style></style>
