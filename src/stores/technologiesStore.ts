import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Technology } from '@/types/general'
import api from '@/composables/useApi'

export const useTechnologiesStore = defineStore('technologies', () => {
    const technologies = ref<Technology[]>([])
    const isLoading = ref<boolean>(false)
    const error = ref<string | null>(null)

    async function fetchTechnologies() {
        isLoading.value = true
        error.value = null
        try {
            const response = await api.get('/technologies')
            if (response.data.status === 'success' && response.data.data) {
                technologies.value = response.data.data
            }
        } catch (err: any) {
            error.value = err.displayMessage || 'Failed to load technologies.'
            console.error(error.value)
        } finally {
            isLoading.value = false
        }
    }

    return { technologies, isLoading, error, fetchTechnologies }
})