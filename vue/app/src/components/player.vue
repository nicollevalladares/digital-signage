<template>
  <div id="div-player" >
    <video id='player' width="100%" src="" height="100%" ></video> 
    <img id="img" width="100%" src="" height="100%">
    <!-- <div id="cinta">
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Blanditiis quibusdam exercitationem quos doloremque eligendi, voluptate quisquam nihil reiciendis tenetur odio. Nulla porro totam, et non est quam iste a quasi quibusdam distinctio nemo cumque quos perspiciatis minima facilis reiciendis maiores harum labore quidem sit soluta veniam autem tempora! Facilis qui distinctio odit totam! Quisquam hic quos cumque quam nobis? Quaerat quis nulla sequi eius architecto. Omnis, provident aut adipisci odio debitis repellendus. Beatae possimus vero esse omnis laboriosam facilis soluta obcaecati, voluptatem cumque consequuntur incidunt asperiores cupiditate rem est distinctio pariatur id libero! Cumque quae, iure ut porro velit unde!
    </div> -->
  </div>
</template>

<script>
import axios from 'axios'
import { log } from 'util';
import fs from 'fs';
import {mixin as VueTimers} from 'vue-timers';

// var player;
// var currrentFile=0;
// var fileLists = new Array();

export default {
  mixins: [VueTimers],
  name: 'Player',
     components: {
    
    },
  data(){
    return {
      videoElement : null,
      playList : [],
      currrentFile : 0,
      videoPlayer : null,
      imagenPlayer : null,
      mediaPlaying : null //0 when is playing a video, 1 when is showing a picture
    }
  },
  methods: {
    playNextFile : function (){
        if (this.currrentFile >= (this.playList.length-1))
          this.currrentFile=0;
        else 
           this.currrentFile++;

        if (this.playList.length ==1){
            if(this.mediaPlaying == 0){
               this.videoPlayer.play();
            }
        }else{
        if (this.playList[this.currrentFile].type == 'mp4'){
            this.mediaPlaying = 0;
            this.imagenPlayer.style.display = 'none';
            this.videoPlayer.style.display = 'block';
            this.videoPlayer.src = this.playList[this.currrentFile].url;
            this.videoPlayer.play();
        }else{
            this.mediaPlaying = 1;
            this.imagenPlayer.style.display = 'none'; 
            this.videoPlayer.style.display = 'none';
            this.imagenPlayer.src = this.playList[this.currrentFile].url;
            this.imagenPlayer.style.display = 'block'; 
        }
      }
        this.waitingFinish();
    },
   
    waitingFinish : function (){
      // console.log('Waiting to finish actually file');
      if (this.mediaPlaying == 0){
          this.videoPlayer.onended =  this.playNextFile;
          this.videoPlayer.onerror =  this.playNextFile;
      }else if (this.mediaPlaying == 1){
          this.$options.interval= setTimeout(this.playNextFile, 5000);
      }
    },

    startPlaylist : function (){
        console.log('Iniciando playlist');
        this.videoPlayer = document.getElementById('player'); 
        this.imagenPlayer = document.getElementById('img'); 

       axios.get("http://127.0.0.1:3333/playlist")
                .then(response => {
                    console.log(response.data.data);
                    this.playList = response.data.data;   
                    // console.log(this.playList[this.currrentFile].url);
                    if (this.playList[this.currrentFile].type == 'mp4'){    
                      this.mediaPlaying = 0;                  
                      this.videoPlayer.src = this.playList[this.currrentFile].url;
                      this.imagenPlayer.style.display = 'none';
                      this.videoPlayer.play();
                    } else {
                      //show images
                      this.mediaPlaying = 1;   
                      this.videoPlayer.style.display = 'none';
                      this.imagenPlayer.src = this.playList[this.currrentFile].url;
                    }
                    this.waitingFinish();
                })
                .catch(err => {
                    console.log('Ha ocurrido un error, inténtelo nuevamente.');
                })
      }
  },
  mounted(){
    this.$options.interval = setTimeout(this.startPlaylist, 1000);
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
 #div-player{
   top: 0;
   left: 0;
   position: absolute;
   overflow: hidden;
   max-height: 100%;
   min-height : 100%;
   max-width: 100%;
   min-width : 100%;
   background: black;
 }
 #cinta {
   background-color: red;
   z-index: 100;
 }

</style>
