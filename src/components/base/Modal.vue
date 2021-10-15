<template>
	<div class="fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
		<div class="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
			<div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity dark:bg-gray-900 dark:bg-opacity-75" aria-hidden="true" @click="emit('close')"></div>

			<span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true"></span>

			<div class="inline-block align-bottom bg-white dark:bg-gray-800 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
				<div class="bg-white dark:bg-gray-800 px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
					<div class="sm:flex sm:items-start">
						<div class="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
							<svg class="h-6 w-6 text-red-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
							</svg>
						</div>
						<div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
							<h3 class="text-lg leading-6 font-medium text-gray-900 dark:text-gray-100" id="modal-title">{{ title }}</h3>
							<div class="mt-2">
								<p class="text-sm text-gray-500 dark:text-gray-300">{{ text }}</p>
							</div>
						</div>
					</div>
				</div>
				<div class="bg-gray-50 dark:bg-gray-700 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
					<AppButton class="sm:ml-3" :title="submitButtonText" :loading="loading" :disabled="loading" @click="submitHandler" />
					<AppButton overwriteColor class="text-gray-700 hover:bg-gray-50 border-gray-300 bg-white dark:bg-gray-600 dark:border-gray-400 dark:text-gray-100 dark:hover:bg-gray-800 mt-3 sm:mt-0 sm:ml-3" title="Cancel" @click="emit('close')" />
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'Modal',
};
</script>

<script setup>
import { ref } from 'vue';

const props = defineProps({
	title: {
		type: String,
		default: 'Title',
	},
	text: {
		type: String,
		default: 'Are you sure you want to perform this action? This action cannot be undone.',
	},
	submitButtonText: {
		type: String,
		default: 'Submit',
	},
});

const emit = defineEmits(['close', 'submit']);

const loading = ref(false);
const submitHandler = () => {
	loading.value = true;
	emit('submit');
};
</script>

<style></style>
