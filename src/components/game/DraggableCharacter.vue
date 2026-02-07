<script setup lang="ts">
import characterImg from '@/assets/img/CabezaTernurin.png'

const props = defineProps<{
    position: { x: number; y: number }
    size: number
    dragging: boolean
}>()

defineEmits<{
    pointerDown: [e: PointerEvent]
    pointerMove: [e: PointerEvent]
    pointerUp: [e: PointerEvent]
}>()
</script>

<template>
    <div class="character" :class="{ dragging }" :style="{
        left: (position.x - size / 2) + 'px',
        top: (position.y - size / 2) + 'px',
        width: size + 'px',
        height: size + 'px',
    }"         @pointerdown.prevent="$emit('pointerDown', $event)"
        @pointermove="$emit('pointerMove', $event)"
        @pointerup="$emit('pointerUp', $event)"
        @pointercancel="$emit('pointerUp', $event)">
        <img :src="characterImg" alt="Personaje" class="character-img" />
    </div>
</template>

<style scoped>
.character {
    position: absolute;
    cursor: grab;
    z-index: 2;
    transition: transform 0.1s ease-out;
    user-select: none;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
}

.character.dragging {
    cursor: grabbing;
    transform: scale(1.05);
}

.character-img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    pointer-events: none;
    user-select: none;
}
</style>
