<template>
	<Form class="mb-4" :handler="handler" @success="success" title="Create new word" submitButtonText="Create" successMessage="Word added successfully!">
		<InputField v-model="formData.word" element="input" required name="Word" :validation="rules.hebrewLettersValidation" @focus="hebrewInputFocus = true" />
		<VowelKeyboard v-show="hebrewInputFocus" @input="vowelInput" />
		<InputField v-model="formData.translation" element="input" required name="Translation" @focus="hebrewInputFocus = false" />
		<InputField v-model="formData.topic" element="autocomplete" :items="autoCompleteItems" required name="Topic" @focus="hebrewInputFocus = false" />
	</Form>
</template>

<script setup>
import { ref, reactive, onBeforeMount } from 'vue';
import { resetReactive } from '../utils';
import { createWord, getTopics } from '../api/firebase';
import VowelKeyboard from '../components/VowelKeyboard.vue';
import { rules } from '../utils/validations.js';
import _ from 'lodash';

const formData = reactive({
	word: '',
	translation: '',
	topic: '',
});
const hebrewInputFocus = ref(false);
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
	formData.word += vowel;
	const element = document.querySelector('#word');
	element.focus();
};

onBeforeMount(syncTopicList);
</script>

<style></style>
