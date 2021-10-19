<template>
	<Form v-if="!fetching" class="mb-4" :handler="handler" @success="success" title="Update word" successMessage="Word updated successfully!" submitButtonText="Update">
		<InputField v-model="formData.hebrewTranslation" element="input" required name="Hebrew Translation" :validation="rules.hebrewLettersValidation" />
		<InputField v-model="formData.russianTranslation" element="input" required name="Russian Translation" :validation="rules.russianLettersValidation" />
		<InputField v-model="formData.topic" element="autocomplete" required name="Topic" :items="autoCompleteItems" />
		<div
			:class="`px-4 py-2 inline-flex leading-5 font-semibold rounded justify-center cursor-pointer select-none border border-gray-100 dark:border-gray-700 shadow-sm ${
				formData.show ? 'bg-green-100 text-green-800 dark:bg-green-600 dark:text-green-100' : 'bg-red-100 text-red-800 dark:bg-red-dark dark:text-red-100'
			}`"
			@click="formData.show = !formData.show"
		>
			{{ formData.show ? 'Show' : "Don't show" }}
		</div>
	</Form>
	<div v-else>
		<div class="px-6 py-4 text-center w-full">
			<FontAwesomeIcon icon="spinner" spin size="lg" />
		</div>
	</div>
	<VowelKeyboard @input="vowelInput" />
</template>

<script setup>
import { reactive, ref, onBeforeMount } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import { resetReactive } from '../utils';
import { getWord, updateWord, getTopics } from '../api/firebase';
import VowelKeyboard from '../components/VowelKeyboard.vue';
import { rules } from '../utils/validations.js';

const route = useRoute();
const router = useRouter();

const wordId = route.params.id;

const formData = reactive({
	hebrewTranslation: '',
	russianTranslation: '',
	topic: '',
	show: false,
});

const autoCompleteItems = ref([]);

const syncTopicList = async () => {
	autoCompleteItems.value = await getTopics();
};

const fetching = ref(true);

const syncWord = async () => {
	const word = await getWord(wordId);

	formData.hebrewTranslation = word.hebrewTranslation;
	formData.russianTranslation = word.russianTranslation;
	formData.topic = word.topic;
	formData.show = word.show;

	fetching.value = false;
};

onBeforeMount(() => {
	syncWord();
	syncTopicList();
});

const handler = () => updateWord(wordId, formData);

const success = data => {
	router.push('/words');
	resetReactive(formData);
};

const vowelInput = vowel => {
	formData.hebrewTranslation += vowel;
	const element = document.querySelector('#hebrewTranslation');
	element.focus();
};
</script>

<style></style>
