<template>
    <div class="min-h-screen">
        <div class="border-b border-gray-200 bg-white dark:border-white/10 dark:bg-gray-800/50">
            <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4">
                <div class="w-full flex items-center justify-between">
                    <div class="flex items-center gap-2 text-xl tracking-wide">
                        <h1 class="font-bold text-gray-900 dark:text-white">
                            Welcome
                        </h1>

                        <span class="text-blue-500 font-bold">
                            {{ authStore?.user?.data?.name || '' }}
                        </span>
                    </div>

                    <button
                        class="block px-4 py-2 text-base font-medium text-gray-500 hover:text-red-500 dark:text-gray-400 dark:hover:text-red-200"
                        @click="authStore.logout()"
                    >
                        Logout
                    </button>
                </div>
            </div>
        </div>

        <main class="relative z-0 flex-1 p-[0px_10px]">
            <router-view v-slot="{ Component }">
                <transition mode="out-in">
                    <keep-alive>
                        <component
                            :is="Component"
                            :key="key"
                        />
                    </keep-alive>
                </transition>
            </router-view>
        </main>
    </div>
</template>

<script setup>
import { useAuthStore } from '../../../stores/authStore.js'
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const authStore = useAuthStore()
const route = useRoute()

const key = computed(() => {
    const routeId = route?.params?.id || false

    if (routeId) {
        const routeName = route?.name
        return `${routeName}-${routeId}`
    }

    return route?.path
})
</script>
