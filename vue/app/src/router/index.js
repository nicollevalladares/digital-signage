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
            component: require('@/components/downloadFiles').default,
            props: true
        },
        {
            path: '/youtube',
            name: 'Youtube',
            component: require('@/components/Youtube').default,
            props: true
        },
        {
            path: '/weather',
            name: 'Weather',
            component: require('@/components/Weather').default,
            props: true
        },
        {
            path: '/marquee',
            name: 'Marquee',
            component: require('@/components/Marquee').default,
            props: true
        },
        {
            path: '/error',
            name: 'Error',
            component: require('@/components/error').default,
            props: true
        }
    ]
})


export default router;