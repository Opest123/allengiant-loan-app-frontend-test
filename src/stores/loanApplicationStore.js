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
        },
        modalData: {
            visible: false,
            type: 'create'
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
        }
    }),
    getters: {
        tableData: (state) => {
            return state.data?.data || []
        },
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
                    this.loading = true

                    const response = await api.post('loan-applications', data)

                    if (this.data.length) {
                        this.data.data.unshift(response)
                        this.data.meta.total++
                    } else {
                        this.data = {
                            data: [response],
                            meta: { total: 1 }
                        }
                    }

                    this.loading = false
                    resolve(response)
                } catch (e) {
                    this.loading = false
                    reject(e)
                    return Promise.reject(e.response?.errors)
                }
            })
        },
    },
})
