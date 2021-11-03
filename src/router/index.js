import { createRouter, createWebHistory } from 'vue-router';
import store from '../store';
import Words from '../views/Words.vue';
import CreateWord from '../views/CreateWord.vue';
import UpdateWord from '../views/UpdateWord.vue';
import Learn from '../views/Learn.vue';
import Login from '../views/Login.vue';
import Signup from '../views/Signup.vue';

const router = createRouter({
	history: createWebHistory(),
	routes: [
		{
			path: '/login',
			name: 'Login',
			component: Login,
		},
		{
			path: '/signup',
			name: 'Signup',
			component: Signup,
		},
		{
			path: '/words',
			name: 'Words',
			component: Words,
			meta: { requiresAuth: true },
		},
		{
			path: '/words/create',
			name: 'Create Word',
			component: CreateWord,
			meta: { requiresAuth: true },
		},
		{
			path: '/words/update/:id',
			name: 'Update Word',
			component: UpdateWord,
			meta: { requiresAuth: true },
		},
		{
			path: '/learn',
			name: 'Learn',
			component: Learn,
			meta: { requiresAuth: true },
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

router.beforeEach((to, from, next) => {
	if (to.matched.some(record => !record.meta.requiresAuth)) return next();
	if (!store.state.loggedInUser) return next({ path: '/login' });

	next();
});
export default router;
