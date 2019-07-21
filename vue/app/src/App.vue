<template>
  <div id="app">    
    <Preloader></Preloader>
    <router-view></router-view>
  </div>
</template>

<script>

import Preloader from './components/Preloader.vue'
export default {
  name: 'App',
  components: {
    Preloader
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /* margin-top: 60px; */
  overflow: hidden;
  max-height: 100%;
  min-height : 100%;
  padding: 0;
  margin: 0;
}

html {
  overflow-y:hidden !important;
}
</style>
