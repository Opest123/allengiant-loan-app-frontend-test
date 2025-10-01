<!-- components/BaseCheckbox.vue -->
<template>
    <div class="flex h-6 shrink-0 items-center">
        <div class="group grid size-4 grid-cols-1">
            <input
                :id="id"
                :name="name"
                type="checkbox"
                class="col-start-1 row-start-1 appearance-none rounded border border-gray-300 bg-white
              checked:border-indigo-600 checked:bg-indigo-600
              indeterminate:border-indigo-600 indeterminate:bg-indigo-600
              focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2
              focus-visible:outline-indigo-600
              disabled:border-gray-300 disabled:bg-gray-100 disabled:checked:bg-gray-100
              dark:border-white/10 dark:bg-white/5 dark:checked:border-indigo-500 dark:checked:bg-indigo-500
              dark:indeterminate:border-indigo-500 dark:indeterminate:bg-indigo-500
              dark:focus-visible:outline-indigo-500 dark:disabled:border-white/5 dark:disabled:bg-white/10
              dark:disabled:checked:bg-white/10 forced-colors:appearance-auto"
                :checked="modelValue"
                :value="modelValue"
                :disabled="disabled"
                :indeterminate.prop="indeterminate"
                @change="$emit('update:modelValue', $event.target.checked)"
            />

            <svg
                class="pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center stroke-white
               group-has-[:disabled]:stroke-gray-950/25 dark:group-has-[:disabled]:stroke-white/25"
                viewBox="0 0 14 14"
                fill="none"
            >
                <!-- Checkmark -->
                <path
                    class="opacity-0 group-has-[:checked]:opacity-100"
                    d="M3 8L6 11L11 3.5"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                />
                <!-- Indeterminate line -->
                <path
                    class="opacity-0 group-has-[:indeterminate]:opacity-100"
                    d="M3 7H11"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                />
            </svg>
        </div>

        <label
            v-if="label"
            :for="id"
            class="ml-2 block text-sm text-gray-900 dark:text-gray-100"
        >
            {{ label }}
        </label>
    </div>
</template>

<script setup>
defineProps({
    modelValue: {
        type: Boolean,
        default: false
    },
    id: {
        type: String,
        default: ''
    },
    name: {
        type: String,
        default: ''
    },
    label: {
        type: String,
        default: ''
    },
    indeterminate: {
        type: Boolean,
        default: false
    },
    disabled: {
        type: Boolean,
        default: false
    }
})

defineEmits(['update:modelValue'])
</script>
