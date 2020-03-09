import stocks from '../../data/stocks'

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
    buyStock ({ commit }, order) {
      commit('BUY_STOCK', order)
    },
    initStock ({ commit }) {
      commit('SET_STOCK', stocks)
    },
    randomStock ({ commit }) {
      commit('RND_STOCK')
    }
  }
}
