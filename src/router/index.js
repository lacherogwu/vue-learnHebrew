import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import About from '../views/About.vue';
import Words from '../views/Words.vue';
import CreateWord from '../views/CreateWord.vue';

const router = createRouter({
	history: createWebHistory(),
	routes: [
		{
			path: '/',
			name: 'Home',
			component: Home,
		},
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
	],
});

export default router;