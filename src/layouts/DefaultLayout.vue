<template>
    <div class="min-h-screen flex flex-col bg-white-500 text-prussian_blue-500">
        <AppNavbar />

        <main class="flex-grow container mx-auto px-4 py-8">
            <RouterView />
        </main>

        <AppFooter />
    </div>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'
import AppNavbar from '@/components/layout/AppNavBar.vue'
import AppFooter from '@/components/layout/AppFooter.vue'
</script>