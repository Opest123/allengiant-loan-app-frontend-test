import axios from 'axios'
import { host } from './settings.js'

const web = axios.create({
    baseURL: `${host}/`,
    headers: {
        'X-Requested-With': 'XMLHttpRequest',
    },
    withCredentials: true,
    withXSRFToken: true,
})

export default web
