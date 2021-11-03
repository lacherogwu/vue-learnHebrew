<template>
	<div
		v-if="isShowing"
		ref="interactElement"
		:class="{
			isAnimating: isInteractAnimating,
			isCurrent: isCurrent,
		}"
		class="card cursor-pointer flex-col"
		:style="{ transform: transformString }"
		@click="showTranslation = !showTranslation"
	>
		<div class="text-sm text-gray-200">#{{ card.topic }}</div>
		<h3 class="mb-2 text-5xl">{{ card.word }}</h3>
		<div :class="{ invisible: !showTranslation }">{{ card.translation }}</div>
	</div>
</template>

<script setup>
import { ref, reactive, computed, onMounted, onBeforeUnmount } from 'vue';
import interact from 'interact.js';
const ACCEPT_CARD = 'cardAccepted';
const REJECT_CARD = 'cardRejected';
const SKIP_CARD = 'cardSkipped';

const staticValues = {
	interactMaxRotation: 15,
	interactOutOfSightXCoordinate: 500,
	interactOutOfSightYCoordinate: 600,
	interactYThreshold: 150,
	interactXThreshold: 100,
};

const props = defineProps({
	card: {
		type: Object,
		required: true,
	},
	isCurrent: {
		type: Boolean,
		required: true,
	},
});

const emit = defineEmits(['hideCard', 'cardAction']);

// state
const showTranslation = ref(false);
const isShowing = ref(true);
const isInteractAnimating = ref(true);
const isInteractDragged = ref(null);
const interactPosition = reactive({
	x: 0,
	y: 0,
	rotation: 0,
});

const transformString = computed(() => {
	if (!isInteractAnimating.value || isInteractDragged.value) {
		const { x, y, rotation } = interactPosition;
		return `translate3D(${x}px, ${y}px, 0) rotate(${rotation}deg)`;
	}

	return null;
});

// methods
const hideCard = () => {
	setTimeout(() => {
		isShowing.value = false;
		emit('hideCard', props.card);
	}, 300);
};

const playCard = interaction => {
	const { interactOutOfSightXCoordinate, interactOutOfSightYCoordinate, interactMaxRotation } = staticValues;

	interactUnsetElement();

	let emitName = '';
	switch (interaction) {
		case ACCEPT_CARD:
			interactSetPosition({
				x: interactOutOfSightXCoordinate,
				rotation: interactMaxRotation,
			});
			emitName = ACCEPT_CARD;
			// emit(ACCEPT_CARD, props.card);
			break;
		case REJECT_CARD:
			interactSetPosition({
				x: -interactOutOfSightXCoordinate,
				rotation: -interactMaxRotation,
			});
			emitName = REJECT_CARD;
			// emit(REJECT_CARD);
			break;
		case SKIP_CARD:
			interactSetPosition({
				y: interactOutOfSightYCoordinate,
			});
			emitName = SKIP_CARD;
			// emit(SKIP_CARD);
			break;
	}

	emit('cardAction', emitName, { card: props.card });
	hideCard();
};

const interactSetPosition = coordinates => {
	const { x = 0, y = 0, rotation = 0 } = coordinates;
	interactPosition.x = x;
	interactPosition.y = y;
	interactPosition.rotation = rotation;
};

const interactUnsetElement = () => {
	interact(interactElement.value).unset();
	isInteractDragged.value = true;
};

const resetCardPosition = () => {
	interactSetPosition({ x: 0, y: 0, rotation: 0 });
};

const interactElement = ref(null);
onMounted(() => {
	interact(interactElement.value).draggable({
		onstart: () => {
			isInteractAnimating.value = false;
		},

		onmove: event => {
			const { interactMaxRotation, interactXThreshold } = staticValues;
			const x = interactPosition.x + event.dx;
			const y = interactPosition.y + event.dy;

			let rotation = interactMaxRotation * (x / interactXThreshold);

			if (rotation > interactMaxRotation) rotation = interactMaxRotation;
			else if (rotation < -interactMaxRotation) rotation = -interactMaxRotation;

			interactSetPosition({ x, y, rotation });
		},

		onend: () => {
			const { x, y } = interactPosition;
			const { interactXThreshold, interactYThreshold } = staticValues;
			isInteractAnimating.value = true;

			if (x > interactXThreshold) playCard(ACCEPT_CARD);
			else if (x < -interactXThreshold) playCard(REJECT_CARD);
			else if (y > interactYThreshold) playCard(SKIP_CARD);
			else resetCardPosition();
		},
	});
});

onBeforeUnmount(() => {
	interact(interactElement.value).unset();
});
</script>

<style lang="scss" scoped>
@import '../styles/index.scss';

$cardsTotal: 3;
$cardsWidth: 300px;
$cardsPositionOffset: 55vh * 0.06;
$cardsScaleOffset: 0.08;
$defaultTranslation: $cardsPositionOffset * $cardsTotal;
$defaultScale: 1 - ($cardsScaleOffset * $cardsTotal);
$fs-card-title: 1.125em;

.card {
	@include card();
	@include absolute(0);
	@include sizing(100% 80vw);
	@include flex-center();

	@include after() {
		@include sizing(21px 3px);
		@include absolute(right 0 bottom 11px left 0);

		margin: auto;
		border-radius: 100px;
		background: rgba($c-black, 0.3);
	}

	display: flex;
	max-height: 350px;
	margin: auto;
	font-size: $fs-h2;
	font-weight: $fw-bold;
	color: $c-white;
	background-image: linear-gradient(-180deg, $primary-gradient-start 2%, $primary-gradient-end 100%);
	opacity: 0;
	transform: translateY($defaultTranslation) scale($defaultScale);
	transform-origin: 50%, 100%;
	box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
	user-select: none;
	pointer-events: none;
	will-change: transform, opacity;

	height: 100vw;

	&.isCurrent {
		pointer-events: auto;
	}

	&.isAnimating {
		transition: transform 0.7s $ease-out-back;
	}
}

@for $i from 1 through $cardsTotal {
	$index: $i - 1;
	$translation: $cardsPositionOffset * $index;
	$scale: 1 - ($cardsScaleOffset * $index);

	.card:nth-child(#{$i}) {
		z-index: $cardsTotal - $index;
		opacity: 1;
		transform: translateY($translation) scale($scale);

		@if $i == 3 {
			color: $c-red-25;
			background-color: $c-red-25;
		} @else if $i == 2 {
			color: $c-red-50;
			background-color: $c-red-50;
		}

		@if $i != 1 {
			background-image: none;

			@include after() {
				@include sizing(0 0);
			}
		}
	}
}
</style>
