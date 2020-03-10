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
          let portfolio = {
            fund: data.fund,
            stocks: []
          }
          if (data.stockPortfolio) {
            portfolio = {
              stocks: data.stockPortfolio,
              fund: data.fund
            }
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
