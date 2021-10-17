<template>
	<div class="max-w-md mx-auto" @wheel.prevent @touchmove.prevent @scroll.prevent>
		<GameCardsStack :cards="visibleCards" @cardAccepted="handleCardAccepted" @cardRejected="handleCardRejected" @cardSkipped="handleCardSkipped" @hideCard="removeCardFromDeck" />

		<!-- <AppButton class="mb-4" title="Repeat" @click="repeat" :disabled="words.length" />
		<Card v-if="randomWord.id" :hebrewTranslation="randomWord.hebrewTranslation" :russianTranslation="randomWord.russianTranslation" v-touch:swipe="swipeHandler" />
		{{ randomWord }} -->
	</div>
</template>

<script setup>
import GameCardsStack from '../components/GameCardsStack.vue';
import { ref, onBeforeMount } from 'vue';
import Card from '../components/Card.vue';
import { getWords } from '../api/firebase';
import { useStore } from 'vuex';
import _ from 'lodash';
import AppButton from '../components/base/AppButton.vue';

// TODO: add blocks to choose words from which topic to learn
// TODO: swipe left, word = word.show = false
// TODO: swipe right, word goes to the bottom stack
// TODO: when all the words are swiped left = play sound + show picture

const visibleCards = ref(['Test', 'Vue.js', 'Webpack']);

const handleCardAccepted = () => {
	console.log('handleCardAccepted');
};

const handleCardRejected = () => {
	console.log('handleCardRejected');

	let src = 'https://freesound.org/data/previews/406/406371_7873941-lq.mp3';
	let audio = new Audio(src);
	audio.play();
};
const handleCardSkipped = () => {
	console.log('handleCardSkipped');
};
const removeCardFromDeck = () => {
	visibleCards.value.shift();
};

const store = useStore();

const words = ref([]);
const randomWord = ref({});

const syncWords = async () => {
	words.value = await getWords({ where: [{ field: 'show', operator: '==', value: true }] });
};

onBeforeMount(async () => {
	await syncWords();
	selectRandomWord();
});

const selectRandomWord = () => {
	if (!words.value.length) return store.commit('toggleToast', { message: 'There are no more words available' });

	const wordsList = _.filter(words.value, word => word.id !== randomWord.value.id);
	console.log({ wordsList });
	const randomIndex = _.random(0, wordsList.length - 1);
	console.log({ randomIndex });
	randomWord.value = wordsList[randomIndex];
	words.value.splice(randomIndex, 1);
};

const repeat = async () => {
	if (words.value.length) return;
	await syncWords();
	selectRandomWord();
};
const swipeRightHandler = async () => {
	console.log('swipeRight');
	alert('right');
};
const swipeLeftHandler = () => {
	console.log('swipeLeft');
	alert('left');
};

const swipeHandler = direction => {
	console.log(`Swipe: ${direction}`);
	switch (direction) {
		case 'right':
			swipeRightHandler();
			break;
		case 'left':
			swipeLeftHandler();
			break;
	}
};
</script>

<style></style>
