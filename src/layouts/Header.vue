<template>
	<div class="fixed w-full h-12 shadow flex justify-center items-center space-x-4 dark:bg-gray-700 dark:text-gray-100">
		<router-link to="/">Home</router-link>
		<router-link to="/learn">Learn</router-link>
		<router-link to="/words">Words List</router-link>
		<ThemeSwitcher design="2" />
	</div>
</template>

<script setup>
import ThemeSwitcher from '../components/ThemeSwitcher.vue';
</script>

<style></style>
