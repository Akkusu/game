<script setup lang="ts">
import type { Cell, ColorOption } from '@/interfaces/types';


defineProps<{
    grid: Cell[];
    palette: ColorOption[];
}>();

const emit = defineEmits(['paint']);

const getCellColor = (cell: Cell, palette: ColorOption[]) => {
    if (!cell.currentColorId) return 'transparent';
    const color = palette.find(p => p.id === cell.currentColorId);
    return color ? `var(${color.variable})` : 'transparent';
};
</script>

<template>
    <div class="grid grid-cols-16 gap-0 border-4 border-ternurin-brown bg-white shadow-2xl">
        <div v-for="(cell, i) in grid" :key="i" @mousedown="emit('paint', i)"
            @mouseenter="$event.buttons === 1 && emit('paint', i)"
            class="aspect-square border-[0.5px] border-gray-100 flex items-center justify-center cursor-crosshair hover:bg-gray-50 transition-colors"
            :style="{ backgroundColor: getCellColor(cell, palette) }">
            <span v-if="!cell.currentColorId" class="text-[10px] font-bold text-black select-none">
                {{ cell.targetColorId }}
            </span>
        </div>
    </div>
</template>

<style scoped>
.grid-cols-16 {
    grid-template-columns: repeat(16, minmax(0, 1fr));
}

.border-ternurin-brown {
    border-color: var(--color-ternurin-brown);
}
</style>