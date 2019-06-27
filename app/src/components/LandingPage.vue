<template>
  <div>
    {{uuid}}
  </div>
</template>

<script>
export default {
  name: 'LandingPage',
  data(){
    return {
      uuid : RESIN_DEVICE_UUID
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
