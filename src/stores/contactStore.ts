import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { ContactInfo, ContactMessage } from '@/types/general'
import api from '@/composables/useApi'

export const useContactStore = defineStore('contact', () => {
    const info = ref<ContactInfo>({
        phone: '+1 234 567 890',
        email: 'contact@example.com',
        address: 'Istanbul, Turkey'
    })

    const isSending = ref(false)
    const sendSuccess = ref<boolean | null>(null)
    const successMessage = ref<string | null>(null)
    const errorMessage = ref<string | null>(null)

    async function sendMessage(payload: ContactMessage) {
        isSending.value = true
        sendSuccess.value = null
        successMessage.value = null
        errorMessage.value = null

        try {
            // Updated endpoint to /messages
            const response = await api.post('/messages', payload)

            if (response.data.status === 'success') {
                sendSuccess.value = true
                // Store the success message from backend if you want to use it instead of the i18n file
                successMessage.value = response.data.message
            }
        } catch (err: any) {
            sendSuccess.value = false
            // The Axios interceptor automatically extracts the backend's error message
            // If there are 422 validation errors, err.displayMessage will contain the backend's message
            errorMessage.value = err.displayMessage || 'Failed to send message.'
        } finally {
            isSending.value = false
        }
    }

    return { info, isSending, sendSuccess, successMessage, errorMessage, sendMessage }
})