<template>
  <div class="wrapper">
    <Stock :key="stock.id" :stock="stock" v-for="stock in stocks" />
  </div>
</template>

<script>
import Stock from '../components/portfolio/Stock.vue'

export default {
  components: {
    Stock
  },
  computed: {
    stocks () {
      return this.$store.getters.stockPortfolio
    }
  }
}
</script>

<style>
.wrapper {
  display: flex;
}

@media screen and (max-width: 780px) {
  .wrapper {
    flex-direction: column;
  }
}
</style>
