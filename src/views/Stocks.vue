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
  }
}
</script>

<style scoped>
.wrapper {
  display: flex;
}

@media (max-width: 780px) {
  .wrapper {
    flex-direction: column;
  }
}
</style>
