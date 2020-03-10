<template>
  <nav class="wrapper">
    <ul class="nav-list">
      <router-link class="nav-list-item" tag="li" to="/" exact>
        <a class="nav-link">Home</a>
      </router-link>
      <router-link class="nav-list-item" tag="li" to="/portfolio">
        <a class="nav-link">Portfolio</a>
      </router-link>
      <router-link class="nav-list-item" tag="li" to="/stocks">
        <a class="nav-link">Stocks</a>
      </router-link>
    </ul>

    <div class="left">
      <div class="nav-item clickable" @click="saveData">Save Data</div>
      <div class="nav-item clickable" @click="loadData">Load Data</div>
      <div @click="endDay" class="nav-item clickable">End Day</div>
      <div class="nav-item">
        <p class="fund">Fund: {{ fund | currency }}</p>
      </div>
    </div>
  </nav>
</template>

<script>
import { myAxios } from '../main'

export default {
  filters: {
    currency (value) {
      return '$' + value.toLocaleString()
    }
  },
  computed: {
    fund () {
      return this.$store.getters.fund
    }
  },
  methods: {
    endDay () {
      this.$store.dispatch('randomStock')
    },
    loadData () {
      this.$store.dispatch('loadData')
    },
    saveData () {
      const data = {
        stockPortfolio: this.$store.getters.stockPortfolio,
        stocks: this.$store.getters.stocks,
        fund: this.$store.getters.fund
      }
      myAxios.put('/data.json', data)
    }
  }
}
</script>

<style scoped>
.wrapper {
  display: flex;
  background-color: #424874;
  color: #f4eeff;
  font-size: 1.2rem;
  align-items: center;
  justify-content: space-between;
}

.nav-list {
  margin: 0;
  padding: 0;
  display: flex;
}

.nav-list-item {
  list-style: none;
  padding: 1rem;
}

.nav-item {
  padding: 1rem;
}

.nav-link {
  text-decoration: none;
  color: #f4eeff;
}

.nav-link:hover {
  text-decoration: underline;
}

.router-link-active .nav-link {
  text-decoration: underline;
}

.fund {
  margin: 0;
}

.left {
  display: flex;
}

.clickable:hover {
  cursor: pointer;
}
</style>
