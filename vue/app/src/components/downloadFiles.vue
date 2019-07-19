<template>
  <div>
    {{screen}}
    {{progress}}
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
// import {ipcMain} from 'electron'
// import { log } from 'util';

export default {
  name: 'DownloadFiles',
     components: {
    
    },
  data(){
    return {
      // uuid: null
    }
  },
  methods: {
    ...mapActions(['getScreenInfo', 'saveFiles', 'getUUID']),
    //   forceFileDownload(response){
    //   const url = window.URL.createObjectURL(new Blob([response.data]))
    //   const link = document.createElement('a')
    //   link.href = url
    //   link.setAttribute('download', 'file.png') //or any other extension
    //   document.body.appendChild(link)
    //   link.click()
    // }
  },
  created(){
    this.getUUID(),
    this.getScreenInfo({uuid: this.uuid})
  },
  computed: {
    ...mapState(['screen', 'uuid', 'progress'])
  },
  updated(){
    // this.saveFiles({playlist: this.screen})
  }
}

</script>

<style scoped>

</style>
