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
    buyStock ({ commit, dispatch }, order) {
      commit('BUY_STOCK', order)
      dispatch('saveUserPortfolioData')
    },
    randomStock ({ commit, dispatch }) {
      commit('RND_STOCK')
      dispatch('saveUserStocksData')
    }
  }
}
