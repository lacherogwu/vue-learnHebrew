<template>
	<Form v-if="!fetching" class="mb-4" :handler="handler" @success="success" title="Update word" successMessage="Word updated successfully!" submitButtonText="Update">
		<InputField v-model="formData.hebrewTranslation" element="input" required name="Hebrew Translation" :validation="rules.hebrewLettersValidation" @focus="hebrewInputFocus = true" />
		<VowelKeyboard v-show="hebrewInputFocus" @input="vowelInput" />
		<InputField v-model="formData.russianTranslation" element="input" required name="Russian Translation" :validation="rules.russianLettersValidation" @focus="hebrewInputFocus = false" />
		<InputField v-model="formData.topic" element="autocomplete" required name="Topic" :items="autoCompleteItems" @focus="hebrewInputFocus = false" />
		<div
			:class="`px-4 py-2 inline-flex leading-5 font-semibold rounded justify-center cursor-pointer select-none border border-gray-100 dark:border-gray-700 shadow-sm ${
				formData.show ? 'bg-green-100 text-green-800 dark:bg-green-600 dark:text-green-100' : 'bg-red-100 text-red-800 dark:bg-red-dark dark:text-red-100'
			}`"
			@click="
				formData.show = !formData.show;
				hebrewInputFocus = false;
			"
		>
			{{ formData.show ? 'Show' : "Don't show" }}
		</div>

		<template #bottom>
			<AppButton overwriteColor class="bg-red-400 hover:bg-red-500 dark:bg-red-700 dark:hover:bg-red-800" title="Remove" @click="showModal = true" />
		</template>
	</Form>
	<div v-else>
		<div class="px-6 py-4 text-center w-full">
			<FontAwesomeIcon icon="spinner" spin size="lg" />
		</div>
	</div>
	<Modal v-if="showModal" title="Remove Word" text="Are you sure you want to remove this word? This action cannot be undone." submitButtonText="Remove" @submit="removeHandler" @close="showModal = false" />
</template>

<script setup>
import { reactive, ref, onBeforeMount } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useStore } from 'vuex';
import { resetReactive } from '../utils';
import { getWord, updateWord, getTopics, removeWord } from '../api/firebase';
import VowelKeyboard from '../components/VowelKeyboard.vue';
import { rules } from '../utils/validations.js';

const route = useRoute();
const router = useRouter();
const store = useStore();

const wordId = route.params.id;

const formData = reactive({
	hebrewTranslation: '',
	russianTranslation: '',
	topic: '',
	show: false,
});
const showModal = ref(false);
const modalData = ref({});
const hebrewInputFocus = ref(false);
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

const removeHandler = async () => {
	await removeWord({ id: wordId });
	router.push('/words');
	showModal.value = false;

	store.commit('toggleToast', { message: 'Word removed successfully!' });
};
</script>

<style></style>
