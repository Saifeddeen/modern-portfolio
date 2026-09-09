<template>
    <section class="py-16">
        <div class="container mx-auto px-4">
            <div class="bg-gradient-to-r from-deep_navy-500 to-cerulean-500 rounded-2xl p-12 text-center shadow-lg">
                <h2 class="text-3xl font-bold text-white-500 mb-4">
                    {{ $t('cta.title') }}
                </h2>
                <p class="text-gray-200 mb-8 max-w-xl mx-auto">
                    {{ $t('cta.subtitle') }}
                </p>
                <RouterLink to="/contact"
                    class="inline-block bg-white-500 text-deep_navy-500 font-bold px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors">
                    {{ $t('cta.button_text') }}
                </RouterLink>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>