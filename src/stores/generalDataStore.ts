import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { GeneralData } from '@/types/general'

export const useGeneralDataStore = defineStore('generalData', () => {
  const data = ref<GeneralData>({
    logo: 'DevPortfolio',
    title: 'John Doe',
    cv_link: 'https://example.com/cv.pdf'
  })

  return { data }
})