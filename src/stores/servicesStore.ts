import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Service } from '@/types/general'
import api from '@/composables/useApi'

export const useServicesStore = defineStore('services', () => {
    const services = ref<Service[]>([])
    const isLoading = ref<boolean>(false)
    const error = ref<string | null>(null)

    async function fetchServices() {
        isLoading.value = true
        error.value = null
        try {
            const response = await api.get('/services')
            if (response.data.status === 'success' && response.data.data) {
                services.value = response.data.data
            }
        } catch (err: any) {
            error.value = err.displayMessage || 'Failed to load services.'
            console.error(error.value)
        } finally {
            isLoading.value = false
        }
    }

    return { services, isLoading, error, fetchServices }
})
