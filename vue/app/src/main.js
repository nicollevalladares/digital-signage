import Vue from 'vue'
import App from './App.vue'
import jsonconfig from '../config.json'
import router from './router'
import store from './store'
import VueSocketIO from 'vue-socket.io'
import VuePlayerPlugin from 'vue-youtube-iframe-api'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css' // Ensure you are using css-loader


Vue.config.productionTip = false

var ELECTRON_DETECTED = (window && window.process && window.process.type) == 'renderer'

let tmpConfig
if (ELECTRON_DETECTED) {
  const { remote } = require('electron')
  let currentWindow = remote.getCurrentWindow()
  tmpConfig = currentWindow.configuration ? Object.assign({}, currentWindow.configuration) : jsonconfig
} else {
  tmpConfig = jsonconfig
}
export const config = tmpConfig

Vue.use(VuePlayerPlugin, {
  loadComponent : true // create the global player component <vytia-player></vytia-player>
})
Vue.use(Vuetify)
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
}).$mount('#app')

Vue.use(new VueSocketIO({
  debug: true,
  connection: 'http://connect.beanage.dev.hn',
  vuex: {
      store,
      actionPrefix: 'SOCKET_',
      mutationPrefix: 'SOCKET_'
  },
  // options: { path: "/my-app/" } //Optional options
}))