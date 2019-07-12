<template>
    <div :style="style" ref="lavContainer"></div>
</template>

<script>
  import lottie from 'lottie-web';
  export default {
    props: {
      options: {
        type: Object,
        required: true
      },
      height: Number,
      width: Number,
    },
    data () {
      return {
        style: {
          width: this.width ? `${this.width}px` : '100%',
          height: this.height ? `${this.height}px` : '100%',
          overflow: 'hidden',
          margin: '0 auto'
        }
      }
    },
    mounted () {
      this.anim = lottie.loadAnimation({
          container: this.$refs.lavContainer,
          renderer: 'svg',
          loop: this.options.loop !== false,
          autoplay: this.options.autoplay !== false,
          animationData: this.options.animationData,
          name: this.options.animationName !== 'default',
          rendererSettings: this.options.rendererSettings
        }
      );
      this.$emit('animCreated', this.anim)
      this.anim.addEventListener('loopComplete', (e) => {
        // whenever the animation ends and restarts the loop
        this.$emit('animLoopComplete', this.anim)
      });
      this.anim.addEventListener('complete', (e) => {
        // when the animation ends
        this.$emit('animComplete', this.anim)
      });
      this.anim.addEventListener('enterFrame', (e) => {
        // whenever a new frame is displayed
        this.$emit('animEnterFrame', this.anim)
      });
      this.anim.addEventListener('segmentStart', (e) => {
        // whenever a segment defined via playSegments(segments, forceFlag) starts
        this.$emit('animSegmentStart', this.anim)
      });
      this.anim.addEventListener('config_ready', (e) => {
        // when initial config is done
        this.$emit('animConfigReady', this.anim)
      });
      this.anim.addEventListener('data_ready', (e) => {
        // when all parts of the animation have been loaded
        this.$emit('animDataReady', this.anim)
      });
      this.anim.addEventListener('data_failed', (e) => {
        // when part of the animation can not be loaded
        this.$emit('animDataFailed', this.anim)
      });
      this.anim.addEventListener('loaded_images', (e) => {
        // when all image loads have either succeeded or errored
        this.$emit('animLoadedImages', this.anim)
      });
      this.anim.addEventListener('DOMLoaded', (e) => {
        // when elements have been added to the DOM
        this.$emit('animDOMLoaded', this.anim)
      });
      this.anim.addEventListener('destroy', (e) => {
        // when lottie.destroy() is called to destroy and release resources. The DOM element will be emptied
        this.$emit('animDestroy', this.anim)
      });
    },
    destroyed(){
      this.anim.removeEventListener('loopComplete');
      this.anim.removeEventListener('complete');
      this.anim.removeEventListener('enterFrame');
      this.anim.removeEventListener('segmentStart');
      this.anim.removeEventListener('config_ready');
      this.anim.removeEventListener('data_ready');
      this.anim.removeEventListener('data_failed');
      this.anim.removeEventListener('loaded_images');
      this.anim.removeEventListener('DOMLoaded');
      this.anim.removeEventListener('destroy');
    }
  }
</script>