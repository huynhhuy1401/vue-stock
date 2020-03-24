<template>
  <nav class="wrapper">
    <ul class="nav-list">
      <router-link class="nav-list-item" tag="li" to="/" exact>
        <a class="nav-link">Home</a>
      </router-link>
      <router-link class="nav-list-item" tag="li" to="/portfolio" v-if="isAuthenticated">
        <a class="nav-link">Portfolio</a>
      </router-link>
      <router-link class="nav-list-item" tag="li" to="/stocks" v-if="isAuthenticated">
        <a class="nav-link">Stocks</a>
      </router-link>
    </ul>

    <div class="left" >
      <div @click="endDay" class="nav-item clickable" v-if="isAuthenticated">End Day</div>
      <div class="nav-item" v-if="isAuthenticated">
        <p class="fund">Fund: {{ fund | currency }}</p>
      </div>
      <div @click="logOut" class="nav-item clickable" v-if="isAuthenticated">Log out</div>
      <router-link class="nav-list-item" tag="li" to="/signup" v-if="!isAuthenticated">
        <a class="nav-link">Sign up</a>
      </router-link>
      <router-link class="nav-list-item" tag="li" to="/signin" v-if="!isAuthenticated">
        <a class="nav-link">Sign in</a>
      </router-link>
    </div>
  </nav>
</template>

<script>
export default {
  filters: {
    currency (value) {
      return '$' + value.toLocaleString()
    }
  },
  computed: {
    fund () {
      return this.$store.getters.fund
    },
    isAuthenticated () {
      return this.$store.getters.isAuthenticated
    }
  },
  methods: {
    endDay () {
      this.$store.dispatch('randomStock')
    },
    logOut () {
      this.$store.dispatch('logOut')
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
