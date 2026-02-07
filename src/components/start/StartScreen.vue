<script setup lang="ts">
defineEmits<{ start: [] }>()
</script>

<template>
  <div class="start-screen">
    <div class="start-content">
      <img src="@/assets/img/CabezaTernurinLentes.png" alt="" class="start-avatar" />
      <h1 class="start-title">¿Estás lista para el amor?</h1>
      <button type="button" class="start-btn" @click="$emit('start')">Iniciar</button>
    </div>
  </div>
</template>

<style scoped>
.start-screen {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100%;
  padding: 2rem 1.5rem;
  background: var(--color-background);
}

.start-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.25rem;
  max-width: 320px;
  text-align: center;
}

.start-avatar {
  width: 5rem;
  height: 5rem;
  object-fit: contain;
  border-radius: 50%;
  background: #f9e1df;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
}

.start-title {
  font-size: 1.75rem;
  font-weight: 700;
  color: var(--color-ternurin-brown, #8d6e63);
  margin: 0;
  letter-spacing: -0.02em;
}

.start-subtitle {
  font-size: 1rem;
  color: var(--color-text);
  opacity: 0.85;
  margin: 0;
}

.start-btn {
  margin-top: 0.5rem;
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

.start-btn:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.start-btn:active {
  transform: scale(0.98);
}
</style>
