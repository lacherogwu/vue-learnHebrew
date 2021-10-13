<script setup>
import Header from './layouts/Header.vue';
</script>

<template>
	<header>
		<Header />
	</header>

	<main class="p-6">
		<router-view></router-view>
	</main>
</template>

<style></style>
