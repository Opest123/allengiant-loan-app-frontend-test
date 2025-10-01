<template>
    <Listbox
        as="div"
        :modelValue="modelValue"
        @update:modelValue="value => emit('update:modelValue', value === modelValue ? '' : value)"
    >
        <div class="relative">
            <ListboxButton
                class="grid w-full cursor-default grid-cols-1 rounded-xl bg-white py-3 pl-3 pr-2 text-left text-white outline outline-1 -outline-offset-1 outline-gray-300 focus-within:outline focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600 dark:bg-white/5 dark:outline dark:outline-1 dark:-outline-offset-1 dark:outline-white/10 dark:focus-within:outline-indigo-500 sm:text-sm/6 dark:bg-white/5"
            >
                <ListboxLabel
                    v-if="!selected"
                    class="col-start-1 row-start-1 block text-sm/6 !text-gray-400 dark:text-white dark:text-gray-500"
                    :class="{'cursor-pointer-none': disabled}"
                >
                    {{ label }}
                </ListboxLabel>
                <span v-else class="col-start-1 row-start-1 capitalize truncate pr-6">{{ selected }}</span>
                <ChevronUpDownIcon
                    class="col-start-1 row-start-1 size-5 self-center justify-self-end text-gray-500 sm:size-4 dark:text-gray-400"
                    aria-hidden="true"/>
            </ListboxButton>

            <transition leave-active-class="transition ease-in duration-100" leave-from-class=""
                        leave-to-class="opacity-0">
                <ListboxOptions
                    class="absolute !z-[99999] mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg outline outline-1 outline-black/5 sm:text-sm dark:bg-gray-800 dark:shadow-none dark:-outline-offset-1 dark:outline-white/10"
                >
                    <ListboxOption
                        as="template"
                        v-for="item in items" :key="item.id || item"
                        :value="item.id || item"
                        v-slot="{ active, selected }"
                    >
                        <li
                            class="capitalize"
                            :class="[active ? 'bg-indigo-600 text-white outline-none dark:bg-indigo-500' : 'text-gray-900 dark:text-white', 'relative cursor-default select-none py-2 pl-3 pr-9']">
                            <span :class="[selected ? 'font-semibold' : 'font-normal', 'block truncate']">
                                {{
                                    item.name || item
                                }}
                            </span>
                            <span
                                v-if="selected"
                                :class="[active ? 'text-white' : 'text-indigo-600 dark:text-indigo-400', 'absolute inset-y-0 right-0 flex items-center pr-4']"
                            >
                                <CheckIcon class="size-5" aria-hidden="true"/>
                            </span>
                        </li>
                    </ListboxOption>
                </ListboxOptions>
            </transition>
        </div>
    </Listbox>
</template>

<script setup>
import { computed, ref } from 'vue'
import { Listbox, ListboxButton, ListboxLabel, ListboxOption, ListboxOptions } from '@headlessui/vue'
import { ChevronUpDownIcon } from '@heroicons/vue/16/solid'
import { CheckIcon } from '@heroicons/vue/20/solid'
import { defineProps, defineEmits } from 'vue'

const props = defineProps({
    items: {
        type: Array,
        required: true
    },
    modelValue: {
        type: [Object, String, Number],
        required: true
    },
    label: {
        type: String,
        default: 'Select an option'
    },
    disabled: {
        type: Boolean,
        required: false,
        default: false
    }
})

const selected = computed(() => {
    return props.modelValue?.name || props.modelValue
})

const emit = defineEmits(['update:modelValue'])
</script>
