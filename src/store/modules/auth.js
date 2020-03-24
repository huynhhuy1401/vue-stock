import { authAxios, API_KEY, myAxios } from '../../main'
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
    addUser ({ getters, state }, newUser) {
      myAxios.put(`/users/${state.userId}.json`, {
        email: newUser.userEmail,
        fund: getters.fund
      })
    },
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
          const authInfo = {
            userId: res.data.localId,
            idToken: res.data.idToken
          }
          const newUser = {
            userEmail: res.data.email
          }
          commit('authUser', authInfo)
          dispatch('addUser', newUser)
          const now = new Date()
          const expirationDate = new Date(now.getTime() + res.data.expiresIn * 1000)
          localStorage.setItem('expirationDate', expirationDate)
          localStorage.setItem('token', res.data.idToken)
          localStorage.setItem('userId', res.data.localId)
          dispatch('setLogoutTime', res.data.expiresIn)
          router.push('/')
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
          dispatch('fetchData')
          router.push('/')
        })
    },
    logOut ({ commit }) {
      commit('clearAuthData')
      localStorage.removeItem('expirationDate')
      localStorage.removeItem('token')
      localStorage.removeItem('userId')
      router.replace('/signin')
    },
    saveData ({ state, getters }) {
      myAxios.patch(`/users/${state.userId}.json`, {
        fund: getters.fund,
        portfolio: getters.stockPortfolio,
        stocks: getters.stocks
      })
    },
    fetchData ({ commit, getters, state }) {
      if (getters.isAuthenticated) {
        myAxios.get(`/users/${state.userId}.json`)
          .then(res => {
            commit('SET_PORTFOLIO', {
              stocks: res.data.portfolio || [],
              fund: res.data.fund
            })
            commit('SET_STOCK', res.data.stocks)
          })
      }
    }
  }
}
