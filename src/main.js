import { createApp } from 'vue';
import router from './router';
import store from './store';
import App from './App.vue';
import './index.css';
import './firebase/init.js';
import globalComponents from './globalComponents';
import Vue3TouchEvents from 'vue3-touch-events';

const app = createApp(App).use(router).use(store).use(Vue3TouchEvents);

// load global components
globalComponents.forEach(component => app.component(component.name, component));

app.mount('#app');
