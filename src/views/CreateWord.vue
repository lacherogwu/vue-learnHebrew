<template>
	<Form class="mb-2" :handler="handler" @success="success" title="Create new word" successMessage="Word added successfully!" submitButtonText="Create">
		<InputField v-model="formData.hebrewTranslation" element="input" required name="Hebrew Translation" />
		<InputField v-model="formData.russianTranslation" element="input" required name="Russian Translation" />
	</Form>

	<VowelKeyboard @input="vowelInput" />
</template>

<script setup>
import { reactive } from 'vue';
import { resetReactive } from '../utils';
import { createWord } from '../api/firebase';
import VowelKeyboard from '../components/VowelKeyboard.vue';

const formData = reactive({
	hebrewTranslation: '',
	russianTranslation: '',
});

const handler = () => createWord(formData);

const success = data => {
	resetReactive(formData);
};

const vowelInput = vowel => {
	formData.hebrewTranslation += vowel;
	const element = document.querySelector('#hebrewTranslation');
	element.focus();
};
</script>

<style></style>
