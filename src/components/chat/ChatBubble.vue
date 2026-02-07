<script setup lang="ts">
import type { ChatSender } from '@/interfaces/chat'

defineProps<{
  text: string
  avatarUrl?: string
  sender?: ChatSender
}>()
</script>

<template>
  <div class="bubble-row pop-in" :class="[sender ?? 'other']">
    <div class="avatar-wrap">
      <img v-if="avatarUrl" :src="avatarUrl" alt="" class="avatar" />
    </div>
    <div class="bubble">
      {{ text }}
    </div>
  </div>
</template>

<style scoped>
.bubble-row {
  display: flex;
  align-items: flex-end;
  gap: 0.5rem;
  margin-bottom: 0.75rem;
  max-width: 85%;
}

.bubble-row.other {
  flex-direction: row;
}

.bubble-row.me {
  flex-direction: row-reverse;
  align-self: flex-end;
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

.avatar-placeholder {
  background: linear-gradient(
    135deg,
    var(--color-cinnamoroll-blue, #b9e9ff),
    var(--color-pink-melody, #ffc0cb)
  );
}

.bubble {
  padding: 0.625rem 0.875rem;
  border-radius: 1rem;
  font-size: 0.9375rem;
  line-height: 1.4;
  word-break: break-word;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.06);
}

.bubble-row.other .bubble {
  border-bottom-left-radius: 0.25rem;
  background: #f9e1df;
  color: var(--color-text);
}

.bubble-row.me .bubble {
  border-bottom-right-radius: 0.25rem;
  background: var(--color-cinnamoroll-blue);
  color: var(--color-heading);
}

/* Animación sutil de pop al aparecer */
.pop-in {
  animation: bubblePop 0.35s ease-out forwards;
}

@keyframes bubblePop {
  0% {
    transform: scale(0.96);
    opacity: 0.9;
  }
  70% {
    transform: scale(1.02);
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}
</style>
