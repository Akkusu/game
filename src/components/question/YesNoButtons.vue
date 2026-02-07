<script setup lang="ts">
import { ref } from 'vue'

const hoveringNo = ref(false)

defineEmits<{
    yes: []
    no: []
    hoverYes: []
    hoverYesLeave: []
}>()
</script>

<template>
    <div class="buttons-wrap" @mouseleave="hoveringNo = false">
        <button type="button" class="btn btn-yes" @click="$emit('yes')" @mouseenter="$emit('hoverYes')"
            @mouseleave="$emit('hoverYesLeave')">
            Sí
        </button>
        <button type="button" class="btn btn-no" @click="$emit('no')">
            No
        </button>
    </div>
</template>

<style scoped>
.buttons-wrap {
    display: flex;
    gap: 1.25rem;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    padding: 1rem;
}

.btn {
    min-width: 120px;
    padding: 0.85rem 2rem;
    font-size: 1.15rem;
    font-weight: 700;
    border: none;
    border-radius: 2.5rem;
    cursor: pointer;
    transition: transform 0.2s ease, box-shadow 0.2s ease;
    order: 0;
}

.btn-yes {
    color: var(--color-background, #fff);
    background: var(--color-ternurin-brown, #8d6e63);
    box-shadow: 0 4px 14px rgba(141, 110, 99, 0.4);
}

.btn-yes:hover {
    transform: scale(1.08);
    box-shadow: 0 6px 20px rgba(141, 110, 99, 0.5);
}

.btn-yes:active {
    transform: scale(1.02);
}

.btn-no {
    color: var(--color-ternurin-brown, #8d6e63);
    background: var(--color-pink-melody, #ffc0cb);
    box-shadow: 0 4px 14px rgba(255, 192, 203, 0.5);
    scale: 0.1
}

.btn-no:hover {
    transform: scale(1.05);
    box-shadow: 0 6px 18px rgba(255, 192, 203, 0.6);
}

.no-btn-enter-active,
.no-btn-leave-active {
    transition: opacity 0.25s ease, transform 0.25s ease;
}

.no-btn-enter-from,
.no-btn-leave-to {
    opacity: 0;
    transform: scale(0.8);
}
</style>
