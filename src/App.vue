<script setup>
import Header from './layouts/Header.vue';
import Toast from './components/Toast.vue';
import { useStore } from 'vuex';

const store = useStore();
</script>

<template>
	<div :class="{ dark: store.state.darkMode }">
		<Toast />

		<header>
			<Header />
		</header>

		<main class="pt-20 p-6 h-screen dark:bg-gray-800 dark:text-gray-100">
			<router-view></router-view>
		</main>
	</div>
</template>

<style></style>
