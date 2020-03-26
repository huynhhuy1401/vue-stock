import stocks from '../../data/stocks'
import { myAxios } from '../../main'

export default {
  state: {
    stocks: []
  },
  getters: {
    stocks (state) {
      return state.stocks
    }
  },
  mutations: {
    'SET_STOCK' (state, stocks) {
      state.stocks = stocks
    },
    'RND_STOCK' (state) {
      state.stocks.forEach(stock => {
        stock.price = Math.round(stock.price * (1 + Math.random() - 0.5))
      })
    }
  },
  actions: {
    buyStock ({ commit, state, getters }, order) {
      commit('BUY_STOCK', order)
      myAxios.patch(`/users/${state.userId}.json?auth=${state.idToken}`, {
        fund: getters.fund,
        portforlio: getters.stockPortfolio
      })
    },
    initStock ({ commit }) {
      commit('SET_STOCK', stocks)
    },
    randomStock ({ commit, dispatch }) {
      commit('RND_STOCK')
      dispatch('saveData')
    }
  }
}
