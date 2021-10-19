import { createRouter, createWebHistory } from 'vue-router';
import About from '../views/About.vue';
import Words from '../views/Words.vue';
import CreateWord from '../views/CreateWord.vue';
import UpdateWord from '../views/UpdateWord.vue';
import Learn from '../views/Learn.vue';

const router = createRouter({
	history: createWebHistory(),
	routes: [
		{
			path: '/about',
			name: 'About',
			component: About,
		},
		{
			path: '/words',
			name: 'Words',
			component: Words,
		},
		{
			path: '/words/create',
			name: 'Create Word',
			component: CreateWord,
		},
		{
			path: '/words/update/:id',
			name: 'Update Word',
			component: UpdateWord,
		},
		{
			path: '/learn',
			name: 'Learn',
			component: Learn,
		},
		{
			path: '/:pathMatch(.*)*',
			name: 'NotFound',
			redirect: {
				name: 'Learn',
			},
		},
	],
});

export default router;
