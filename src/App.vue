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
/* Universal CSS */
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

#app {
  height: 100vh;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

/* Stock CSS */
.Stock-panel {
  flex: 0 25%;
  padding: 1rem;
  margin: 2%;
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
  border-radius: 5px;
  border: 1px solid #a6b1e1;
}

.Stock-panel-title {
  color: #424874;
  font-weight: bold;
  margin-bottom: 0.5rem;
}

.Stock-title {
  margin-bottom: 0.5rem;
}

.Stock-btn {
  border: none;
  color: #f4eeff;
  padding: 0.8rem 1rem;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin-top: 0.5rem;
  outline: none;
  cursor: pointer;
  border-radius: 2px;
}

.Stock-btn-active {
  background-color: #424874;
}

.Stock-btn-disable {
  background-color: #a6b1e1;
}

.Stock-number {
  padding: 0.8rem 1rem;
  display: block;
  width: 100%;
  border-color: #a6b1e1;
  font-size: 1rem;
}

/* form css */
.form {
  display: inline-block;
  padding: 1.5rem;
  border: #dcd6f7 solid 2px;
  color: #424874;
}

.form-group {
  margin-bottom: 0.5rem;
}

.form-btn {
  border-radius: 2px;
  width: 100%;
}

.form-label {
  margin-right: 0.5rem;
  font-size: 1rem;
}

.form-warning {
  margin-top: 0.2rem;
  margin-bottom: 0.5rem;
}

.input {
  border-color: #a6b1e1;
  border-radius: 2px;
  font-size: 1rem;
  padding: 0.3rem;
  outline: none;
}

.input-warning {
  color: #ff5552;
  font-size: 0.8rem;
}

.pw-confirm {
  margin-bottom: 0;
}

</style>
