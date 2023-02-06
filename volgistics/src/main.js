import { createApp } from 'vue'
import { createPinia } from 'pinia'
import VCalendar from 'v-calendar';


import App from './App.vue'
import router from './router'

import './assets/main.css'

const app = createApp(App)

app.use(VCalendar, {})
app.use(createPinia())
app.use(router)

app.mount('#app')
