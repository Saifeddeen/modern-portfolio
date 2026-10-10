<template>
    <section class="py-16 md:py-28 bg-gray-50 min-h-screen overflow-hidden">
        <div class="container mx-auto px-4">
            <!-- Header -->
            <div class="text-center mb-12 md:mb-20 max-w-3xl mx-auto">
                <span
                    class="inline-block px-4 py-1.5 bg-cerulean-500/10 text-cerulean-700 rounded-full text-sm font-medium mb-4">
                    {{ t('services_page.badge') }}
                </span>
                <h1 class="text-3xl sm:text-4xl md:text-5xl font-bold text-prussian_blue-500 mb-4">
                    {{ t('services_page.title') }}
                </h1>
                <p class="text-gray-500 text-base sm:text-lg">{{ t('services_page.subtitle') }}</p>
            </div>

            <!-- Loading State -->
            <div v-if="servicesStore.isLoading" class="flex justify-center py-20">
                <Icon icon="eos-icons:loading" class="w-12 h-12 text-cerulean-500 animate-spin" />
            </div>

            <!-- Services List -->
            <div v-else class="max-w-5xl mx-auto space-y-12 md:space-y-24">
                <div v-for="(service, index) in servicesStore.services" :key="service.id" ref="sectionRefs"
                    class="reveal group bg-white-500 rounded-3xl shadow-sm border border-gray-100 hover:shadow-2xl transition-all duration-500 overflow-hidden">

                    <!-- Hero Image Section -->
                    <div class="relative h-56 sm:h-72 md:h-[28rem] overflow-hidden bg-prussian_blue-500">
                        <img v-if="service.hero_image" :src="service.hero_image" :alt="service.name"
                            class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                        <!-- Gradient Overlay -->
                        <div
                            class="absolute inset-0 bg-gradient-to-t from-prussian_blue-500 via-prussian_blue-500/70 to-transparent">
                        </div>

                        <!-- Overlay Content -->
                        <div class="absolute bottom-0 start-0 p-5 sm:p-8 md:p-12 text-white-500 w-full">
                            <div class="flex items-center gap-3 sm:gap-4 mb-3 sm:mb-4">
                                <!-- Icon -->
                                <div
                                    class="w-12 h-12 sm:w-14 sm:h-14 flex-shrink-0 flex items-center justify-center bg-white-500/10 backdrop-blur-md rounded-xl border border-white-500/20 text-white-500">
                                    <Icon v-if="service.vue_iconify" :icon="service.vue_iconify"
                                        class="w-6 h-6 sm:w-7 sm:h-7" />
                                    <div v-else-if="service.svg_icon" class="raw-svg-container"
                                        v-html="service.svg_icon"></div>
                                    <Icon v-else icon="lucide:settings" class="w-6 h-6 sm:w-7 sm:h-7" />
                                </div>
                                <span
                                    class="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white-500/20 -ms-1 sm:-ms-2 -mt-2 sm:-mt-4">
                                    0{{ index + 1 }}
                                </span>
                            </div>
                            <h2 class="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 text-start leading-tight">
                                {{ service.name }}
                            </h2>
                            <p class="text-cerulean-800 text-sm sm:text-lg text-start font-medium">
                                {{ service.short_description }}
                            </p>
                        </div>
                    </div>

                    <!-- Details Section -->
                    <div class="p-6 sm:p-8 md:p-12">
                        <div class="h-1 w-16 sm:w-20 bg-cerulean-500 rounded-full mb-5 sm:mb-6"></div>
                        <p class="text-gray-600 leading-relaxed whitespace-pre-line text-base sm:text-lg text-start">
                            {{ service.full_description || service.short_description }}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { Icon } from '@iconify/vue'
import { useServicesStore } from '@/stores/servicesStore'
import { ref, watch, onMounted, onUnmounted } from 'vue'

const { t } = useI18n()
const servicesStore = useServicesStore()

// Scroll Reveal Animation Logic
const sectionRefs = ref<HTMLElement[]>([])
let observer: IntersectionObserver | null = null

const observeElements = () => {
    sectionRefs.value.forEach((el) => {
        if (el && !el.dataset.observed) {
            el.dataset.observed = 'true'
            observer?.observe(el)
        }
    })
}

onMounted(() => {
    observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible')
                observer?.unobserve(entry.target)
            }
        })
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' })

    // Watch the services array. 
    // flush: 'post' ensures this runs AFTER Vue has updated the DOM with new items.
    watch(
        () => servicesStore.services,
        () => {
            observeElements()
        },
        { flush: 'post' }
    )

    // Also observe on initial mount
    observeElements()
})

onUnmounted(() => {
    observer?.disconnect()
})
</script>

<style scoped>
/* Scroll Reveal Animation */
.reveal {
    opacity: 0;
    transform: translateY(40px);
    transition: opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.3s ease;
}

.reveal.is-visible {
    opacity: 1;
    transform: translateY(0);
}

/* Force raw SVGs to match Iconify sizing */
.raw-svg-container {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
}

.raw-svg-container :deep(svg) {
    width: 28px !important;
    height: 28px !important;
    fill: currentColor !important;
    stroke: currentColor !important;
}
</style>