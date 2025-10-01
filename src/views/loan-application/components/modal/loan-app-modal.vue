<template>
    <div>
        <TransitionRoot as="template" :show="modalData.visible">
            <Dialog class="relative z-10" :unmount="false">
                <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0" enter-to=""
                                 leave="ease-in duration-200" leave-from="" leave-to="opacity-0">
                    <div class="fixed inset-0 bg-gray-500/75 transition-opacity dark:bg-gray-900/50"/>
                </TransitionChild>

                <div class="fixed inset-0 z-10 w-screen overflow-y-auto">
                    <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                        <TransitionChild as="template" enter="ease-out duration-300"
                                         enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                                         enter-to=" translate-y-0 sm:scale-100" leave="ease-in duration-200"
                                         leave-from=" translate-y-0 sm:scale-100"
                                         leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
                            <DialogPanel
                                class="relative transform overflow-auto rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-4xl sm:p-6 dark:bg-gray-800 dark:outline dark:outline-1 dark:-outline-offset-1 dark:outline-white/10 max-h-[calc(100vh-200px)]"
                            >
                                <div class="absolute right-0 top-0 hidden pr-4 pt-4 sm:block">
                                    <button type="button"
                                            class="cursor-pointer rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-indigo-600 dark:bg-gray-800 dark:hover:text-gray-300 dark:focus:outline-white"
                                            @click="modalData.visible = false">
                                        <span class="sr-only">Close</span>
                                        <XMarkIcon class="size-6" aria-hidden="true"/>
                                    </button>
                                </div>

                                <div class="sm:flex sm:items-start">
                                    <div class="mt-3 text-center sm:mt-0 sm:text-left">
                                        <DialogTitle
                                            as="h3"
                                            class="capitalize text-xl font-semibold text-gray-900 dark:text-white"
                                        >
                                            {{ title }}
                                        </DialogTitle>
                                    </div>
                                </div>

                                <form
                                    class="my-8 space-y-4 grid grid-cols-2 gap-4 overflow-visible"
                                    @submit.prevent="submit"
                                >
                                    <div class="flex flex-col space-y-3">
                                        <label
                                            for="applicant_full_name"
                                            class="block text-sm/6 font-medium text-gray-900 dark:text-gray-100"
                                        >
                                            Applicant Name
                                        </label>

                                        <base-input
                                            v-model="applicant_full_name"
                                            name="applicant_full_name"
                                            id="applicant_full_name"
                                            placeholder="Name..."
                                            :disabled="!!form.id || modalDataLoading"
                                        />

                                        <base-error v-if="errors?.applicant_full_name"
                                                    :value="errors?.applicant_full_name"/>
                                    </div>

                                    <div class="flex flex-col space-y-3">
                                        <label
                                            for="email"
                                            class="block text-sm/6 font-medium text-gray-900 dark:text-gray-100"
                                        >
                                            Email
                                        </label>

                                        <base-input
                                            :type="'email'"
                                            v-model="email"
                                            name="email"
                                            id="email"
                                            placeholder="Email..."
                                            :disabled="!!form.id || modalDataLoading"
                                        />

                                        <base-error v-if="errors?.email" :value="errors?.email"/>
                                    </div>

                                    <div class="flex flex-col space-y-3">
                                        <label
                                            for="phone"
                                            class="block text-sm/6 font-medium text-gray-900 dark:text-gray-100"
                                        >
                                            Phone
                                        </label>

                                        <base-input
                                            v-model="phone"
                                            name="phone"
                                            id="phone"
                                            placeholder="Phone..."
                                            :disabled="!!form.id || modalDataLoading"
                                        />

                                        <base-error v-if="errors?.phone" :value="errors?.phone"/>
                                    </div>

                                    <div class="flex flex-col space-y-3">
                                        <label
                                            for="date_of_birth"
                                            class="block text-sm/6 font-medium text-gray-900 dark:text-gray-100"
                                        >
                                            Date of birth
                                        </label>

                                        <base-input
                                            type="date"
                                            v-model="date_of_birth"
                                            name="date_of_birth"
                                            id="date_of_birth"
                                            placeholder="Date of birth..."
                                            :disabled="!!form.id || modalDataLoading"
                                        />

                                        <base-error v-if="errors?.date_of_birth" :value="errors?.date_of_birth"/>
                                    </div>

                                    <div class="flex flex-col space-y-3">
                                        <label
                                            for="vehicle_type"
                                            class="block text-sm/6 font-medium text-gray-900 dark:text-gray-100"
                                        >
                                            Vehicle Type
                                        </label>

                                        <select-menu
                                            v-model="vehicle_type"
                                            :items="vehicleTypes"
                                            label="Select vehicle type"
                                            class="col-span-3 lg:col-span-1"
                                            :disabled="!!form.id || modalDataLoading"
                                        />

                                        <base-error v-if="errors?.vehicle_type" :value="errors?.vehicle_type"/>
                                    </div>

                                    <div class="flex flex-col space-y-3">
                                        <label
                                            for="vehicle_make"
                                            class="block text-sm/6 font-medium text-gray-900 dark:text-gray-100"
                                        >
                                            Vehicle Make
                                        </label>

                                        <select-menu
                                            v-model="vehicle_make"
                                            :items="vehicleMakes"
                                            label="Select vehicle make"
                                            class="col-span-3 lg:col-span-1"
                                            :disabled="!!form.id || modalDataLoading"
                                        />

                                        <base-error v-if="errors?.vehicle_make" :value="errors?.vehicle_make"/>
                                    </div>

                                    <div class="flex flex-col space-y-3">
                                        <label
                                            for="vehicle_model"
                                            class="block text-sm/6 font-medium text-gray-900 dark:text-gray-100"
                                        >
                                            Vehicle Model
                                        </label>

                                        <select-menu
                                            v-model="vehicle_model"
                                            :items="vehicleModels"
                                            label="Select vehicle model"
                                            class="col-span-3 lg:col-span-1"
                                            :disabled="!!form.id || modalDataLoading"
                                        />

                                        <base-error v-if="errors?.vehicle_model" :value="errors?.vehicle_model"/>
                                    </div>

                                    <div class="flex flex-col space-y-3">
                                        <label
                                            for="purchase_price"
                                            class="block text-sm/6 font-medium text-gray-900 dark:text-gray-100"
                                        >
                                            Purchase Price
                                        </label>

                                        <base-input
                                            type="number"
                                            v-model="purchase_price"
                                            name="purchase_price"
                                            id="purchase_price"
                                            placeholder="Purchase price..."
                                            :min="0"
                                            :step="'0.01'"
                                            :disabled="!!form.id || modalDataLoading"
                                        />

                                        <base-error v-if="errors?.purchase_price" :value="errors?.purchase_price"/>
                                    </div>

                                    <div class="flex flex-col space-y-3">
                                        <label
                                            for="deposit_amount"
                                            class="block text-sm/6 font-medium text-gray-900 dark:text-gray-100"
                                        >
                                            Deposit Amount
                                        </label>

                                        <base-input
                                            type="number"
                                            v-model="deposit_amount"
                                            name="deposit_amount"
                                            id="deposit_amount"
                                            placeholder="Deposit amount..."
                                            :min="0"
                                            :step="'0.01'"
                                            :disabled="!!form.id || modalDataLoading"
                                        />

                                        <base-error v-if="errors?.deposit_amount" :value="errors?.deposit_amount"/>
                                    </div>

                                    <div class="flex flex-col space-y-3">
                                        <label
                                            for="term_months"
                                            class="block text-sm/6 font-medium text-gray-900 dark:text-gray-100"
                                        >
                                            Term
                                        </label>

                                        <select-menu
                                            v-model="term_months"
                                            :items="termMonthsRange(6, 96)"
                                            label="Select term"
                                            class="col-span-3 lg:col-span-1"
                                            :disabled="!!form.id || modalDataLoading"
                                        />

                                        <base-error v-if="errors?.term_months" :value="errors?.term_months"/>
                                    </div>

                                    <div class="flex flex-col space-y-3">
                                        <label
                                            for="status"
                                            class="block text-sm/6 font-medium text-gray-900 dark:text-gray-100"
                                        >
                                            Status
                                        </label>

                                        <select-menu
                                            v-model="status"
                                            :items="statusOptions"
                                            label="Select status"
                                            class="col-span-3 lg:col-span-1"
                                        />

                                        <base-error v-if="errors?.status" :value="errors?.status"/>
                                    </div>

                                    <div class="flex flex-col space-y-3">
                                        <label
                                            for="consent_to_credit_check"
                                            class="block text-sm/6 font-medium text-gray-900 dark:text-gray-100"
                                        >
                                            Consent
                                        </label>

                                        <base-checkbox
                                            v-model="consent_to_credit_check"
                                            label="Consent to credit check"
                                            :disabled="!!form.id || modalDataLoading"
                                        />

                                        <base-error v-if="errors?.consent_to_credit_check"
                                                    :value="errors?.consent_to_credit_check"/>
                                    </div>

                                    <div class="col-span-2 flex justify-end">
                                        <button
                                            type="submit"
                                            class="capitalize inline-flex w-full justify-center cursor-pointer rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-indigo-500 sm:mt-0 sm:w-auto dark:bg-white/10 dark:text-white dark:shadow-none dark:ring-white/5 dark:hover:bg-indigo-400"
                                            :disabled="modalDataLoading"
                                        >
                                            submit
                                        </button>
                                    </div>
                                </form>
                            </DialogPanel>
                        </TransitionChild>
                    </div>
                </div>
            </Dialog>
        </TransitionRoot>
    </div>
