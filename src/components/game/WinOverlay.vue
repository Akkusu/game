<script setup lang="ts">
import { ref } from 'vue'

const fearClick = ref(false)

defineProps<{
    visible: boolean
}>()

defineEmits<{
    next: []
}>()

function fear() {
    fearClick.value = true
}
</script>

<template>
    <Transition name="win">
        <div v-if="visible" class="win-overlay">
            <h2 class="win-title">Con todo esto dicho mi amor</h2>
            <p class="win-subtitle">Es momento de que te pregunte algo importante. ¿Estás super lista?</p>
            <div class="win-btns">
                <button type="button" class="win-btn" @click="$emit('next')">
                    Síiiiiiiiiiiiiiii
                </button>
                <button type="button" class="win-btn win-btn-fear" @click="fear">
                    Tengo mellito
                </button>
                <div v-if="fearClick" class="fear-click-overlay">
                    <p>No pasa nada por tener miedo mi vida, tu solo dale al Sí y veamos que pasa.</p>
                </div>
            </div>
        </div>
    </Transition>
</template>

<style scoped>
.win-overlay {
    position: absolute;
    inset: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    z-index: 20;
    padding: 2rem;
    background: #fcf4ea;
    text-align: center;
}

.win-title {
    font-size: 2rem;
    font-weight: 700;
    color: var(--color-ternurin-brown, #8d6e63);
    margin-bottom: 0.5rem;
}

.win-subtitle {
    font-size: 1.1rem;
    color: var(--color-text);
    opacity: 0.9;
    margin-bottom: 1.5rem;
}

.win-btns {
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

.win-btn {
    padding: 0.75rem 2rem;
    font-size: 1rem;
    font-weight: 600;
    color: var(--color-background, #fff);
    background: var(--color-ternurin-brown, #8d6e63);
    border: none;
    border-radius: 2rem;
    cursor: pointer;
    box-shadow: 0 4px 14px rgba(141, 110, 99, 0.35);
    transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.win-btn-fear {
    background-color: #6d6b6a;
}

.win-btn:hover {
    transform: scale(1.05);
    box-shadow: 0 6px 18px rgba(141, 110, 99, 0.45);
}

.win-btn:active {
    transform: scale(1.02);
}

.win-enter-active,
.win-leave-active {
    transition: opacity 0.4s ease;
}

.win-enter-from,
.win-leave-to {
    opacity: 0;
}
</style>
