<script setup lang="ts">
import ternurinImg from '@/assets/img/Ternurin.png'

defineProps<{
    jumping: boolean
}>()
</script>

<template>
    <div class="question-character" :class="{ jumping }">
        <img :src="ternurinImg" alt="Ternurin" class="character-img" />
    </div>
</template>

<style scoped>
.question-character {
    display: flex;
    justify-content: center;
    align-items: center;
    transition: transform 0.2s ease-out;
}

.question-character.jumping {
    animation: jump 0.5s infinite;
}

.character-img {
    width: 10rem;
    height: auto;
    object-fit: cover;
    pointer-events: none;
}

@keyframes jump {
    0% {
        transform: translateY(0) scale(1);
    }

    25% {
        transform: translateY(-70px) scale(1.08);
    }

    50% {
        transform: translateY(-110px) scale(1.12);
    }

    75% {
        transform: translateY(-45px) scale(1.05);
    }

    100% {
        transform: translateY(0) scale(1);
    }
}
</style>
