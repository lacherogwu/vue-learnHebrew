<template>
	<div class="flex flex-col">
		<div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
			<div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
				<div class="shadow overflow-scroll max-h-80v border-b border-gray-200 sm:rounded-lg">
					<table class="min-w-full divide-y divide-gray-200">
						<thead class="bg-gray-50">
							<tr>
								<th v-for="(item, index) in headers" :key="index" scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{{ item }}</th>
								<th scope="col" class="relative px-6 py-3">
									<span class="sr-only">Edit</span>
								</th>
							</tr>
						</thead>
						<tbody class="bg-white divide-y divide-gray-200">
							<tr v-if="items.length" v-for="item in items" :key="items.id">
								<td class="px-6 md:py-4 whitespace-nowrap">
									<div class="text-sm text-gray-900">{{ item.hebrewTranslation }}</div>
									<div class="text-sm text-gray-500">{{ item.russianTranslation }}</div>
								</td>
								<td class="px-6 py-4 whitespace-nowrap">
									<span class="px-4 py-1 inline-flex text-xs leading-5 font-semibold rounded-full" :class="{ 'bg-green-100': item.show, 'text-green-800': item.show, 'bg-red-100': !item.show, 'text-red-800': !item.show }">{{ item.show ? 'Yes' : 'No' }}</span>
								</td>
								<td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-1">
									<router-link :to="`/words/update/${item.id}`">
										<FontAwesomeIcon icon="edit" class="text-indigo-600 hover:text-indigo-800" size="sm" />
									</router-link>
									<FontAwesomeIcon icon="trash" class="text-red-500 hover:text-red-600 cursor-pointer" size="sm" @click="emit('action', 'remove', { id: item.id })" />
								</td>
							</tr>
							<div v-else class="px-6 py-2">Loading...</div>
						</tbody>
					</table>
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
</script>

<style></style>
