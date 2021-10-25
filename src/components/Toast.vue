<template>
	<div class="z-50 text-center py-4 absolute inset-0 transform transition duration-300 ease-in-out pointer-events-none" :class="{ '-translate-y-14': !state.show }">
		<div :class="`${!state.error ? ' bg-indigo-800' : 'bg-red-500 dark:bg-red-dark'} p-2 mx-2  items-center text-indigo-100 leading-none rounded-full inline-flex`" role="alert">
			<span :class="`${!state.error ? ' bg-indigo-500' : 'bg-red-400'} flex rounded-full uppercase px-2 py-1 text-xs font-bold mr-3`"> <FontAwesomeIcon icon="bell" size="sm" class="opacity-75" /> </span>
			<span :class="`font-semibold mr-2 text-left flex-auto ${!state.error ? 'text-indigo-100' : 'text-red-100'}`">{{ state.message }}</span>

			<!-- <FontAwesomeIcon icon="times" size="sm" class="opacity-75 mx-2 text-current" /> -->
		</div>
	</div>
</template>

<script>
export default {
	name: 'Toast',
};
</script>

<script setup>
import { computed } from 'vue';
import { useStore } from 'vuex';

const store = useStore();

const state = computed(() => store.state.toast);
</script>

<style></style>
