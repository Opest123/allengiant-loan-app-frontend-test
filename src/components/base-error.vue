<template>
    <div>
        <span class="text-red-500 text-sm/5">{{ value }}</span>
    </div>
</template>

<script setup>
import { defineProps } from 'vue'

defineProps({
    value: {
        required: true
    }
})
</script>
