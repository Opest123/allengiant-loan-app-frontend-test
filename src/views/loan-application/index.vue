<template>
    <div>
        <loan-application-filters/>
        <loan-application-table/>
    </div>
</template>

<script setup>
import { provide } from 'vue'

import LoanApplicationTable from './components/loan-application-table.vue'
import LoanApplicationFilters from './components/loan-application-filters.vue'
import { useLoanApplicationStore } from '../../stores/loanApplicationStore.js'
import vehicleData from '../../data/vehicles.json'

const loanApplicationStore = useLoanApplicationStore()

const filters = loanApplicationStore.filters
const modalData = loanApplicationStore.modalData
const form = loanApplicationStore.form
const loading = loanApplicationStore.loading

// Vehicle type options
const vehicleTypes = Object.keys(vehicleData)

provide('filters', filters)
provide('modalData', modalData)
provide('form', form)
provide('vehicleTypes', vehicleTypes)
provide('loading', loading)
</script>
