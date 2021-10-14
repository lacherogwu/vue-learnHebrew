<template>
	<div class="text-center py-4 absolute inset-0 -top-14 transform transition duration-300 ease-in-out pointer-events-none" :class="{ 'translate-y-14': state.show }">
		<div class="p-2 mx-2 bg-indigo-800 items-center text-indigo-100 leading-none rounded-full inline-flex" role="alert">
			<span class="flex rounded-full bg-indigo-500 uppercase px-2 py-1 text-xs font-bold mr-3"> <FontAwesomeIcon icon="bell" size="sm" class="opacity-75" /> </span>
			<span class="font-semibold mr-2 text-left flex-auto">{{ state.message }}</span>

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
