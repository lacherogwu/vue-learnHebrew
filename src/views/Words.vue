<template>
	<div class="max-w-xl mx-auto">
		<div class="flex justify-end pb-4">
			<router-link to="/words/create">
				<AppButton title="Create new word" />
			</router-link>
		</div>
		<Table :headers="headers" :items="items" @action="tableActionHandler" />
	</div>
</template>

<script setup>
import { ref, onBeforeMount } from 'vue';
import { getWords } from '../api/firebase';

const headers = ['Word', 'Show', 'Topic'];
const items = ref([]);

const syncWords = async () => {
	items.value = await getWords();
};

onBeforeMount(syncWords);

const tableActionHandler = (action, data) => {
	switch (action) {
	}
};
</script>
<style></style>
