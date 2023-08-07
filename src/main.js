import './assets/main.css'

import { createApp } from 'vue'
import Vue3Toasity from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import App from './App.vue'
import store from "@/store";

const app = createApp(App).use(
    Vue3Toasity,
    {
        autoClose: 3000,
    }
);

app.provide('store', store);
app.mount('#app')
