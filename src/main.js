import { createApp } from 'vue';
import router from './router';
import App from './App.vue';
import './index.css';
import './firebase/init.js';
import globalComponents from './globalComponents';

const app = createApp(App).use(router);

// load global components
globalComponents.forEach(component => app.component(component.name, component));

app.mount('#app');
