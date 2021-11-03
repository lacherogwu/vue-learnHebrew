import { createApp } from 'vue';
import router from './router';
import store from './store';
import App from './App.vue';
import './index.css';
import './firebase/init.js';
import globalComponents from './globalComponents';
import { login } from './api/firebase';

const app = createApp(App).use(store);

// load global components
globalComponents.forEach(component => app.component(component.name, component));

const authenticate = async () => {
	try {
		const credentials = localStorage.getItem('credentials');
		if (!credentials) return;

		const { username, password } = JSON.parse(credentials);
		await login(username, password);
		store.state.loggedInUser = username;
	} catch (err) {
		store.commit('logout');
	}
};
await authenticate();

app.use(router).mount('#app');
