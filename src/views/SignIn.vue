<template>
  <div class="sign-in">
    <form class="form" @submit.prevent="onSubmit">
      <div class="form-title">
        <h2>Login</h2>
      </div>
      <div class="form-group">
        <label for="email" class="form-label">Email</label>
        <input type="email" id="email" class="input" v-model="email"/>
      </div>
      <div class="form-group">
        <label for="password" class="form-label">Password</label>
        <input type="password" id="password" class="input" v-model="password" />
      </div>
      <button class="Stock-btn Stock-btn-active form-btn">Login</button>
    </form>
  </div>
</template>

<script>
export default {
  data () {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    onSubmit () {
      const user = {
        email: this.email,
        password: this.password
      }
      this.$store.dispatch('signIn', user)
    }
  }
}
</script>

<style scoped>
.sign-in {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-top: 10rem;
}
</style>
