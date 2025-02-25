import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import Default from './layout/wrapper/index.vue'
import Client from './layout/wrapper/client.vue'
import axios from 'axios'
import Toaster from '@meforma/vue-toaster'

const app = createApp(App)

app.use(router, axios, Toaster)
app.component('client-layout', Client)
app.component('default-layout', Default)

app.mount('#app')
