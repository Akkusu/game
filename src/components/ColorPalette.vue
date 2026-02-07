<script setup lang="ts">
import type { ColorOption } from '../interfaces/types';


const props = defineProps<{
    colors: ColorOption[];
    modelValue: ColorOption | null;
}>();

const emit = defineEmits(['update:modelValue']);
</script>

<template>
    <div class="flex flex-col gap-3">
        <button v-for="color in colors" :key="color.id" @click="emit('update:modelValue', color)"
            class="flex items-center gap-4 p-3 rounded-2xl border-2 transition-all"
            :class="modelValue?.id === color.id ? 'border-ternurin-brown bg-creamy-white shadow-sm' : 'border-transparent hover:bg-white/50'">
            <div class="flex items-center justify-center w-10 h-10 rounded-xl shadow-inner border border-black/5"
                :style="{ backgroundColor: `var(${color.variable})` }"><span class="text-black font-mono text-sm">{{
                    color.id
                    }}</span>
            </div>
            <div class="text-left">
                <p class="text-xs text-black font-bold  opacity-50">{{ color.name }}</p>
            </div>
        </button>
    </div>
</template>

<style scoped>
.border-ternurin-brown {
    border-color: var(--color-ternurin-brown);
}

.bg-creamy-white {
    background-color: var(--color-creamy-white);
}
</style>