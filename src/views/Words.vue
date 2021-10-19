<template>
	<div class="max-w-xl mx-auto">
		<div class="flex justify-end pb-4">
			<router-link to="/words/create">
				<AppButton title="Create new word" />
			</router-link>
		</div>
		<Table :headers="headers" :items="items" @action="tableActionHandler" />
		<Modal v-if="showModal" title="Remove Word" text="Are you sure you want to remove this word? This action cannot be undone." submitButtonText="Remove" @submit="removeHandler" @close="showModal = false" />
	</div>
</template>

<script setup>
import { ref, onBeforeMount } from 'vue';
import { getWords, removeWord } from '../api/firebase';
import { useStore } from 'vuex';

const store = useStore();

const headers = ['Word', 'Show', 'Topic'];
const items = ref([]);
const showModal = ref(false);
const modalData = ref({});

const syncWords = async () => {
	items.value = await getWords();
};

onBeforeMount(syncWords);

const removeHandler = async () => {
	await removeWord({ id: modalData.value.id });
	await syncWords();

	showModal.value = false;

	store.commit('toggleToast', { message: 'Word removed successfully!' });
};

const tableActionHandler = (action, data) => {
	switch (action) {
		case 'remove': {
			showModal.value = true;
			modalData.value = data;
			break;
		}
	}
};
</script>
<style></style>
