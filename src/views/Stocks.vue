<template>
  <div class="wrapper">
    <Stock :key="stock.id" v-for="stock in stocks" :stock="stock"/>
  </div>
</template>

<script>
import Stock from '../components/stocks/Stock.vue'
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters([
      'stocks'
    ])
  },
  components: {
    Stock
  },
  created () {
    this.$store.dispatch('initStock')
  }
}
</script>

<style scoped>
.wrapper {
  display: flex;
  flex-wrap: wrap;
}

@media (max-width: 780px) {
  .wrapper {
    flex-direction: column;
  }
}
</style>
