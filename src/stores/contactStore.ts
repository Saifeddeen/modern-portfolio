import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { ContactInfo } from '@/types/general'

export const useContactStore = defineStore('contact', () => {
    const info = ref<ContactInfo>({
        phone: '+1 234 567 890',
        email: 'contact@example.com',
        address: 'Istanbul, Turkey'
    })

    return { info }
})