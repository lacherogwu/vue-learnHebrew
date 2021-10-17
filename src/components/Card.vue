<template>
	<div class="max-w-md mx-auto">
		<div class="bg-white dark:bg-gray-700 dark:border-gray-600 shadow-2xl border rounded flex flex-col justify-center items-center p-6 h-64 cursor-pointer select-none">
			<div class="text-6xl">{{ hebrewTranslation }}</div>
			<div :class="{ invisible: !showTranslation }">{{ russianTranslation }}</div>
		</div>
	</div>
</template>

<script setup>
import { ref, watch } from 'vue';
const showTranslation = ref(false);

const props = defineProps({
	hebrewTranslation: {
		type: String,
		default: '',
	},
	russianTranslation: {
		type: String,
		default: '',
	},
});

const emit = defineEmits(['swipe']);

watch(
	() => props.hebrewTranslation,
	() => {
		showTranslation.value = false;
	}
);
</script>

<style></style>
