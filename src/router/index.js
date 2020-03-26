import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Portfolio from '../views/Portfolio.vue'
import Stocks from '../views/Stocks.vue'
import SignIn from '../views/SignIn.vue'
import SignUp from '../views/SignUp.vue'
import NotFound from '../views/NotFound.vue'
import store from '../store/index'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/portfolio',
    name: 'Portfolio',
    component: Portfolio,
    meta: { requiresAuth: true }
  },
  {
    path: '/stocks',
    name: 'Stocks',
    component: Stocks,
    meta: { requiresAuth: true }
  },
  {
    path: '/signin',
    name: 'SignIn',
    component: SignIn
  },
  {
    path: '/signup',
    name: 'SignUp',
    component: SignUp
  },
  {
    path: '/notfound',
    component: NotFound
  },
  {
    path: '*',
    redirect: '/notfound'
  }
]

const router = new VueRouter({
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!store.getters.isAuthenticated) {
      next({
        path: '/signin'
      })
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router
