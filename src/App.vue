<template>
  <div id="app">
    <Header />
    <router-view />
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
</style>
