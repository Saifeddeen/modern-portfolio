<template>
  <RouterView />
</template>

<script setup lang="ts">
import { onMounted, watch } from 'vue'
import { RouterView } from 'vue-router'
import { useAppStore } from '@/stores/app'
import { useGeneralStore } from '@/stores/generalDataStore'
import { useSkillsStore } from '@/stores/skillsStore'
import { useServicesStore } from '@/stores/servicesStore'

const appStore = useAppStore()
const generalStore = useGeneralStore()
const skillsStore = useSkillsStore()
const servicesStore = useServicesStore()

onMounted(async () => {
  appStore.initLocale()
  // Fetch in parallel on initial load
  await Promise.all([
    generalStore.fetchSettings(),
    skillsStore.fetchSkills(),
    servicesStore.fetchServices()
  ])
})

// Watch for locale changes to re-fetch translated data
watch(
  () => appStore.locale,
  (newLocale, oldLocale) => {
    if (newLocale !== oldLocale) {
      generalStore.fetchSettings()
      skillsStore.fetchSkills()
      servicesStore.fetchServices()
    }
  }
)
</script>