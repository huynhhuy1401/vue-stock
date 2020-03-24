import { authAxios, API_KEY } from '../../main'
import router from '../../router'

export default {
  state: {
    userId: null,
    idToken: null
  },
  getters: {
    isAuthenticated (state) {
      return state.idToken != null
    }
  },
  mutations: {
    authUser (state, { userId, idToken }) {
      state.userId = userId
      state.idToken = idToken
    },
    clearAuthData (state) {
      state.idToken = null
      state.userId = null
    }
  },
  actions: {
    setLogoutTime ({ commit }, time) {
      setTimeout(() => {
        commit('clearAuthData')
      }, time * 1000)
    },
    signUp ({ commit, dispatch }, user) {
      authAxios.post(
        '/accounts:signUp?key=' + API_KEY,
        {
          ...user,
          returnSecureToken: true
        },
        {
          headers: {
            'Content-Type': 'application/json'
          }
        })
        .then(res => {
          console.log(res)
          const authInfo = {
            userId: res.data.localId,
            idToken: res.data.idToken
          }
          commit('authUser', authInfo)
          const now = new Date()
          const expirationDate = new Date(now.getTime() + res.data.expiresIn * 1000)
          localStorage.setItem('expirationDate', expirationDate)
          localStorage.setItem('token', res.data.idToken)
          localStorage.setItem('userId', res.data.localId)
          dispatch('setLogoutTime', res.data.expiresIn)
        })
    },
    signIn ({ commit, dispatch }, user) {
      authAxios.post(
        '/accounts:signInWithPassword?key=' + API_KEY,
        {
          ...user,
          returnSecureToken: true
        },
        {
          headers: {
            'Content-Type': 'application/json'
          }
        })
        .then(res => {
          const authInfo = {
            userId: res.data.localId,
            idToken: res.data.idToken
          }
          commit('authUser', authInfo)
          const now = new Date()
          const expirationDate = new Date(now.getTime() + res.data.expiresIn * 1000)
          localStorage.setItem('expirationDate', expirationDate)
          localStorage.setItem('token', res.data.idToken)
          localStorage.setItem('userId', res.data.localId)
          dispatch('setLogoutTime', res.data.expiresIn)
          router.push('/')
        })
    },
    logOut ({ commit }) {
      commit('clearAuthData')
      localStorage.removeItem('expirationDate')
      localStorage.removeItem('token')
      localStorage.removeItem('userId')
      router.replace('/signin')
    }
  }
}
