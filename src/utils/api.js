import axios from 'axios'
import { useAuthStore } from '../stores/authStore.js'

const api = axios.create({
    baseURL: `${import.meta.env.VITE_API_URL}/api`,
    headers: {
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
    },
    withCredentials: true,
    withXSRFToken: true,
})

api.interceptors.request.use(async (config) => {
    const authStore = useAuthStore()
    const token = authStore.getToken

    config.headers.Authorization = `Bearer ${token}`

    return config

}, (error) => {
    return Promise.reject(error)
})

export default api
