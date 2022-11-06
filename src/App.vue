<template>
  <AuthorizationComponent/>
  <CompaniesComponent/>
</template>

<script>
import './scss/app.scss'
import AuthorizationComponent from './components/AuthorizationComponent.vue'
import CompaniesComponent from "./components/CompaniesComponent";

export default {
  name: 'App',
  components: {
    AuthorizationComponent,
    CompaniesComponent,
  },

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
