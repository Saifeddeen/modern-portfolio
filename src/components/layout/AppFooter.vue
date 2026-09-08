<template>
    <footer class="bg-prussian_blue-500 text-white-500 mt-auto border-t border-deep_navy-600">
        <div class="container mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-3 gap-8">

            <!-- Copyrights & Title -->
            <div>
                <h3 class="text-xl font-bold mb-4 text-white-500">{{ generalStore.data.title }}</h3>
                <p class="text-sm text-gray-400">
                    &copy; {{ copyrightText }} {{ generalStore.data.title }}. {{ t('footer.rights') }}
                </p>
            </div>

            <!-- Contact Info -->
            <div>
                <h4 class="text-lg font-semibold mb-4 text-white-500">{{ t('footer.contact') }}</h4>
                <ul class="space-y-2 text-sm text-gray-400">
                    <li class="flex items-center">
                        <Icon icon="lucide:phone" class="me-2 w-4 h-4" />
                        <span dir="ltr">{{ contactStore.info.phone }}</span>
                    </li>
                    <li class="flex items-center">
                        <Icon icon="lucide:mail" class="me-2 w-4 h-4" />
                        {{ contactStore.info.email }}
                    </li>
                    <li class="flex items-center">
                        <Icon icon="lucide:map-pin" class="me-2 w-4 h-4" />
                        {{ contactStore.info.address }}
                    </li>
                </ul>
            </div>

            <!-- Social Media -->
            <div>
                <h4 class="text-lg font-semibold mb-4 text-white-500">{{ t('footer.follow') }}</h4>
                <div class="flex space-x-4">
                    <a v-for="social in socialStore.links" :key="social.id" :href="social.url" target="_blank"
                        rel="noopener noreferrer" class="text-gray-400 hover:text-cerulean-700 transition-colors">
                        <Icon :icon="social.icon" class="w-6 h-6" />
                    </a>
                </div>
            </div>

        </div>
    </footer>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { Icon } from '@iconify/vue'
import { useI18n } from 'vue-i18n'
import { useGeneralDataStore } from '@/stores/generalDataStore'
import { useSocialLinksStore } from '@/stores/socialLinksStore'
import { useContactStore } from '@/stores/contactStore'

const { t } = useI18n()
const generalStore = useGeneralDataStore()
const socialStore = useSocialLinksStore()
const contactStore = useContactStore()

const copyrightText = computed(() => {
    const currentYear = new Date().getFullYear()
    const startYear = 2026
    return currentYear > startYear ? `Copyrighted ${startYear} - ${currentYear}` : `Copyrighted ${startYear}`
})
</script>