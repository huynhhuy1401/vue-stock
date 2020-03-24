<template>
  <div class="sign-in">
    <form class="form" @submit.prevent="onSubmit">
      <div class="form-title">
        <h2>Sign in</h2>
      </div>
      <div class="form-group">
        <label for="email" class="form-label">Email</label>
        <input type="email" id="email" class="input" v-model="email"/>
      </div>
      <div class="form-group">
        <label for="password" class="form-label">Password</label>
        <input type="password" id="password" class="input" v-model="password" />
      </div>
      <transition name="fade">
        <div class="form-warning" v-if="isLoginFailed">
          <small class="input-warning">Username or password is not correct</small>
        </div>
      </transition>
      <button class="Stock-btn Stock-btn-active form-btn">Sign in</button>
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
  computed: {
    isLoginFailed () {
      return this.$store.getters.isLoginFailed
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
