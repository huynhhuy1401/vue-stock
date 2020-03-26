import stocks from '../../data/stocks'
import { authAxios, myAxios } from '../../main'
import router from '../../router'

export default {
  state: {
    userId: null,
    idToken: null,
    isLoginFailed: false,
    isRegisterFailed: false
  },
  getters: {
    isAuthenticated (state) {
      return state.idToken != null
    },
    isLoginFailed (state) {
      return state.isLoginFailed
    },
    isRegisterFailed (state) {
      return state.isRegisterFailed
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
    },
    resetLoginState (state) {
      state.isLoginFailed = false
    },
    resetRegisterState (state) {
      state.isRegisterFailed = false
    }
  },
  actions: {
    addUser ({ getters, state, dispatch }, newUser) {
      myAxios.put(`/users/${state.userId}.json?auth=${state.idToken}`, {
        email: newUser.userEmail,
        fund: 10000,
        stocks: stocks
      }).then(() => {
        dispatch('fetchData')
      }).then(() => {
        router.push('/')
      })
    },
    saveUserPortfolioData ({ state, getters }) {
      myAxios.patch(`/users/${state.userId}.json?auth=${state.idToken}`, {
        fund: getters.fund,
        portforlio: getters.stockPortfolio
      })
    },
    saveUserStocksData ({ state, getters }) {
      myAxios.patch(`/users/${state.userId}.json?auth=${state.idToken}`, {
        stocks: getters.stocks
      })
    },
    fetchData ({ commit, getters, state }) {
      if (getters.isAuthenticated) {
        myAxios.get(`/users/${state.userId}.json?auth=${state.idToken}`)
          .then(res => {
            commit('SET_PORTFOLIO', {
              stocks: res.data.portfolio || [],
              fund: res.data.fund
            })
            commit('SET_STOCK', res.data.stocks)
          })
      }
    },
    setLocalAuthData (context, { expirationDate, userId, idToken }) {
      localStorage.setItem('expirationDate', expirationDate)
      localStorage.setItem('token', idToken)
      localStorage.setItem('userId', userId)
    },
    setLogoutTime ({ commit }, time) {
      setTimeout(() => {
        commit('clearAuthData')
      }, time * 1000)
    },
    signUp ({ commit, dispatch, state }, user) {
      authAxios.post(
        '/accounts:signUp?key=' + process.env.VUE_APP_API_KEY,
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
          const now = new Date()
          const expirationDate = new Date(now.getTime() + res.data.expiresIn * 1000)
          dispatch('setLocalAuthData', { expirationDate, userId: res.data.localId, idToken: res.data.idToken })
          dispatch('setLogoutTime', res.data.expiresIn)
          dispatch('addUser', newUser)
        })
        .catch(() => {
          state.isRegisterFailed = true
        })
    },
    signIn ({ commit, dispatch, state }, user) {
      authAxios.post(
        '/accounts:signInWithPassword?key=' + process.env.VUE_APP_API_KEY,
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
          dispatch('setLocalAuthData', { expirationDate, userId: res.data.localId, idToken: res.data.idToken })
          dispatch('setLogoutTime', res.data.expiresIn)
          dispatch('fetchData')
          state.isLoginFailed = false
        })
        .then(() => {
          router.push('/')
        })
        .catch(() => {
          state.isLoginFailed = true
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
