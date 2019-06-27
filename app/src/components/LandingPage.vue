<template>
  <div>
    <h2>UUID: {{uuid}}</h2>
    <h2>prueba: {{prueba}}</h2>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'LandingPage',
  data(){
    return {
      uuid: process.env.RESIN_DEVICE_UUID || 'No UUID - Development Machine',
      prueba: null
    }
  },
  methods:{
    
  },
  created(){
    axios.get('http://connect.dev.hn/playlists')
    .then(response => {
      this.prueba = response;
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
