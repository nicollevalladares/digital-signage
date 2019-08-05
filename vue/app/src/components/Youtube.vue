<template>
  <div id="div-yt">
       <!-- <vytia-player ref="yt"
          :ytid=" this.youtubeUserConfig.ytVideoId"
          :playerVars ="{
            'listType': this.youtubeUserConfig.type, 
            'list': this.youtubeUserConfig.list,
            'controls': 0,
            'modestbranding': 0,
            'iv_load_policy': 3,
            'showinfo': 0,
            'autoplay': 1
            }" 
            :width ="this.$vssWidth" 
            :height="this.$vssHeight"
            @ready="onPlayerReady"
            @error ="handleError"
             >
        </vytia-player>  -->
        <youtube-playlist ref="yt" :videos="arrayOfVideos" aspect-ratio="100:50"/>
      <marquee v-if="this.marqueeActive"/>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import VueScreenSize from 'vue-screen-size'
import marquee from './Marquee'
import axios from 'axios'

export default {
    name: 'Youtube',
    mixins: [VueScreenSize.VueScreenSizeMixin],
      components: {
        marquee
    },
    data(){
        return {
            arrayOfVideos : [
                {
                    url: 'https://www.youtube.com/watch?v=6JLs8M153Uw',
                    config: {
                        autoplay: 1,
                        color: 'white',
                        // You can use any params from https://developers.google.com/youtube/player_parameters#Manual_IFrame_Embeds
                    }
                }
            ]
        }
  },
  sockets: {

    },
   methods :{
     onPlayerReady () {
      //  console.log(this.$refs.yt.player);
       var that = this;
        setTimeout (function(){
          that.$refs.btn.click(); 
        },3000)
      // you have access to the ref here
      // this.$refs.yt.player.playVideo();

    
      // you can see the full list of methods available here
      // https://developers.google.com/youtube/iframe_api_reference?hl=fr#Playback_controls
    },
    handleError (e){
        console.log('ssssssssssssss');
        
    },
    play (){
       this.$refs.yt.player.playVideo();
 
    }
  },
   computed: {
      ...mapState(['youtubeUserConfig','key', 'marqueeActive'])
  },
  created(){
      this.sockets.subscribe(this.key.key.toString(), (data) => {
             if (data.type=='general'){
                this.getScreenInfo({uuid: this.uuid, idScreen: this.key.key})
               if(data.data.appSelected != 'Youtube')
                  this.sockets.unsubscribe(this.key.key.toString());
            }
        })
  },

  mounted (){
    console.log(this.$refs.yt.$refs);
    
  }
}

</script>

<style scoped>
 /* vytia-player{
    top: 0;
    left: 0;
    position: absolute;
    overflow: hidden;
    max-height: 100%;
    min-height : 100%;
    max-width: 100%;
    min-width : 100%;
 } */
 #div-yt {
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

</style>
