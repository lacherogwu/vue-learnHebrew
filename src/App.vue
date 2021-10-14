<script setup>
import Header from './layouts/Header.vue';
import Toast from './components/Toast.vue';
</script>

<template>
	<Toast />

	<header>
		<Header />
	</header>

	<main class="p-6">
		<router-view></router-view>
	</main>
</template>

<style></style>
