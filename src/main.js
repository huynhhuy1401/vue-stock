import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'

Vue.config.productionTip = false

export const API_KEY = '' // Firebase API key

export const myAxios = axios.create({
  baseURL: '' // Firebase API DB url
})

export const authAxios = axios.create({
  baseURL: 'https://identitytoolkit.googleapis.com/v1'
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
