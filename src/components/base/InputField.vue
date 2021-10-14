<template>
	<div class="flex flex-col relative">
		<span v-if="required" class="text-sm text-red-600 absolute top-4 left-3">*</span>
		<input
			v-if="element === 'input'"
			:id="_.camelCase(name)"
			v-model="inputValue"
			:required="required"
			:type="type"
			class="shadow border rounded w-full py-4 px-6 text-gray-700 leading-tight focus:outline-none focus:shadow-outline dark:bg-gray-700 dark:border-gray-500 dark:text-gray-300"
			:class="{ 'ring-1': errorMessage, 'ring-red-500': errorMessage }"
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
		<p v-show="errorMessage" class="text-sm mt-1 text-red-500">{{ errorMessage }}</p>
	</div>
</template>

<script>
export default {
	name: 'InputField',
};
</script>

<script setup>
import { computed, ref } from 'vue';
import _ from 'lodash';
import { useField } from 'vee-validate';

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
	validation: {
		type: Function,
		default: () => true,
	},
});

const { value, errorMessage } = useField(_.camelCase(props.name), props.validation);

const inputValue = computed({
	get() {
		return props.modelValue;
	},
	set(val) {
		value.value = val;
		emit('update:modelValue', val);
	},
});
</script>
<style></style>
