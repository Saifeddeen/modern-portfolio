import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Skill } from '@/types/general'
import api from '@/composables/useApi'

export const useSkillsStore = defineStore('skills', () => {
    const skills = ref<Skill[]>([])
    const isLoading = ref<boolean>(false)
    const error = ref<string | null>(null)

    async function fetchSkills() {
        isLoading.value = true
        error.value = null
        try {
            const response = await api.get('/skills') // Adjust endpoint if different
            if (response.data.status === 'success' && response.data.data) {
                skills.value = response.data.data
            }
        } catch (err: any) {
            error.value = err.displayMessage || 'Failed to load skills.'
            console.error(error.value)
        } finally {
            isLoading.value = false
        }
    }

    return { skills, isLoading, error, fetchSkills }
})