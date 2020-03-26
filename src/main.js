import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'

Vue.config.productionTip = false

export const myAxios = axios.create({
  baseURL: 'https://vue-http-4ac3c.firebaseio.com'
})

export const authAxios = axios.create({
  baseURL: 'https://identitytoolkit.googleapis.com/v1'
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
