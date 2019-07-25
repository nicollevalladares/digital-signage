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
        this.startDownload()
    },
    startDownload(){
      this.totalFiles = this.files.length;
      this.saveNextFile();
      var files = this.files;
       axios.post('http://127.0.0.1:3333/deleteAll',{
           newFiles : files
        }).then(response => {
          // console.log(respose);  
        })
    },
    saveNextFile(){
      if (this.actuallyFile <= (this.totalFiles-1)){
        axios.get('http://127.0.0.1:3333/exist/'+this.files[this.actuallyFile].dataName)
        .then(response => {
           if (response.data.code != 1){
              var option = {
                filename: this.files[this.actuallyFile].dataName,
                dir: 'files/files/',
                onDone: (info)=>{
                    document.getElementById(`progress-${this.actuallyFile}`).style.display = 'none';
                    document.getElementById(`item-${this.actuallyFile}`).innerHTML = `<span style="font-size:2vw; color:rgb(19, 95, 19); margin-right: 10px">✔</span>${this.files[this.actuallyFile].name} descargado correctamente`;
                    this.actuallyFile++;
                    this.saveNextFile();
                },
                onError: (err) => {
                    console.log('error', err); 
                    document.getElementById(`progress-${this.actuallyFile}`).remove();
                    document.getElementById(`item-${this.actuallyFile}`).remove();
                    console.log('error', err); 
                    axios.delete('http://127.0.0.1:3333/delete/'+this.files[this.actuallyFile].dataName)
                    .then(res =>{
                        // console.log(res);
                    });
                    this.saveNextFile(); 
                },
                onProgress: (curr, total) => {
                    let progress = (curr / total * 100).toFixed(2);
                    document.getElementById(`progress-${this.actuallyFile}`).value = progress;

                },
              }
              
              dl(this.files[this.actuallyFile].url, option);
              document.getElementById('files-progress').innerHTML += 
                `<h1 id='item-${this.actuallyFile}' style=' color: white; font-size: 1.5vw;margin-top: 2%;margin-bottom: 5px;' class="">Descargando ${this.files[this.actuallyFile].name}</h1>
                <progress style="width: 30%;background-color:rgb(19, 95, 19);" id='progress-${this.actuallyFile}' value="" max="100">
                  0%
                </progress>`
           }else{
                // console.log('file exist, no downloaded'); 
                document.getElementById('files-progress').innerHTML += `<h1 id='item-${this.actuallyFile}' style=' color: white; font-size: 1.5vw;margin-top: 2%;margin-bottom: 5px;' class=""><span style="font-size:2vw; color:rgb(19, 95, 19); margin-right: 10px">✔</span>${this.files[this.actuallyFile].name} descargado correctamente</h1>`;
                this.actuallyFile++;
                var self = this;
                setTimeout(function(){
                    self.saveNextFile();
                }, 1000);
                    
          }
        })
      }else{   
        //download defaultVideo
        var idScreenTemp = this.key.key.toString();
        var nameDefault;
        var urlDefault;
        var dataNameDefault;
        // console.log(idScreenTemp);
        axios.post('http://connect.beanage.dev.hn/screens/defaultVideo',{
          idScreen : idScreenTemp
        }).then (res=>{
            if (res.data.data.dataName && res.data.data.url ){
              nameDefault = res.data.data.name;
              urlDefault = res.data.data.url;
              dataNameDefault = res.data.data.dataName;
            }
            // console.log(res.data.data.dataName);
            // console.log(res.data.data.url);
            axios.get('http://127.0.0.1:3333/existDefaultVideo/'+res.data.data.dataName)
            .then(res=>{
                // console.log(res.data.code);
                if (res.data.code!= 1){
                    axios.delete('http://127.0.0.1:3333/deleteDefaultVideo')
                    .then (res=>{
                      if (res.data.code == 1){
                          //download default video
                            document.getElementById('files-progress').innerHTML += 
                          `<br><h2 style="margin-top:10px; color: white; font-size: 1.5vw; letter-spacing: 10px; margin-button:10px;">Descargando video por defecto</h2><h1 id='item-default' style=' color: white; font-size: 1.5vw;margin-top: 2%;margin-bottom: 5px;' class="">Descargando ${nameDefault}</h1>
                          <progress style="width: 30%;background-color:rgb(19, 95, 19);" id='progress-default' value="" max="100">
                            0%
                          </progress>`;
                            var option = {
                            filename: dataNameDefault,
                            dir: 'files/defaultVideo/',
                            onDone: (info)=>{
                                document.getElementById(`progress-default`).style.display = 'none';
                                document.getElementById(`item-default`).innerHTML = `<span style="font-size:2vw; color:rgb(19, 95, 19); margin-right: 10px">✔</span>${nameDefault} descargado correctamente`;
                                setTimeout(this.$router.push({name : 'Player'}), 2000);
                            },
                            onError: (err) => {
                                console.log('error', err); 
                                document.getElementById(`progress-default`).remove();
                                document.getElementById(`item-default`).remove();
                                console.log('error', err); 

                                axios.delete('http://127.0.0.1:3333/deleteDefaultVideo')
                                .then(res =>{
                                    // console.log(res);
                                });
                            },
                            onProgress: (curr, total) => {
                                let progress = (curr / total * 100).toFixed(2);
                                document.getElementById(`progress-default`).value = progress;

                            },
                          }
                          
                          dl(urlDefault, option);
                      }
                    })
                }else{
                    setTimeout(this.$router.push({name : 'Player'}), 2000);
                }
            })
        })
      }
  
    }
  },
  computed: {
    ...mapState(['uuid', 'screen', 'files', 'key', 'status','appSelected'])
  },
  mounted(){
    this.$options.interval = setTimeout(this.save, 500);
    // this.sockets.subscribe(this.key.key.toString(), (data) => {
    //          if (data.type=='general'){
    //             this.getScreenInfo({uuid: this.uuid, idScreen: this.key.key})
    //         }
    //   })
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
    margin-top: 0;
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

