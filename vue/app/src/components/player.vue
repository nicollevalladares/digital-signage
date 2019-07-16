<template>
  <div id="div-player" >
    <!-- <input type="file" multiple accept="video/*"/> -->
    <video id='player' loop width="100%" src="http://localhost:3331/videos/video1.mp4" height="100%" ></video> 
  </div>
</template>

<script>
import axios from 'axios'
import { log } from 'util';
import fs from 'fs';

var filesList = new Array();
var currentFile = 0;
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
    this.videoElement = document.getElementById('player');
    // this.videoElement.src = ''
    this.videoElement.play();

    // fs.readFile('./videos/video1.mp4');
    // this.input = document.querySelector('input');
    // this.input.addEventListener('change', function(){
    //   for (let i = 0; i < this.files.length; i++) {
    //          filesList[i]=this.files[i];
    //     }
    //     this.videoElement = document.getElementById('player');
    //     this.videoElement.src = URL.createObjectURL(filesList[0]);
    //     this.videoElement.play();
       
    //      this.videoElement.onended = function() {
    //           console.log("The audio has ended");
    //           if (currentFile >= filesList.length)
    //             currentFile = 0;
    //           else
    //             currentFile++;
    //           this.videoElement = document.getElementById('player');
    //           console.log(currentFile);
              
    //           this.videoElement.src = URL.createObjectURL(filesList[currentFile]);
    //           this.videoElement.play();
    //       }
    // }, false)
  
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
   min-height : 100%
 }

</style>
