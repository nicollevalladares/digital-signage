<template>
    <div id="newScreen">
        <button>
            <router-link :to="{name: 'Player'}">Player</router-link>
        </button>
        <h1 id="newScreenTitle">CONFIGURACIÓN DE NUEVA PANTALLA</h1>
        <hr>
        <h3 id="newScreenDescription">Esta pantalla no está vinculada a ninguna cuenta en Digital Signage.</h3>
        <h3>Diríjase a <span id="url">www.digitalsignage.com/configuration</span> e ingrese el siguiente código para realizar la configuración</h3>
        <div id="idScreen">1695805997</div>
        <h3 id="qr-text">o escanee el siguiente código QR:</h3>
        <br>
        <img id="barCode" :src="src" >
    </div>
</template>



<script>
import axios from 'axios'

export default {
    name: 'AddScreen',
    components: {
    
    },
    data(){
        return {
            src: null
        }
    },
    methods: {
    },
    created(){
        this.src = "https://chart.googleapis.com/chart?chs=250x250&cht=qr&chl=http://signage.dev.hn/configQR/1695805997";
    }
}
</script>

<style>
    #newScreen{
        color: white;
    }

    #url{
        color: rgb(0, 0, 107);
    }

    #idScreen{
        font-style: italic;
    }

</style>
