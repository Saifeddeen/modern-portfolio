<template>
    <section class="py-20 md:py-28 bg-white-500 min-h-screen">
        <div class="container mx-auto px-4">

            <div v-if="projectsStore.isLoadingDetail" class="flex justify-center py-20">
                <Icon icon="eos-icons:loading" class="w-12 h-12 text-cerulean-500 animate-spin" />
            </div>

            <div v-else-if="projectsStore.currentProject" class="space-y-12">
                <!-- Header -->
                <div class="text-center max-w-3xl mx-auto">
                    <span class="text-sm font-medium text-cerulean-600 uppercase tracking-wider">{{
                        projectsStore.currentProject.owner }}</span>
                    <h1 class="text-4xl md:text-5xl font-bold text-prussian_blue-500 mt-2 mb-4">{{
                        projectsStore.currentProject.title }}</h1>
                    <p class="text-gray-500 text-lg">{{ projectsStore.currentProject.short_description }}</p>

                    <div class="flex justify-center gap-4 mt-6">
                        <a v-if="projectsStore.currentProject.github_link"
                            :href="projectsStore.currentProject.github_link" target="_blank"
                            class="text-prussian_blue-500 hover:text-cerulean-600 flex items-center gap-2 font-medium">
                            <Icon icon="simple-icons:github" class="w-5 h-5" /> GitHub
                        </a>
                        <a v-if="projectsStore.currentProject.project_link"
                            :href="projectsStore.currentProject.project_link" target="_blank"
                            class="text-prussian_blue-500 hover:text-cerulean-600 flex items-center gap-2 font-medium">
                            <Icon icon="lucide:external-link" class="w-5 h-5" /> Live Demo
                        </a>
                    </div>
                </div>

                <!-- Hero Image -->
                <div v-if="projectsStore.currentProject.hero_image"
                    class="max-w-5xl mx-auto rounded-2xl overflow-hidden shadow-xl border border-gray-100">
                    <img :src="projectsStore.currentProject.hero_image" :alt="projectsStore.currentProject.title"
                        class="w-full h-auto object-cover" />
                </div>

                <!-- Gallery Slider -->
                <div v-if="projectsStore.currentProject.gallery_images?.length" class="max-w-5xl mx-auto">
                    <h2 class="text-2xl font-bold text-prussian_blue-500 mb-6">{{ t('project_detail.gallery') }}</h2>

                    <div class="relative rounded-2xl overflow-hidden shadow-lg">
                        <Swiper :modules="modules" :slides-per-view="1" :space-between="20" :loop="true"
                            :autoplay="{ delay: 4000, disableOnInteraction: false }" :pagination="{ clickable: true }"
                            :rtl="appStore.isRTL" @slideChange="onSlideChange" class="rounded-2xl">
                            <SwiperSlide v-for="(img, i) in projectsStore.currentProject.gallery_images" :key="i">
                                <div @click="openModal(img)" class="cursor-zoom-in relative group">
                                    <img :src="img" :alt="`Gallery image ${i + 1}`"
                                        class="w-full h-[400px] object-cover" />
                                    <div
                                        class="absolute inset-0 bg-prussian_blue-500/0 group-hover:bg-prussian_blue-500/20 transition-all duration-300 flex items-center justify-center">
                                        <Icon icon="lucide:zoom-in"
                                            class="w-12 h-12 text-white-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                    </div>
                                </div>
                            </SwiperSlide>
                        </Swiper>

                        <!-- Image Index Counter -->
                        <div
                            class="absolute bottom-4 end-4 bg-prussian_blue-500/80 text-white-500 px-4 py-1.5 rounded-full text-sm font-medium z-10 backdrop-blur-sm">
                            {{ currentSlide }} / {{ projectsStore.currentProject.gallery_images.length }}
                        </div>
                    </div>
                </div>

                <!-- Long Description -->
                <div class="max-w-3xl mx-auto prose prose-lg">
                    <p class="text-gray-600 leading-relaxed whitespace-pre-line">{{
                        projectsStore.currentProject.long_description }}</p>
                </div>

                <!-- Technologies & Skills Used -->
                <div class="max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 pt-8 border-t border-gray-100">
                    <div>
                        <h3 class="text-xl font-bold text-prussian_blue-500 mb-4">{{ t('project_detail.technologies') }}
                        </h3>
                        <div class="flex flex-wrap gap-3">
                            <div v-for="tech in projectsStore.currentProject.technologies" :key="tech.id"
                                class="flex items-center gap-2 bg-gray-50 px-3 py-2 rounded-lg border border-gray-100">
                                <Icon v-if="tech.vue_iconify" :icon="tech.vue_iconify"
                                    class="w-5 h-5 text-deep_navy-600" />
                                <span class="font-medium text-prussian_blue-500">{{ tech.name }}</span>
                            </div>
                        </div>
                    </div>
                    <div>
                        <h3 class="text-xl font-bold text-prussian_blue-500 mb-4">{{ t('project_detail.skills') }}</h3>
                        <div class="flex flex-wrap gap-3">
                            <div v-for="skill in projectsStore.currentProject.skills" :key="skill.id"
                                class="flex items-center gap-2 bg-gray-50 px-3 py-2 rounded-lg border border-gray-100">
                                <Icon v-if="skill.vue_iconify" :icon="skill.vue_iconify"
                                    class="w-5 h-5 text-deep_navy-600" />
                                <span class="font-medium text-prussian_blue-500">{{ skill.title }}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Image Popup Modal -->
        <TransitionRoot appear :show="isModalOpen" as="template">
            <Dialog as="div" @close="closeModal" class="relative z-[100]">
                <TransitionChild as="template" enter="duration-300 ease-out" enter-from="opacity-0"
                    enter-to="opacity-100" leave="duration-200 ease-in" leave-from="opacity-100" leave-to="opacity-0">
                    <div class="fixed inset-0 bg-black/80 backdrop-blur-sm" />
                </TransitionChild>

                <div class="fixed inset-0 overflow-y-auto">
                    <div class="flex min-h-full items-center justify-center p-4 text-center">
                        <TransitionChild as="template" enter="duration-300 ease-out" enter-from="opacity-0 scale-95"
                            enter-to="opacity-100 scale-100" leave="duration-200 ease-in"
                            leave-from="opacity-100 scale-100" leave-to="opacity-0 scale-95">
                            <DialogPanel
                                class="w-full max-w-5xl transform overflow-hidden rounded-2xl shadow-2xl transition-all">
                                <img :src="activeImage" alt="Enlarged view"
                                    class="w-full h-auto object-contain max-h-[85vh]" />
                            </DialogPanel>
                        </TransitionChild>
                    </div>
                </div>
            </Dialog>
        </TransitionRoot>

    </section>
