<template>
    <footer class="bg-prussian_blue-500 text-white-500 mt-auto border-t border-deep_navy-600">
        <div class="container mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-3 gap-8">

            <!-- Copyrights & Title -->
            <div>
                <!-- Replace the Footer title in AppFooter.vue -->
                <h3 class="text-xl font-bold mb-4 text-white-500">{{ generalStore.settings?.title || 'Portfolio' }}</h3>
                <p class="text-sm text-gray-400">
                    &copy; {{ copyrightText }} {{ generalStore.settings?.title || 'Portfolio' }}. {{ t('footer.rights')
                    }}
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
                <SocialLinks wrapper-class="bg-white-500/10 hover:bg-cerulean-500 text-white-500 rounded-lg"
                    icon-class="w-5 h-5 text-white-500" />
            </div>

        </div>
    </footer>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { Icon } from '@iconify/vue'
import { useI18n } from 'vue-i18n'
import { useGeneralStore } from '@/stores/generalDataStore'
import { useContactStore } from '@/stores/contactStore'
import SocialLinks from '../ui/SocialLinks.vue'

const { t } = useI18n()
const generalStore = useGeneralStore()
const contactStore = useContactStore()

const copyrightText = computed(() => {
    const currentYear = new Date().getFullYear()
    const startYear = 2026
    return currentYear > startYear ? `Copyrighted ${startYear} - ${currentYear}` : `Copyrighted ${startYear}`
})
</script>