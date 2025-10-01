<template>
    <div
        class="flex rounded-xl bg-white outline outline-1 -outline-offset-1 outline-gray-300 focus-within:outline focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600 dark:bg-white/5 dark:outline dark:outline-1 dark:-outline-offset-1 dark:outline-white/10 dark:focus-within:outline-indigo-500">
        <input
            :type="type"
            :name="name"
            :id="id"
            :placeholder="placeholder"
            :value="modelValue"
            @input="$emit('update:modelValue', $event.target.value)"
            :class="classes"
            :min="min"
            :max="max"
            :step="step"
            :disabled="disabled"
        />
    </div>
</template>

<script setup>
import { defineProps, defineEmits, computed } from 'vue'

const props = defineProps({
    type: {
        type: String,
        default: 'text'
    },
    name: String,
    id: String,
    placeholder: {
        type: String,
        default: ''
    },
    modelValue: {
        type: [String, Number],
        default: ''
    },
    classes: {
        type: String,
        default: 'block w-full px-3 py-3 text-base text-gray-900 placeholder:text-gray-400 focus:outline focus:outline-0 sm:text-sm/6 dark:bg-transparent dark:text-white dark:placeholder:text-gray-500'
    },
    min: {
        type: [String, Number],
        required: false
    },
    max: {
        type: [String, Number],
        required: false
    },
    step: {
        type: [String, Number],
        required: false
    },
    disabled: {
        type: Boolean,
        required: false,
        default: false
    }
})

const emit = defineEmits(['update:modelValue'])
</script>
