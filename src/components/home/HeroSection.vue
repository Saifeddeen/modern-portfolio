<template>
    <section class="relative overflow-hidden bg-prussian_blue-500/95 pt-32 pb-20 md:pt-32 md:pb-32">
        <!-- Grid Background Pattern -->
        <div
            class="absolute inset-0 bg-[linear-gradient(to_right,#1d3172_1px,transparent_1px),linear-gradient(to_bottom,#1d3172_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_0%,#000_70%,transparent_110%)] opacity-20">
        </div>

        <!-- Glowing Orbs -->
        <div class="absolute top-20 right-1/4 w-96 h-96 bg-cerulean-500/20 rounded-full blur-[120px]"></div>
        <div class="absolute bottom-0 left-1/4 w-96 h-96 bg-yale_blue-500/20 rounded-full blur-[120px]"></div>

        <div class="container mx-auto px-4 relative z-10">
            <div class="flex flex-col-reverse md:flex-row items-center justify-between gap-12">

                <!-- Text Content -->
                <div class="text-center md:text-start flex-1">
                    <div
                        class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white-500/5 border border-white-500/10 mb-6">
                        <span class="relative flex h-2 w-2">
                            <span
                                class="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                            <span class="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                        </span>
                        <span class="text-sm text-gray-300">{{ t('hero.badge') }}</span>
                    </div>

                    <h1 class="text-4xl md:text-6xl lg:text-7xl font-extrabold text-white-500 mb-4 tracking-tight">
                        {{ t('hero.greeting') }} <br class="hidden md:block" />
                        <span
                            class="bg-gradient-to-r from-cerulean-700 via-cerulean-500 to-yale-blue-700 bg-clip-text text-transparent">
                            {{ hero.person_name }}
                        </span>
                    </h1>

                    <p class="text-xl md:text-2xl text-cerulean-700 mb-6 font-light">
                        {{ hero.job_title }}
                    </p>

                    <p class="text-gray-400 max-w-xl mx-auto md:mx-0 mb-10 text-lg leading-relaxed">
                        {{ hero.bio }}
                    </p>

                    <div class="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                        <RouterLink :to="hero.cta_link"
                            class="px-8 py-4 bg-cerulean-500 hover:bg-cerulean-600 text-white-500 font-medium rounded-xl transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl hover:shadow-cerulean-500/20">
                            {{ t('hero.cta_projects') }}
                        </RouterLink>
                        <RouterLink to="/contact"
                            class="px-8 py-4 bg-white-500/5 border border-white-500/10 hover:bg-white-500/10 text-white-500 font-medium rounded-xl transition-all duration-300 backdrop-blur-sm">
                            {{ t('hero.cta_contact') }}
                        </RouterLink>
                    </div>
                </div>

                <!-- Simplified Modern Profile Container -->
                <div class="flex-shrink-0 mb-10 md:mb-0" v-if="hero.profile_image">
                    <div class="relative group w-72 h-72 md:w-96 md:h-96">
                        <!-- Soft Glow Behind Image -->
                        <div
                            class="absolute -inset-4 bg-cerulean-500/20 rounded-full blur-2xl opacity-50 group-hover:opacity-80 transition-opacity duration-500">
                        </div>

                        <!-- Clean Image with Subtle Ring -->
                        <div
                            class="relative w-full h-full rounded-full overflow-hidden shadow-2xl ring-1 ring-white-500/10">
                            <img :src="hero.profile_image" alt="Profile"
                                class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { useHomeStore } from '@/stores/homeStore'
import { RouterLink } from 'vue-router'

const { t } = useI18n()
const { hero } = useHomeStore()
</script>