<template>
    <div class="pb-16">
        <HeroSection />
        <ServicesSection />
        <TopProjectsSlider />
        <TechnologiesMarquee />
        <SkillsSection />
        <CallToActionSection />
    </div>
</template>

<script setup lang="ts">
import HeroSection from '@/components/home/HeroSection.vue'
import ServicesSection from '@/components/home/ServicesSection.vue'
import TopProjectsSlider from '@/components/home/TopProjectsSlider.vue'
import TechnologiesMarquee from '@/components/home/TechnologiesMarquee.vue'
import CallToActionSection from '@/components/home/CallToActionSection.vue'
import SkillsSection from '@/components/home/SkillsSection.vue'
</script>