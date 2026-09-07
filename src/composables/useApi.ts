import axios, { type AxiosInstance, type InternalAxiosRequestConfig } from 'axios'

const api: AxiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL ?? '/api',
    timeout: 15000,
    headers: { Accept: 'application/json' },
})

// Attach auth token from wherever you store it (Pinia / localStorage)
api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem('token')
    if (token) config.headers.Authorization = `Bearer ${token}`
    return config
})

// Normalize errors + handle 401 globally
api.interceptors.response.use(
    (res) => res,
    (error) => {
        if (error.response?.status === 401) {
            // e.g. redirect to login, clear store
        }
        return Promise.reject(error)
    },
)

export function useApi() {
    return api
}
export default api