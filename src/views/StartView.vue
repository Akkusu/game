<script setup lang="ts">
import StartScreen from '@/components/start/StartScreen.vue'

defineEmits<{ start: [] }>()
</script>

<template>
  <div class="start-view">
    <StartScreen @start="$emit('start')" />
  </div>
</template>

<style scoped>
.start-view {
  display: flex;
  flex-direction: column;
  min-height: 90vh;
  min-height: 90dvh;
  width: 100%;
  border-radius: 12px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12);
  background: var(--color-background);
}

@media (min-width: 768px) {
  .start-view {
    max-width: 420px;
    min-height: 0;
    height: 90dvh;
  }
}
</style>
