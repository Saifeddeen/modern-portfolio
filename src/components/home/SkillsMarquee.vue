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
                        <Icon :icon="skill.logo" class="w-12 h-12 mb-4 text-deep_navy-600" />

                        <h3 class="font-semibold text-prussian_blue-500 mb-1">
                            {{ skill.title }}
                        </h3>

                        <p class="text-xs text-gray-500 text-center">
                            {{ skill.short_description }}
                        </p>
                    </div>
                </div>

                <!-- Track 2 -->
                <div class="marquee-group" aria-hidden="true">
                    <div v-for="(skill, index) in loopedSkills" :key="`t2-${index}`" class="skill-card">
                        <Icon :icon="skill.logo" class="w-12 h-12 mb-4 text-deep_navy-600" />

                        <h3 class="font-semibold text-prussian_blue-500 mb-1">
                            {{ skill.title }}
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
import { useHomeStore } from '@/stores/homeStore'
import { computed, onMounted, onUnmounted, ref } from 'vue'

const { skills } = useHomeStore()

/*
 * Four copies make each track significantly wider than
 * the viewport, preventing empty space during the animation.
 */
const loopedSkills = computed(() => {
    return [...skills, ...skills, ...skills, ...skills]
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
 *
 * Two identical groups:
 *
 * LTR:
 * [ TRACK 1 ][ TRACK 2 ]
 *      ← ← ← ←
 *
 * RTL:
 * [ TRACK 2 ][ TRACK 1 ]
 *      → → → →
 *
 * Each track has exactly the same width.
 */

.marquee-track {
    display: flex;
    width: max-content;
    flex-direction: row;

    animation: marquee-ltr 40s linear infinite;

    will-change: transform;
}

/*
 * In RTL we DON'T start at -50%.
 *
 * Instead we swap the two groups:
 *
 * [TRACK 2][TRACK 1]
 *
 * and move the complete belt toward the right.
 */
.marquee-track-rtl {
    flex-direction: row-reverse;
    animation-name: marquee-rtl;
}


/*
 * ============================================================
 * GROUP
 * ============================================================
 *
 * No margin/gap is placed between the two groups.
 *
 * This is important because 50% must represent exactly
 * one complete group.
 */
.marquee-group {
    display: flex;
    flex-shrink: 0;
    gap: 2rem;
}


/*
 * ============================================================
 * CARD
 * ============================================================
 */

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


/*
 * ============================================================
 * LTR
 * ============================================================
 *
 * Initial:
 *
 * [ TRACK 1 ][ TRACK 2 ]
 * └───────────────┘
 *
 * Move exactly one track width to the left.
 *
 * Final:
 *
 * [ TRACK 1 ][ TRACK 2 ]
 *             └────────
 *
 * TRACK 2 is now exactly where TRACK 1 originally was.
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
 *
 * Because row-reverse gives us:
 *
 * [ TRACK 2 ][ TRACK 1 ]
 *
 * we can start at 0 and move the belt to the RIGHT.
 *
 * Initial:
 *
 * [ TRACK 2 ][ TRACK 1 ]
 *
 *              → → → →
 *
 * Final:
 *
 *             [ TRACK 2 ][ TRACK 1 ]
 *
 * TRACK 1 has now taken the exact position TRACK 2 had.
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