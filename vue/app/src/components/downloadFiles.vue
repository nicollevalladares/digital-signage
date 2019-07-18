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
    ...mapActions(['getScreenInfo', 'saveFiles'])
  },
  created(){
    axios.get("http://localhost:3333/uuid")
    .then(response => {
        this.uuid = response.data;
    }),
    this.getScreenInfo({uuid: this.uuid}),
    this.saveFiles()
  },
   computed: {
      ...mapState(['screen'])
    }
}

</script>

<style scoped>

</style>
