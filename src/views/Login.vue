<template>
	<div class="max-w-md mx-auto">
		<div class="flex flex-col justify-center p-4 rounded shadow dark:bg-gray-700">
			<Form class="mb-4" :handler="handler" @success="success" title="Login" submitButtonText="Login">
				<InputField v-model="formData.username" element="input" required name="Username" />
				<InputField v-model="formData.password" type="password" element="input" required name="Password" />
			</Form>
		</div>
	</div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import { login } from '../api/firebase';

const router = useRouter();
const store = useStore();

const formData = ref({});

const handler = () => login(formData.value.username, formData.value.password);

const success = async () => {
	store.commit('login', formData.value);
	router.push('/learn');
};
</script>

<style></style>
