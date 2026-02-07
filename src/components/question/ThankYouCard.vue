<script setup lang="ts">
defineProps<{
    visible: boolean
}>()
</script>

<template>
    <Transition name="card">
        <div v-if="visible" class="thank-you-card">
            <div class="card-inner">
                <h2 class="card-title">Gracias por aceptar mi amor!</h2>
                <p class="card-message">
                    Estoy muy feliz que hayas aceptado ser mi San Valentín otro año más. Y que nos sigamos queriendo año
                    tras año.
                </p>
                <p class="card-invitation">
                    ¿Quieres el 14 tener un picnic conmigo en el Parque Rufino Tamayo?
                </p>
                <p class="card-sign">Con amor, tu novio</p>
            </div>
        </div>
    </Transition>
</template>

<style scoped>
.thank-you-card {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1.5rem;
    z-index: 10;
}

.card-inner {
    max-width: 380px;
    padding: 2rem;
    background: #fff;
    border-radius: 1rem;
    box-shadow: 0 12px 40px rgba(141, 110, 99, 0.2);
    border: 1px solid rgba(141, 110, 99, 0.15);
}

.card-title {
    font-size: 1.6rem;
    font-weight: 700;
    color: var(--color-ternurin-brown, #8d6e63);
    margin-bottom: 1rem;
    text-align: center;
}

.card-message {
    font-size: 1rem;
    line-height: 1.6;
    color: var(--color-text);
    margin-bottom: 1.25rem;
}

.card-invitation {
    font-size: 1rem;
    line-height: 1.6;
    color: var(--color-ternurin-brown, #8d6e63);
    font-weight: 500;
    margin-bottom: 1.25rem;
    padding: 1rem;
    background: rgba(255, 192, 203, 0.2);
    border-radius: 0.75rem;
}

.card-sign {
    font-size: 1.1rem;
    font-weight: 600;
    color: var(--color-ternurin-brown, #8d6e63);
    text-align: right;
}

.card-enter-active,
.card-leave-active {
    transition: opacity 0.35s ease, transform 0.35s ease;
}

.card-enter-from,
.card-leave-to {
    opacity: 0;
    transform: scale(0.95) translateY(10px);
}
</style>
