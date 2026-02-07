<script setup lang="ts">
import { ref, computed, onUnmounted } from 'vue'
import ChatBubble from '@/components/chat/ChatBubble.vue'
import TypingIndicator from '@/components/chat/TypingIndicator.vue'
import { useSequentialMessages, PRE_TYPING_DELAY_MS } from '@/composables/useSequentialMessages'
import type { SequentialMessage } from '@/composables/useSequentialMessages'
import ternurinAvatarUrl from '@/assets/img/CabezaTernurin.png'
import ternurinLentesAvatarUrl from '@/assets/img/CabezaTernurinLentes.png'

const emit = defineEmits<{ complete: [] }>()

/** Config para mensajes de "other" que se muestran con delay tras la respuesta del usuario */
interface OtherFollowUpConfig {
  text: string
  delayAfterPreviousMs: number
  avatarUrl?: string
}

/** Tiempo extra entre mensajes para que el ritmo se sienta más orgánico */
const BREATHING_MS = 400

const initialMessages: SequentialMessage[] = [
  {
    id: '1',
    text: 'Hola Danielita',
    delayAfterPreviousMs: 1200 + BREATHING_MS,
    sender: 'other',
    avatarUrl: ternurinAvatarUrl,
  },
  {
    id: '2',
    text: 'Te escribo para contarte algo importante...',
    delayAfterPreviousMs: 2000 + BREATHING_MS,
    sender: 'other',
    avatarUrl: ternurinAvatarUrl,
  },
  {
    id: '3',
    text: 'Pero primero...',
    delayAfterPreviousMs: 1200 + BREATHING_MS,
    sender: 'other',
    avatarUrl: ternurinAvatarUrl,
  },
  {
    id: '4',
    text: 'Necesito que sepas algo',
    delayAfterPreviousMs: 1600 + BREATHING_MS,
    sender: 'other',
    avatarUrl: ternurinAvatarUrl,
  },
  {
    id: '5',
    text: '¿Estás lista?',
    delayAfterPreviousMs: 1000 + BREATHING_MS,
    sender: 'other',
    avatarUrl: ternurinAvatarUrl,
  },
]

const { visibleMessages, allShown, isOtherTyping } = useSequentialMessages(initialMessages)

const myReplies = ref<Array<{ id: string; text: string; sender: 'me'; avatarUrl?: string }>>([])

const otherFollowUps = ref<
  Array<{ id: string; text: string; sender: 'other'; avatarUrl?: string }>
>([])

const hasReplied = ref(false)
/** true mientras se espera el siguiente mensaje de "other" en follow-ups */
const otherFollowUpTyping = ref(false)

const otherFollowUpTimeouts: ReturnType<typeof setTimeout>[] = []

const otherIsTyping = computed(() => isOtherTyping.value || otherFollowUpTyping.value)

const lastOtherAvatar = computed(() => {
  const list = visibleList.value
  for (let i = list.length - 1; i >= 0; i--) {
    const item = list[i]
    if (item?.sender === 'other' && item.avatarUrl) return item.avatarUrl
  }
  return ternurinAvatarUrl
})

const visibleList = computed(() => [
  ...(visibleMessages.value ?? []),
  ...myReplies.value,
  ...otherFollowUps.value,
])

const READ_TIME_AFTER_LAST_MS = 1500

function scheduleOtherFollowUps(items: OtherFollowUpConfig[]) {
  if (items.length === 0) return
  otherFollowUpTimeouts.push(
    setTimeout(() => {
      otherFollowUpTyping.value = true
    }, PRE_TYPING_DELAY_MS),
  )
  let cumulativeMs = 0
  items.forEach((item, i) => {
    cumulativeMs += item.delayAfterPreviousMs + BREATHING_MS
    const id = `other-follow-${Date.now()}-${i}`
    const isLast = i === items.length - 1
    otherFollowUpTimeouts.push(
      setTimeout(() => {
        otherFollowUps.value.push({
          id,
          text: item.text,
          sender: 'other',
          avatarUrl: item.avatarUrl,
        })
        otherFollowUpTyping.value = false
        if (!isLast) {
          otherFollowUpTimeouts.push(
            setTimeout(() => {
              otherFollowUpTyping.value = true
            }, PRE_TYPING_DELAY_MS),
          )
        }
      }, cumulativeMs),
    )
  })
  otherFollowUpTimeouts.push(
    setTimeout(() => emit('complete'), cumulativeMs + READ_TIME_AFTER_LAST_MS),
  )
}

function onCtaClick() {
  hasReplied.value = true
  myReplies.value.push({
    id: '6',
    text: 'Sí, estoy lista',
    sender: 'me',
  })
  scheduleOtherFollowUps([
    { text: 'Okii', delayAfterPreviousMs: 1000, avatarUrl: ternurinAvatarUrl },
    {
      text: 'Entonces si ya estas lista',
      delayAfterPreviousMs: 1200,
      avatarUrl: ternurinAvatarUrl,
    },
    { text: 'Es hora de rockear', delayAfterPreviousMs: 1200, avatarUrl: ternurinLentesAvatarUrl },
    { text: 'Jeje me deje llevar', delayAfterPreviousMs: 1200, avatarUrl: ternurinAvatarUrl },
    { text: 'Ya ahora si', delayAfterPreviousMs: 1200, avatarUrl: ternurinAvatarUrl },
    { text: 'Comencemos', delayAfterPreviousMs: 1400, avatarUrl: ternurinAvatarUrl },
  ])
}

onUnmounted(() => {
  otherFollowUpTimeouts.forEach(clearTimeout)
})
</script>

<template>
  <div class="chat-view">
    <div class="messages-wrap">
      <div class="messages">
        <ChatBubble
          v-for="msg in visibleList"
          :key="msg.id"
          :text="msg.text"
          :avatar-url="msg.avatarUrl"
          :sender="msg.sender"
        />
        <TypingIndicator v-if="otherIsTyping" :avatar-url="lastOtherAvatar" />
      </div>
    </div>
    <Transition name="cta">
      <div v-if="allShown && !hasReplied" class="cta-wrap">
        <button type="button" class="cta-btn" @click="onCtaClick">Responder</button>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.chat-view {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  min-height: 100dvh;
  padding: env(safe-area-inset-top) env(safe-area-inset-right) env(safe-area-inset-bottom)
    env(safe-area-inset-left);
  background: var(--color-background);
}

.messages-wrap {
  flex: 1;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  padding: 1rem 1rem 1.25rem;
}

.messages {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  max-width: 100%;
}

.cta-wrap {
  flex-shrink: 0;
  display: flex;
  justify-content: center;
  padding: 1rem 1rem calc(1rem + env(safe-area-inset-bottom));
}

.cta-btn {
  padding: 0.75rem 2rem;
  font-size: 1rem;
  font-weight: 600;
  color: var(--color-background);
  background: var(--color-ternurin-brown, #8d6e63);
  border: none;
  border-radius: 2rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.12);
  cursor: pointer;
  transition:
    transform 0.15s ease,
    box-shadow 0.15s ease;
}

.cta-btn:active {
  transform: scale(0.98);
}

.cta-btn:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

/* Transición del botón */
.cta-enter-active,
.cta-leave-active {
  transition:
    opacity 0.25s ease,
    transform 0.25s ease;
}

.cta-enter-from,
.cta-leave-to {
  opacity: 0;
  transform: translateY(0.5rem);
}
</style>