</template>

<script setup lang="ts">
import { onMounted, watch, ref } from 'vue'
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { Icon } from '@iconify/vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Pagination, Autoplay } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import { useProjectsStore } from '@/stores/projectsStore'
import { useAppStore } from '@/stores/app'
import {
    Dialog,
    DialogPanel,
    TransitionRoot,
    TransitionChild
} from '@headlessui/vue'

const { t } = useI18n()
const route = useRoute()
const projectsStore = useProjectsStore()
const appStore = useAppStore()
const modules = [Pagination, Autoplay]

// Modal State
const isModalOpen = ref(false)
const activeImage = ref<string>('')

// Slide Index State
const currentSlide = ref(1)

const openModal = (img: string) => {
    activeImage.value = img
    isModalOpen.value = true
}

const closeModal = () => {
    isModalOpen.value = false
}

const onSlideChange = (swiper: any) => {
    // realIndex is used to get the correct index when loop is true
    currentSlide.value = swiper.realIndex + 1
}

const loadProject = () => {
    if (route.params.slug) {
        projectsStore.fetchProjectBySlug(route.params.slug as string)
    }
}

onMounted(loadProject)

// Re-fetch if the locale changes while viewing the page
watch(() => appStore.locale, loadProject)
</script>

<style scoped>
:deep(.swiper-pagination-bullet) {
    background-color: #fefcfb;
    opacity: 0.5;
}

:deep(.swiper-pagination-bullet-active) {
    background-color: #1282a2;
    opacity: 1;
}
</style>