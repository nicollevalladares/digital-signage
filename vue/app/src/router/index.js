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
            component: require('@/components/AddScreen').default
        },
    ]
})


export default router;