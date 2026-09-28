import axios, { type AxiosInstance, type InternalAxiosRequestConfig, type AxiosResponse } from 'axios'
import type { ApiResponse } from '@/types/general'
import { useAppStore } from '@/stores/app'

const api: AxiosInstance = axios.create({
    // Read from the specific VITE_BACKEND_API_URL variable
    baseURL: import.meta.env.VITE_BACKEND_API_URL ?? '/api',
    timeout: 15000,
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
    },
})

// Request Interceptor: Attach Auth Token and Language
api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem('token')
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }

    // Attach Accept-Language header
    const appStore = useAppStore()
    config.headers['Accept-Language'] = appStore.locale

    return config
})

// Response Interceptor: Unwrap data and handle standard errors
api.interceptors.response.use(
    (response: AxiosResponse<ApiResponse<unknown>>) => {
        if (response.data.status === 'error') {
            return Promise.reject(new Error(response.data.message || 'Unknown API error'))
        }
        return response
    },
    (error) => {
        if (error.response?.status === 401) {
            localStorage.removeItem('token')
        }

        let errorMessage = 'An unexpected network error occurred.'
        if (error.response?.data?.message) {
            errorMessage = error.response.data.message
        } else if (error.message) {
            errorMessage = error.message
        }

        if (error.response?.data?.errors) {
            error.validationErrors = error.response.data.errors
        }

        error.displayMessage = errorMessage
        return Promise.reject(error)
    },
)

export function useApi() {
    return api
}
export default api