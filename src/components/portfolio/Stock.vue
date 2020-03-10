<template>
  <div class="Stock-panel">
    <div class="Stock-panel-title">
      <h3 class="Stock-title">{{ stock.name }}</h3>
      <small>Quantity: {{ stock.quantity }} | Price: {{ stock.price }}</small>
    </div>
    <div class="Stock-panel-body">
      <input class="Stock-number" type="number" name="Quantity" v-model="quantity">
      <button class="Stock-btn" :class="{'Stock-btn-disable': insufficentAmount, 'Stock-btn': !insufficentAmount}" :disabled="insufficentAmount" @click="sellStock">Sell</button>
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
    sellStock () {
      const order = {
        stockId: this.stock.id,
        quantity: this.quantity,
        stockPrice: this.stock.price
      }
      this.$store.dispatch('sellStock', order)
      this.quantity = 0
    }
  },
  computed: {
    insufficentAmount () {
      return this.stock.quantity < this.quantity || !Number.isInteger(+this.quantity) || this.quantity <= 0
    }
  }
}
</script>

<style>
</style>
