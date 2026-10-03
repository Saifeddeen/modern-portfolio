<template>
  <RouterView />
</template>

<script setup lang="ts">
import { onMounted, watch } from 'vue'
import { RouterView } from 'vue-router'
import { useAppStore } from '@/stores/app'
import { useGeneralStore } from '@/stores/generalDataStore'
import { useTechnologiesStore } from '@/stores/technologiesStore'
import { useServicesStore } from '@/stores/servicesStore'
import { useSkillsStore } from '@/stores/skillsStore'
import { useProjectsStore } from './stores/projectsStore'

const appStore = useAppStore()
const generalStore = useGeneralStore()
const technologiesStore = useTechnologiesStore()
const servicesStore = useServicesStore()
const skillsStore = useSkillsStore()
const projectsStore = useProjectsStore()

onMounted(async () => {
  appStore.initLocale()
  // Fetch in parallel on initial load
  await Promise.all([
    generalStore.fetchSettings(),
    technologiesStore.fetchTechnologies(),
    servicesStore.fetchServices(),
    skillsStore.fetchSkills(),
    projectsStore.fetchFeaturedProjects(),

  ])
})

// Watch for locale changes to re-fetch translated data
watch(
  () => appStore.locale,
  (newLocale, oldLocale) => {
    if (newLocale !== oldLocale) {
      generalStore.fetchSettings()
      technologiesStore.fetchTechnologies()
      servicesStore.fetchServices()
      skillsStore.fetchSkills()
      projectsStore.fetchFeaturedProjects()
    }
  }
)
</script>