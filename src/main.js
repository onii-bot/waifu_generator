import { createApp } from 'vue'
import App from './App.vue'
import './assets/global.css'
import { inject } from '@vercel/analytics';

createApp(App).mount('#app')

inject();
