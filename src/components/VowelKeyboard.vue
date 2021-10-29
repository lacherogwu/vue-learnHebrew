<template>
	<div class="bg-gray-200 dark:bg-gray-700 rounded pt-3 pb-2 px-4 justify-center shadow-sm grid grid-cols-3 md:grid-cols-6 gap-x-4 gap-y-2 max-w-2xl mx-auto">
		<div class="cursor-pointer" v-for="vowel in vowels" @click="emit('input', vowel.symbol)">
			<div :class="`border border-gray-300 dark:border-gray-500 rounded shadow-sm text-2xl flex justify-center items-center ${vowel.class || ''}`">{{ vowel.symbol }}</div>
			<div class="text-sm text-center">{{ vowel.name }} - {{ vowel.example }}</div>
		</div>
	</div>
</template>

<script setup>
import { reactive } from 'vue';

const emit = defineEmits(['input']);

const vowels = reactive([
	{ name: 'קמץ', symbol: 'ָ', example: 'אָ', class: 'bg-red-200 dark:bg-red-800' },
	{ name: 'סגול', symbol: 'ֶ', example: 'אֶ', class: 'bg-yellow-200 dark:bg-yellow-500' },
	{ name: 'שווא', symbol: 'ְ', example: 'אְ', class: 'bg-purple-300 dark:bg-purple-500' },
	{ name: 'חטף-פתח', symbol: 'ֲ', example: 'אֲ' },
	{ name: 'חֳטַף-קָמַץ', symbol: 'ֳ', example: 'אֳ' },
	{ name: 'חטף-סגול', symbol: 'ֱ', example: 'אֱ' },
	{ name: 'חיריק', symbol: 'ִ', example: 'אִ' },
	{ name: 'צירי', symbol: 'ֵ', example: 'אֵ' },
	{ name: 'פתח', symbol: 'ַ', example: 'אַ' },
	{ name: 'קובוץ', symbol: 'ֻ', example: 'אֻ' },
	{ name: 'חולם', symbol: 'ֹ', example: 'אֹ' },
	{ name: 'דגש', symbol: 'ֿ', example: 'אֿ' },
]);
</script>

<style></style>
