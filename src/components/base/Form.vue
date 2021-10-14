<template>
	<div class="flex flex-col justify-center max-w-md mx-auto">
		<div v-if="title">
			<div class="text-xl font-medium">{{ title }}</div>
			<div class="border mt-2 mb-4"></div>
		</div>
		<form class="space-y-4 flex justify-center flex-col" @submit.prevent="submit">
			<slot />
			<AppButton submit :title="submitButtonText" :loading="loading" />
			<div class="text-center" :class="{ 'text-red-500': isError, 'text-green-500': !isError }">{{ feedback }}</div>
		</form>
	</div>
</template>

<script>
export default {
	name: 'Form',
};
</script>

<script setup>
import { ref } from 'vue';

const emit = defineEmits(['success']);
const props = defineProps({
	handler: {
		type: Function,
		default: () => {},
	},
	title: {
		type: String,
		default: '',
	},
	successMessage: {
		type: String,
		default: '',
	},
	submitButtonText: {
		type: String,
		default: 'Submit',
	},
});

const loading = ref(false);
const feedback = ref();
const isError = ref(false);
const isValid = ref(false);

const submit = async () => {
	// check if input doesn't have error
	if (!isValid.value) return;

	loading.value = true;
	feedback.value = null;
	isError.value = false;

	try {
		const response = await props.handler();
		emit('success', response);
		feedback.value = props.successMessage;
	} catch (err) {
		console.log(err);
		isError.value = true;
		feedback.value = err?.response?.data?.message || 'Something went wrong!';
	}

	loading.value = false;
};
</script>

<style></style>
