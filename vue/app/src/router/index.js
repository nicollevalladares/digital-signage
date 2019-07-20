import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const router =  new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            name: 'Preloader',
            component: require('@/components/Preloader').default
        },
        {
            path: '/landingPage',
            name: 'LandingPage',
            component: require('@/components/LandingPage').default
        },
        {
            path: '/addScreen',
            name: 'AddScreen',
            component: require('@/components/AddScreen').default,
            props: true
        },
        {
            path: '/player',
            name: 'Player',
            component: require('@/components/player').default
        },
        {
            path: '/downloadFiles',
            name: 'DownloadFiles',
<<<<<<< HEAD
            component: require('@/components/downloadFiles').default
        },
        {
            path: '/youtube',
            name: 'Youtube',
            component: require('@/components/Youtube').default
=======
            component: require('@/components/downloadFiles').default,
            props: true
>>>>>>> 22ed60814ab4a6d1591296e6357d97cfc37d74a6
        }
    ]
})


export default router;