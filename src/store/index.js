import Vue from 'vue'
import Vuex from 'vuex'
import stocks from './modules/stocks'
import portfolio from './modules/portfolio'
import { myAxios } from '../main'

Vue.use(Vuex)

export default new Vuex.Store({
  actions: {
    loadData ({ commit }) {
      myAxios.get('/data.json')
        .then(response => {
          const data = response.data
          const portfolio = {
            fund: data.fund,
            stocks: data.stockPortfolio || []
          }
          const stocks = data.stocks

          commit('SET_PORTFOLIO', portfolio)
          commit('SET_STOCK', stocks)
        })
    }
  },
  modules: {
    stocks,
    portfolio
  }
})
