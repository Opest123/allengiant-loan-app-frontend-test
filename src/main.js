import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import Vue3Toastify from 'vue3-toastify'

import App from './App.vue'
import router from './router'

const pinia = createPinia()
const app = createApp(App)

app.use(Vue3Toastify, {
    autoClose: 3000,
    position: 'top-right',
    hideProgressBar: false
})

pinia.use(piniaPluginPersistedstate)
app.use(pinia)
app.use(router)

app.mount('#app')
