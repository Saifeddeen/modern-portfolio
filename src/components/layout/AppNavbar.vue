<template>
    <header class="sticky top-0 z-40 bg-prussian_blue-500/95 backdrop-blur">
        <nav class="container mx-auto px-4 py-4 flex justify-between items-center">
            <!-- Logo -->
            <RouterLink to="/" class="flex items-center gap-2 text-white-500 font-bold text-xl">
                <img v-if="generalStore.settings?.logo" :src="generalStore.settings.logo" alt="Logo"
                    class="h-8 w-auto" />
                <span>{{ generalStore.settings?.title || 'Portfolio' }}</span>
            </RouterLink>

            <!-- Desktop Menu -->
            <ul class="hidden md:flex space-x-6 items-center">
                <li v-for="link in navLinks" :key="link.to">
                    <RouterLink :to="link.to" class="text-white-500 hover:text-cerulean-700 transition-colors">
                        {{ t(link.key) }}
                    </RouterLink>
                </li>

                <li v-if="generalStore.settings?.cv_link">
                    <a :href="generalStore.settings.cv_link" target="_blank" rel="noopener noreferrer"
                        class="bg-cerulean-500 hover:bg-cerulean-600 text-white-500 px-4 py-2 rounded-md transition-colors text-sm font-medium">
                        {{ t('nav.cv') }}
                    </a>
                </li>

                <li>
                    <LanguageSwitcher />
                </li>
            </ul>

            <!-- Mobile Menu Button -->
            <div class="md:hidden flex items-center space-x-4">
                <LanguageSwitcher />
                <button @click="toggleMenu" class="text-white-500">
                    <Icon :icon="isMenuOpen ? 'lucide:x' : 'lucide:menu'" class="w-6 h-6" />
                </button>
            </div>
        </nav>

        <!-- Mobile Menu -->
        <transition name="fade">
            <div v-if="isMenuOpen" class="md:hidden bg-prussian_blue-500 border-t border-deep_navy-600">
                <ul class="flex flex-col px-4 py-2 space-y-2">
                    <li v-for="link in navLinks" :key="link.to" @click="isMenuOpen = false">
                        <RouterLink :to="link.to" class="block py-2 text-white-500 hover:text-cerulean-700">
                            {{ t(link.key) }}
                        </RouterLink>
                    </li>
                    <li v-if="generalStore.settings?.cv_link" @click="isMenuOpen = false">
                        <a :href="generalStore.settings?.cv_link" target="_blank" rel="noopener noreferrer"
                            class="block py-2 text-cerulean-700 font-medium">
                            {{ t('nav.cv') }}
                        </a>
                    </li>
                </ul>
            </div>
        </transition>
    </header>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import { Icon } from '@iconify/vue'
import { useI18n } from 'vue-i18n'
import LanguageSwitcher from '@/components/ui/LanguageSwitcher.vue'
import { useGeneralStore } from '@/stores/generalDataStore'

const { t } = useI18n()
const generalStore = useGeneralStore()
const isMenuOpen = ref(false)

const toggleMenu = () => { isMenuOpen.value = !isMenuOpen.value }

const navLinks = [
    { to: '/', key: 'nav.home' },
    { to: '/services', key: 'nav.services' },
    { to: '/projects', key: 'nav.projects' },
    { to: '/contact', key: 'nav.contact' }
]
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
</style>