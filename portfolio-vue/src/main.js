import { createApp } from 'vue';
import App from './App.vue';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import store from './store.js';

createApp(App).use(store).mount('#app');
