<template>
  <v-container>
     <h2 id="download-title">DESCARGANDO ARCHIVOS</h2>
     <hr>
      <div id="files-progress" class="container" v-autoscroll="'bottom'">

      </div>
  </v-container>
</template>

<script>
import axios from 'axios'
import { mapActions, mapState } from 'vuex'
import {mixin as VueTimers} from 'vue-timers'
import { clearLine } from 'readline'
import { clearInterval } from 'timers'
import fs from 'fs'
import dl from 'download-file-with-progressbar'
import { autoscroll } from 'vue-autoscroll'

export default {
  directives: {
    autoscroll
  },
  mixins: [VueTimers],
  name: 'DownloadFiles',
  data(){
    return {
      actuallyFile : 0,
      totalFiles : 0,
      progress: ''
    }
  },
  methods: {
    save(){
      console.log(this.status);
      
      if(this.status == true){
        this.startDownload()
        clearTimeout(this.$options.interval);
      }
    },
    startDownload(){
      this.totalFiles = this.files.length;
      this.saveNextFile();
    },
    saveNextFile(){
      if (this.actuallyFile <= (this.totalFiles-1)){
        var option = {
          filename: this.files[this.actuallyFile].dataName,
          dir: 'files/files/',
          onDone: (info)=>{
              console.log('done', info);
              document.getElementById('progress-'+this.actuallyFile).style.display = 'none';
              document.getElementById('item-'+this.actuallyFile).innerHTML = `<v-icon class="icon-downloaded" dark right>check_circle_outline</v-icon>${this.files[this.actuallyFile].name} descargado correctamente`;
              this.actuallyFile++;
              this.saveNextFile();
          },
          onError: (err) => {
              console.log('error', err);
          },
          onProgress: (curr, total) => {
              let progress = (curr / total * 100).toFixed(2);
               document.getElementById('progress-'+this.actuallyFile).value = progress;

          },
        }
        
        dl(this.files[this.actuallyFile].url, option);
        document.getElementById('files-progress').innerHTML += 
          `<h1 id='item-${this.actuallyFile}' class="item-downloading">Descargando ${this.files[this.actuallyFile].name}</h1>
          <progress class="progress" id='progress-${this.actuallyFile}' value="" max="100">
            0%
          </progress>`
      }else{
        this.$router.push({name : 'Player'})
      }
  
    }
  },
  computed: {
    ...mapState(['uuid', 'screen', 'files', 'key', 'status',])
  },
  mounted(){
    this.$options.interval = setTimeout(this.save, 5000);
  }
}

</script>

<style scoped>
  #download-title{
    color: white;
    font-size: 2vw;
    letter-spacing: 10px;
  }

  .item-downloading{
    color: white;
    font-size: 1.5vw;
    margin-top: 2%;
    margin-bottom: 5px;
  }
  .progress {
    width: 30%;
    background-color:rgb(19, 95, 19);
  }

  .icon-downloaded{
    color: rgb(19, 95, 19);
    margin-right: 10px;
    font-size: 2vw;
  }

  #files-progress{
    overflow-y: scroll;
    margin-top: 40px;
    height: 500px;
  }

  /* scrollbar */
  .container::-webkit-scrollbar {
    width: 8px;     /* Tamaño del scroll en vertical */
    height: 8px;    /* Tamaño del scroll en horizontal */
    display: none;  /* Ocultar scroll */
}
/* Ponemos un color de fondo y redondeamos las esquinas del thumb */
.container::-webkit-scrollbar-thumb {
    background: #ccc;
    border-radius: 4px;
}

/* Cambiamos el fondo y agregamos una sombra cuando esté en hover */
.container::-webkit-scrollbar-thumb:hover {
    background: #b3b3b3;
    box-shadow: 0 0 2px 1px rgba(0, 0, 0, 0.2);
}

/* Cambiamos el fondo cuando esté en active */
.container::-webkit-scrollbar-thumb:active {
    background-color: #999999;
}

.container::-webkit-scrollbar-track {
    background: #e1e1e1;
    border-radius: 4px;
}

/* Cambiamos el fondo cuando esté en active o hover */
.container::-webkit-scrollbar-track:hover,
.container::-webkit-scrollbar-track:active {
  background: #d4d4d4;
}
</style>
