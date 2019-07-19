<template>
  <div>
    <div style="color: white;" id="output">
      <h1>Configuración Finalizada</h1>
      <hr>
      {{downloadFile}}
      <h2>Descargando Archivos</h2>
      <div v-for="file of files" :key="file.id">
        <!-- <p :id="file.id">{{file}}</p> -->
        <!-- {{progress}} -->
        <div id="files-progress" style="display: block;">
          <!-- <p>Descargando {{file.name}}</p>
          <progress style="width: 100%" :value="progress.progress" max="100">
            0%
          </progress> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { mapActions, mapState } from 'vuex'
import {mixin as VueTimers} from 'vue-timers'
import { clearLine } from 'readline';
import { clearInterval } from 'timers';
const fs = require('fs')
const dl = require('download-file-with-progressbar');

// import {ipcMain} from 'electron'
// import { log } from 'util';
// var timeout; 

export default {
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
    ...mapActions(['saveFiles', 'setProgress']),
    //   forceFileDownload(response){
    //   const url = window.URL.createObjectURL(new Blob([response.data]))
    //   const link = document.createElement('a')
    //   link.href = url
    //   link.setAttribute('download', 'file.png') //or any other extension
    //   document.body.appendChild(link)
    //   link.click()
    // }
    save(){
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
        // this.saveFiles({file: this.files[this.actuallyFile]})
        var option = {
          filename: this.files[this.actuallyFile].dataName,
          dir: 'files/files/',
          onDone: (info)=>{
              console.log('done', info);
              this.actuallyFile++;
              this.saveNextFile();
          },
          onError: (err) => {
              console.log('error', err);
          },
          onProgress: (curr, total) => {
              // console.log('progress', (curr / total * 100).toFixed(2) + '%');
              let progress = (curr / total * 100).toFixed(2);
               document.getElementById('progress-'+this.actuallyFile).value = progress;

          },
        }
        
        dl(this.files[this.actuallyFile].url, option);
        document.getElementById('files-progress').innerHTML += 
          `<h1>Descargando ${this.files[this.actuallyFile].name}</h1>
          <progress id='progress-${this.actuallyFile}' style="width: 100%" value="" max="100">
            0%
          </progress>`
      }else{
        this.$router.push({name : 'Player'})
      }
  
    }
  },
  created(){
    // this.getUUID()
  },
  computed: {
    ...mapState(['uuid', 'screen', 'files', 'key', 'status', 'downloadFile', 'isDownloading'])
  },
  mounted(){
    this.$options.interval = setTimeout(this.save, 2000);
  }
}

</script>

<style scoped>

</style>
