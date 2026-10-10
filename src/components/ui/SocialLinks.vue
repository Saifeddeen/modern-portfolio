<template>
    <div class="flex flex-wrap gap-3">
        <a v-for="social in socialStore.links" :key="social.id" :href="social.link" target="_blank"
            rel="noopener noreferrer" :title="social.name"
            class="flex items-center justify-center transition-colors duration-300" :class="[
                hasIcon(social) ? 'w-10 h-10' : 'px-4 h-10',
                props.wrapperClass
            ]">
            <!-- Iconify -->
            <Icon v-if="social.vue_iconify" :icon="social.vue_iconify" :class="props.iconClass" />

            <!-- Raw SVG -->
            <div v-else-if="social.svg_icon" class="raw-svg-container" v-html="social.svg_icon"></div>

            <!-- Text Fallback -->
            <span v-else class="text-sm font-medium whitespace-nowrap">
                {{ social.name }}
            </span>
        </a>
    </div>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { useSocialLinksStore } from '@/stores/socialLinksStore'
import type { SocialLink } from '@/types/general'

const socialStore = useSocialLinksStore()

interface Props {
    wrapperClass?: string
    iconClass?: string
}
const props = withDefaults(defineProps<Props>(), {
    // Default styling for the anchor tags
    wrapperClass: 'bg-gray-100 hover:bg-cerulean-500 text-prussian_blue-500 hover:text-white-500 rounded-lg',
    iconClass: 'w-5 h-5'
})

const hasIcon = (social: SocialLink) => {
    return !!social.vue_iconify || !!social.svg_icon
}
</script>

<style scoped>
.raw-svg-container {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
}

.raw-svg-container :deep(svg) {
    width: 20px !important;
    height: 20px !important;
    fill: currentColor !important;
    stroke: currentColor !important;
}
</style>