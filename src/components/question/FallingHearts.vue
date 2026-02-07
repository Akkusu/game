<script setup lang="ts">
import heartImg from '@/assets/img/Heart.png'

const hearts = [
    { left: '8%', size: 22, delay: 0, duration: 22 },
    { left: '18%', size: 18, delay: 3, duration: 25 },
    { left: '28%', size: 24, delay: 6, duration: 20 },
    { left: '42%', size: 16, delay: 2, duration: 28 },
    { left: '55%', size: 20, delay: 5, duration: 24 },
    { left: '68%', size: 26, delay: 1, duration: 21 },
    { left: '78%', size: 18, delay: 4, duration: 26 },
    { left: '88%', size: 22, delay: 7, duration: 23 },
]
</script>

<template>
    <div class="falling-hearts" aria-hidden="true">
        <div v-for="(heart, i) in hearts" :key="i" class="heart" :style="{
            left: heart.left,
            width: heart.size + 'px',
            height: heart.size + 'px',
            animationDelay: heart.delay + 's',
            animationDuration: heart.duration + 's',
        }">
            <img :src="heartImg" alt="" class="heart-img" />
        </div>
    </div>
</template>

<style scoped>
.falling-hearts {
    position: absolute;
    inset: 0;
    pointer-events: none;
    z-index: 0;
    overflow: hidden;
}

.heart {
    position: absolute;
    top: -15%;
    animation: fall ease-in-out infinite;
}

.heart-img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    opacity: 0.35;
    filter: drop-shadow(0 1px 2px rgba(0, 0, 0, 0.06));
}

@keyframes fall {
    0% {
        transform: translateY(0) rotate(-6deg);
    }


    100% {
        transform: translateY(105vh) rotate(-6deg);
    }
}
</style>
