<template>
    <div>
        <div class="mx-auto px-4 sm:px-6 lg:px-8">
            <div class="grid grid-cols-12 gap-4 items-center">
                <div class="col-span-12 lg:col-span-10 grid grid-cols-3 gap-4">
                    <div
                        class="col-span-3 lg:col-span-1"
                    >
                        <base-input
                            v-model="filters.search"
                            name="search"
                            id="search"
                            placeholder="Search..."
                        />
                    </div>

                    <select-menu
                        v-model="filters.vehicle_type"
                        :items="vehicleTypes"
                        label="Select vehicle type"
                        class="col-span-3 lg:col-span-1"
                    />

                    <select-menu
                        v-model="filters.status"
                        :items="statusOptions"
                        label="Select status"
                        class="col-span-3 lg:col-span-1"
                    />
                </div>
                <div class="col-span-12 lg:col-span-2">
                    <button
                        type="button"
                        class="cursor-pointer capitalize block w-full rounded-xl bg-indigo-600 px-3 py-3 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 dark:bg-indigo-500 dark:hover:bg-indigo-400 dark:focus-visible:outline-indigo-500"
                        @click="handleModalVisibility(null)"
                    >
                        create loan app
                    </button>
                </div>
            </div>
        </div>

        <loan-app-modal/>
    </div>
</template>

<script setup>
import { inject } from 'vue'
import SelectMenu from '../../../components/select-menu.vue'
import LoanAppModal from '../components/modal/loan-app-modal.vue'
import BaseInput from '../../../components/base-input.vue'

const filters = inject('filters')
const vehicleTypes = inject('vehicleTypes')
const statusOptions = inject('statusOptions')
const handleModalVisibility = inject('handleModalVisibility')
</script>
