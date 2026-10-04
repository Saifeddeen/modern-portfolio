<template>
    <section class="py-20 md:py-28 bg-gray-50 min-h-screen flex items-center">
        <div class="container mx-auto px-4">
            <div
                class="max-w-6xl mx-auto bg-white-500 rounded-3xl shadow-xl overflow-hidden grid grid-cols-1 lg:grid-cols-5">

                <!-- Left Side: Info & Socials (Dark Theme) -->
                <div class="lg:col-span-2 bg-prussian_blue-500 p-8 md:p-12 text-white-500 relative overflow-hidden">
                    <!-- Background Elements -->
                    <div class="absolute top-0 right-0 w-64 h-64 bg-cerulean-500/10 rounded-full blur-3xl"></div>
                    <div class="absolute bottom-0 left-0 w-64 h-64 bg-yale_blue-500/10 rounded-full blur-3xl"></div>

                    <div class="relative z-10 h-full flex flex-col">
                        <h2 class="text-3xl font-bold mb-2">{{ t('contact_page.title') }}</h2>
                        <p class="text-gray-400 mb-10">{{ t('contact_page.subtitle') }}</p>

                        <h3 class="text-xl font-semibold mb-6">{{ t('contact_page.info_title') }}</h3>
                        <ul class="space-y-6 mb-10">
                            <!-- Phone (Dynamic from Settings API) -->
                            <li v-if="generalStore.settings?.phone" class="flex items-start gap-4">
                                <div
                                    class="w-10 h-10 bg-white-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
                                    <Icon icon="lucide:phone" class="w-5 h-5 text-cerulean-700" />
                                </div>
                                <div>
                                    <span class="block text-sm text-gray-400">{{ t('contact_page.phone_label') }}</span>
                                    <a :href="`tel:${generalStore.settings.phone}`"
                                        class="font-medium hover:text-cerulean-700" dir="ltr">
                                        {{ generalStore.settings.phone }}
                                    </a>
                                </div>
                            </li>
                            <!-- Email -->
                            <li class="flex items-start gap-4">
                                <div
                                    class="w-10 h-10 bg-white-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
                                    <Icon icon="lucide:mail" class="w-5 h-5 text-cerulean-700" />
                                </div>
                                <div>
                                    <span class="block text-sm text-gray-400">{{ t('contact_page.email_label') }}</span>
                                    <a :href="`mailto:${generalStore.settings?.email || 'contact@example.com'}`"
                                        class="font-medium hover:text-cerulean-700">
                                        {{ generalStore.settings?.email || 'contact@example.com' }}
                                    </a>
                                </div>
                            </li>
                            <!-- Address (Dynamic from Settings API) -->
                            <li v-if="generalStore.settings?.address" class="flex items-start gap-4">
                                <div
                                    class="w-10 h-10 bg-white-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
                                    <Icon icon="lucide:map-pin" class="w-5 h-5 text-cerulean-700" />
                                </div>
                                <div>
                                    <span class="block text-sm text-gray-400">{{ t('contact_page.address_label')
                                    }}</span>
                                    <span class="font-medium">{{ generalStore.settings.address }}</span>
                                </div>
                            </li>
                        </ul>

                        <div class="mt-auto">
                            <h4 class="text-lg font-semibold mb-4">{{ t('contact_page.follow_me') }}</h4>
                            <div class="flex gap-3">
                                <a v-for="social in socialStore.links" :key="social.id" :href="social.url"
                                    target="_blank"
                                    class="w-10 h-10 bg-white-500/10 rounded-lg flex items-center justify-center hover:bg-cerulean-500 transition-colors">
                                    <Icon :icon="social.icon" class="w-5 h-5 text-white-500" />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Right Side: Form (Light Theme) -->
                <div class="lg:col-span-3 p-8 md:p-12">
                    <form @submit.prevent="handleSubmit" class="space-y-6">
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label class="block text-sm font-medium text-prussian_blue-500 mb-2">{{
                                    t('contact_page.form.name') }}</label>
                                <input v-model="form.name" type="text" required
                                    class="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:ring-2 focus:ring-cerulean-500 focus:border-transparent outline-none transition-all" />
                            </div>
                            <div>
                                <label class="block text-sm font-medium text-prussian_blue-500 mb-2">{{
                                    t('contact_page.form.email') }}</label>
                                <input v-model="form.email" type="email" required
                                    class="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:ring-2 focus:ring-cerulean-500 focus:border-transparent outline-none transition-all" />
                            </div>
                        </div>

                        <div>
                            <label class="block text-sm font-medium text-prussian_blue-500 mb-2">{{
                                t('contact_page.form.subject') }}</label>
                            <input v-model="form.subject" type="text" required
                                class="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:ring-2 focus:ring-cerulean-500 focus:border-transparent outline-none transition-all" />
                        </div>

                        <div>
                            <label class="block text-sm font-medium text-prussian_blue-500 mb-2">{{
                                t('contact_page.form.message') }}</label>
                            <textarea v-model="form.message" rows="5" required
                                class="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:ring-2 focus:ring-cerulean-500 focus:border-transparent outline-none transition-all resize-none"></textarea>
                        </div>

                        <!-- Feedback Messages -->
                        <div v-if="contactStore.sendSuccess"
                            class="flex items-start gap-3 text-green-700 bg-green-50 p-4 rounded-xl border border-green-100">
                            <Icon icon="lucide:check-circle" class="w-6 h-6 flex-shrink-0 mt-0.5" />
                            <span class="font-medium">{{ t('contact_page.form.success') }}</span>
                        </div>
                        <div v-if="contactStore.sendSuccess === false"
                            class="flex items-start gap-3 text-red-600 bg-red-50 p-4 rounded-xl border border-red-100">
                            <Icon icon="lucide:alert-circle" class="w-6 h-6 flex-shrink-0 mt-0.5" />
                            <span class="font-medium">{{ contactStore.errorMessage || t('contact_page.form.error')
                                }}</span>
                        </div>

                        <button type="submit" :disabled="contactStore.isSending"
                            class="w-full md:w-auto px-8 py-4 bg-prussian_blue-500 hover:bg-deep_navy-600 text-white-500 font-medium rounded-xl transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed">
                            <Icon v-if="contactStore.isSending" icon="eos-icons:loading" class="w-5 h-5 animate-spin" />
                            <Icon v-else icon="lucide:send" class="w-5 h-5" />
                            {{ contactStore.isSending ? t('contact_page.form.sending') : t('contact_page.form.submit')
                            }}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
import { reactive, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { Icon } from '@iconify/vue'
import { useContactStore } from '@/stores/contactStore'
import { useSocialLinksStore } from '@/stores/socialLinksStore'
import { useGeneralStore } from '@/stores/generalDataStore'
import type { ContactMessage } from '@/types/general'

const { t } = useI18n()
const contactStore = useContactStore()
const socialStore = useSocialLinksStore()
const generalStore = useGeneralStore()

const isResetting = ref(false) // Flag to prevent watch from clearing message on reset

const form = reactive<ContactMessage>({
    name: '',
    email: '',
    subject: '',
    message: ''
})

const handleSubmit = async () => {
    await contactStore.sendMessage(form)
    if (contactStore.sendSuccess) {
        isResetting.value = true // Tell watcher to ignore the next trigger
        form.name = ''
        form.email = ''
        form.subject = ''
        form.message = ''
    }
}

// Clear success/error message if user starts typing a new message
watch(form, () => {
    if (isResetting.value) {
        isResetting.value = false
        return
    }
    if (contactStore.sendSuccess !== null) {
        contactStore.sendSuccess = null
    }
})
</script>