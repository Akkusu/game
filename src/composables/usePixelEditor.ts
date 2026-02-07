import { ref, computed } from 'vue';
import type { Cell, ColorOption } from '../interfaces/types';


export function usePixelEditor(template: number[]) {
    const grid = ref<Cell[]>(
        template.map(id => ({
            targetColorId: id,
            currentColorId: null,
        }))
    );

    const selectedColor = ref<ColorOption | null>(null);

    const paintCell = (index: number) => {
        const cell = grid.value[index];
        if (cell && selectedColor.value) {
            cell.currentColorId = selectedColor.value.id;
        }
    };

    const isCompleted = computed(() =>
        grid.value.every(cell =>
            cell.targetColorId === 1 || cell.currentColorId === cell.targetColorId
        )
    );
    return { grid, selectedColor, paintCell, isCompleted };
}