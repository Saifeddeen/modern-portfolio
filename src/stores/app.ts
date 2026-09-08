import { defineStore } from 'pinia'
import { ref } from 'vue'
import i18n from '@/i18n'
import type { SupportedLocale } from '@/types/general'

export const useAppStore = defineStore('app', () => {
    const locale = ref<SupportedLocale>(localStorage.getItem('locale') as SupportedLocale || 'en')
    const isRTL = ref<boolean>(locale.value === 'ar')

    function setLocale(newLocale: SupportedLocale) {
        locale.value = newLocale
        isRTL.value = newLocale === 'ar'

        i18n.global.locale.value = newLocale
        document.documentElement.setAttribute('lang', newLocale)
        document.documentElement.setAttribute('dir', isRTL.value ? 'rtl' : 'ltr')
        localStorage.setItem('locale', newLocale)
    }

    function initLocale() {
        setLocale(locale.value)
    }

    return { locale, isRTL, setLocale, initLocale }
})