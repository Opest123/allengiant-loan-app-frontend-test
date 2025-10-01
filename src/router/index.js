import { createRouter, createWebHistory } from 'vue-router'

import { useAuthStore } from '../stores/authStore.js'

import Layout from '../views/layout/index.vue'
import LoginView from '../views/auth/LoginView.vue'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/login',
            name: 'login',
            component: LoginView,
        },
        {
            path: '/',
            component: Layout,
            meta: { requiresAuth: true },
            children: [
                {
                    path: '',
                    component: HomeView,
                    name: 'home'
                }
            ]
        },
    ],
})

router.beforeEach((to, from, next) => {
    const authStore = useAuthStore()
    const token = authStore.getToken

    const isAuthenticated = !!token

    if (to.meta.requiresAuth && !isAuthenticated) {
        next({ name: 'login' })
    } else if (to.name === 'login' && isAuthenticated) {
        next({ name: 'home' })
    } else {
        next()
    }
})

export default router
