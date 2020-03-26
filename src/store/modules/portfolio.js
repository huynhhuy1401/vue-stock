import { myAxios } from '../../main'

export default {
  state: {
    fund: 10000,
    stocks: []
  },
  getters: {
    stockPortfolio (state, getters) {
      return state.stocks.map(stock => {
        const record = getters.stocks.find(el => el.id === stock.id)
        return {
          id: stock.id,
          quantity: stock.quantity,
          price: record.price,
          name: record.name
        }
      })
    },
    fund (state) {
      return state.fund
    }
  },
  mutations: {
    'BUY_STOCK' (state, { stockId, stockPrice, stockQuantity }) {
      const record = state.stocks.find(stock => stock.id === stockId)
      if (record) {
        record.quantity += stockQuantity
      } else {
        state.stocks.push({
          id: stockId,
          quantity: stockQuantity
        })
      }
      state.fund -= stockPrice * stockQuantity
    },
    'SELL_STOCK' (state, { stockId, quantity, stockPrice }) {
      const record = state.stocks.find(stock => stock.id === stockId)
      if (record.quantity > quantity) {
        record.quantity -= quantity
      } else {
        state.stocks.splice(state.stocks.indexOf(record), 1)
      }
      state.fund += quantity * stockPrice
    },
    'SET_PORTFOLIO' (state, { stocks, fund }) {
      state.stocks = stocks
      state.fund = fund
    }
  },
  actions: {
    sellStock ({ commit, getters }, order) {
      commit('SELL_STOCK', order)
      myAxios.patch(`/users/${getters.userId}.json?auth=${getters.idToken}`, {
        fund: getters.fund,
        portforlio: getters.stockPortfolio
      })
    }
  }
}
