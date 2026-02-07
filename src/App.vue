<script setup lang="ts">
import { onMounted, onUnmounted, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import ChatView from '@/views/ChatView.vue'
import GameView from '@/views/GameView.vue'
import QuestionView from '@/views/QuestionView.vue'
import lonelyTreeSongUrl from '@/assets/sounds/LonelyTreeSong.mp3'

const lonelyTreeSong = new Howl({ src: [lonelyTreeSongUrl], loop: true })

onMounted(() => {
    lonelyTreeSong.play()
})
onUnmounted(() => {
    lonelyTreeSong.stop()
})

type View = 'chat' | 'game' | 'question'

function viewFromQuery(q: unknown): View | null {
    if (q === 'chat' || q === 'game' || q === 'question') return q
    return null
}

const route = useRoute()
const router = useRouter()
const currentView = ref<View>('chat')

// Debug: ir a una vista por query ?view=chat|game|question
watch(
    () => route.query.view,
    (view) => {
        const v = viewFromQuery(view)
        if (v != null) currentView.value = v
    },
    { immediate: true }
)

function onChatComplete() {
    currentView.value = 'game'
    router.replace({ query: { ...route.query, view: 'game' } })
}

function onGoToQuestion() {
    currentView.value = 'question'
    router.replace({ query: { ...route.query, view: 'question' } })
}
</script>

<template>
    <div class="app-center">
        <Transition name="view" mode="out-in">
            <ChatView v-if="currentView === 'chat'" key="chat" @complete="onChatComplete" />
            <GameView v-else-if="currentView === 'game'" key="game" @go-to-question="onGoToQuestion" />
            <QuestionView v-else key="question" />
        </Transition>
    </div>
</template>

<style scoped>
.app-center {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 90vh;
    min-height: 90dvh;
    width: 100%;
}

/* Móvil: ancho completo */
.app-center :deep(.chat-view) {
    width: 100%;
    min-height: 90vh;
    min-height: 90dvh;
    border-radius: 12px;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12);
}

/* Escritorio: centrado con ancho máximo */
@media (min-width: 768px) {
    .app-center :deep(.chat-view) {
        max-width: 420px;
        min-height: 0;
        height: 90dvh;
        border-radius: 12px;
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12);
    }
}

/* Transición suave entre Chat y Game */
.view-enter-active,
.view-leave-active {
    transition: opacity 0.4s ease, transform 0.4s ease;
}

.view-leave-to {
    opacity: 0;
    transform: translateY(-12px);
}

.view-enter-from {
    opacity: 0;
    transform: translateY(12px);
}
</style>
