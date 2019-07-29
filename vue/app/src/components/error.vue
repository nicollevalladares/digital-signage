<template>
    <v-container>
        <div id="newScreen">
              <div>
                <div id="newScreenTitle">No hay conexión a internet</div>
                <hr>
                <div id="newScreenDescription">Al parecer no hay ninguna conexión a internet disponible, conecte un cable de red al dispositivo para completar la descarga de archivos.</div>
            </div>
        </div>
    </v-container>
</template>



<script>
import axios from 'axios'
import { mapActions, mapState } from 'vuex'
// import screenshot from 'screenshot-desktop'

export default {
    name: 'Error',
    data(){
        return {
         
        }
    },
 
    methods: {
        ...mapActions([''])
    },
    created(){
     
    },
    computed: {
      ...mapState([''])
    }
}
</script>

<style>
    #newScreen{
        color: white;
        margin-top: 1%;
        text-align: center;
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
</style>