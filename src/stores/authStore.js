// stores/auth.js
import { defineStore } from 'pinia'
import web from '../utils/web.js'
import api from '../utils/api.js'
import router from '../router/index.js'
import { toast } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'

export const useAuthStore = defineStore('authStore', {
    state: () => ({
        loading: false,
        authenticated: false,
        user: {},
        token: null,
        loggingOut: false,
    }),
    getters: {
        getToken: (state) => {
            return state.token
        },
        getUser: (state) => {
            return state.user
        },
        getaAuthenticated: (state) => {
            return state.authenticated
        },
    },
    actions: {
        async login (credentials) {
            return new Promise(async (resolve, reject) => {
                await web.get('/sanctum/csrf-cookie')

                try {
                    this.loading = true

                    const response = await api.post('login', credentials)

                    if (response?.status === 204) {
                        return this.login(credentials)
                    } else {
                        const { access_token } = response?.data

                        if (access_token) {
                            this.token = access_token
                            this.attempt()

                            setTimeout(() => {
                                this.loading = false

                                toast.success('Login successfully')
                                router.push({ name: 'home' })
                            }, 1500)
                        }
                    }
                    resolve(response)
                } catch (e) {
                    this.loading = false
                    reject(e)

                    toast.error('Failed to login')
                    return Promise.reject(e.response?.errors)
                }
            })
        },
        async attempt () {
            return new Promise(async (resolve, reject) => {
                try {
                    let response = await api.get('user')

                    this.authenticated = true
                    this.user = response

                    resolve(response)
                    return response
                } catch (e) {
                    reject(e)
                    this.authenticated = false
                }
            })
        },
        async logout () {
            this.loggingOut = false

            api.post('logout').then((res) => {
                router.push({ name: 'login' })
                this.user = {}
                this.token = null
                this.authenticated = false
                localStorage.clear()
                sessionStorage.clear()
                // retrieve all cookies
                let Cookies = document.cookie.split(';')
                // set past expiry to all cookies
                for (let i = 0; i < Cookies.length; i++) {
                    document.cookie =
                        Cookies[i] + '=; expires=' + new Date(0).toUTCString()
                }

                toast.success('Logout successfully')

                this.loggingOut = true
            }).catch(e => {
                toast.error('Failed to Logout')
            })

        },
    },
    persist: {
        storage: sessionStorage,
        paths: [
            'token',
            'user',
            'authenticated'
        ],
    },
})
