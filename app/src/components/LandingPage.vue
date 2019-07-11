<template>
  <div>
      <img src="@/assets/loading.svg">
      uuid: {{uuid}}
  </div>
</template>



<script>
import axios from 'axios'
var download = require('download-file')

export default {
  name: 'LandingPage',
  data(){
    return {
       prueba : null,
       uuid : process.env.RESIN_DEVICE_UUID
    }
  },
  methods:{
    
  },
  created(){
    axios.get('http://connect.dev.hn/playlists')
    .then(response => {
      this.prueba = response;
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
<style >
 body {
   background-color: rgb(240, 245, 224)
 }

 img {
   margin-top: auto;
   margin-bottom: auto;
 }
</style>
