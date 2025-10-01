<template>
    <div>
        <skeleton v-if="loading && !tableData.length">
            <div class="flex-1 space-y-8 py-1">
                <div class="grid grid-cols-4 gap-4">
                    <div class="h-12 col-span-4 lg:col-span-1 rounded bg-slate-200"></div>
                    <div class="h-12 col-span-4 lg:col-span-1 rounded bg-slate-200"></div>
                    <div class="h-12 col-span-4 lg:col-span-1 rounded bg-slate-200"></div>
                    <div class="h-12 col-span-4 lg:col-span-1 rounded bg-slate-200"></div>
                </div>
                <div class="h-24 w-full rounded bg-slate-200"></div>
            </div>
        </skeleton>

        <div v-else>
            <loan-application-filters/>
            <loan-application-table/>
        </div>
    </div>
</template>

<script setup>
import { computed, onMounted, provide, watch } from 'vue'

import LoanApplicationTable from './components/loan-application-table.vue'
import LoanApplicationFilters from './components/loan-application-filters.vue'
import { useLoanApplicationStore } from '../../stores/loanApplicationStore.js'
import Skeleton from '../../components/skeleton.vue'

import vehicleData from '../../data/vehicles.json'

const statusOptions = ['submitted', 'in review', 'approved', 'declined']

let debounceTimer = null
let loanApplicationStore = useLoanApplicationStore()

const filters = computed(() => {
    return loanApplicationStore.filters
})
const modalData = loanApplicationStore.modalData

const form = computed(() => {
    return loanApplicationStore.form
})
const loading = computed(() => {
    return loanApplicationStore.loading
})
const modalDataLoading = computed(() => {
    return loanApplicationStore.modalData.loading
})
const tableData = computed(() => {
    return loanApplicationStore.tableData
})
const links = computed(() => {
    return {
        meta: loanApplicationStore.data?.meta,
        links: loanApplicationStore.data?.links,
    }
})

// Vehicle type options
const vehicleTypes = Object.keys(vehicleData)

const handleModalVisibility = (data = null) => {
    loanApplicationStore.form = data ? data :loanApplicationStore.defaultForm
    modalData.visible = !modalData.visible
}

provide('filters', filters)
provide('modalData', modalData)
provide('form', form)
provide('vehicleTypes', vehicleTypes)
provide('loading', loading)
provide('modalDataLoading', modalDataLoading)
provide('tableData', tableData)
provide('statusOptions', statusOptions)
provide('links', links)
provide('handleModalVisibility', handleModalVisibility)

onMounted(() => {
    // Fetch loan application
    loanApplicationStore.fetchLoanApplications(loanApplicationStore.filters)
})

watch(
    filters,
    (newVal) => {
        clearTimeout(debounceTimer)
        debounceTimer = setTimeout(() => {
            loanApplicationStore.fetchLoanApplications(newVal)
        }, 500)
    },
    { deep: true }
)
</script>
