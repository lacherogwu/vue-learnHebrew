<template>
	<Form class="mb-4" :handler="handler" @success="success" title="Create new word" submitButtonText="Create" successMessage="Word added successfully!">
		<InputField v-model="formData.hebrewTranslation" element="input" required name="Hebrew Translation" :validation="rules.hebrewLettersValidation" />
		<InputField v-model="formData.russianTranslation" element="input" required name="Russian Translation" :validation="rules.russianLettersValidation" />
		<InputField v-model="formData.topic" element="autocomplete" :items="autoCompleteItems" required name="Topic" />
	</Form>
	<VowelKeyboard @input="vowelInput" />
</template>

<script setup>
import { ref, reactive, onBeforeMount } from 'vue';
import { resetReactive } from '../utils';
import { createWord, getTopics } from '../api/firebase';
import VowelKeyboard from '../components/VowelKeyboard.vue';
import { rules } from '../utils/validations.js';
import _ from 'lodash';

const formData = reactive({
	hebrewTranslation: '',
	russianTranslation: '',
	topic: '',
});

const autoCompleteItems = ref([]);

const syncTopicList = async () => {
	autoCompleteItems.value = await getTopics();
};

const handler = () => createWord(formData);

const success = async data => {
	resetReactive(formData);
	await syncTopicList();
};

const vowelInput = vowel => {
	formData.hebrewTranslation += vowel;
	const element = document.querySelector('#hebrewTranslation');
	element.focus();
};

onBeforeMount(syncTopicList);
</script>

<style></style>
