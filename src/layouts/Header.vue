<template>
	<div class="z-40 fixed w-full h-12 px-4 shadow flex justify-between items-center space-x-4 bg-white dark:bg-gray-700 dark:text-gray-100">
		<div v-if="store.state.loggedInUser" class="inline-flex space-x-2">
			<router-link class="border-b border-gray-800 dark:border-gray-100" to="/learn">Learn</router-link>
			<router-link to="/words">Words List</router-link>
		</div>
		<div v-if="!store.state.loggedInUser" class="inline-flex space-x-2">
			<router-link class="border-b border-gray-800 dark:border-gray-100" to="/login">Login</router-link>
			<router-link to="/signup">Signup</router-link>
		</div>
		<div v-if="store.state.loggedInUser" class="hidden md:block">Hello, {{ store.state.loggedInUser }}!</div>
		<div class="inline-flex space-x-2 items-center">
			<ThemeSwitcher design="2" />
			<div v-if="store.state.loggedInUser" class="cursor-pointer border py-1 px-2 border-black dark:border-gray-100 hover:bg-black hover:text-white dark:hover:bg-gray-100 dark:hover:text-gray-800 transition rounded" @click="logout">Logout</div>
		</div>
	</div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import ThemeSwitcher from '../components/ThemeSwitcher.vue';

const store = useStore();
const router = useRouter();

const logout = () => {
	store.commit('logout');
	router.push('/login');
};
</script>

<style></style>
