<template>
  <div>
    <h2>UUID: {{uuid}}</h2>
    <h2>prueba: {{prueba}}</h2>
  </div>
</template>

<script>
import axios from 'axios'
var download = require('download-file')
// function formatBytes(a,b){if(0==a)return"0 Bytes";var c=1024,d=b||2,e=["Bytes","KB","MB","GB","TB","PB","EB","ZB","YB"],f=Math.floor(Math.log(a)/Math.log(c));return parseFloat((a/Math.pow(c,f)).toFixed(d))+" "+e[f]}

export default {
  name: 'LandingPage',
  data(){
    return {
      uuid: process.env.BALENA_DEVICE_UUID || 'No UUID - Development Machine',
      prueba: null
    }
  },
  methods:{
    
  },
  created(){
    axios.get('http://connect.dev.hn/playlists')
    .then(response => {
      this.prueba = response + process.env.BALENA_DEVICE_UUID;
    })

  // var options = {
  //     // directory: "/home/benavidez25/Descargas/img",
  //     filename: "cat.gif"
  // }

  //   download("http://i.imgur.com/G9bDaPH.jpg", options, function(err){
  //     if (err) throw err
  //       console.log("meow") // eslint-disable-next-line
  //   }) 
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
