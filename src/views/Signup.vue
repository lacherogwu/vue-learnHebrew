<template>
	<div class="max-w-md mx-auto">
		<div class="flex flex-col justify-center p-4 rounded shadow dark:bg-gray-700">
			<Form class="mb-4" :handler="handler" @success="success" title="Signup" submitButtonText="Signup">
				<InputField v-model="formData.username" element="input" :validation="rules.usernameMinimum" required name="Username" />
				<InputField v-model="formData.password" type="password" element="input" :validation="rules.passwordMinimum" required name="Password" />
				<InputField v-model="formData.confirmPassword" type="password" element="input" :validation="rules.passwordConfirm" required name="Confirm Password" />
			</Form>
		</div>
	</div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import { signup } from '../api/firebase';
import { rules } from '../utils/validations.js';

const router = useRouter();
const store = useStore();

const formData = ref({});

const handler = () => signup(formData.value.username, formData.value.password);

const success = async () => {
	store.commit('login', formData.value);
	router.push('/learn');
};
</script>

<style></style>
