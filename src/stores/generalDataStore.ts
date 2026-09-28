import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { SiteSettings } from '@/types/general'
import api from '@/composables/useApi'

export const useGeneralStore = defineStore('generalData', () => {
  const settings = ref<SiteSettings | null>(null)
  const isLoading = ref<boolean>(false)
  const error = ref<string | null>(null)

  async function fetchSettings() {
    isLoading.value = true
    error.value = null
    try {
      const response = await api.get('/settings')
      if (response.data.status === 'success' && response.data.data) {
        settings.value = response.data.data
      }
    } catch (err: any) {
      error.value = err.displayMessage || 'Failed to load site settings.'
      console.error(error.value)
    } finally {
      isLoading.value = false
    }
  }

  return { settings, isLoading, error, fetchSettings }
})