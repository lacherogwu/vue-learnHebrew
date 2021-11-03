<template>
	<div class="flex flex-col">
		<div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
			<div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
				<div class="shadow overflow-scroll max-h-80v border-b border-gray-200 dark:border-gray-600 sm:rounded-lg">
					<table class="min-w-full divide-y divide-gray-200 dark:divide-gray-600">
						<thead class="bg-gray-50 dark:bg-gray-600">
							<tr>
								<th v-for="(item, index) in headers" :key="index" scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">{{ item }}</th>
								<!-- <th scope="col" class="relative px-6 py-3">
									<span class="sr-only">Edit</span>
								</th> -->
							</tr>
						</thead>
						<tbody class="bg-white divide-y divide-gray-200 dark:bg-gray-700 dark:divide-gray-600">
							<tr v-for="item in items" :key="items.id" class="cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600" @click="$router.push(`/words/update/${item.id}`)">
								<td class="px-6 md:py-4 whitespace-nowrap">
									<div class="text-sm text-gray-900 dark:text-gray-100">{{ item.word }}</div>
									<div class="text-sm text-gray-500 dark:text-gray-400">{{ item.translation }}</div>
								</td>
								<td class="px-6 py-4 whitespace-nowrap">
									<span :class="`px-4 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${item.show ? 'bg-green-100 text-green-800 dark:bg-green-600 dark:text-green-100' : 'bg-red-100 text-red-800 dark:bg-red-dark dark:text-red-100'}`">{{
										item.show ? 'Yes' : 'No'
									}}</span>
								</td>
								<td class="px-6 md:py-4 whitespace-nowrap">
									<div class="text-sm text-gray-900 dark:text-gray-100">#{{ item.topic }}</div>
								</td>
								<!-- <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-1">
									<router-link :to="`/words/update/${item.id}`">
										<FontAwesomeIcon icon="edit" class="text-indigo-600 hover:text-indigo-800 dark:text-indigo-500" size="sm" />
									</router-link>
									<FontAwesomeIcon icon="trash" class="text-red-500 hover:text-red-600 cursor-pointer" size="sm" @click="emit('action', 'remove', { id: item.id })" />
								</td> -->
							</tr>
						</tbody>
					</table>
					<div v-show="!items.length" class="px-6 py-4 text-center w-full">
						<FontAwesomeIcon icon="spinner" spin size="lg" />
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'Table',
};
</script>

<script setup>
// import { ref } from 'vue';

const props = defineProps({
	headers: {
		type: Array,
		default: () => [],
	},
	items: {
		type: Array,
		default: () => [],
	},
});

const emit = defineEmits(['action']);

// const timeout = ref();

// const clear = () => {
// 	clearTimeout(timeout.value);
// };
// const removeItem = item => {
// 	timeout.value = setTimeout(() => {
// 		emit('action', 'remove', { id: item.id });
// 	}, 500);
// };
</script>

<style></style>
