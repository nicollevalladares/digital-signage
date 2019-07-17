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
var Downloader = require("filedownloader");
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
    //     url: "FILEURL"
    // }).on("progress", function (progress){
    //     console.log(progress); 
    // });
  },
<<<<<<< HEAD
    mounted(){
    //   var url = "http://connect.dev.hn/files/videos/1514689152_1562876300663.mp4";
    //   var options = {
    //       directory: "./files/videos/",
    //       filename: "video2.mp4"
    //   }    
    //   download(url, options, function(err){
    //       if (err) throw err
    //       console.log("meow")
    //   }) 
    // }
    //}
    //  var Dl = new Downloader({
    //       url: "http://connect.dev.hn/files/videos/1514689152_1562876300663.mp4"
    //   }).on("progress", function (progress){
    //       console.log(progress); 
    //   });
    }
  }
=======
   computed: {
      ...mapState(['screen'])
    }
}
>>>>>>> 8af827f50436313a3e43ab559c9c1fbcfb87f803

</script>

<style scoped>

</style>
