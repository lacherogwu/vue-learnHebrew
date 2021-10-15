<template>
	<div>
		<div v-if="design == 1" class="cursor-pointer m-2" @click="toggleDarkMode">
			<div class="dark:hidden text-white">
				<font-awesome-icon icon="sun" size="lg" />
			</div>
			<div class="hidden dark:block text-gray-800">
				<font-awesome-icon icon="moon" size="lg" />
			</div>
		</div>
		<div v-else-if="design == 2" class="flex justify-end items-center space-x-2">
			<span class="text-sm text-gray-800 dark:text-gray-300">Light</span>
			<label for="toggle" class="w-9 h-5 flex items-center bg-gray-300 rounded-full p-1 cursor-pointer duration-300 ease-in-out dark:bg-gray-600">
				<div class="toggle-dot bg-white w-4 h-4 rounded-full shadow-md transform duration-300 ease-in-out dark:translate-x-3"></div>
			</label>
			<span class="text-sm text-gray-400 dark:text-white">Dark</span>
			<input id="toggle" type="checkbox" class="hidden" @click="toggleDarkMode" />
		</div>
	</div>
</template>

<script setup>
import { useStore } from 'vuex';

const props = defineProps({
	design: {
		type: String,
		default: '1',
	},
});
const store = useStore();

const toggleDarkMode = () => store.commit('toggleDarkMode');
</script>
