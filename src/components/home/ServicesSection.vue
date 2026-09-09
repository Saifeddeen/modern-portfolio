<template>
    <section class="py-20 md:py-28">
        <div class="container mx-auto px-4">
            <div class="text-center mb-16">
                <h2 class="text-4xl font-bold text-prussian_blue-500 mb-4">{{ t('services.title') }}</h2>
                <p class="text-gray-500 max-w-2xl mx-auto text-lg">{{ t('services.subtitle') }}</p>
            </div>

            <div
                class="grid grid-cols-1 md:grid-cols-2 gap-px bg-gray-200 border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
                <div v-for="service in services" :key="service.id"
                    class="group relative bg-white-500 p-10 transition-colors duration-300 hover:bg-deep_navy-500 cursor-default">

                    <!-- Number Indicator -->
                    <span
                        class="absolute top-6 end-6 text-5xl font-bold text-gray-100 group-hover:text-white-500/10 transition-colors duration-300">
                        0{{ service.id }}
                    </span>

                    <div class="relative z-10">
                        <div
                            class="w-14 h-14 flex items-center justify-center bg-prussian_blue-500 group-hover:bg-cerulean-500 rounded-xl mb-6 transition-colors duration-300">
                            <Icon :icon="service.icon" class="w-7 h-7 text-white-500" />
                        </div>
                        <h3
                            class="text-2xl font-bold mb-3 text-prussian_blue-500 group-hover:text-white-500 transition-colors duration-300">
                            {{ service.name }}</h3>
                        <p class="text-gray-500 group-hover:text-gray-300 transition-colors duration-300">{{
                            service.short_description }}</p>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { useI18n } from 'vue-i18n'
import { useHomeStore } from '@/stores/homeStore'

const { t } = useI18n()
const { services } = useHomeStore()
</script>