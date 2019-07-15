<template>
  <div id="div-player" >
    <video loop id='player' width="1920" height="1080"  src="@/assets/video1.mp4" ></video> 
  </div>
</template>



<script>
import axios from 'axios'

export default {
  name: 'Player',
     components: {
    
    },
  data(){
    return {
      videosList : [{name: 'Video 1', url : '@/assets/video1.mp4', type: 'video/mp4' }],
      videoElement : null
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
    }
  },
  mounted(){
    //get the player element
    this.videoElement= document.getElementById('player');

    this.videoElement.play();
  //listeners for player
    this.videoElement.onended = function() {  
        console.log("The actually video has ended, play next video");
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style >
 #div-player{
   top: 0;
   left: 0;
   position: absolute;
 }

</style>
