<template>
  <div id="nav">
    <router-link to="/login">Login</router-link>
    |
    <router-link to="/registration">Registration</router-link>
  </div>
  <router-view/>
</template>

<script>
import './scss/app.scss'

export default {
  name: 'App'
}

</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
