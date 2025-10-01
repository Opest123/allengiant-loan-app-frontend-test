<template>
    <div :class="classes">
        <div class="flex animate-pulse space-x-4">
            <slot/>
        </div>
    </div>
</template>

<script setup>
import { defineProps } from 'vue'

const props = defineProps({
    classes: {
        type: String,
        default: 'mx-auto w-full max-w-full rounded-md border border-blue-300 p-4'
    }
})
</script>
