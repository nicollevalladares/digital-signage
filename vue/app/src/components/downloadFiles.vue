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
import axios from 'axios'
import { mapActions, mapState } from 'vuex'
import {ipcMain} from 'electron'
import { log } from 'util';
// var download = require('download-file')
const fs = require('fs')
const dl = require('download-file-with-progressbar');
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
    ...mapActions(['getScreenInfo', 'saveFiles']),
      forceFileDownload(response){
      const url = window.URL.createObjectURL(new Blob([response.data]))
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', 'file.png') //or any other extension
      document.body.appendChild(link)
      link.click()
    },
  },
  created(){

var option = {
    filename: 'vid.mp4',
    dir: 'files/files/',
    onDone: (info)=>{
        console.log('done', info);
    },
    onError: (err) => {
        console.log('error', err);
    },
    onProgress: (curr, total) => {
        console.log('progress', (curr / total * 100).toFixed(2) + '%');
    },
}

var dd = dl('http://connect.dev.hn/files/videos/1120357639_1562876417559.mp4', option);

// dd.abort() // to abort the download

    // axios.get("http://localhost:3333/uuid")
    // .then(response => {
    //     this.uuid = response.data;
    // }),
    // this.getScreenInfo({uuid: this.uuid}),
    // this.saveFiles()

  },
   computed: {
      ...mapState(['screen'])
    }
}

</script>

<style scoped>

</style>
