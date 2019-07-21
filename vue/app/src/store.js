import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    uuid:'',
    screen: '',
    key: '',
    progress: '',
    files: [],
    imagesDuration : '',
    idPlaylist: '',
    status: false,
    downloadFile: '',
    isDownloading: false,
    youtubeUserConfig : {
        type : 'playlist',
        list : 'RDRK1K2bCg4J8',
        ytVideoId : 'R2vVrWsis6I'
    },
  },
  mutations: {
    setScreenInfo(state, screenInfo){
      state.screen = screenInfo;
    },
    setUUID(state, uuid){
      state.uuid = uuid;
    },
    setIdScreen(state, key){
      state.key = key;
    },
    setFiles(state, files){
      state.files = files;
      state.status = true;
    },
    setImagesDuration(state, imagesDuration){
      state.imagesDuration = imagesDuration;
    },
    setIdPlaylist(state, idPlaylist){
      state.idPlaylist = idPlaylist;
    },

  },
  actions: {
    getScreenInfo({commit}, payload){
      const uuid = payload.uuid;
      const idScreen = payload.idScreen;
      axios.post("http://connect.dev.hn/screens", {
        idScreen: idScreen
      })
      .then(response => {
        let files = response.data.data.files;
        let imagesDuration = response.data.data.imagesDuration;
        let idPlaylist = response.data.idPlaylist;        
        commit('setFiles', files)
        commit('setImagesDuration', imagesDuration)
        commit('setIdPlaylist', idPlaylist)
      })
      .catch(error => {
          console.log(error)
      });
    },
   
    getUUID({commit}){
      axios.get("http://localhost:3333/uuid")
      .then(response => {
       const uuid = response.data;
       commit('setUUID', uuid)
      })
    },
    getIdScreen({commit}){
      axios.get("http://connect.dev.hn/screens/generateKey")
      .then(response => {
        const key = response.data
        commit('setIdScreen', key)
      })
    },
  },
  getters: {

  }
})
