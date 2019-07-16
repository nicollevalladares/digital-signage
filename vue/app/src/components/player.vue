<template>
  <div id="div-player" >
    <video id='player' loop width="100%" src="" height="100%" ></video> 
  </div>
</template>

<script>
import axios from 'axios'
import { log } from 'util';
import fs from 'fs';
var player;
export default {
  name: 'Player',
     components: {
    
    },
  data(){
    return {
      videoElement : null,
      fileURL: null, 
      input : null
    }
  },
  methods: {
    //Funcions to player
    play: function() {
      this.videoElement.play();
    }, 

    stop: function (){
      this.videoElement.stop();
    },

    changeVideo : function (videoURL){
      this.videoElement.src = videoURL; 
    },
    playNextFile : function (){
      console.log('Vamos a reproc');
    }
  },
  mounted(){
    player = document.getElementById('player');
    // // this.videoElement = 
    // this.videoElement.src = 'http://127.0.0.1:3331/videos/video1.mp4';
    // this.videoElement.play();
    player.src = 'http://127.0.0.1:3331/videos/video1.mp4';
    player.play();

   player.onended = function() {
      console.log('se termino');
        // this.videoElement = document.getElementById('player');
        // this.videoElement.src = 'http://127.0.0.1:3331/videos/video1.mp4';
        // this.videoElement.play();
    }
  
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
   background: black
 }

</style>
