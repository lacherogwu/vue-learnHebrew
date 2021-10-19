<template>
	<div class="flex relative">
		<GameCard
			v-for="(card, index) in cards"
			:key="card.customId"
			:card="card"
			:is-current="index === 0"
			@cardAction="actionHandler"
			@cardAccepted="actionHandler"
			@cardRejected="emit('cardRejected')"
			@cardSkipped="emit('cardSkipped')"
			@hideCard="emit('hideCard')"
		/>
	</div>
</template>

<script setup>
import GameCard from './GameCard.vue';

const props = defineProps({
	cards: {
		type: Array,
		required: true,
	},
});

const emit = defineEmits(['cardAccepted', 'cardRejected', 'cardSkipped', 'hideCard']);

const actionHandler = (emitName, data) => emit(emitName, data);
</script>
