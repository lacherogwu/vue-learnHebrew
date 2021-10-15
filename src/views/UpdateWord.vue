<template>
	<Form v-if="!fetching" class="mb-4" :handler="handler" @success="success" title="Update word" successMessage="Word updated successfully!" submitButtonText="Update">
		<InputField v-model="formData.hebrewTranslation" element="input" required name="Hebrew Translation" :validation="rules.hebrewLettersValidation" />
		<InputField v-model="formData.russianTranslation" element="input" required name="Russian Translation" :validation="rules.russianLettersValidation" />
		<div
			class="px-4 py-2 inline-flex leading-5 font-semibold rounded justify-center cursor-pointer select-none border border-gray-100 shadow-sm"
			:class="{ 'bg-green-100': formData.show, 'text-green-800': formData.show, 'bg-red-100': !formData.show, 'text-red-800': !formData.show }"
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
import { getWord, updateWord } from '../api/firebase';
import VowelKeyboard from '../components/VowelKeyboard.vue';
import { rules } from '../utils/validations.js';

const route = useRoute();
const router = useRouter();

const wordId = route.params.id;

const formData = reactive({
	hebrewTranslation: '',
	russianTranslation: '',
	show: false,
});

const fetching = ref(true);

const syncWord = async () => {
	const word = await getWord(wordId);

	formData.hebrewTranslation = word.hebrewTranslation;
	formData.russianTranslation = word.russianTranslation;
	formData.show = word.show;

	fetching.value = false;
};

onBeforeMount(syncWord);

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
