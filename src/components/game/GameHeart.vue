<script setup lang="ts">
import heartImg from '@/assets/img/Heart.png'

defineProps<{
  x: number
  y: number
  /** Índice para variar la animación (ej. impares con delay) */
  index?: number
}>()
</script>

<template>
  <div
    class="heart"
    :class="{ 'heart-odd': (index ?? 0) % 2 === 1 }"
    :style="{ left: x + 'px', top: y + 'px' }"
  >
    <img :src="heartImg" alt="Corazón" class="heart-img" />
  </div>
</template>

<style scoped>
.heart {
  position: absolute;
  width: 48px;
  height: 48px;
  z-index: 1;
  animation: float 2s ease-in-out infinite;
}

.heart-odd {
  animation-delay: -0.5s;
}

.heart-img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1));
}

@keyframes float {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-6px);
  }
}
</style>
