<template>
    <nav
        class="border flex items-center justify-between border-t border-gray-200 bg-white py-3 sm:px-6 dark:border-white/10 dark:bg-transparent"
        aria-label="Pagination"
    >
        <div class="hidden sm:block">
            <p class="text-sm text-gray-700 dark:text-gray-300">
                Showing
                <span class="font-medium">{{ links?.meta?.from }}</span>
                to
                <span class="font-medium">{{ links?.meta?.to }}</span>
                of
                <span class="font-medium">{{ links?.meta?.total }}</span>
                results
            </p>
        </div>

        <div class="flex flex-1 justify-between sm:justify-end">
            <button
                :disabled="!links?.links?.prev"
                @click="goToPage(links?.current_page - 1)"
                class="relative inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-700 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 dark:bg-white/10 dark:text-gray-200 dark:ring-white/5 dark:hover:bg-white/20 disabled:opacity-50"
            >
                Previous
            </button>

            <button
                :disabled="!links?.links?.next"
                @click="goToPage(links?.meta?.current_page + 1)"
                class="relative ml-3 inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-700 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 dark:bg-white/10 dark:text-gray-200 dark:ring-white/5 dark:hover:bg-white/20 disabled:opacity-50"
            >
                Next
            </button>
        </div>
    </nav>
</template>

<script setup>
import { inject } from 'vue'

const links = inject('links')
const emit = defineEmits(['page-changed'])

const goToPage = (page) => {
    if (page < 1) return
    emit('page-changed', page)
}
</script>
