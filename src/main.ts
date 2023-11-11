import { createApp } from 'vue'
import { createPinia } from 'pinia'

import './style.css'

import App from '@/App.vue'
import router from '@/Router'

// async js chunk
// import('./bootstrap.ts').then(mod => {
//     console.log(mod);
// })

// console.log("hit");


const pinia = createPinia()

// option API
// pinia.use((context) => {
//     context.store.router = router
// });

const app = createApp(App)

app.use(router)

app.use(pinia)

app.mount('#app')