</template>

<script setup>
import { computed, inject, ref, watch } from 'vue'

import SelectMenu from '../../../../components/select-menu.vue'
import BaseInput from '../../../../components/base-input.vue'
import BaseError from '../../../../components/base-error.vue'
import BaseCheckbox from '../../../../components/base-checkbox.vue'

import { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue'
import { XMarkIcon } from '@heroicons/vue/24/outline'
import * as yup from 'yup'
import { useForm, useField } from 'vee-validate'
import { differenceInYears } from 'date-fns'
import vehicleData from '../../../../data/vehicles.json'
import { useLoanApplicationStore } from '../../../../stores/loanApplicationStore.js'

let isResettingForm = false
const loanApplicationStore = useLoanApplicationStore()

const modalData = inject('modalData')
const form = inject('form')
const vehicleTypes = inject('vehicleTypes')
const statusOptions = inject('statusOptions')
const modalDataLoading = inject('modalDataLoading')

const submitted = ref(false)

const title = computed(() => {
    return `${modalData?.type} Loan Application`
})

// Define validation schema with Yup
const schema = yup.object({
    applicant_full_name: yup.string().required('Full name is required'),
    email: yup.string().email('Invalid email').required('Email is required'),
    phone: yup.string().required('Phone is required'),
    date_of_birth: yup.date().required('Date of birth is required')
        .test('age', 'You must be at least 18 years old', value => value && differenceInYears(new Date(), new Date(value)) >= 18),
    vehicle_type: yup.string().oneOf(['car', 'ute', 'truck', 'van', 'suv'], 'Invalid vehicle type'),
    vehicle_make: yup.string().required('Vehicle make is required'),
    vehicle_model: yup.string().required('Vehicle model is required'),
    purchase_price: yup.number().min(0, 'Purchase price must be ≥ 0').required('Purchase price is required'),
    deposit_amount: yup.number().min(0, 'Deposit must be ≥ 0')
        .max(yup.ref('purchase_price'), 'Deposit cannot exceed purchase price')
        .required('Deposit amount is required'),
    term_months: yup.number().min(6, 'Term must be at least 6 months').max(96, 'Term cannot exceed 96 months').required(),
    status: yup.string().oneOf(statusOptions).default('submitted'),
    consent_to_credit_check: yup.boolean().oneOf([true], 'Consent is required').required()
})

// Use VeeValidate for form management and validation
const { handleSubmit, errors, resetForm } = useForm({
    validationSchema: schema,
    initialValues: form
})

// Register form fields with VeeValidate
const { value: applicant_full_name } = useField('applicant_full_name', undefined, { initialValue: form?.value?.applicant_full_name })
const { value: email } = useField('email', undefined, { initialValue: form?.value?.email })
const { value: phone } = useField('phone', undefined, { initialValue: form?.value?.phone })
const { value: date_of_birth } = useField('date_of_birth', undefined, { initialValue: form?.value?.date_of_birth })
const { value: vehicle_type } = useField('vehicle_type', undefined, { initialValue: form?.value?.vehicle_type })
const { value: vehicle_make } = useField('vehicle_make', undefined, { initialValue: form?.value?.vehicle_make })
const { value: vehicle_model } = useField('vehicle_model', undefined, { initialValue: form?.value?.vehicle_model })
const { value: purchase_price } = useField('purchase_price', undefined, { initialValue: form?.value?.purchase_price })
const { value: deposit_amount } = useField('deposit_amount', undefined, { initialValue: form?.value?.deposit_amount })
const { value: term_months } = useField('term_months', undefined, { initialValue: form?.value?.term_months })
const { value: status } = useField('status', undefined, { initialValue: form?.value?.status })
const { value: consent_to_credit_check } = useField('consent_to_credit_check', undefined, { initialValue: form?.value?.consent_to_credit_check })

watch(() => form, (newVal) => {
    isResettingForm = true

    // reset vee-validate fields with new data
    resetForm({
        values: { ...newVal?.value }
    })

    // Explicitly set dependent fields
    vehicle_type.value = newVal?.value?.vehicle_type || ''
    vehicle_make.value = newVal?.value?.vehicle_make || ''
    vehicle_model.value = newVal?.value?.vehicle_model || ''
}, { deep: true, immediate: true })

// Makes for the selected type
const vehicleMakes = computed(() => {
    if (!vehicle_type?.value) return []
    return Object.keys(vehicleData[vehicle_type?.value]) || ''
})

// Models for the selected make
const vehicleModels = computed(() => {
    if (!vehicle_type?.value || !vehicle_make?.value) return []
    return vehicleData[vehicle_type?.value][vehicle_make?.value] || []
})

// Reset dependent fields when parent changes
watch(() => vehicle_type?.value, (newVal, oldVal) => {
    if (isResettingForm || !newVal) return

    if (!vehicle_make.value || newVal !== oldVal) vehicle_make.value = ''
    if (!vehicle_model.value || newVal !== oldVal) vehicle_model.value = ''
})

watch(() => vehicle_make.value, (newVal) => {
    if (isResettingForm || !newVal) return

    vehicle_model.value = ''
})

const submit = handleSubmit(async (values) => {
    try {
        Object.assign(form, values)

        if (values.status === 'in review') values.status = 'in_review'
        if (!values?.id) {
            await loanApplicationStore.storeLoanApplication(values)
        } else {
            await loanApplicationStore.updateLoanApplication(values)
        }
    } catch (error) {
        // Handle login errors (e.g., display error message)
        console.error('Login error:', error)
    }
})

const termMonthsRange = (min = 6, max = 96, label = 'months') => {
    return Array.from({ length: max - min + 1 }, (_, i) => {
        const n = min + i
        return {
            name: `${n} ${label}`,
            id: n
        }
    })
}
</script>
