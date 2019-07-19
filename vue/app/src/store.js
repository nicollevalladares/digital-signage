import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
// import firebase from 'firebase'
// import router from './router'
const fs = require('fs')
const dl = require('download-file-with-progressbar');

Vue.use(Vuex)

// var firebaseConfig = {
//   apiKey: "AIzaSyAsjqIczn5XD0SuBSsmgaTfo1yEdnnJCDA",
//   authDomain: "bean-signage.firebaseapp.com",
//   databaseURL: "https://bean-signage.firebaseio.com",
//   projectId: "bean-signage",
//   storageBucket: "bean-signage.appspot.com",
//   messagingSenderId: "889184599823",
//   appId: "1:889184599823:web:e2a25c1ef4f2a881"
// };

// // Initialize Firebase
// firebase.initializeApp(firebaseConfig);

export default new Vuex.Store({
  state: {
    uuid:'',
    screen: '',
    key: '',
    progress: '',
    files: []
  },
  mutations: {
    setScreenInfo(state, screenInfo){
      state.screen = screenInfo;
    },
    // updateScreen(state, data){
    //   if(state.screen.id == data.idScreen){
    //       // doc.active = data.screen.active
    //     }
    // }
    setUUID(state, uuid){
      state.uuid = uuid;
    },
    setIdScreen(state, key){
      state.key = key;
    },
    setProgress(state, progress){
      state.progress = progress;
    },
    setFiles(state, files){
      state.files = files;
      // console.log(state.files);
     
    },
    saveFiles(state){
      // console.log('saveFiles');
      state.files.forEach(file => {
        // console.log(file);
          var option = {
            filename: file.dataName,
            dir: 'files/files/',
            onDone: (info)=>{
                console.log('done', info);
            },
            onError: (err) => {
                console.log('error', err);
            },
            onProgress: (curr, total) => {
                // console.log('progress', (curr / total * 100).toFixed(2) + '%');
                let progress = {
                  progress: (curr / total * 100).toFixed(2),
                  file: file.name}
                  
                state.progress = progress;
            },
          }
        
          var dd = dl(file.url, option);
      })

      // var option = {
      //   filename: state.screen.video.dataName,
      //   dir: 'files/defaultVideo/',
      //   onDone: (info)=>{
      //       console.log('done', info);
      //   },
      //   onError: (err) => {
      //       console.log('error', err);
      //   },
      //   onProgress: (curr, total) => {
      //       // console.log('progress', (curr / total * 100).toFixed(2) + '%');
      //       let progress = {
      //         progress: (curr / total * 100).toFixed(2),
      //         file: state.screen.video.name}
              
      //       state.progress = progress;
      //   },
      // }
    
      // var dd = dl(state.screen.video.url, option);

    }
  },
  actions: {
    getScreenInfo({commit}, payload){
      const uuid = payload.uuid;

      axios.get("http://connect.dev.hn/screens")
      .then(response => {
          response.data.forEach(doc => {
            if(doc.uuid == uuid){
              let screenInfo = {
                playlist: doc.configuration.defaultPlaylist,
                video: doc.configuration.defaultVideo
              };
              commit('setScreenInfo', screenInfo);

              axios.get("http://connect.dev.hn/playlists")
              .then(response => {
                response.data.forEach(doc => {
                  // console.log(doc);
                  const files = []
                  if(doc.id == screenInfo.playlist){
                    // console.log(doc.files);
                    doc.files.forEach(file => {
                      // console.log(file);
                      files.push(file)
                    })
                  
                    commit('setFiles', files)
                    commit('saveFiles')
                  }
                })
              })
              
              // var option = {
              //   filename: screenInfo.video.dataName,
              //   dir: 'files/defaultVideo/',
              //   onDone: (info)=>{
              //       console.log('done', info);
              //   },
              //   onError: (err) => {
              //       console.log('error', err);
              //   },
              //   onProgress: (curr, total) => {
              //       // console.log('progress', (curr / total * 100).toFixed(2) + '%');
              //       let progress = {
              //         progress: (curr / total * 100).toFixed(2),
              //         file: screenInfo.video.name}
                      
              //       commit('setProgress', progress);
              //   },
              // }
            
              // var dd = dl(screenInfo.video.url, option);
              
            }
          })
      })
    },
    // updateScreens({commit}, payload){
    //   const data = payload.data
    //   commit('updateScreen', data)
    // },
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
    }
  },
  getters: {

  }
})
