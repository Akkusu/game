<script setup lang="ts">
import { ref, computed, onUnmounted, onMounted } from 'vue'
import ChatBubble from '@/components/chat/ChatBubble.vue'
import { useSequentialMessages } from '@/composables/useSequentialMessages'
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

const initialMessages: SequentialMessage[] = [
    { id: '1', text: 'Hola Danielita', delayAfterPreviousMs: 1200, sender: 'other', avatarUrl: ternurinAvatarUrl },
    { id: '2', text: 'Te escribo para contarte algo importante...', delayAfterPreviousMs: 1200, sender: 'other', avatarUrl: ternurinAvatarUrl },
    { id: '3', text: 'Pero primero...', delayAfterPreviousMs: 1200, sender: 'other', avatarUrl: ternurinAvatarUrl },
    { id: '4', text: 'Necesito que sepas algo', delayAfterPreviousMs: 1200, sender: 'other', avatarUrl: ternurinAvatarUrl },
    { id: '5', text: '¿Estás lista?', delayAfterPreviousMs: 1200, sender: 'other', avatarUrl: ternurinLentesAvatarUrl },
]

const { visibleMessages, allShown } = useSequentialMessages(initialMessages)

const myReplies = ref<Array<{ id: string; text: string; sender: 'me'; avatarUrl?: string }>>([])

const otherFollowUps = ref<Array<{ id: string; text: string; sender: 'other'; avatarUrl?: string }>>([])

const hasReplied = ref(false)

const otherFollowUpTimeouts: ReturnType<typeof setTimeout>[] = []

const visibleList = computed(() => [
    ...(visibleMessages.value ?? []),
    ...myReplies.value,
    ...otherFollowUps.value,
])

const READ_TIME_AFTER_LAST_MS = 1500

function scheduleOtherFollowUps(items: OtherFollowUpConfig[]) {
    let cumulativeMs = 0
    items.forEach((item, i) => {
        cumulativeMs += item.delayAfterPreviousMs
        const id = `other-follow-${Date.now()}-${i}`
        otherFollowUpTimeouts.push(
            setTimeout(() => {
                otherFollowUps.value.push({
                    id,
                    text: item.text,
                    sender: 'other',
                    avatarUrl: item.avatarUrl,
                })
            }, cumulativeMs)
        )
    })
    // Cuando se muestra el último mensaje, avisar tras un breve tiempo de lectura
    if (items.length > 0) {
        otherFollowUpTimeouts.push(
            setTimeout(() => emit('complete'), cumulativeMs + READ_TIME_AFTER_LAST_MS)
        )
    }
}

function onCtaClick() {
    hasReplied.value = true
    myReplies.value.push({
        id: '6',
        text: 'Sí, estoy lista',
        sender: 'me',
    })
    scheduleOtherFollowUps([
        { text: 'Okii', delayAfterPreviousMs: 1200, avatarUrl: ternurinLentesAvatarUrl },
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
                <ChatBubble v-for="msg in visibleList" :key="msg.id" :text="msg.text" :avatar-url="msg.avatarUrl"
                    :sender="msg.sender" />
            </div>
        </div>
        <Transition name="cta">
            <div v-if="allShown && !hasReplied" class="cta-wrap">
                <button type="button" class="cta-btn" @click="onCtaClick">
                    Responder
                </button>
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
    padding: env(safe-area-inset-top) env(safe-area-inset-right) env(safe-area-inset-bottom) env(safe-area-inset-left);
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
    transition: transform 0.15s ease, box-shadow 0.15s ease;
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
    transition: opacity 0.25s ease, transform 0.25s ease;
}

.cta-enter-from,
.cta-leave-to {
    opacity: 0;
    transform: translateY(0.5rem);
}
</style>
