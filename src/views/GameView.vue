<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { Howl } from 'howler'
import { useCatchGame, CHARACTER_SIZE } from '@/composables/useCatchGame'
import GameHeart from '@/components/game/GameHeart.vue'

import DraggableCharacter from '@/components/game/DraggableCharacter.vue'
import CatchMessageOverlay from '@/components/game/CatchMessageOverlay.vue'
import WinOverlay from '@/components/game/WinOverlay.vue'

const emit = defineEmits<{ goToQuestion: [] }>()
const arenaRef = ref<HTMLElement | null>(null)
const {
    characterPos,
    hearts,
    isPaused,
    currentMessage,
    gameWon,
    isDragging,
    onPointerDown,
    onPointerMove,
    onPointerUp,
} = useCatchGame(arenaRef)
</script>

<template>
    <div class="game-view">
        <div ref="arenaRef" class="arena" :class="{ paused: isPaused }">
            <GameHeart v-for="(heart, index) in hearts" :key="heart.id" :x="heart.x" :y="heart.y" :index="index" />
            <DraggableCharacter :position="characterPos" :size="CHARACTER_SIZE" :dragging="isDragging"
                @pointer-down="onPointerDown" @pointer-move="onPointerMove" @pointer-up="onPointerUp" />
        </div>

        <CatchMessageOverlay :visible="isPaused && !!currentMessage" :message="currentMessage" />
        <WinOverlay class="win-overlay" :visible="gameWon" @next="emit('goToQuestion')" />
    </div>
</template>

<style scoped>
.game-view {
    position: relative;
    width: 100%;
    min-height: 90vh;
    min-height: 90dvh;
    border-radius: 12px;
    overflow: hidden;
    user-select: none;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
}

.win-overlay {
    border-radius: 12px;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12);
}

.arena {
    position: relative;
    width: 100%;
    height: 90vh;
    height: 90dvh;
    min-height: 400px;
    touch-action: none;
}

.arena.paused {
    pointer-events: none;
}
</style>
