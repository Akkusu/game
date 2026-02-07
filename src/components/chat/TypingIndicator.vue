<script setup lang="ts">
defineProps<{
  avatarUrl?: string
}>()
</script>

<template>
  <div class="typing-row other">
    <div class="bubble">
      <span class="dot" />
      <span class="dot" />
      <span class="dot" />
    </div>
  </div>
</template>

<style scoped>
.typing-row {
  display: flex;
  align-items: flex-end;
  gap: 0.5rem;
  margin-bottom: 0.75rem;
  max-width: 85%;
}

.typing-row.other {
  flex-direction: row;
}

.avatar-wrap {
  flex-shrink: 0;
}

.avatar {
  width: 2.25rem;
  height: 2.25rem;
  border-radius: 50%;
  object-fit: contain;
  background: #f9e1df;
}

.bubble {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  padding: 0.75rem 1rem;
  border-radius: 1rem;
  border-bottom-left-radius: 0.25rem;
  background: #f9e1df;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.06);
}

.dot {
  width: 0.35rem;
  height: 0.35rem;
  border-radius: 50%;
  background: var(--color-text, #333);
  opacity: 0.7;
  animation: dotBounce 1s ease-in-out infinite;
}

.dot:nth-child(1) {
  animation-delay: 0s;
}
.dot:nth-child(2) {
  animation-delay: 0.22s;
}
.dot:nth-child(3) {
  animation-delay: 0.44s;
}

@keyframes dotBounce {
  0%,
  100% {
    transform: translateY(0);
  }
  28% {
    transform: translateY(-4px);
  }
  56% {
    transform: translateY(-4px);
  }
  84% {
    transform: translateY(0);
  }
}
</style>
