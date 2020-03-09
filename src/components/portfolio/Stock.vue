<template>
  <div class="panel">
    <div class="panel-title">
      <h3 class="title">{{ stock.name }}</h3>
      <small>Quantity: {{ stock.quantity }} | Price: {{ stock.price }}</small>
    </div>
    <div class="panel-body">
      <input class="number" type="number" name="Quantity" v-model="quantity">
      <button class="btn" :disabled="insufficentAmount" @click="sellStock">Sell</button>
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
    }
  },
  computed: {
    insufficentAmount () {
      return this.stock.quantity < this.quantity
    }
  }
}
</script>

<style scoped>
.panel {
  flex-basis: 25%;
  padding: 1rem;
  margin: 1rem 0.8rem;
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
  background-color: #f4eeff;
  border-radius: 2px;
}

.panel-title {
  color: #424874;
  font-weight: bold;
  margin-bottom: 0.5rem;
}

.title {
  margin-bottom: 0.5rem;
}

.btn {
  background-color: #a6b1e1;
  border: none;
  color: #f4eeff;
  padding: 0.8rem 1rem;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin-top: 0.5rem;
  outline: none;
}

.btn:hover {
  background-color: #424874;
  cursor: pointer;
}

.number {
  padding: 0.8rem 1rem;
  display: block;
  width: 100%;
}
</style>
