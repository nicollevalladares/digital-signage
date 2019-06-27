<template>
  <div class="hello">
    <input style="display: none" type="text" id="listDirTxt">
      <input style="display: none" type="text" id="rmVideo">
      <div id="container">
        <div id="header">
          <h1>Digital Signage</h1>
          <div id="log"></div>
        </div>
      </div>
      <div id="logo-container">
        <!-- <img style="width: 250px; height:250px;" src="./img/loading.svg"> -->
        <!-- <progress value="6" max="10"></progress> -->
        <div style="color: white;" id="output"></div>
      </div>
      <div id="fade"></div>
      <video id="video" autoplay src=""></video>

      <div id="newScreen">
        <br>
        <h2 id="newScreenTitle">CONFIGURACIÓN DE NUEVA PANTALLA</h2>
        <h3 id="newScreenDescription">Esta pantalla no está vinculada a ninguna cuenta en digitalSignage </h3>
        <h3>dirígase a <span style="color: rgb(21, 21, 192)">www.digitalsignage.com/addScreen</span> e ingrese el siguiente código para realizar la configuración</h3>
        <div id="code">----------</div>
        <h3 id="qr-text">o escanee el siguiente código QR:</h3>
        <br>
        <img id="barCode" src="" >
		</div>
    <!-- <h1>{{ msg }}</h1>
    <p>
      For guide and recipes on how to configure / customize this project,<br>
      check out the
      <a href="https://cli.vuejs.org" target="_blank" rel="noopener">vue-cli documentation</a>.
    </p>
    <h3>Installed CLI Plugins</h3>
    <ul>
      <li><a href="https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-babel" target="_blank" rel="noopener">babel</a></li>
      <li><a href="https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-eslint" target="_blank" rel="noopener">eslint</a></li>
    </ul>
    <h3>Essential Links</h3>
    <ul>
      <li><a href="https://vuejs.org" target="_blank" rel="noopener">Core Docs</a></li>
      <li><a href="https://forum.vuejs.org" target="_blank" rel="noopener">Forum</a></li>
      <li><a href="https://chat.vuejs.org" target="_blank" rel="noopener">Community Chat</a></li>
      <li><a href="https://twitter.com/vuejs" target="_blank" rel="noopener">Twitter</a></li>
      <li><a href="https://news.vuejs.org" target="_blank" rel="noopener">News</a></li>
    </ul>
    <h3>Ecosystem</h3>
    <ul>
      <li><a href="https://router.vuejs.org" target="_blank" rel="noopener">vue-router</a></li>
      <li><a href="https://vuex.vuejs.org" target="_blank" rel="noopener">vuex</a></li>
      <li><a href="https://github.com/vuejs/vue-devtools#vue-devtools" target="_blank" rel="noopener">vue-devtools</a></li>
      <li><a href="https://vue-loader.vuejs.org" target="_blank" rel="noopener">vue-loader</a></li>
      <li><a href="https://github.com/vuejs/awesome-vue" target="_blank" rel="noopener">awesome-vue</a></li>
    </ul> -->
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
