import { createI18n } from 'vue-i18n'
import en from '@/locales/en.json'
import ar from '@/locales/ar.json'
import tr from '@/locales/tr.json'

export const SUPPORTED_LOCALES = ['en', 'ar', 'tr'] as const
export type Locale = (typeof SUPPORTED_LOCALES)[number]

const i18n = createI18n({
    legacy: false,            // Composition API mode
    locale: 'en',
    fallbackLocale: 'en',
    messages: { en, ar, tr },
})

export default i18n