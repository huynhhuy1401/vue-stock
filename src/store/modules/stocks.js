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
    buyStock ({ commit, getters }, order) {
      commit('BUY_STOCK', order)
      myAxios.patch(`/users/${getters.userId}.json?auth=${getters.idToken}`, {
        fund: getters.fund,
        portforlio: getters.stockPortfolio
      })
    },
    randomStock ({ commit, getters }) {
      commit('RND_STOCK')
      myAxios.patch(`/users/${getters.userId}.json?auth=${getters.idToken}`, {
        stocks: getters.stocks
      })
    }
  }
}
