<template>
	<div class="flex flex-col justify-center max-w-md mx-auto">
		<div v-if="title">
			<div class="text-xl font-medium">{{ title }}</div>
			<div class="border mt-2 mb-4"></div>
		</div>
		<form class="space-y-4 flex flex-col justify-center" @submit.prevent="submit">
			<slot />
			<AppButton type="submit" :title="submitButtonText" :loading="loading" :disabled="!meta.valid" />
		</form>
		<!-- <div class="text-center py-2" :class="{ 'text-red-500': isError, 'text-green-500': !isError }">{{ feedback }}</div> -->
	</div>
</template>

<script>
export default {
	name: 'Form',
};
</script>

<script setup>
import { ref } from 'vue';
import { useForm } from 'vee-validate';
import { useStore } from 'vuex';

const store = useStore();

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

const { meta } = useForm();

const loading = ref(false);
// const feedback = ref();
// const isError = ref(false);

const submit = async () => {
	if (!meta.value.valid) return;

	loading.value = true;
	// feedback.value = null;
	// isError.value = false;

	try {
		const response = await props.handler();
		emit('success', response);
		store.commit('toggleToast', { message: props.successMessage });

		// feedback.value = props.successMessage;
		meta.value.valid = false;
	} catch (err) {
		console.log(err);
		store.commit('toggleToast', { message: 'Something went wrong!', error: true });

		// isError.value = true;
		// feedback.value = err?.response?.data?.message || 'Something went wrong!';
	}

	loading.value = false;
};
</script>

<style></style>
