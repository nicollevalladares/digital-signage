import Vue from 'vue'
import App from './App.vue'
import jsonconfig from '../config.json'
import router from './router'

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

new Vue({
  el: '#app',
  router,
  // store,
  render: h => h(App)
}).$mount('#app')
