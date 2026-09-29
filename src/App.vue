<template>
  <RouterView />
</template>

<script setup lang="ts">
import { onMounted, watch } from 'vue'
import { RouterView } from 'vue-router'
import { useAppStore } from '@/stores/app'
import { useGeneralStore } from '@/stores/generalDataStore'
import { useSkillsStore } from '@/stores/skillsStore'

const appStore = useAppStore()
const generalStore = useGeneralStore()
const skillsStore = useSkillsStore()

onMounted(async () => {
  appStore.initLocale()
  // Fetch both in parallel on initial load
  await Promise.all([
    generalStore.fetchSettings(),
    skillsStore.fetchSkills()
  ])
})

// Watch for locale changes to re-fetch translated data
watch(
  () => appStore.locale,
  (newLocale, oldLocale) => {
    if (newLocale !== oldLocale) {
      generalStore.fetchSettings()
      skillsStore.fetchSkills()
    }
  }
)
</script>