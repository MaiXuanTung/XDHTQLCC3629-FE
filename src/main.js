import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import Default from './layout/wrapper/index.vue'
import Toaster from '@meforma/vue-toaster'
import axios from 'axios'

const app = createApp(App)

app.use(router, axios, Toaster)
app.component('default-layout', Default)

app.mount('#app')
