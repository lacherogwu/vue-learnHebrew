<template>
	<div class="max-w-md mx-auto" @wheel.prevent @touchmove.prevent @scroll.prevent>
		<div v-if="!selectedTopic" class="grid grid-cols-3 gap-4 text-center">
			<div v-for="(topic, index) in topicsList" :key="index" class="bg-gray-200 dark:bg-gray-600 p-4 rounded shadow cursor-pointer flex flex-col" @click="selectTopic(topic.name)">
				<span>#{{ topic.name }}</span>
				<span class="text-xs opacity-75">{{ topic.totalWords }} left</span>
			</div>
		</div>
		<div v-if="selectedTopic">
			<GameCardsStack :cards="visibleCards" @cardAccepted="handleCardAccepted" @cardRejected="handleCardRejected" @cardSkipped="handleCardSkipped" @hideCard="removeCardFromDeck" />
			<div :class="{ 'text-white dark:text-gray-800': visibleCards.length }" class="flex flex-col justify-center items-center text-center space-y-4 transition ease-in-out duration-1000">
				<span class="text-5xl">Congratulation!</span>
				<span>You've completed all words for today!</span>
				<span class="text-4xl py-8">Great Job!</span>
				<AppButton :class="{ invisible: visibleCards.length }" title="Return to menu" @click="reset" />
			</div>
		</div>
	</div>
</template>

<script setup>
import { ref, onBeforeMount } from 'vue';
import _ from 'lodash';
import confetti from 'canvas-confetti';
import GameCardsStack from '../components/GameCardsStack.vue';
import { getWords, unShowCard } from '../api/firebase';
import { idMaker } from '../utils';

const generateId = idMaker();
const mapCard = card => ({ ...card, customId: generateId.next().value });

const words = ref([]);
const visibleCards = ref([]);

// card handlers
const handleCardAccepted = ({ card }) => {
	visibleCards.value.push(mapCard(card));
};

const handleCardRejected = () => {};

const handleCardSkipped = async ({ card }) => {
	await unShowCard(card.id);
};

const removeCardFromDeck = () => {
	visibleCards.value.shift();

	if (!visibleCards.value.length) {
		const duration = 3 * 1000;
		const end = Date.now() + duration;

		(function frame() {
			// launch a few confetti from the left edge
			confetti({
				particleCount: 7,
				angle: 60,
				spread: 55,
				origin: { x: 0 },
			});
			// and launch a few from the right edge
			confetti({
				particleCount: 7,
				angle: 120,
				spread: 55,
				origin: { x: 1 },
			});

			// keep going until we are out of time
			if (Date.now() < end) {
				requestAnimationFrame(frame);
			}
		})();
	}
};

const topicsList = ref([]);
const selectedTopic = ref(null);

const syncTopics = () => {
	const topics = _(words.value)
		.uniqBy('topic')
		.map(item => {
			const totalWords = _.filter(words.value, i => i.topic === item.topic).length;
			return { name: item.topic, totalWords };
		})
		.value();

	const all = { name: 'all', totalWords: words.value.length };
	topicsList.value = [all, ...topics];
};

const selectTopic = topic => {
	visibleCards.value = _.filter(words.value, card => (topic === 'all' ? true : card.topic === topic));
	selectedTopic.value = topic;
};

const syncWords = async () => {
	const wordsList = await getWords({ where: [{ field: 'show', operator: '==', value: true }] });
	words.value = _.map(wordsList, mapCard);
};

const reset = async () => {
	await syncWords();
	syncTopics();
	selectedTopic.value = null;
};

onBeforeMount(async () => {
	await syncWords();
	syncTopics();
});
</script>

<style></style>
