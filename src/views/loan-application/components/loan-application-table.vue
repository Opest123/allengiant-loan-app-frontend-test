<template>
    <div class="px-4 sm:px-6 lg:px-8">
        <div class="-mx-4 mt-8 sm:-mx-0">
            <table class="min-w-full divide-y divide-gray-300 dark:divide-white/15">
                <thead>
                <tr>
                    <th scope="col"
                        class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0 dark:text-white">
                        Id
                    </th>
                    <th scope="col"
                        class="hidden py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0 sm:table-cell dark:text-white">
                        Name
                    </th>
                    <th scope="col"
                        class="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 sm:table-cell dark:text-white">
                        Email
                    </th>
                    <th scope="col"
                        class="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 sm:table-cell dark:text-white">
                        Make/Model
                    </th>
                    <th scope="col"
                        class="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 lg:table-cell dark:text-white">
                        Price
                    </th>
                    <th scope="col"
                        class="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 lg:table-cell dark:text-white">
                        Term
                    </th>
                    <th scope="col"
                        class="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 lg:table-cell dark:text-white">
                        Status
                    </th>
                    <th scope="col"
                        class="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 lg:table-cell dark:text-white">
                        Submitted At
                    </th>
                    <th scope="col" class="py-3.5 pl-3 pr-4 sm:pr-0">
                        <span class="sr-only">Edit</span>
                    </th>
                </tr>
                </thead>
                <tbody class="divide-y divide-gray-200 bg-white dark:divide-white/10 dark:bg-gray-900">
                <tr v-for="data in tableData" :key="data.id">
                    <td class="w-full max-w-0 py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:w-auto sm:max-w-none sm:pl-0 dark:text-white">
                        {{ data.id }}
                        <dl class="font-normal lg:hidden">
                            <dt class="sr-only">Title</dt>
                            <dd class="mt-1 truncate text-gray-700 dark:text-gray-300">{{ data.name }}</dd>
                            <dt class="sr-only sm:hidden">Email</dt>
                            <dd class="mt-1 truncate text-gray-500 sm:hidden dark:text-gray-400">{{ data.email }}</dd>
                            <dt class="sr-only sm:hidden">Make/Model</dt>
                            <dd class="mt-1 truncate text-gray-500 sm:hidden dark:text-gray-400">
                                {{ data.vehicle_make }}: {{ data.vehicle_model }}
                            </dd>
                            <dt class="sr-only sm:hidden">Price</dt>
                            <dd class="mt-1 truncate text-gray-500 sm:hidden dark:text-gray-400">{{
                                    data.purchase_price
                                }}
                            </dd>
                            <dt class="sr-only sm:hidden">Term</dt>
                            <dd class="mt-1 truncate text-gray-500 sm:hidden dark:text-gray-400">{{ data.term_months }}
                                Months
                            </dd>
                            <dt class="sr-only sm:hidden">Status</dt>
                            <dd class="mt-1 truncate text-gray-500 sm:hidden dark:text-gray-400">
                                {{ data.status }}
                            </dd>
                        </dl>
                    </td>
                    <td class="hidden px-3 py-4 text-sm text-gray-500 lg:table-cell dark:text-gray-400">
                        {{
                            data.applicant_full_name
                        }}
                    </td>
                    <td class="hidden px-3 py-4 text-sm text-gray-500 sm:table-cell dark:text-gray-400">
                        {{
                            data.email
                        }}
                    </td>
                    <td class="hidden px-3 py-4 text-sm text-gray-500 sm:table-cell dark:text-gray-400">
                        {{ data.vehicle_make }}: {{ data.vehicle_model }}
                    </td>
                    <td class="hidden px-3 py-4 text-sm text-gray-500 sm:table-cell dark:text-gray-400">
                        {{ data.purchase_price }}
                    </td>
                    <td class="hidden px-3 py-4 text-sm text-gray-500 lg:table-cell dark:text-gray-400">
                        {{ data.term_months }} Months
                    </td>
                    <td class="hidden px-3 py-4 text-sm text-gray-500 lg:table-cell dark:text-gray-400">
                        {{ data.status }}
                    </td>
                    <td class="hidden lg:table-cell px-3 py-4 text-sm text-gray-500 dark:text-gray-400">
                        {{
                            formatDate(data.submitted_at, 'DD MMM YYYY, h:mm A')
                        }}
                    </td>
                    <td class="py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0 space-x-4">
                        <button
                            @click="handleModalVisibility(data)"
                            class="cursor-pointer text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300"
                        >
                            <EyeIcon class="size-6" aria-hidden="true"/>
                            <span class="sr-only">, {{ data.name }}</span>
                        </button>

                        <button
                            @click="loanApplicationStore?.deleteLoanApplication(data)"
                            class="cursor-pointer text-red-500 hover:text-indigo-900 dark:text-red-400 dark:hover:text-red-300"
                        >
                            <TrashIcon class="size-6" aria-hidden="true"/>
                            <span class="sr-only">, {{ data.name }}</span>
                        </button>
                    </td>
                </tr>
                </tbody>
            </table>
        </div>

        <base-pagination
            @page-changed="handlePageChange"
        />
    </div>
</template>

<script setup>
import { TrashIcon, EyeIcon } from '@heroicons/vue/24/outline'
import { inject } from 'vue'
import { formatDate } from '../../../utils/format-date.js'
import BasePagination from '../../../components/base-pagination.vue'
import { useLoanApplicationStore } from '../../../stores/loanApplicationStore.js'

const tableData = inject('tableData')
const handleModalVisibility = inject('handleModalVisibility')
const filters = inject('filters')
let loanApplicationStore = useLoanApplicationStore()

const handlePageChange = (data) => {
    filters.value.page = data
}
</script>
