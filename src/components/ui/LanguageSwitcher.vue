<template>
    <Menu as="div" class="relative inline-block text-left">
        <div>
            <MenuButton
                class="inline-flex justify-center items-center w-full rounded-md px-4 py-2 text-sm font-medium text-white-500 hover:bg-deep_navy-600 focus:outline-none">
                {{ appStore.locale.toUpperCase() }}
                <Icon icon="lucide:chevron-down" class="-mr-1 ml-2 h-4 w-4" aria-hidden="true" />
            </MenuButton>
        </div>

        <transition enter-active-class="transition ease-out duration-100"
            enter-from-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100"
            leave-active-class="transition ease-in duration-75" leave-from-class="transform opacity-100 scale-100"
            leave-to-class="transform opacity-0 scale-95">
            <MenuItems
                class="absolute right-0 mt-2 w-24 origin-top-right divide-y divide-gray-100 rounded-md bg-white-500 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
                <div class="py-1">
                    <MenuItem v-slot="{ active }" v-for="lang in languages" :key="lang">
                        <button @click="appStore.setLocale(lang)"
                            :class="[active ? 'bg-cerulean-500 text-white-500' : 'text-prussian_blue-500', 'block px-4 py-2 text-sm w-full text-left']">
                            {{ lang.toUpperCase() }}
                        </button>
                    </MenuItem>
                </div>
            </MenuItems>
        </transition>
    </Menu>
</template>

<script setup lang="ts">
import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/vue'
import { Icon } from '@iconify/vue'
import { useAppStore } from '@/stores/app'
import type { SupportedLocale } from '@/types/general'

const appStore = useAppStore()
const languages: SupportedLocale[] = ['en', 'ar', 'tr']
</script>