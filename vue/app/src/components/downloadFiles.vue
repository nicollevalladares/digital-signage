<template>
  <div>
    {{screen}}
    <div style="color: white;" id="output">
      <h1>Configuración Finalizada</h1>
      <hr>
      <h2>Descargando Archivos...</h2>
    </div>
  </div>
</template>

<script>
// var Downloader = require("filedownloader");
import axios from 'axios'
import { mapActions, mapState } from 'vuex'
    
export default {
  name: 'DownloadFiles',
     components: {
    
    },
  data(){
    return {
      uuid: null
    }
  },
  methods: {
    ...mapActions(['getScreenInfo'])
  },
  created(){
    axios.get("http://localhost:3333/uuid")
    .then(response => {
        this.uuid = response.data;
    }),
    this.getScreenInfo({uuid: this.uuid})

    // var Dl = new Downloader({
    //     url: "http://connect.dev.hn/files/videos/1060664345_1562876678317.mp4"
    // }).on("progress", function (progress){
    //     console.log(progress); 
    // });
  },
   computed: {
      ...mapState(['screen'])
    }
}

</script>

<style scoped>

</style>
