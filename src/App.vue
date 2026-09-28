<template>
  <RouterView />
</template>

<script setup lang="ts">
import { onMounted, watch } from 'vue'
import { RouterView } from 'vue-router'
import { useAppStore } from '@/stores/app'
import { useGeneralStore } from '@/stores/generalDataStore'

const appStore = useAppStore()
const generalStore = useGeneralStore()

// 1. Fetch settings on initial load
onMounted(async () => {
  appStore.initLocale()
  await generalStore.fetchSettings()
})

// 2. Watch for locale changes and re-fetch settings
watch(
  () => appStore.locale,
  (newLocale, oldLocale) => {
    if (newLocale !== oldLocale) {
      // Re-fetch the settings so the backend returns the newly translated strings
      generalStore.fetchSettings()
    }
  }
)
</script>