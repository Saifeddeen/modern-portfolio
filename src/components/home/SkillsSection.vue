<template>
    <section class="relative py-24 md:py-32 overflow-hidden bg-prussian_blue-500">

        <!-- Tech Background Elements -->
        <!-- Animated Cyber Grid -->
        <div
            class="absolute inset-0 bg-[linear-gradient(to_right,#1d3172_1px,transparent_1px),linear-gradient(to_bottom,#1d3172_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,#000_50%,transparent_100%)] opacity-20 animate-grid-pan">
        </div>

        <!-- Smooth Drifting Glowing Orbs -->
        <div
            class="absolute top-[10%] left-[15%] w-72 h-72 md:w-96 md:h-96 bg-cerulean-500/20 rounded-full blur-[120px] animate-drift-1">
        </div>
        <div
            class="absolute bottom-[15%] right-[10%] w-80 h-80 md:w-[500px] md:h-[500px] bg-yale_blue-500/20 rounded-full blur-[150px] animate-drift-2">
        </div>
        <div
            class="absolute top-[40%] right-[30%] w-64 h-64 bg-prussian_blue-600/30 rounded-full blur-[100px] animate-drift-3">
        </div>

        <!-- Floating Tech Particles -->
        <div class="absolute inset-0 overflow-hidden pointer-events-none">
            <span v-for="n in 20" :key="n" class="particle" :style="particleStyle(n)"></span>
        </div>

        <div class="container mx-auto px-4 mb-16 text-center relative z-10">
            <h2 class="text-4xl font-bold text-white-500 mb-2">
                {{ $t('skills_section.title') }}
            </h2>
            <p class="text-gray-400 text-lg max-w-2xl mx-auto">
                {{ $t('skills_section.subtitle') }}
            </p>
        </div>

        <!-- Skills Flex-Wrap Container -->
        <div class="relative max-w-6xl mx-auto z-10 px-4 sm:px-6 lg:px-8">
            <div class="flex flex-wrap justify-center items-center gap-0">
                <div v-for="(skill, index) in skillsStore.skills" :key="skill.id"
                    class="skill-tag group cursor-default"
                    :style="{ animationDelay: `${index * 0.25}s`, animationDuration: `${4 + (index % 4)}s` }">
                    <!-- Holographic Tag Style -->
                    <div
                        class="flex items-center gap-2 px-4 py-3 sm:px-6 sm:py-3.5 bg-white-500/5 backdrop-blur-md rounded-xl shadow-lg border border-white-500/10 transition-all duration-300 group-hover:scale-110 group-hover:shadow-2xl group-hover:bg-white-500/10 group-hover:border-cerulean-500">

                        <!-- Conditional Icon -->
                        <div v-if="skill.vue_iconify || skill.svg_icon"
                            class="flex items-center justify-center text-cerulean-700 shrink-0">
                            <Icon v-if="skill.vue_iconify" :icon="skill.vue_iconify" class="w-5 h-5 sm:w-6 sm:h-6" />
                            <div v-else-if="skill.svg_icon" class="raw-svg-container" v-html="skill.svg_icon"></div>
                        </div>

                        <span class="font-semibold text-white-500 whitespace-nowrap text-sm sm:text-base lg:text-lg">
                            {{ skill.title }}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { useSkillsStore } from '@/stores/skillsStore'

const skillsStore = useSkillsStore()

// Background particles
const particleStyle = (n: number) => {
    const size = (n % 3) + 2
    const x = (n * 5) % 100
    const y = (n * 7) % 100
    const duration = 5 + (n % 5)
    const delay = (n % 5) * 0.5
    return {
        width: `${size}px`,
        height: `${size}px`,
        left: `${x}%`,
        top: `${y}%`,
        animationDuration: `${duration}s`,
        animationDelay: `${delay}s`,
    }
}
</script>

<style scoped>
/* --- Skill Tag Animations --- */
.skill-tag {
    /* 6px margin keeps neighbouring tags separated */
    margin: 6px;
    display: inline-flex;
    position: relative;
    z-index: 1;
    animation: float 6s ease-in-out infinite;
    will-change: transform;
}

.skill-tag:hover {
    animation-play-state: paused;
    z-index: 50;
}

@keyframes float {
    0%   { transform: translateY(0px); }
    50%  { transform: translateY(-14px); }
    100% { transform: translateY(0px); }
}

/* --- Background Animations --- */
.animate-grid-pan {
    animation: gridPan 20s linear infinite;
}

@keyframes gridPan {
    0% {
        background-position: 0 0;
    }

    100% {
        background-position: 4rem 4rem;
    }
}

/* Smooth, random drifting blur orbs */
@keyframes drift1 {

    0%,
    100% {
        transform: translate(0, 0) scale(1);
    }

    33% {
        transform: translate(50px, -30px) scale(1.1);
    }

    66% {
        transform: translate(-30px, 40px) scale(0.9);
    }
}

@keyframes drift2 {

    0%,
    100% {
        transform: translate(0, 0) scale(1);
    }

    33% {
        transform: translate(-60px, 20px) scale(1.2);
    }

    66% {
        transform: translate(40px, -50px) scale(0.95);
    }
}

@keyframes drift3 {

    0%,
    100% {
        transform: translate(0, 0) scale(1);
    }

    50% {
        transform: translate(30px, 50px) scale(1.15);
    }
}

.animate-drift-1 {
    animation: drift1 15s ease-in-out infinite;
}

.animate-drift-2 {
    animation: drift2 18s ease-in-out infinite;
}

.animate-drift-3 {
    animation: drift3 12s ease-in-out infinite;
}

.particle {
    position: absolute;
    background: rgba(255, 255, 255, 0.4);
    border-radius: 50%;
    box-shadow: 0 0 10px rgba(18, 130, 162, 0.8);
    animation: floatParticle linear infinite;
}

@keyframes floatParticle {
    0% {
        transform: translateY(0) scale(1);
        opacity: 0;
    }

    20% {
        opacity: 1;
    }

    80% {
        opacity: 1;
    }

    100% {
        transform: translateY(-100px) scale(0.5);
        opacity: 0;
    }
}

/* --- Raw SVG Uniformity --- */
.raw-svg-container {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
}

.raw-svg-container :deep(svg) {
    width: 24px !important;
    height: 24px !important;
    fill: currentColor !important;
    stroke: currentColor !important;
}
</style>