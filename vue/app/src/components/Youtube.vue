<template>
  <div id="div-yt">
       <vytia-player 
       :ytid=" this.youtubeUserConfig.ytVideoId"
       :playerVars ="{
        'listType': this.youtubeUserConfig.type, 
        'autoplay': 1, 
        'list': this.youtubeUserConfig.list,
        'controls': 0,
        'modestbranding': 0,
        'iv_load_policy': 0,
        'showinfo': 0,
        'version': 3, }" 
        :width ="this.$vssWidth" 
        :height="this.$vssHeight">
        </vytia-player> 
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import VueScreenSize from 'vue-screen-size'

export default {
    name: 'Youtube',
    mixins: [VueScreenSize.VueScreenSizeMixin],
    components: {
        
    },
    data(){
        return {
      
        }
  },
   computed: {
      ...mapState(['youtubeUserConfig'])
  }
}

</script>

<style scoped>
 vytia-player{
    top: 0;
    left: 0;
    position: absolute;
    overflow: hidden;
    max-height: 100%;
    min-height : 100%;
    max-width: 100%;
    min-width : 100%;
 }
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
