import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
// import firebase from 'firebase'
// import router from './router'

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
    files: [],
    imagesDuration : '',
    idPlaylist: '',
    status: false,
    downloadFile: '',
    isDownloading: false
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
    // setProgress(state, progress){
    //   state.progress = progress;
    // },
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
    // startDownload (state , files){
    //   for (let i = 0; i < state.files.length; i++) {
    //     console.log('a descargar');
    //     console.log(state.files[i]);
    //   }
    // },
    // setDownloadFile(state, downloadFile){
    //   state.downloadFile = downloadFile;
    //   console.log(downloadFile);
      
    // },
    // setStateDownload(state, isDownloading){
    //   state.isDownloading = isDownloading;
    // },
    // saveFiles(state){
    //   // console.log('saveFiles');
    //   const files = state.files;

    //   files.forEach(file => {
    //     // console.log(file);
    //       if(file.status == false){
    //         var option = {
    //           filename: file.dataName,
    //           dir: 'files/files/',
    //           onDone: (info)=>{
    //               console.log('done', info);
    //               file.status = true;
    //               files.shift();
    //               // console.log('files: ');
    //               // console.log(files);

    //               // files.push(file)
    //               // console.log(files);
    //           },
    //           onError: (err) => {
    //               console.log('error', err);
    //           },
    //           onProgress: (curr, total) => {
    //               // console.log('progress', (curr / total * 100).toFixed(2) + '%');
    //               let progress = {
    //                 progress: (curr / total * 100).toFixed(2),
    //                 file: file.name}
                    
    //               state.progress = progress;
    //           },
    //         }
          
    //         dl(file.url, option);
    //       }
    //   })
    // }
  },
  actions: {
    getScreenInfo({commit}, payload){
      const uuid = payload.uuid;
      const idScreen = payload.idScreen
      // console.log(uuid);
      // console.log(idScreen);
      
      axios.get("http://connect.dev.hn/screens")
      .then(response => {
          response.data.forEach(doc => {
            if(doc.uuid === uuid){
              let screenInfo = {
                playlist: doc.configuration.defaultPlaylist,
                video: doc.configuration.defaultVideo
              };
              commit('setScreenInfo', screenInfo);

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
    },
    // saveFiles({commit}, payload){
    //   const file = payload.file;

    //   // console.log(file);
    //   commit('setStateDownload', true);
    //   var option = {
    //     filename: file.dataName,
    //     dir: 'files/files/',
    //     onDone: (info)=>{
    //         console.log('done', info);
    //         commit('setStateDownload', false);
    //         // let downloadFile = {
    //         //   save: true,
    //         //   id: file.id
    //         // }
    //         // commit('setDownloadFile', downloadFile)
    //     },
    //     onError: (err) => {
    //         console.log('error', err);
    //     },
    //     onProgress: (curr, total) => {
    //         // console.log('progress', (curr / total * 100).toFixed(2) + '%');
    //         let progress = {
    //           progress: (curr / total * 100).toFixed(2),
    //           file: file.name}
              
    //           commit('setProgress', progress);
    //     },
    //   }
    
    //   dl(file.url, option);
    // }
  },
  getters: {

  }
})
