<template>
  <div id="app">
    <Header />
    <transition name="fade" mode="out-in">
      <router-view />
    </transition>
  </div>
</template>

<script>
import Header from './components/Header.vue'
export default {
  components: {
    Header
  }
}
</script>

<style>
*, *:before, *:after {
  box-sizing: inherit;
}

html {
  font-size: 16px;
  box-sizing: border-box;
  line-height: 1.15;
  font-family: "Montserrat", Arial, Helvetica, sans-serif;
}

body {
  margin: 0;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
