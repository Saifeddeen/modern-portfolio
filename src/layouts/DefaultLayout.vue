<template>
    <div class="min-h-screen flex flex-col bg-white-500 text-prussian_blue-500">
        <AppNavbar />

        <!-- Removed container and py-8 from here -->
        <main class="flex-grow">
            <RouterView />
        </main>

        <AppFooter />
    </div>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'
import AppNavbar from '@/components/layout/AppNavbar.vue'
import AppFooter from '@/components/layout/AppFooter.vue'
</script>