import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { SocialLink } from '@/types/general'

export const useSocialLinksStore = defineStore('socialLinks', () => {
    const links = ref<SocialLink[]>([
        { id: 1, platform: 'GitHub', url: 'https://github.com', icon: 'simple-icons:github' },
        { id: 2, platform: 'LinkedIn', url: 'https://linkedin.com', icon: 'simple-icons:linkedin' },
        { id: 3, platform: 'X', url: 'https://x.com', icon: 'simple-icons:x' }
    ])

    return { links }
})