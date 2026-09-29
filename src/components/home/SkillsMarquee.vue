<template>
    <section class="py-16 md:py-24 overflow-hidden">
        <div class="container mx-auto px-4 mb-12">
            <h2 class="text-3xl font-bold text-center text-prussian_blue-500">
                {{ $t('skills_marquee.title') }}
            </h2>
        </div>

        <div class="relative overflow-hidden">
            <!--
                The marquee itself is always LTR.
                We only change the order of the two duplicated tracks
                and the direction of their movement.
            -->
            <div class="marquee-track" :class="{ 'marquee-track-rtl': isRtl }" dir="ltr">
                <!-- Track 1 -->
                <div class="marquee-group">
                    <div v-for="(skill, index) in loopedSkills" :key="`t1-${index}`" class="skill-card">
                        <!-- Icon Wrapper for uniform sizing -->
                        <div class="icon-wrapper mb-4 text-deep_navy-600">
                            <Icon v-if="skill.vue_iconify" :icon="skill.vue_iconify" class="custom-icon" />
                            <div v-else-if="skill.svg_icon" class="raw-svg-container" v-html="skill.svg_icon"></div>
                            <Icon v-else icon="lucide:code" class="custom-icon" />
                        </div>

                        <h3 class="font-semibold text-prussian_blue-500 mb-1">
                            {{ skill.name }}
                        </h3>

                        <p class="text-xs text-gray-500 text-center">
                            {{ skill.short_description }}
                        </p>
                    </div>
                </div>

                <!-- Track 2 -->
                <div class="marquee-group" aria-hidden="true">
                    <div v-for="(skill, index) in loopedSkills" :key="`t2-${index}`" class="skill-card">
                        <div class="icon-wrapper mb-4 text-deep_navy-600">
                            <Icon v-if="skill.vue_iconify" :icon="skill.vue_iconify" class="custom-icon" />
                            <div v-else-if="skill.svg_icon" class="raw-svg-container" v-html="skill.svg_icon"></div>
                            <Icon v-else icon="lucide:code" class="custom-icon" />
                        </div>

                        <h3 class="font-semibold text-prussian_blue-500 mb-1">
                            {{ skill.name }}
                        </h3>

                        <p class="text-xs text-gray-500 text-center">
                            {{ skill.short_description }}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { useSkillsStore } from '@/stores/skillsStore' // Updated to use the new API store
import { computed, onMounted, onUnmounted, ref } from 'vue'

const skillsStore = useSkillsStore()

/*
 * Four copies make each track significantly wider than
 * the viewport, preventing empty space during the animation.
 */
const loopedSkills = computed(() => {
    if (!skillsStore.skills.length) return []
    return [...skillsStore.skills, ...skillsStore.skills, ...skillsStore.skills, ...skillsStore.skills]
})

const isRtl = ref(false)

let directionObserver: MutationObserver | null = null

const updateDirection = () => {
    isRtl.value =
        document.documentElement.getAttribute('dir') === 'rtl'
}

onMounted(() => {
    updateDirection()

    directionObserver = new MutationObserver(() => {
        updateDirection()
    })

    directionObserver.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ['dir'],
    })
})

onUnmounted(() => {
    directionObserver?.disconnect()
})
</script>

<style scoped>
/*
 * ============================================================
 * MARQUEE TRACK
 * ============================================================
 */

.marquee-track {
    display: flex;
    width: max-content;
    flex-direction: row;

    animation: marquee-ltr 40s linear infinite;

    will-change: transform;
}

.marquee-track-rtl {
    flex-direction: row-reverse;
    animation-name: marquee-rtl;
}

.marquee-group {
    display: flex;
    flex-shrink: 0;
    gap: 2rem;
    margin: 0 1rem;
}

.skill-card {
    display: flex;
    flex-direction: column;
    align-items: center;

    width: 10rem;
    flex-shrink: 0;

    background: white;

    padding: 1.5rem;

    border-radius: 0.75rem;

    box-shadow: 0 1px 2px rgb(0 0 0 / 5%);

    border: 1px solid #f3f4f6;
}

/* --- Icon Sizing and Uniformity --- */
.icon-wrapper {
    width: 48px;
    /* w-12 */
    height: 48px;
    /* h-12 */
    display: flex;
    align-items: center;
    justify-content: center;
}

.custom-icon {
    width: 48px;
    height: 48px;
}

/* Force raw SVGs to inherit the exact same size and color */
.raw-svg-container {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
}

.raw-svg-container :deep(svg) {
    width: 48px !important;
    height: 48px !important;
    fill: currentColor !important;
    /* Inherits text-deep_navy-600 */
    stroke: currentColor !important;
}

/*
 * ============================================================
 * LTR
 * ============================================================
 */
@keyframes marquee-ltr {
    from {
        transform: translate3d(0, 0, 0);
    }

    to {
        transform: translate3d(-50%, 0, 0);
    }
}


/*
 * ============================================================
 * RTL
 * ============================================================
 */
@keyframes marquee-rtl {
    from {
        transform: translate3d(0, 0, 0);
    }

    to {
        transform: translate3d(50%, 0, 0);
    }
}
</style>