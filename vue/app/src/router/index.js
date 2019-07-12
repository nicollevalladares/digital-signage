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
            component: () => import('@/components/Preloader.vue')
        },
        {
            path: '/landingPage',
            name: 'LandingPage',
            component: () => import('@/components/LandingPage.vue')
        },
        {
            path: '/addScreen',
            name: 'AddScreen',
            component: () => import('@/components/AddScreen.vue')
        },
    ]
})


export default router;