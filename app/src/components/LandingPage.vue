<template>
  <div>
    <h2>UUID: {{uuid}}</h2>
  </div>
</template>

<script>
export default {
  name: 'LandingPage',
  data(){
    return {
      uuid : process.env.RESIN_DEVICE_UUID || 'No UUID - Development Machine'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
