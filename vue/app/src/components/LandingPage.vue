<template>
  <div>
      <!-- <img src="@/assets/loading.svg"> -->
      <h1>Pantalla de configuración</h1>
      <!-- <button @click="verUuid">uuid</button> -->
      uuid : {{uuid}}
  </div>
</template>



<script>
import axios from 'axios'
import { mapActions, mapState } from 'vuex';
var download = require('download-file')

export default {
  name: 'LandingPage',
     components: {
    
    },
  data(){
    return {
       prueba : null,
       uuid : null
    }
  },
  methods: {
    ...mapActions(['getUUID']),
    // verUuid(){
    //   this.uuid = process.env.RESIN_DEVICE_UUID || 'no uuid';
    // }
  },
  created(){
      this.getUUID()

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
  
  },
  computed: {
    ...mapState(['uuid'])
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style >
 body {
   background-color: rgb(56, 73, 146)
 }

 img {
   margin-top: auto;
   margin-bottom: auto;
 }
</style>
