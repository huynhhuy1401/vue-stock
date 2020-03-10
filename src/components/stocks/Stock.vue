<template>
  <div class="Stock-panel">
    <div class="Stock-panel-title">
      <h3 class="Stock-title">{{ stock.name }}</h3>
      <small>Price: {{ stock.price }}</small>
    </div>
    <div class="Stock-panel-body">
      <input class="Stock-number" type="number" name="Quantity" v-model="quantity">
      <button class="Stock-btn" :class="{'Stock-btn-disable': insufficentAmount, 'Stock-btn-active': !insufficentAmount}" :disabled="insufficentAmount" @click="buyStock">Buy</button>
    </div>
  </div>
</template>

<script>
export default {
  props: ['stock'],
  data () {
    return {
      quantity: 0
    }
  },
  methods: {
    buyStock () {
      const order = {
        stockId: this.stock.id,
        stockPrice: this.stock.price,
        stockQuantity: +this.quantity
      }
      this.$store.dispatch('buyStock', order)
      this.quantity = 0
    }
  },
  computed: {
    insufficentAmount () {
      const currentFund = this.$store.getters.fund
      return +this.quantity * this.stock.price > currentFund || !Number.isInteger(+this.quantity) || this.quantity <= 0
    }
  }
}
</script>

<style>

</style>
