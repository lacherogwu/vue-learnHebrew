<template>
	<div class="bg-gray-200 rounded pt-3 pb-2 px-4 justify-center shadow-sm grid grid-cols-3 md:grid-cols-6 gap-4 max-w-2xl mx-auto">
		<div class="cursor-pointer" v-for="vowel in vowels" @click="emit('input', vowel.symbol)">
			<div class="border border-gray-300 rounded shadow-sm text-2xl flex justify-center items-center">{{ vowel.symbol }}</div>
			<div class="text-sm text-center">{{ vowel.name }} - {{ vowel.example }}</div>
		</div>
	</div>
</template>

<script setup>
import { reactive, defineEmits } from 'vue';

const emit = defineEmits(['input']);

const vowels = reactive([
	{ name: 'חטף-פתח', symbol: 'ֲ', example: 'אֲ' },
	{ name: 'חֳטַף-קָמַץ', symbol: 'ֳ', example: 'אֳ' },
	{ name: 'חטף-סגול', symbol: 'ֱ', example: 'אֱ' },
	{ name: 'חיריק', symbol: 'ִ', example: 'אִ' },
	{ name: 'צירי', symbol: 'ֵ', example: 'אֵ' },
	{ name: 'פתח', symbol: 'ַ', example: 'אַ' },
	{ name: 'קמץ', symbol: 'ָ', example: 'אָ' },
	{ name: 'קובוץ', symbol: 'ֻ', example: 'אֻ' },
	{ name: 'סגול', symbol: 'ֶ', example: 'אֶ' },
	{ name: 'שווא', symbol: 'ְ', example: 'אְ' },
	{ name: 'חולם', symbol: 'ֹ', example: 'אֹ' },
	{ name: 'דגש', symbol: 'ֿ', example: 'אֿ' },
]);
</script>

<style></style>
