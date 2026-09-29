<template>
    <section class="py-20 md:py-28">
        <div class="container mx-auto px-4">
            <div class="text-center mb-16">
                <h2 class="text-4xl font-bold text-prussian_blue-500 mb-4">{{ t('services.title') }}</h2>
                <p class="text-gray-500 max-w-2xl mx-auto text-lg">{{ t('services.subtitle') }}</p>
            </div>

            <!-- Loading Skeleton -->
            <div v-if="servicesStore.isLoading"
                class="grid grid-cols-1 md:grid-cols-2 gap-px bg-gray-200 border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
                <div v-for="i in 4" :key="i" class="bg-white-500 p-10 animate-pulse">
                    <div class="w-14 h-14 bg-gray-200 rounded-xl mb-6"></div>
                    <div class="h-6 bg-gray-200 rounded w-1/2 mb-3"></div>
                    <div class="h-4 bg-gray-200 rounded w-3/4"></div>
                </div>
            </div>

            <!-- Services Grid -->
            <div v-else-if="services.length > 0"
                class="grid grid-cols-1 md:grid-cols-2 gap-px bg-gray-200 border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
                <div v-for="(service, index) in services" :key="service.id"
                    class="group relative bg-white-500 p-10 transition-colors duration-300 hover:bg-deep_navy-500 cursor-default">

                    <!-- Number Indicator -->
                    <span
                        class="absolute top-6 end-6 text-5xl font-bold text-gray-100 group-hover:text-white-500/10 transition-colors duration-300">
                        {{ String(index + 1).padStart(2, '0') }}
                    </span>

                    <div class="relative z-10">
                        <!-- Icon Container with Priority: vue_iconify > svg_icon > hero_image > default -->
                        <div
                            class="w-14 h-14 flex items-center justify-center bg-prussian_blue-500 group-hover:bg-cerulean-500 rounded-xl mb-6 transition-colors duration-300 text-white-500 overflow-hidden">
                            <Icon v-if="service.vue_iconify" :icon="service.vue_iconify" class="w-7 h-7" />
                            <div v-else-if="service.svg_icon" class="raw-svg-container" v-html="service.svg_icon"></div>
                            <img v-else-if="service.hero_image" :src="service.hero_image" :alt="service.name" class="w-full h-full object-cover" />
                            <Icon v-else icon="lucide:briefcase" class="w-7 h-7" />
                        </div>
                        <h3
                            class="text-2xl font-bold mb-3 text-prussian_blue-500 group-hover:text-white-500 transition-colors duration-300">
                            {{ service.name }}
                        </h3>
                        <p class="text-gray-500 group-hover:text-gray-300 transition-colors duration-300">
                            {{ service.short_description || service.full_description }}
                        </p>
                    </div>
                </div>
            </div>

            <!-- Empty State -->
            <div v-else class="text-center text-gray-500 py-10">
                <p>{{ t('services.empty', 'No services found.') }}</p>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { useI18n } from 'vue-i18n'
import { storeToRefs } from 'pinia'
import { useServicesStore } from '@/stores/servicesStore'

const { t } = useI18n()
const servicesStore = useServicesStore()
const { services } = storeToRefs(servicesStore)
</script>

<style scoped>
.raw-svg-container {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
}

.raw-svg-container :deep(svg) {
    width: 1.75rem !important;
    height: 1.75rem !important;
    fill: currentColor !important;
    stroke: currentColor !important;
}
</style>