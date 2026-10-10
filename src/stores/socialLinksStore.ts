import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { SocialLink } from '@/types/general'
import api from '@/composables/useApi'

export const useSocialLinksStore = defineStore('socialLinks', () => {
    const links = ref<SocialLink[]>([])
    const isLoading = ref(false)

    async function fetchSocialLinks() {
        isLoading.value = true
        try {
            const response = await api.get('/social-links')
            if (response.data.status === 'success' && response.data.data) {
                // Ensure only active links are displayed
                links.value = response.data.data.filter((link: SocialLink) => link.is_active)
            }
        } catch (error) {
            console.error('Failed to fetch social links:', error)
        } finally {
            isLoading.value = false
        }
    }

    return { links, isLoading, fetchSocialLinks }
})