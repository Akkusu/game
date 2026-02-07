<script setup lang="ts">
defineProps<{
    visible: boolean
    message: string
}>()
</script>

<template>
    <Transition name="message">
        <div v-if="visible" class="message-overlay">
            <p class="message-text">{{ message }}</p>
        </div>
    </Transition>
</template>

<style scoped>
.message-overlay {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 10;
    padding: 1.5rem;
    background: #fcf4ea;
}

.message-text {
    font-size: 1.35rem;
    font-weight: 600;
    color: var(--color-ternurin-brown, #8d6e63);
    text-align: center;
    max-width: 280px;
    line-height: 1.4;
}

.message-enter-active,
.message-leave-active {
    transition: opacity 0.3s ease;
}

.message-enter-from,
.message-leave-to {
    opacity: 0;
}
</style>
