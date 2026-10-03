<template>
    <section class="py-20 md:py-28 bg-gray-50">
        <div class="container mx-auto px-4">
            <div class="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-4">
                <div>
                    <h2 class="text-4xl font-bold text-prussian_blue-500 mb-2">{{ t('top_projects.title') }}</h2>
                    <p class="text-gray-500 text-lg">{{ t('top_projects.subtitle') }}</p>
                </div>
            </div>

            <Swiper :key="appStore.locale" :modules="modules" :slides-per-view="1" :space-between="40"
                :loop="projectsStore.featuredProjects.length > 1"
                :autoplay="{ delay: 5000, disableOnInteraction: false }" :pagination="{ clickable: true }"
                :rtl="appStore.isRTL" class="max-w-5xl mx-auto pb-16">

                <SwiperSlide v-for="project in projectsStore.featuredProjects" :key="project.slug" class="h-auto">
                    <div
                        class="bg-white-500 overflow-hidden shadow-xl border border-gray-100 group transition-shadow duration-300 hover:shadow-2xl h-[460px] md:h-[420px] flex flex-col">
                        <div class="grid grid-cols-1 md:grid-cols-2 h-full">
                            <div class="relative h-40 md:h-full overflow-hidden bg-prussian_blue-500">
                                <img v-if="project.hero_image" :src="project.hero_image" :alt="project.title"
                                    class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                            </div>
                            <div class="p-6 md:p-8 flex flex-col justify-center h-full overflow-hidden">
                                <span class="text-sm font-medium text-cerulean-600 mb-2 uppercase tracking-wider">{{
                                    project.owner }}</span>
                                <h3 class="text-2xl md:text-3xl font-bold text-prussian_blue-500 mb-3">{{ project.title
                                }}</h3>
                                <p class="text-gray-600 mb-6 leading-relaxed line-clamp-3">{{ project.short_description
                                }}</p>

                                <div class="flex flex-wrap gap-2 mb-6">
                                    <span v-for="tech in project.technologies" :key="tech.id"
                                        class="bg-gray-100 text-prussian_blue-500 text-sm px-3 py-1 rounded-full font-medium flex items-center gap-1">
                                        <Icon v-if="tech.vue_iconify" :icon="tech.vue_iconify" class="w-4 h-4" />
                                        {{ tech.name }}
                                    </span>
                                </div>

                                <RouterLink :to="`/projects/${project.slug}`"
                                    class="self-start text-deep_navy-600 font-semibold border-b-2 border-cerulean-500 hover:text-cerulean-600 transition-colors pb-1 mt-auto">
                                    {{ t('top_projects.view_details') }} →
                                </RouterLink>
                            </div>
                        </div>
                    </div>
                </SwiperSlide>
            </Swiper>
        </div>
    </section>
</template>

<script setup lang="ts">
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Autoplay, Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import { useI18n } from 'vue-i18n'
import { RouterLink } from 'vue-router'
import { useProjectsStore } from '@/stores/projectsStore'
import { useAppStore } from '@/stores/app'
import { Icon } from '@iconify/vue'

const { t } = useI18n()
const projectsStore = useProjectsStore()
const appStore = useAppStore()
const modules = [Autoplay, Pagination]
</script>

<style scoped>
:deep(.swiper-pagination-bullet) {
    background-color: #034078;
    opacity: 0.3;
}

:deep(.swiper-pagination-bullet-active) {
    background-color: #1282a2;
    opacity: 1;
    width: 24px;
    border-radius: 4px;
}
</style>