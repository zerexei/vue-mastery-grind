import { createApp } from 'vue'
import { createPinia } from 'pinia'

import './style.css'

import App from '@/App.vue'
import router from '@/Router'

const pinia = createPinia()

// option API
// pinia.use((context) => {
//     context.store.router = router
// });

const app = createApp(App)

app.use(router)

app.use(pinia)

app.mount('#app')
