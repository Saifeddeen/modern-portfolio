import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { FeaturedProject, PublishedProject, ProjectDetail } from '@/types/project'
import api from '@/composables/useApi'

export const useProjectsStore = defineStore('project', () => {
    const featuredProjects = ref<FeaturedProject[]>([])
    const projects = ref<PublishedProject[]>([])
    const currentProject = ref<ProjectDetail | null>(null)

    const isLoadingFeatured = ref(false)
    const isLoadingProjects = ref(false)
    const isLoadingDetail = ref(false)

    async function fetchFeaturedProjects() {
        isLoadingFeatured.value = true
        try {
            const response = await api.get('/projects/featured')
            if (response.data.status === 'success') {
                featuredProjects.value = response.data.data
            }
        } catch (error) {
            console.error('Failed to fetch featured projects:', error)
        } finally {
            isLoadingFeatured.value = false
        }
    }

    async function fetchProjects() {
        isLoadingProjects.value = true
        try {
            const response = await api.get('/projects')
            if (response.data.status === 'success') {
                projects.value = response.data.data
            }
        } catch (error) {
            console.error('Failed to fetch projects:', error)
        } finally {
            isLoadingProjects.value = false
        }
    }

    async function fetchProjectBySlug(slug: string) {
        isLoadingDetail.value = true
        currentProject.value = null
        try {
            const response = await api.get(`/projects/${slug}`)
            if (response.data.status === 'success') {
                currentProject.value = response.data.data
            }
        } catch (error) {
            console.error('Failed to fetch project details:', error)
        } finally {
            isLoadingDetail.value = false
        }
    }

    return {
        featuredProjects,
        projects,
        currentProject,
        isLoadingFeatured,
        isLoadingProjects,
        isLoadingDetail,
        fetchFeaturedProjects,
        fetchProjects,
        fetchProjectBySlug
    }
})