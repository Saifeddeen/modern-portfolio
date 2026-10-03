<template>
    <RouterLink :to="`/projects/${project.slug}`"
        class="block bg-white-500 rounded-2xl overflow-hidden shadow-md border border-gray-100 group transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
        <div class="relative h-56 overflow-hidden bg-prussian_blue-500">
            <img v-if="project.hero_image" :src="project.hero_image" :alt="project.title"
                class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            <div
                class="absolute inset-0 bg-gradient-to-t from-prussian_blue-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            </div>
        </div>
        <div class="p-6">
            <span class="text-xs font-medium text-cerulean-600 uppercase tracking-wider">{{ project.owner }}</span>
            <h3
                class="text-xl font-bold text-prussian_blue-500 mt-1 mb-2 group-hover:text-cerulean-600 transition-colors">
                {{ project.title }}</h3>
            <p class="text-gray-500 text-sm line-clamp-2 mb-4">{{ project.short_description }}</p>

            <div class="flex flex-wrap gap-2 mt-4">
                <span v-for="tech in project.technologies.slice(0, 3)" :key="tech.id"
                    class="bg-gray-100 text-prussian_blue-500 text-xs px-2 py-1 rounded-full flex items-center gap-1">
                    <Icon v-if="tech.vue_iconify" :icon="tech.vue_iconify" class="w-3 h-3" />
                    {{ tech.name }}
                </span>
                <span v-if="project.technologies.length > 3" class="text-xs text-gray-400 self-center">
                    +{{ project.technologies.length - 3 }}
                </span>
            </div>
        </div>
    </RouterLink>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { Icon } from '@iconify/vue'
import type { PublishedProject } from '@/types/project'

defineProps<{ project: PublishedProject }>()
</script>