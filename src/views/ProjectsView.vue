<template>
    <section class="py-20 md:py-28 bg-gray-50 min-h-screen">
        <div class="container mx-auto px-4">
            <div class="text-center mb-16">
                <h1 class="text-4xl md:text-5xl font-bold text-prussian_blue-500 mb-4">{{ t('projects_page.title') }}
                </h1>
                <p class="text-gray-500 text-lg max-w-2xl mx-auto">{{ t('projects_page.subtitle') }}</p>
            </div>

            <div v-if="projectsStore.isLoadingProjects" class="flex justify-center py-20">
                <Icon icon="eos-icons:loading" class="w-12 h-12 text-cerulean-500 animate-spin" />
            </div>

            <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <ProjectCard v-for="proj in projectsStore.projects" :key="proj.id" :project="proj" />
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { Icon } from '@iconify/vue'
import { useProjectsStore } from '@/stores/projectsStore'
import ProjectCard from '@/components/projects/ProjectCard.vue'

const { t } = useI18n()
const projectsStore = useProjectsStore()

onMounted(() => {
    projectsStore.fetchProjects()
})
</script>