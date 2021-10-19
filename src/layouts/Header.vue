<template>
	<div class="z-40 fixed w-full h-12 px-4 shadow flex justify-between items-center space-x-4 bg-white dark:bg-gray-700 dark:text-gray-100">
		<div class="inline-flex space-x-2">
			<router-link class="border-b border-gray-800 dark:border-gray-100" to="/learn">Learn</router-link>
			<router-link to="/words">Words List</router-link>
		</div>
		<ThemeSwitcher design="2" />
	</div>
</template>

<script setup>
import ThemeSwitcher from '../components/ThemeSwitcher.vue';
</script>

<style></style>
