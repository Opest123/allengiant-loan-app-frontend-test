// stores/auth.js
import { defineStore } from 'pinia'
import api from '../utils/api.js'

export const useLoanApplicationStore = defineStore('loanApplicationStore', {
    state: () => ({
        loading: false,
        data: {},
        filters: {
            search: '',
            vehicle_type: '',
            status: '',
            page: 1,
            per_page: 10
        },
        modalData: {
            visible: false,
            type: 'create',
            loading: false
        },
        form: {
            applicant_full_name: '',
            email: '',
            phone: '',
            date_of_birth: '',
            vehicle_type: '',
            vehicle_make: '',
            vehicle_model: '',
            purchase_price: '',
            deposit_amount: '',
            term_months: '',
            status: 'submitted',
            consent_to_credit_check: false,
        },
    }),
    getters: {
        tableData: (state) => {
            return state.data?.data || []
        },
        defaultForm () {
            return {
                applicant_full_name: '',
                email: '',
                phone: '',
                date_of_birth: '',
                vehicle_type: '',
                vehicle_make: '',
                vehicle_model: '',
                purchase_price: '',
                deposit_amount: '',
                term_months: '',
                status: 'submitted',
                consent_to_credit_check: false,
            }
        }
    },
    actions: {
        async fetchLoanApplications (data) {
            return new Promise(async (resolve, reject) => {
                try {
                    this.loading = true

                    const response = await api.get('loan-applications', {
                        params: {
                            ...data
                        }
                    })

                    this.data = response?.data

                    this.loading = false

                    resolve(response)
                } catch (e) {
                    this.loading = false
                    reject(e)
                    return Promise.reject(e.response?.errors)
                }
            })
        },
        async storeLoanApplication (data) {
            return new Promise(async (resolve, reject) => {
                try {
                    this.modalData.loading = true

                    const response = await api.post('loan-applications', data)

                    const { data } = response

                    if (this.data.length) {
                        this.data.data.unshift(data)
                        this.data.meta.total++
                    } else {
                        this.data = {
                            data: [response],
                            meta: { total: 1 }
                        }
                    }

                    this.modalData.loading = false
                    this.modalData.visible = false
                    resolve(response)
                } catch (e) {
                    this.modalData.loading = false
                    reject(e)
                    return Promise.reject(e.response?.errors)
                }
            })
        },
        async updateLoanApplication (data) {
            return new Promise(async (resolve, reject) => {
                try {
                    this.modalData.loading = true

                    const response = await api.patch(`loan-applications/${data?.id}`, data)

                    const findLoanApp = this.data.data.find(item => item.id === data?.id)

                    if (findLoanApp) Object.assign(findLoanApp, response.data)

                    this.modalData.loading = false
                    this.modalData.visible = false
                    resolve(response)
                } catch (e) {
                    this.modalData.loading = false
                    reject(e)
                    return Promise.reject(e.response?.errors)
                }
            })
        },
        async deleteLoanApplication (data) {
            return new Promise(async (resolve, reject) => {
                try {
                    this.modalData.loading = true
                    const id = data?.id

                    const response = await api.delete(`loan-applications/${id}`)

                    this.data.data = this.data.data.filter(item => item.id !== id)
                    this.data.meta.total--

                    this.modalData.loading = false
                    resolve(response)
                } catch (e) {
                    this.modalData.loading = false
                    reject(e)
                    return Promise.reject(e.response?.errors)
                }
            })
        },
    },
})
