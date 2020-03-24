<template>
  <div class="sign-up">
    <form class="form" @submit.prevent="onSubmit">
      <div class="form-title">
        <h2>Register</h2>
      </div>
      <div class="form-group">
        <label for="email" class="form-label">Email</label>
        <input type="email" id="email" class="input" v-model="email"/>
      </div>
      <div class="form-group">
        <label for="password" class="form-label">Password</label>
        <input type="password" id="password" class="input" v-model="password" />
      </div>
      <div class="form-group pw-confirm">
        <label for="confirm" class="form-label">Confirm Password</label>
        <input type="password" id="confirm" class="input" v-model="confirmation" />
      </div>
      <transition name="fade">
        <div class="form-warning" v-if="!pwMatch">
          <small class="input-warning">Password does not match</small>
        </div>
      </transition>
      <transition name="fade">
        <div class="form-warning" v-if="isRegisterFailed">
          <small class="input-warning">Username existed!</small>
        </div>
      </transition>
      <button class="Stock-btn Stock-btn-active form-btn">Register</button>
    </form>
  </div>
</template>

<script>

export default {
  data () {
    return {
      email: '',
      password: '',
      confirmation: '',
      pwMatch: true
    }
  },
  computed: {
    isRegisterFailed () {
      return this.$store.getters.isRegisterFailed
    }
  },
  methods: {
    onSubmit () {
      if (this.password !== this.confirmation) {
        this.pwMatch = false
      } else {
        const user = {
          email: this.email,
          password: this.password
        }
        this.$store.dispatch('signUp', user)
      }
    }
  },
  created () {
    this.$store.commit('resetRegisterState')
  }
}
</script>

<style scoped>
.sign-up {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-top: 10rem;
}
</style>
