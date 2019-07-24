<template>
    <v-container>
        <div id="newScreen">
            <!-- <v-btn :to="{name: 'Player'}" color="error">player</v-btn> -->
            <!-- <v-btn :to="{name: 'Weather'}" color="success">Weather</v-btn>  -->
            <div v-if="!scanned">
                <div id="newScreenTitle">CONFIGURACIÓN DE NUEVA PANTALLA</div>
                <hr>
                <div id="newScreenDescription">Esta pantalla no está vinculada a ninguna cuenta en Digital Signage. Diríjase a <span id="url">www.digitalsignage.com/configuration</span> e ingrese el siguiente código para realizar la configuración:</div>
                <div id="idScreen">{{this.idScreen}}</div>
                <div  class="qr-text">o escanee el siguiente código QR:</div>
                <v-container id="barCode"><img id="imgCode" :src="src"></v-container>
            </div>

            <div v-if="scanned && !configured">
                <img class="icon-waiting" src="../assets/loading.svg">
                    <div class="waiting">Esperando Configuración</div>
            </div>
        </div>
    </v-container>
</template>



<script>
import axios from 'axios'
import { mapActions, mapState } from 'vuex'
// import screenshot from 'screenshot-desktop'

export default {
    name: 'AddScreen',
    components: {
    
    },
    props: ['idScreen'],
    data(){
        return {
            src: null,
            scanned: false,
            configured: false
        }
    },
    sockets: {
        connect: function () {
            // console.log('socket connected')
        },
        customEmit: function (data) {
            // console.log('this method was fired by the socket server. eg: io.emit("customEmit", data)')
        }
    },
    methods: {
        ...mapActions(['getUUID', 'getScreenInfo'])
    },
    created(){
        this.getUUID(),
        this.sockets.subscribe(this.idScreen.toString(), (data) => {
            if (data.type=='scanned'){
                this.scanned = true
            }
            else if(data.type=='configured'){
                console.log('configurado');
                
                this.getScreenInfo({uuid: this.uuid, idScreen: this.idScreen})
                
                // this.$router.push({name: this.appSelected || 'DownloadFiles'})
            }

            
            // store.dispatch('updateScreens',{ data })
        }),
        // screenshot({ filename: 'demo.png' })
        // this.getScreenInfo({id: this.uuid}),
        this.src = "https://chart.googleapis.com/chart?chs=500x500&cht=qr&chl=http://beanage.dev.hn/apps/" + this.idScreen
    },
    updated(){
     
    },
    computed: {
      ...mapState(['uuid', 'screen', 'files', 'key', 'appSelected'])
    }
}
</script>

<style>
    #newScreen{
        color: white;
        margin-top: 1%;
        text-align: center;
    }

    #newScreen h1{
        margin: 20px;
        font-size: 40px;
    }

    #newScreen h3{
        font-size: 30px;
    }
    
    #url{
        color: rgb(0, 0, 107);
    }

    #idScreen{
        font-style: italic;
        background-color: white;
        border-radius: 5px;
        color: rgb(7, 7, 7);
        width: 30%;
        margin-left: auto;
        margin-right: auto;
        padding: 5px;
        margin-bottom: 5px;
        margin-top: 10px;
        font-size: 2vw;
        font-weight: bold
    }
    #newScreenTitle{
          letter-spacing: 10px;
          top: 0;
          font-size: 2vw;
    }
    #newScreenDescription {
        font-size: 2vw;
        text-align: justify;
        margin: 5%;
        margin-top: 40px;
        margin-bottom: 20px;
    }
    .qr-text {
        text-align: center;
        font-size: 1.8vw;
        margin: 10%;
        margin-top: 10px;
        margin-bottom: 20px;
    }

    #barCode{
        bottom: 0;
    }
    #imgCode{
        width: 20vw;
        height: 20vw;
    }

    .waiting{
        font-size: 2.5vw;
        letter-spacing: 10px;
        text-align: center
    }

    .icon-waiting{
        width: 20vw;
        height: 20vw;
    }

</style>

