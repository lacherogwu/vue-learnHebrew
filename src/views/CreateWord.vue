<template>
	<Form class="mb-4" :handler="handler" @success="success" title="Create new word" submitButtonText="Create" successMessage="Word added successfully!">
		<InputField v-model="formData.hebrewTranslation" element="input" required name="Hebrew Translation" :validation="rules.hebrewLettersValidation" />
		<InputField v-model="formData.russianTranslation" element="input" required name="Russian Translation" :validation="rules.russianLettersValidation" />
	</Form>
	<VowelKeyboard @input="vowelInput" />
</template>

<script setup>
import { reactive } from 'vue';
import { resetReactive } from '../utils';
import { createWord } from '../api/firebase';
import VowelKeyboard from '../components/VowelKeyboard.vue';
import { rules } from '../utils/validations.js';

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
